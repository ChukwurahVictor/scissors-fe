// import { lazy } from "react";

import Home from "pages/home";
import ViewLink from "pages/home/view-link";
import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import ConfirmEmail from "pages/auth/signup/confirm-email";
import LandingPage from "pages/landing";
import NotFoundPage from "components/not-found";
import ChangePassword from "pages/settings/change-password";
// import EditLink from "pages/home/edit-link";
// import NewLink from "pages/home/new";

interface RouterProps {
  path: string;
  element: JSX.Element;
  children?: RouterProps[];
}

export const links = {
  landing: "/",
  signup: "/signup",
  login: "/login",
  confirmEmail: "/confirm-email/:id",
  home: "/links",
  view: "links/:id",
  settings: "links/settings",
  // new: "/links/create",
  // edit: 'links/:id/edit'
};

export const routes = (): RouterProps[] => [
  {
    path: links.home,
    element: <Home />,
  },
  // {
  //   path: links.new,
  //   element: <NewLink />,
  // },
  {
    path: links.view,
    element: <ViewLink />,
  },
  // {
  //   path: links.edit,
  //   element: <EditLink />,
  // },
  {
    path: links.login,
    element: <Login />,
  },
  {
    path: links.signup,
    element: <Signup />,
  },
  {
    path: links.confirmEmail,
    element: <ConfirmEmail />,
  },
  {
    path: links.landing,
    element: <LandingPage />,
  },
  {
    path: links.settings,
    element: <ChangePassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
