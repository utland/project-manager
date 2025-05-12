import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
    { path: "*", element: <App /> }
  ])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)

export {router};
