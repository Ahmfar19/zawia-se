import { useRoutes } from '@solidjs/router';
import { Component } from 'solid-js';
import AppLayout from './layout/AppLayout';
import { createRoutes } from './routes';

const App: Component = () => {
    const Routes = useRoutes(createRoutes());

    return (
        <AppLayout>
            <Routes />
        </AppLayout>
    );
};

export default App;
