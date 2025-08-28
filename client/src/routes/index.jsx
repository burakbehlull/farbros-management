import { useRoutes } from 'react-router-dom'
import { Home, Authentication } from '@pages'
export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/dashboard',
            element: <Authentication />,
            children: [
                {
                    path: '',
                    element: <>aaaDashbdaoard</>
                }
            ]
        }
    ])
}