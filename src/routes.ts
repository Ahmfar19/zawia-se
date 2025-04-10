/* eslint-disable import/prefer-default-export */
import { RouteDefinition, useLocation, useNavigate } from '@solidjs/router';
import { MatchFilters } from '@solidjs/router/dist/types';
import { createEffect, lazy } from 'solid-js';

const filters: MatchFilters = {
    parent: ['edit'], // allow enum values
    id: /^\d+$/, // only allow numbers
};

const roleGuard = (
    store: any,
    component: any,
    restricted?: number[],
    allowed?: number[],
) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.pathname;

    return () => {
        createEffect(() => {
            const role = store.user.role;
            if (Array.isArray(allowed)) {
                if (!allowed.includes(role)) {
                    navigate('/404', { replace: true, state: { from } });
                }
            } else if ((restricted || []).includes(role)) {
                navigate('/404', { replace: true, state: { from } });
            }
        });

        // If role is valid, render the component
        return component;
    };
};

export const createRoutes = (): RouteDefinition[] => [
    {
        path: '/',
        component: lazy(() => import('./pages/Blank')), // Update with the actual path to the component
    },
    {
        path: '/blank',
        component: lazy(() => import('./pages/Blank')), // Update with the actual path to the component
    },
    {
        path: '/member/new',
        component: lazy(() => import('./pages/NewMember')), // Update with the actual path to the component
    },
    // Add additional routes here
];
