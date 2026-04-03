import { RouterProvider } from "react-router-dom"
import { router } from './routes/router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
    <RouterProvider router={router}/>
      
    </QueryClientProvider>
  )
}

export default App
