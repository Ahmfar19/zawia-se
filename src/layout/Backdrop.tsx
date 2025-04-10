import { Component, Show } from 'solid-js';
import { useSidebar } from '../context/SidebarContext';

const Backdrop: Component = () => {
    const { isMobileOpen, toggleMobileSidebar } = useSidebar();

    return (
        <Show when={isMobileOpen()}>
            <div
                class='fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden'
                onClick={toggleMobileSidebar}
            />
        </Show>
    );
};

export default Backdrop;
