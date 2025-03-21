import { lazy } from "react";
const GuestLayout = lazy(() => import("~/components/Layout/guest/GuestLayout"));

const HomeGuest = lazy(() => import("~/pages/guest/index"));
const CourseDetail = lazy(() => import("~/pages/guest/CourseDetail"));
import LoginPage from "../pages/guest/Login";

const GuestRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeGuest,
    Layout: GuestLayout,
    key: "header",
  },
  {
    name: "Login",
    path: "/login",
    component: LoginPage,
    Layout: null,
  },
  {
    name: "Search",
    path: "/search",
    component: HomeGuest,
    Layout: GuestLayout,
    key: "",
  },
  {
    name: "Search",
    path: "/search/:searchTerm",
    component: HomeGuest,
    Layout: GuestLayout,
    key: "",
  },
  {
    name: "Course Detail",
    path: "/course-detail",
    component: CourseDetail,
    Layout: GuestLayout,
    key: "",
  },
  {
    name: "Course Detail",
    path: "/course-detail/:courseId",
    component: CourseDetail,
    Layout: GuestLayout,
    key: "",
  },
];

export default GuestRouter;
