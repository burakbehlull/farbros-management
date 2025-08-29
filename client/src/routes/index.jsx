import { useRoutes } from 'react-router-dom'
import { Home, Authentication, DashboardLayout,
    BotCreatePage, BotsPage, Dashboard, AddFeatureToBot } from '@pages'
export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/dashboard',
            element: <DashboardLayout><Authentication /></DashboardLayout>,
            children: [
                {
                    path: '',
                    element: <Dashboard />
                },
                {
                    path: 'bots',
                    element: <BotsPage />
                },
                {
                    path: 'create-bot',
                    element: <BotCreatePage />
                },
                {
                    path: 'add-feature',
                    element: <AddFeatureToBot />
                }
            ]
        }
    ])
}