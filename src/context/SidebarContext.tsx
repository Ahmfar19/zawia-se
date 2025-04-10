import { Accessor, createContext, createEffect, createSignal, ParentComponent, useContext } from 'solid-js';

type SidebarContextType = {
    isExpanded: Accessor<boolean>;
    isMobileOpen: Accessor<boolean>;
    isHovered: Accessor<boolean>;
    activeItem: Accessor<string | null>;
    openSubmenu: Accessor<string | null>;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    setIsHovered: (isHovered: boolean) => void;
    setActiveItem: (item: string | null) => void;
    toggleSubmenu: (item: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

export const SidebarProvider: ParentComponent = (props) => {
    const [isExpanded, setIsExpanded] = createSignal(true);
    const [isMobileOpen, setIsMobileOpen] = createSignal<boolean>(false);
    const [isMobile, setIsMobile] = createSignal(false);
    const [isHovered, setIsHovered] = createSignal(false);
    const [activeItem, setActiveItem] = createSignal<string | null>(null);
    const [openSubmenu, setOpenSubmenu] = createSignal<string | null>(null);

    createEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMobileOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    createEffect(() => {
        if (isMobile()) {
            setIsExpanded(false);
        }
    });

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    const toggleMobileSidebar = () => {
        setIsMobileOpen((prev) => !prev);
    };

    const toggleSubmenu = (item: string) => {
        setOpenSubmenu((prev) => (prev === item ? null : item));
    };

    return (
        <SidebarContext.Provider
            value={{
                isExpanded,
                isMobileOpen,
                isHovered,
                activeItem,
                openSubmenu,
                toggleSidebar,
                toggleMobileSidebar,
                setIsHovered,
                setActiveItem,
                toggleSubmenu,
            }}
        >
            {props.children}
        </SidebarContext.Provider>
    );
};
