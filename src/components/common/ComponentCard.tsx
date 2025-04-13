import { Component, JSX, Show } from 'solid-js';
import { t } from '../../localization';

interface ComponentCardProps {
    title: string;
    children: JSX.Element;
    class?: string;
    desc?: string;
}

const ComponentCard: Component<ComponentCardProps> = (props) => (
    <div
        class={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${
            props.class || ''
        }`}
    >
        {/* Card Header */}
        <div class='px-6 py-5'>
            <h3 class='text-base font-medium text-gray-800 dark:text-white/90'>
                {t(props.title)}
            </h3>
            <Show when={props.desc}>
                <p class='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                    {t('props.desc')}
                </p>
            </Show>
        </div>

        {/* Card Body */}
        <div class='p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6'>
            <div class='space-y-6'>{props.children}</div>
        </div>
    </div>
);

export default ComponentCard;
