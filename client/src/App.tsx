import { RouterProvider } from 'react-router';
import { routes } from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}/>
      </QueryClientProvider>
    </>
  )
}

export default App
