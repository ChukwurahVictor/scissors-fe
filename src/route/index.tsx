import { lazy } from "react";

import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import ConfirmEmail from "pages/auth/signup/confirm-email";
import LandingPage from "pages/landing";
import NotFoundPage from "components/not-found";
import ChangePassword from "pages/settings/change-password";

const Home = lazy(() => import("pages/home"));
const ViewLink = lazy(() => import("pages/home/view-link"));

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
};

export const routes = (): RouterProps[] => [
  {
    path: links.home,
    element: <Home />,
  },
  {
    path: links.view,
    element: <ViewLink />,
  },
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
