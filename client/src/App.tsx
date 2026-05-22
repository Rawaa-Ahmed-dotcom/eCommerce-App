import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { routes } from './Routes';

import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,      
      easing: 'ease-out',
    });
  }, []);
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
