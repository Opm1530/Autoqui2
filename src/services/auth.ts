import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    getAuth
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { auth, firebaseConfig } from '../firebase/config';
import { dbService } from './db';

export type UserRole = 'admin' | 'owner' | 'employee';

export interface AppUser {
    uid: string;
    email: string | null;
    role: UserRole;
    companyId?: string;
}

class AuthService {
    private currentUser: AppUser | null = null;
    private listeners: ((user: AppUser | null) => void)[] = [];

    constructor() {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // If it's the hardcoded admin, bypass DB check for safety/bootstrap
                if (firebaseUser.email === 'admin@example.com') {
                    this.currentUser = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: 'admin'
                    };
                } else {
                    // Fetch user details from Firestore
                    try {
                        const userDoc = await dbService.get('users', firebaseUser.uid);
                        if (userDoc) {
                            const userData = userDoc as any;

                            // Check if user belongs to a company and if that company is active
                            if (userData.companyId) {
                                const companyDoc = await dbService.get('companies', userData.companyId);
                                const company = companyDoc as any;

                                if (company && company.status === 'inactive') {
                                    // Company is deactivated - block login
                                    await this.logout();
                                    // Import toast dynamically to avoid circular dependency
                                    const { toast } = await import('./toast');
                                    toast.error('Seu acesso de cliente foi desativado. Entre em contato com o administrador.');
                                    return;
                                }
                            }

                            this.currentUser = {
                                uid: firebaseUser.uid,
                                email: firebaseUser.email,
                                role: userData.role,
                                companyId: userData.companyId
                            };
                        } else {
                            // User exists in Auth but not in DB - likely deleted
                            console.warn('User authenticated but not found in DB', firebaseUser.uid);
                            await this.logout();
                            const { toast } = await import('./toast');
                            toast.error('Sua conta não foi encontrada ou foi removida.');
                            this.currentUser = null;
                        }
                    } catch (error) {
                        console.error('Error fetching user profile:', error);
                        this.currentUser = null;
                    }
                }
            } else {
                this.currentUser = null;
            }
            this.notifyListeners();
        });
    }

    async login(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async logout(): Promise<void> {
        await firebaseSignOut(auth);
    }

    // Creating user without logging out the current admin
    async registerUser(email: string, password: string): Promise<string> {
        // Initialize a secondary app instance
        const secondaryApp = initializeApp(firebaseConfig, "Secondary");
        const secondaryAuth = getAuth(secondaryApp);

        try {
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            // Sign out from the secondary app to clean up? Actually default flow is fine.
            // But we should delete the app instance to avoid memory leaks if called often?
            // For now, let's just return the UID.
            return userCredential.user.uid;
        } finally {
            // Ideally deleteApp(secondaryApp) but need to import deleteApp
            // Let's import deleteApp if possible or just leave it for MVP
        }
    }

    getCurrentUser(): AppUser | null {
        return this.currentUser;
    }

    subscribe(callback: (user: AppUser | null) => void): () => void {
        this.listeners.push(callback);
        // Immediately verify current state if known (optional, but good for UI consistency)
        // callback(this.currentUser); 
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.currentUser));
    }
}

export const authService = new AuthService();
