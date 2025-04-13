import { Component, JSX, Show } from "solid-js";

interface ButtonProps {
    children: JSX.Element; // Button text or content
    size?: 'sm' | 'md'; // Button size
    variant?: 'primary' | 'outline'; // Button variant
    startIcon?: JSX.Element; // Icon before the text
    endIcon?: JSX.Element; // Icon after the text
    onClick?: () => void; // Click handler
    disabled?: boolean; // Disabled state
    class?: string; // Disabled state
}

const Button: Component<ButtonProps> = (props) => {
    // Size Classes
    const sizeClasses = {
        sm: 'px-4 py-3 text-sm',
        md: 'px-5 py-3.5 text-sm',
    } as const;

    // Variant Classes
    const variantClasses = {
        primary: 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300',
        outline: 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
    };

    return (
        <button
            class={`
                inline-flex items-center justify-center gap-2 rounded-lg transition ${props.class || ' '} 
                ${props.size ? sizeClasses[props.size] : ' '} 
                ${props.variant ? variantClasses[props.variant] : ' '} 
                ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
            `}
            onClick={() => props.onClick?.()}
            disabled={props.disabled}
        >
            <Show when={props.startIcon}>
                <span class='flex items-center'>{props.startIcon}</span>
            </Show>
            {props.children}
            <Show when={props.endIcon}>
                <span class='flex items-center'>{props.endIcon}</span>
            </Show>
        </button>
    );
};

export default Button;
