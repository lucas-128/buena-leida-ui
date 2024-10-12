import { useAuth } from "../context/AuthContext";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import { Profile } from "../pages/Profile";
import MyBooks from "../pages/MyBooks";
import Recommendations from "../pages/Search/Recommendations";
import Lists from "../pages/Search/Lists";
import Groups from "../pages/Community/Groups";
import Quotes from "../pages/Community/Quotes";

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
          path: "/mybooks",
          element: <MyBooks />,
        },
        {
          path: "/recommendations",
          element: <Recommendations />,
        },
        {
          path: "/lists",
          element: <Lists />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
        {
          path: "/quotes",
          element: <Quotes />,
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
