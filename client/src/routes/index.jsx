import { useRoutes } from 'react-router-dom'
import { Home } from '@pages'
export default function Routes(){

    return useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            element: <h1>404 Not Found</h1>,
            children: []
        }
    ])
}