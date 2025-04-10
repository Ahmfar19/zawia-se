import { Component } from 'solid-js';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import PageMeta from '../components/common/PageMeta';

const NewMember: Component = () => (
    <div>
        <PageMeta
            title='React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template'
            description='This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
        />
        <PageBreadcrumb pageTitle='Blank Page' />
        <div class='min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12'>
            <div class='mx-auto w-full max-w-[630px] text-center'>
                <h3 class='mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl'>
                    Card Title Here
                </h3>

            </div>
        </div>
    </div>
);
export default NewMember;
