import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

// import Page
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { SettingsPage } from "./pages/Settings";
import { CreateEditPage } from "./pages/Editor";
import { ArticlePage } from "./pages/Article";
import { ProfilePage } from "./pages/Profile";
import { FavouritesPage } from "./pages/Favourites";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { GlobalContext } from "./globalContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
    },
    {
      path: "/editor",
      element: <CreateEditPage />,
      children: [
        {
          path: "/editor/:article-slug-here",
          element: <CreateEditPage />,
        },
      ],
    },
    {
      path: "/article/:article-slug-here",
      element: <ArticlePage />,
    },
    {
      path: "/profile/:username",
      element: <ProfilePage />,
      children: [
        {
          path: "favourites",
          element: <FavouritesPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <GlobalContext.Provider value={contextValue}>
        <Header />
        <Footer />
        <RouterProvider router={routers} />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
