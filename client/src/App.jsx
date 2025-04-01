import {
  AdminRouter,
  GuestRouter,
  StudentRouter,
  InstructorRouter,
} from "./routes";

import { useSelector } from "react-redux";
import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotfoundError from "./components/ui/utilize/err";
import Loading from "./components/ui/utilize/Loading";
function App() {
  const user = useSelector((state) => state.auth);
  const verifyRole = () => {
    if (user.Role === "Student") {
      return StudentRouter;
    } else if (user.Role === "Admin") {
      return AdminRouter;
    } else if (user.Role === "Instructor") {
      return InstructorRouter;
    } else {
      return GuestRouter;
    }
  }

  return (
    <Router>
      {/* <Suspense fallback={<Loading />}> */}
        <Routes>
        {verifyRole().map((route, index) => {
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
      {/* </Suspense> */}
    </Router>
  );
}

export default App;
