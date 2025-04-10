import { Meta, Title } from '@solidjs/meta';

type PageMetaProps = {
    title: string;
    description: string;
};

const PageMeta = (props: PageMetaProps) => {
    return (
        <>
            <Title>{props.title}</Title>
            <Meta name='description' content={props.description} />
        </>
    );
};

type AppWrapperProps = {
    children: any;
};

export const AppWrapper = (props: AppWrapperProps) => {
    return <>{props.children}</>;
};

export default PageMeta;
