
import { lazy } from "react";
const InstructorLayout = lazy(() => import("~/components/Layout/InstructorLayout"));
const HomeInstructor = lazy(() => import("~/pages/instructor/index"));


const InstructorRouter = [
  {
    name: "Home",
    icon: "",
    path: "/",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
];

export default InstructorRouter;
