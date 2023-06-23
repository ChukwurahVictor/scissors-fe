import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "services/axios/interceptor";
import Navbar from "./components/navbar"
import { routes } from "./route";

function App() {
  const routeResult = useRoutes(routes());

  return (
    <>
      <Navbar />
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Suspense fallback={<p>Something went wrong</p>}>
          {routeResult}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App
