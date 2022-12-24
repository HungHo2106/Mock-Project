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
import { GlobalContext } from "./globalContext";

//import Redux
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [articles, setArticles] = useState([]);
  const [commentList, setCommentList] = useState([]);
  // const [myArticle, setMyArticle] = useState([]);
  const [profile, setProfile] = useState({
    profile: { image: "", username: "", bio: "", following: "" },
  });

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    // articles,
    // setArticles,
    commentList,
    setCommentList,
    // myArticle,
    // setMyArticle,
    profile,
    setProfile,
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
              path: "favorites",
              element: <ProfilePage />,
            },
          ],
        },
      ],
    },

    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalContext.Provider value={contextValue}>
          <RouterProvider router={routers} />
        </GlobalContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;
