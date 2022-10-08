import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Orders from './components/Orders/Orders';
import Main from './layout/Main';
import Shop from './components/Shop/Shop'
import Inventory from './components/Inventory/Inventory'
import { ProductsAndCartLoader } from './loaders/ProductsAndCartLoader';



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/shop',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path: 'order',
          loader: ProductsAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path: 'inventory',
          element: <Inventory></Inventory>
        },
        {
          path: 'about',
          element: <About></About>
        },
      ],
    },


  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
