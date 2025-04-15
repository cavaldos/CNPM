import { lazy } from "react";
const AdminLayout = lazy(() => import("~/components/Layout/admin/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
import ManagerCourse from '../pages/admin/ManagerCourse';
import ManagerUser from '../pages/admin/ManagerUser';
import RevenueStats from '../pages/admin/RevenueStats';
const AdminRouter = [
  {
    name: "Dashboard",
    icon: "",
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },

  {
    name: "Revenue Statistics",
    icon: "",
    path: "/revenue-stats",
    component: RevenueStats,
    Layout: AdminLayout,
  },

  {
    name: "Manager Course",
    icon: "",
    path: "/manager-course",
    component: ManagerCourse,
    Layout: AdminLayout,
  },

  {
    name: "Manager User",
    icon: "",
    path: "/manager-user",
    component: ManagerUser,
    Layout: AdminLayout,
  },
];

export default AdminRouter;

