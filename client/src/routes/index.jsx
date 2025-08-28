import { useRoutes } from 'react-router-dom'
import { Home, Authentication } from '@pages'
import { DashboardLayout } from '../pages'
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
                    element: <div>Dashboard Ana Sayfası</div>
                }
            ]
        }
    ])
}