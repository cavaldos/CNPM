import { lazy } from "react";
const GuestLayout = lazy(() => import("~/components/Layout/GuestLayout"));
const HomeGuest = lazy(() => import("~/pages/guest/index"));
const GuestRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeGuest,
    Layout: GuestLayout,
  },
];

export default GuestRouter;
