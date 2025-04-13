import { A, useLocation } from '@solidjs/router';
import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useSidebar } from '../context/SidebarContext';
import { t } from '../localization';

type NavItem = {
    name: string;
    icon: string;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: 'fa-solid fa-house-chimney fa-lg',
        name: 'zw_sidebar_title_home',
        subItems: [
            { name: 'Ecommerce', path: '/', pro: false },
            { name: 'Analytics', path: '/analytics', pro: false },
        ],
    },
    // {
    //     icon: 'fas fa-fw fa-chalkboard-teacher',
    //     name: 'Calendar',
    //     path: '/calendar',
    // },
    {
        icon: 'fas fa-fw fa-users-cog fa-lg',
        name: 'zw_sidebar_title_members',
        subItems: [
            { name: 'zw_sidebar_title_new_members', path: '/member/new', pro: false },
            { name: 'zw_sidebar_title_all_members', path: '/pricing-tables', pro: false },
        ],
    },
];

const othersItems: NavItem[] = [
    {
        icon: 'fas fa-fw fa-cogs fa-lg',
        name: 'zw_sidebar_title_setting',
        subItems: [
            { name: 'Line Chart', path: '/line-chart', pro: false },
            { name: 'Bar Chart', path: '/bar-chart', pro: false },
            { name: 'Pie Chart', path: '/pie-chart', pro: false },
        ],
    },
];

const AppSidebar: Component = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = createSignal<
        {
            type: 'main' | 'others';
            index: number;
        } | null
    >(null);
    const [subMenuHeight, setSubMenuHeight] = createSignal<Record<string, number>>(
        {},
    );

    const [subMenuRefs, setSubMenuRefs] = createStore<Record<string, HTMLElement | null>>({});

    const isActive = (path: string) => {
        const location = useLocation();
        return location.pathname === path;
    };

    createEffect(() => {
        let submenuMatched = false;
        ['main', 'others'].forEach((menuType) => {
            const items = menuType === 'main' ? navItems : othersItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuType as 'main' | 'others',
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [location, isActive]);

    createEffect(() => {
        if (openSubmenu() !== null) {
            const key = `${openSubmenu()?.type}-${openSubmenu()?.index}`;
            if (subMenuRefs?.[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (
        index: number,
        menuType: 'main' | 'others',
    ) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu
                && prevOpenSubmenu.type === menuType
                && prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (
        items: NavItem[],
        menuType: 'main' | 'others',
    ) => (
        <ul class='flex flex-col gap-4'>
            <For each={items}>
                {(nav, index) => (
                    <li>
                        <Show when={nav.subItems}>
                            <button
                                onClick={() => handleSubmenuToggle(index(), menuType)}
                                class={'menu-item group cursor-pointer'}
                                classList={{
                                    'menu-item-active': openSubmenu()?.type === menuType
                                        && openSubmenu()?.index === index(),
                                    'menu-item-inactive':
                                        !(openSubmenu()?.type === menuType && openSubmenu()?.index === index()),
                                    'lg:justify-center': !isExpanded() && !isHovered(),
                                    'lg:justify-start': !(!isExpanded() && !isHovered()),
                                }}
                            >
                                <span
                                    classList={{
                                        'menu-item-icon-active': openSubmenu()?.type === menuType
                                            && openSubmenu()?.index === index(),
                                        'menu-item-icon-inactive':
                                            !(openSubmenu()?.type === menuType && openSubmenu()?.index === index()),
                                    }}
                                >
                                    <i class={nav.icon + ' text-base text-gray-400 hover:text-gray-600'} />
                                </span>

                                {(isExpanded() || isHovered() || isMobileOpen()) && (
                                    <span class='menu-item-text'>{t(nav.name)}</span>
                                )}
                                {(isExpanded() || isHovered() || isMobileOpen()) && (
                                    <i
                                        class='fas fa-fw fa-angle-down ml-auto w-5 h-5 transition-transform duration-200'
                                        classList={{
                                            'rotate-180 text-brand-500': openSubmenu()?.type === menuType
                                                && openSubmenu()?.index === index(),
                                        }}
                                    />
                                )}
                            </button>
                        </Show>
                        <Show when={nav.path}>
                            <A
                                href={nav.path!}
                                class={`menu-item group ${
                                    isActive(nav.path!) ? 'menu-item-active' : 'menu-item-inactive'
                                }`}
                            >
                                <span
                                    class={`${
                                        isActive(nav.path!)
                                            ? 'menu-item-icon-active'
                                            : 'menu-item-icon-inactive'
                                    }`}
                                >
                                    <i class={nav.icon + ' text-base text-gray-400 hover:text-gray-600'} />
                                </span>
                                {(isExpanded() || isHovered() || isMobileOpen()) && (
                                    <span class='menu-item-text'>{t(nav.name)}</span>
                                )}
                            </A>
                        </Show>
                        <Show when={nav.subItems && (isExpanded() || isHovered() || isMobileOpen())}>
                            <div
                                ref={(el) => {
                                    setSubMenuRefs(`${menuType}-${index()}`, el);
                                }}
                                class='overflow-hidden transition-all duration-300'
                                style={{
                                    height: openSubmenu()?.type === menuType && openSubmenu()?.index === index()
                                        ? `${subMenuHeight()[`${menuType}-${index()}`]}px`
                                        : '0px',
                                }}
                            >
                                <ul class='mt-2 space-y-1 ml-9'>
                                    {nav.subItems!.map((subItem) => (
                                        <li>
                                            <A
                                                href={subItem.path}
                                                class={`menu-dropdown-item ${
                                                    isActive(subItem.path)
                                                        ? 'menu-dropdown-item-active'
                                                        : 'menu-dropdown-item-inactive'
                                                }`}
                                            >
                                                {t(subItem.name)}
                                                <span class='flex items-center gap-1 ml-auto'>
                                                    {subItem.new && (
                                                        <span
                                                            class={`ml-auto ${
                                                                isActive(subItem.path)
                                                                    ? 'menu-dropdown-badge-active'
                                                                    : 'menu-dropdown-badge-inactive'
                                                            } menu-dropdown-badge`}
                                                        >
                                                            new
                                                        </span>
                                                    )}
                                                    {subItem.pro && (
                                                        <span
                                                            class={`ml-auto ${
                                                                isActive(subItem.path)
                                                                    ? 'menu-dropdown-badge-active'
                                                                    : 'menu-dropdown-badge-inactive'
                                                            } menu-dropdown-badge`}
                                                        >
                                                            pro
                                                        </span>
                                                    )}
                                                </span>
                                            </A>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Show>
                    </li>
                )}
            </For>
        </ul>
    );

    return (
        <aside
            class={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
            ${isExpanded() || isMobileOpen() ? 'w-[290px]' : isHovered() ? 'w-[290px]' : 'w-[90px]'}
            ${isMobileOpen() ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded() && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div class={`py-8 flex ${!isExpanded() && !isHovered() ? 'lg:justify-center' : 'justify-start'}`}>
                <A href='/'>
                    {isExpanded() || isHovered() || isMobileOpen()
                        ? (
                            <>
                                <img
                                    class='dark:hidden'
                                    src='/images/logo/logo.svg'
                                    alt='Logo'
                                    width={150}
                                    height={40}
                                />
                                <img
                                    class='hidden dark:block'
                                    src='/images/logo/logo-dark.svg'
                                    alt='Logo'
                                    width={150}
                                    height={40}
                                />
                            </>
                        )
                        : (
                            <img
                                src='/images/logo/logo-icon.svg'
                                alt='Logo'
                                width={32}
                                height={32}
                            />
                        )}
                </A>
            </div>
            <div class='flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar'>
                <nav class='mb-6'>
                    <div class='flex flex-col gap-4'>
                        <div>
                            <h2
                                class={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded() && !isHovered()
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}
                            >
                                {t('zw_sidebar_title_menu')}
                            </h2>
                            {renderMenuItems(navItems, 'main')}
                        </div>
                        <div class=''>
                            <h2
                                class={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 
                                    ${!isExpanded() && !isHovered() ? 'lg:justify-center' : 'justify-start'}`}
                            >
                                {t('zw_sidebar_title_others')}
                            </h2>
                            {renderMenuItems(othersItems, 'others')}
                        </div>
                    </div>
                </nav>
                {isExpanded() || isHovered() || isMobileOpen()}
            </div>
        </aside>
    );
};

export default AppSidebar;
