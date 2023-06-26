import { lazy, Suspense } from "react";

import Login from "pages/auth/login";
import Signup from "pages/auth/signup";
import ConfirmEmail from "pages/auth/signup/confirm-email";
import LandingPage from "pages/landing";
import NotFoundPage from "components/not-found";
import ChangePassword from "pages/settings/change-password";
import { ErrorBoundary } from "react-error-boundary";
import CustomSpinner from "components/custom-spinner";

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
  changePassword: "links/change-password",
};

export const routes = (): RouterProps[] => [
  {
    path: links.home,
    element: (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Suspense fallback={<CustomSpinner />}>
          <Home />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: links.view,
    element: (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Suspense fallback={<CustomSpinner />}>
          <ViewLink />
        </Suspense>
      </ErrorBoundary>
    ),
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
    path: links.changePassword,
    element: <ChangePassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
