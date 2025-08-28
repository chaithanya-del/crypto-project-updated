import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './shell/App'
import './styles/base.css'

const Home = lazy(() => import('./routes/Home'))
const Trade = lazy(() => import('./routes/Trade'))

const router = createBrowserRouter([{ path: '/', element: <App />, children: [
  { index: true, element: <Suspense fallback={<div className='container'>Loading…</div>}><Home/></Suspense> },
  { path: 'trade', element: <Suspense fallback={<div className='container'>Loading…</div>}><Trade/></Suspense> },
]}])

const qc = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)