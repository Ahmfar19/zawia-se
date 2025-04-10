import { Accessor, createContext, createEffect, createSignal, ParentComponent, useContext } from 'solid-js';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Accessor<Theme>;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: ParentComponent = (props) => {
    const [theme, setTheme] = createSignal<Theme>('light');
    const [isInitialized, setIsInitialized] = createSignal(false);

    createEffect(() => {
        // This code will only run on the client side
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const initialTheme = savedTheme || 'light'; // Default to light theme

        setTheme(initialTheme);
        setIsInitialized(true);
    }, []);

    createEffect(() => {
        if (isInitialized()) {
            localStorage.setItem('theme', theme());
            if (theme() === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [theme, isInitialized]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
