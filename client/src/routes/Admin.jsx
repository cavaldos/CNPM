import { lazy } from "react";
const AdminLayout = lazy(() => import("~/components/Layout/admin/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
import ManagerCourse from '../pages/admin/ManagerCourse';
const AdminRouter = [
  {
    name: "Home",
    icon: "",
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },

  {
    name: "Manager Course",
    icon: "",
    path: "/manager-course",
    component: ManagerCourse,
    Layout: AdminLayout,
  },
];

export default AdminRouter;

