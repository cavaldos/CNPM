import { lazy } from "react";

// Sử dụng đường dẫn tương đối thay vì alias (~)
const InstructorLayout = lazy(() => import("../components/Layout/instructor/InstructorLayout"));
const HomeInstructor = lazy(() => import("../pages/instructor/index"));
const CreateCourse = lazy(() => import("../pages/instructor/CreateCourse"));
const ManageCourses = lazy(() => import("../pages/instructor/ManageCourses"));
const UpdateCourse = lazy(() => import("../pages/instructor/UpdateCourse"));
const Messages = lazy(() => import("../pages/instructor/Messages"));
const Profile = lazy(() => import("../pages/instructor/Profile"));
const AddLessons = lazy(() => import("../pages/instructor/AddLessons"));
const DiscussionForum = lazy(() => import("../pages/instructor/DiscussionForum"));

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
    name: "Edit Course",
    icon: "",
    path: "/edit-course/:courseId",
    component: UpdateCourse,
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
  {
    name: "Discussion Forum",
    icon: "",
    path: "/discussion-forum/:courseId",
    component: DiscussionForum,
    Layout: InstructorLayout,
  },
];

export default InstructorRouter;
