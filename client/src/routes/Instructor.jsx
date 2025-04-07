import { lazy } from "react";
import {
  HomeIcon,
  PlusCircleIcon,
  LayersIcon,
  EditIcon,
  MessageCircleIcon,
  UserIcon,
  MessageSquareIcon
} from "lucide-react";

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
const CourseReport = lazy(() => import("../pages/instructor/CourseReport"));

const InstructorRouter = [
  {
    name: "Home",
    icon: HomeIcon,
    path: "/",
    key: "sidebar",
    component: HomeInstructor,
    Layout: InstructorLayout,
  },
  {
    name: "Create Course",
    icon: PlusCircleIcon,
    path: "/create-course",
    key: "sidebar",
    component: CreateCourse,
    Layout: InstructorLayout,
  },
  {
    name: "Add Lessons",
    icon: LayersIcon,
    path: "/courses/:courseId/add-lessons",
    key: "",
    component: AddLessons,
    Layout: InstructorLayout,
  },
  {
    name: "My Courses",
    icon: LayersIcon,
    path: "/my-courses",
    key: "sidebar",
    component: ManageCourses,
    Layout: InstructorLayout,
  },
  {
    name: "Edit Course",
    icon: EditIcon,
    path: "/courses/:courseId/update",
    component: UpdateCourse,
    Layout: InstructorLayout,
  },
  {
    name: "Messages",
    icon: MessageCircleIcon,
    path: "/messages",
    key: "sidebar",
    component: Messages,
    Layout: InstructorLayout,
  },
  {
    name: "Profile",
    icon: UserIcon,
    path: "/profile",
    key: "sidebar",
    component: Profile,
    Layout: InstructorLayout,
  },
  {
    name: "Discussion Forum",
    icon: MessageSquareIcon,
    path: "/discussion-forum/:courseId",
    key: "",
    component: DiscussionForum,
    Layout: InstructorLayout,
  },
  {
    name: "Course Report",
    icon: EditIcon,
    path: "/courses/:courseId/report",
    component: CourseReport,
    Layout: InstructorLayout,
  },
];

export default InstructorRouter;
