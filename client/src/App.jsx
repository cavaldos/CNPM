import {
  AdminRouter,
  GuestRouter,
  StudentRouter,
  InstructorRouter,
} from "./routes";


import React, { Fragment, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotfoundError from "./components/ui/utilize/err";
import Loading from "./components/ui/utilize/Loading";
function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {GuestRouter.map((route, index) => {
            const Layout = route.Layout === null ? Fragment : route.Layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route
            path="*"
            element={
              <Fragment>
                <NotfoundError />
              </Fragment>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
