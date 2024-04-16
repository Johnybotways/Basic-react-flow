import './App.css'
import './index.css';
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import DashBoard from './components/DashBoard';
import Login from './auth/Login';
function App() {
  const router = createBrowserRouter([
    {path : "/",
      element : <Login/>
    },
    {path : "/dashboard",
      element : <DashBoard/>
    },
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
