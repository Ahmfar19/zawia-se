import { JSX } from 'solid-js';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import Backdrop from './Backdrop';

interface MainLayoutProps {
    children: JSX.Element;
}

const LayoutContent = (props: MainLayoutProps) => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div class='min-h-screen xl:flex'>
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                class={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded() || isHovered() ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
                } ${isMobileOpen() ? 'ml-0' : ''}`}
            >
                <AppHeader />
                <div class='p-4 mx-auto max-w-screen-2xl md:p-6'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const AppLayout = (props: MainLayoutProps) => (
    <SidebarProvider>
        <LayoutContent>
            {props.children}
        </LayoutContent>
    </SidebarProvider>
);

export default AppLayout;
