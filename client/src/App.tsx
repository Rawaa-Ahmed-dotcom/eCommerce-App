import { RouterProvider } from 'react-router';
import { routes } from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import {toast , Toaster} from "react-hot-toast";

const App = () => {
  const queryClient = new QueryClient({defaultOptions : {
    queries : {
      retry : 1,
      refetchOnWindowFocus : false,
      throwOnError : true
    },
    mutations: {
      onError: (error) => {
        toast.error(error.message || 'Oops , Unexpected Error!');
      },
    },
  }});
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient} >
        <Toaster position="top-center" />
        <RouterProvider router={routes}/>
      </QueryClientProvider>
    </ReduxProvider>
  )
}

export default App
