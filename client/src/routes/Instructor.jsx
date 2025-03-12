import { lazy } from "react";

// Sử dụng đường dẫn tương đối thay vì alias (~)
const InstructorLayout = lazy(() => import("../components/Layout/instructor/InstructorLayout"));
const HomeInstructor = lazy(() => import("../pages/instructor/index"));
const CreateCourse = lazy(() => import("../pages/instructor/CreateCourse"));
const ManageCourses = lazy(() => import("../pages/instructor/ManageCourses"));
const Messages = lazy(() => import("../pages/instructor/Messages"));
const Profile = lazy(() => import("../pages/instructor/Profile"));
const AddLessons = lazy(() => import("../pages/instructor/AddLessons"));

const InstructorRouter = [
  {
    name: "Home",
    icon: "",
    path: "/",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
  {
    name: "Create Course",
    icon: "",
    path: "/create-course",
    component: CreateCourse,
    Layout: InstructorLayout,
  },
  {
    name: "Add Lessons",
    icon: "",
    path: "/courses/:courseId/lessons",
    component: AddLessons,
    Layout: InstructorLayout,
  },
  {
    name: "My Courses",
    icon: "",
    path: "/my-courses",
    component: ManageCourses,
    Layout: InstructorLayout,
  },
  {
    name: "Messages",
    icon: "",
    path: "/messages",
    component: Messages,
    Layout: InstructorLayout,
  },
  {
    name: "Profile",
    icon: "",
    path: "/profile",
    component: Profile,
    Layout: InstructorLayout,
  },
];

export default InstructorRouter;
