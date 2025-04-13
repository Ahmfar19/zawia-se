import { clsx } from 'clsx';
import { Component, JSX } from 'solid-js';
import { twMerge } from 'tailwind-merge';

interface LabelProps {
    for?: string;
    children: JSX.Element;
    className?: string;
}

const Label: Component<LabelProps> = (props) => (
    <label
        for={props.for}
        class={twMerge(
            clsx(
                'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400',
                props.className,
            ),
        )}
    >
        {props.children}
    </label>
);

export default Label;
