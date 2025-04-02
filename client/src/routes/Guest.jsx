import { lazy } from "react";
const GuestLayout = lazy(() => import("~/components/Layout/guest/GuestLayout"));

const HomeGuest = lazy(() => import("~/pages/guest/index"));
const CourseDetail = lazy(() => import("~/pages/guest/CourseDetail"));
const LoginPage = lazy(() => import("~/pages/guest/Login"));
import TestChatPage from "../pages/TChatPage";
const SetRole = lazy(() => import("~/pages/guest/SetRole"));
const AdminLogin = lazy(() => import("~/pages/guest/AdminLogin"));
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
    name: "Set Role",
    path: "/set-role",
    component: SetRole,
    Layout: null
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
  {
    name: "Admin Login",
    path: "/admin-login",
    component: AdminLogin,
    Layout: null,
    
  },
  {

    name: "New Route",
    path: "/test",
    component: TestChatPage,
    Layout: GuestLayout,
    key: "new-route",
  }
];

export default GuestRouter;
