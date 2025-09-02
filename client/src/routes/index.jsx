import { useRoutes } from 'react-router-dom'
import { Home, Authentication, DashboardLayout, BotCreatePage, 
    BotsPage, Dashboard, AddFeatureToBot, BotPage, Settings, BotFeatures } from '@pages'
    
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
                            path: 'settings',
                            element: <Settings />
                        },
                        {
                            path: 'bots/:botId',
                            element: <BotPage />
                        },
                        {
                            path: 'bots/:botId/features',
                            element: <BotFeatures />
                        }
                        
                    ]
                }
            ]

        },
    ])
}

