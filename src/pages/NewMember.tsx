import { Component } from 'solid-js';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import PageMeta from '../components/common/PageMeta';
import DefaultInputs from '../components/form/form-elements/DefaultInputs';
import { t } from '../localization';

const NewMember: Component = () => (
    <div>
        <PageMeta
            title='React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template'
            description='This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
        />
        <PageBreadcrumb pageTitle={t('zw_sidebar_title_new_members')} />
        <DefaultInputs />
    </div>
);
export default NewMember;
