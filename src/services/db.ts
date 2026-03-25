import {
    collection,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    where,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Generic CRUD Service
export const dbService = {
    // Create (Auto-generated ID)
    async create(collectionName: string, data: any) {
        const colRef = collection(db, collectionName);
        const docRef = await addDoc(colRef, {
            ...data,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    },

    // Create with Custom ID
    async set(collectionName: string, id: string, data: any) {
        const docRef = doc(db, collectionName, id);
        await setDoc(docRef, {
            ...data,
            createdAt: Timestamp.now()
        });
    },

    // Read All (with optional filters)
    async getAll(collectionName: string, filters?: { field: string, operator: any, value: any } | { field: string, operator: any, value: any }[]) {
        const colRef = collection(db, collectionName);
        let q = query(colRef);

        if (filters) {
            if (Array.isArray(filters)) {
                const wheres = filters.map(f => where(f.field, f.operator, f.value));
                q = query(colRef, ...wheres);
            } else {
                q = query(colRef, where(filters.field, filters.operator, filters.value));
            }
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Read One
    async get(collectionName: string, id: string) {
        const docRef = doc(db, collectionName, id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
        }
        return null;
    },

    // Update
    async update(collectionName: string, id: string, data: any) {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);
    },

    // Delete
    async delete(collectionName: string, id: string) {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
    }
};
