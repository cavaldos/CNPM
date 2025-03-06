// khach hang

import { lazy } from "react";

const StudentLayout = lazy(() =>
  import("~/components/Layout/student/StudentLayout")
);
const HomeStudent = lazy(() => import("~/pages/student/index"));
const MyLearningPage = lazy(() => import("~/pages/student/MyLearning"));
const HelpCenterPage = lazy(() => import("~/pages/student/HelpCenter"));
const CourseDetailPage = lazy(() => import("~/pages/student/CourseDetail"));
const LearningPage = lazy(() => import("~/pages/student/Learning"));
const CourseInfoPage = lazy(() => import("~/pages/student/CourseInfo"));

import CourseMaterialPage from "../pages/student/CourseMaterial";
import DiscussionForumsPage from "../pages/student/DiscussionForum";
import MessagesPage from "../pages/student/Messages";
import CourseInfo from "../pages/student/CourseInfo";
import { Layout } from "antd";
import CourseDetail from "./../pages/student/CourseDetail";

const StudentRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeStudent,
    Layout: StudentLayout,
    key: "header",
  },
  {
    name: "Course Detail",
    path: "/course-detail",
    component: CourseDetailPage,
    Layout: StudentLayout,
    key: "header",
  },
  {
    name: "My Learning",
    path: "/my-learning-progress",
    component: MyLearningPage,
    Layout: StudentLayout,
    key: "header",
  },

  {
    name: "Learning",
    path: "/learning",
    component: LearningPage,
    Layout: StudentLayout,
    key: "header",
  },
  {
    name: "Course Material",
    path: "/course-material",
    component: CourseMaterialPage,
    Layout: StudentLayout,
    key: "",
  },

  {
    name: "Discussion Forums",
    path: "/learning/discussion-forums",
    component: DiscussionForumsPage,
    Layout: StudentLayout,
    key: "",
  },
  {
    name: "Messages",
    path: "/learning/messages",
    component: MessagesPage,
    Layout: StudentLayout,
    key: "",
  },
  {
    name: "Course Info",
    path: "/learning/info",
    component: CourseInfo,
    Layout: StudentLayout,
    key: "",
  },

  {
    name: "Help Center",
    path: "/help-center",
    component: HelpCenterPage,
    Layout: null,
    key: "", // This route won't appear in the header
  },
];

export default StudentRouter;
