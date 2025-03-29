import { lazy } from "react";
const AdminLayout = lazy(() => import("~/components/Layout/admin/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
const UserManagement = lazy(() => import("~/pages/admin/AdminManageUsers"));
const AdminRouter = [
  {
    name: "Home",
    icon: "",
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },
  {
    name: "UserManagement",
    icon: "",
    path: "/user-management",
    component: UserManagement,
    Layout: AdminLayout,
  },
];

export default AdminRouter;
