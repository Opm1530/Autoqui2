type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
    sound?: boolean;
}

class ToastService {
    private container: HTMLElement | null = null;
    private soundEnabled: boolean = true;

    constructor() {
        this.init();
    }

    private init() {
        if (typeof window === 'undefined') return;

        // Create toast container
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    private playSound(type: ToastType) {
        if (!this.soundEnabled) return;

        try {
            const audio = new Audio();
            switch (type) {
                case 'success':
                    audio.src = '/sounds/success.mp3';
                    break;
                case 'error':
                    audio.src = '/sounds/error.mp3';
                    break;
                case 'warning':
                    audio.src = '/sounds/warning.mp3';
                    break;
                default:
                    return;
            }
            audio.volume = 0.3;
            audio.play().catch(() => {
                // Ignore audio play errors (user interaction required)
            });
        } catch (e) {
            // Ignore audio errors
        }
    }

    show(options: ToastOptions) {
        const { message, type = 'info', duration = 3000, sound = true } = options;

        if (!this.container) this.init();
        if (!this.container) return;

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Icon based on type
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        this.container.appendChild(toast);

        // Play sound
        if (sound) {
            this.playSound(type);
        }

        // Auto dismiss
        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    success(message: string, duration?: number) {
        this.show({ message, type: 'success', duration });
    }

    error(message: string, duration?: number) {
        this.show({ message, type: 'error', duration });
    }

    warning(message: string, duration?: number) {
        this.show({ message, type: 'warning', duration });
    }

    info(message: string, duration?: number) {
        this.show({ message, type: 'info', duration });
    }

    setSoundEnabled(enabled: boolean) {
        this.soundEnabled = enabled;
    }
}

export const toast = new ToastService();
