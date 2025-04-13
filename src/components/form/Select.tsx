import { Component, For } from 'solid-js';

interface Option {
    value: string | number;
    label: string | number;
}

interface SelectProps {
    options: Option[];
    placeholder?: string;
    onChange: (e: Event) => void;
    class?: string;
    defaultValue?: string;
    name: string
    value?: string | number | undefined;
}

const Select: Component<SelectProps> = (props) => (
    <div class='relative w-full'>
        <span class='material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg'>
            arrow_drop_down
        </span>
        <select
            class={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
            ${props.value
                    ? 'text-gray-800 dark:text-white/90'
                    : 'text-gray-400 dark:text-gray-400'
                } ${props.class}`}
            value={props.value || ''}
            onChange={(e) => props.onChange(e)}
            name={props.name}
        >
            <option
                value=''
                disabled
                class='text-gray-700 dark:bg-gray-900 dark:text-gray-400'
            >
                {props.placeholder || 'Select an option'}
            </option>

            <For each={props.options}>
                {(option) => (
                    <option
                        value={option.value}
                        class='text-gray-700 dark:bg-gray-900 dark:text-gray-400'
                    >
                        {option.label}
                    </option>
                )}
            </For>
        </select>
    </div>
)
    ;

export default Select;
