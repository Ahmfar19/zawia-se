import flatpickr from 'flatpickr';
import { createEffect, Show } from 'solid-js';
import 'flatpickr/dist/flatpickr.css';
import Label from './Label';
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
    id: string;
    mode?: 'single' | 'multiple' | 'range' | 'time';
    onChange?: Hook | Hook[];
    defaultDate?: DateOption;
    label?: string;
    placeholder?: string;
};

export default function DatePicker(props: PropsType) {
    createEffect(() => {
        const flatPickr = flatpickr(`#${props.id}`, {
            mode: props.mode || 'single',
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'Y-m-d',
            defaultDate: props.defaultDate,
            onChange: props.onChange,
        });

        return () => {
            if (!Array.isArray(flatPickr)) {
                flatPickr.destroy();
            }
        };
    });

    return (
        <div>
            <Show when={props.label}>
                <Label for={props.id}>{props.label}</Label>
            </Show>
            <div class='relative'>
                <input
                    id={props.id}
                    placeholder={props.placeholder}
                    class='h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800'
                />

                <span class='material-symbols-outlined absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400 size-6'>
                    calendar_today
                </span>
            </div>
        </div>
    );
}
