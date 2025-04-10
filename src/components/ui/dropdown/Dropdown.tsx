import { Accessor, Component, createEffect, JSX } from 'solid-js';

interface DropdownProps {
    isOpen: Accessor<boolean>;
    onClose: () => void;
    children: JSX.Element[];
    class?: string;
}

const Dropdown: Component<DropdownProps> = (props) => {
    let dropdownRef!: HTMLDivElement;

    // Create an effect to handle clicking outside the dropdown
    createEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
                props.onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    if (!props.isOpen()) return null;

    return (
        <div
            ref={dropdownRef}
            class={`absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${props.class}`}
        >
            {props.children}
        </div>
    );
};
export default Dropdown;
