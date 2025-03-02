
import { lazy } from "react";
const InstructorLayout = lazy(() => import("~/components/Layout/instructor/InstructorLayout"));
const HomeInstructor = lazy(() => import("~/pages/instructor/index"));


const InstructorRouter = [
  {
    name: "Home",
    icon: "",
    path: "/",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
  {
    name: "page2",
    icon: "",
    path: "/page2",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
];

export default InstructorRouter;
