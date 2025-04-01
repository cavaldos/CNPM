import { lazy } from "react";
const AdminLayout = lazy(() => import("~/components/Layout/admin/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));

const AdminRouter = [
  {
    name: "Home",
    icon: "",
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },

];

export default AdminRouter;

