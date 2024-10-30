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
import { CreateAccount } from "../pages/CreateAccount";
import SearchBar from "../pages/SearchBar";
import Book from "../pages/Book";
import MyReviews from "../pages/MyReviews";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  const Layout = () => {
    return (
      <div>
        <div style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}>
          <NavBar />
        </div>

        <div style={{ paddingTop: "60px" }}>
          {" "}
          <Outlet />
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
          path: "/create-account",
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
        {
          path: "/search",
          element: <SearchBar />,
        },
        {
          path: "/book",
          element: <Book />,
        },
        {
          path: "/myreviews",
          element: <MyReviews />,
        },
      ],
    },
  ]);

  const publicRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/create-account",
      element: <CreateAccount />,
    },
  ]);

  return isAuthenticated ? (
    <RouterProvider router={privateRouter} />
  ) : (
    <RouterProvider router={publicRouter} />
  );
}
