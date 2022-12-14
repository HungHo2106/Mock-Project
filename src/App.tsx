import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Layout } from "./components/Layout";

// import Page
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { SettingsPage } from "./pages/Settings";
import { CreateEditPage } from "./pages/Editor";
import { ArticlePage } from "./pages/Article";
import { ProfilePage } from "./pages/Profile";
import { FavouritesPage } from "./pages/Favourites";
import { GlobalContext } from "./globalContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    articles,
    setArticles,
  };

  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
        {
          path: "editor",
          element: <CreateEditPage />,
          children: [
            {
              path: ":slug",
              element: <CreateEditPage />,
            },
          ],
        },
        {
          path: "article/:slug",
          element: <ArticlePage />,
        },
        {
          path: "profile/:username",
          element: <ProfilePage />,
          children: [
            {
              path: "favourites",
              element: <FavouritesPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <GlobalContext.Provider value={contextValue}>
        <RouterProvider router={routers} />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
