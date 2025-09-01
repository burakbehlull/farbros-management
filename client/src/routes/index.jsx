import { useRoutes } from 'react-router-dom'
import { Home, Authentication, DashboardLayout, BotCreatePage, 
    BotsPage, Dashboard, AddFeatureToBot, BotPage } from '@pages'
export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            element: <Authentication />,
            children: [
                {
                    path: '/dashboard',
                    element: <DashboardLayout />,
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
                        },
                        {
                            path: 'bots/:botId',
                            element: <BotPage />
                        }
                    ]
                }
            ]
            
        },
    ])
}

