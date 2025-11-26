// Minimal Theme Manager - Add this to any page
class SimpleTheme {
    constructor() {
        this.init();
    }

    init() {
        // Apply saved theme on page load
        this.applyTheme(this.getSavedTheme());
        
        // Listen for system theme changes
        this.setupSystemListener();
    }

    getSavedTheme() {
        return localStorage.getItem('theme') || 'system';
    }

    applyTheme(theme) {
        const root = document.documentElement;
        let effectiveTheme = theme;

        if (theme === 'system') {
            effectiveTheme = this.getSystemTheme();
        }

        root.setAttribute('data-theme', effectiveTheme);
        localStorage.setItem('theme', theme);
        this.updateMetaTag(effectiveTheme);
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setupSystemListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.getSavedTheme() === 'system') {
                this.applyTheme('system');
            }
        });
    }

    updateMetaTag(theme) {
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }
        meta.content = theme === 'dark' ? '#0f172a' : '#2563eb';
    }

    // Quick theme toggle for buttons
    toggleTheme() {
        const current = this.getSavedTheme();
        const newTheme = current === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        return newTheme;
    }
}

// Initialize theme automatically
const theme = new SimpleTheme();

// Optional: Export for use in other scripts
window.SimpleTheme = theme;