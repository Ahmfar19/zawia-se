import { A } from '@solidjs/router';
import { Component } from 'solid-js';

interface DropdownItemProps {
    tag?: 'a' | 'button';
    to?: string;
    onClick?: () => void;
    onItemClick?: () => void;
    baseClassName?: string;
    class?: string;
    children: any;
}

const DropdownItem: Component<DropdownItemProps> = (props) => {
    const combinedClasses = `${props.baseClassName} ${props.class}`.trim();

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        if (props.onClick) props.onClick();
        if (props.onItemClick) props.onItemClick();
    };

    if (props.tag === 'a' && props.to) {
        return (
            <A href={props.to} class={combinedClasses} onClick={handleClick}>
                {props.children}
            </A>
        );
    }

    return (
        <button onClick={handleClick} class={combinedClasses}>
            {props.children}
        </button>
    );
};

export default DropdownItem;
