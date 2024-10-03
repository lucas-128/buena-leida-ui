import { useAuth } from "../context/AuthContext";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import { Profile } from "../pages/Profile";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div>
          <div>
            <Outlet />
          </div>
        </div>
        
      </div>
    );
  };

  const privateRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
       

      ],
    },
  ]);

  const publicRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return isAuthenticated ? (
    <RouterProvider router={privateRouter} />
  ) : (
    <RouterProvider router={publicRouter} />
  );
}
