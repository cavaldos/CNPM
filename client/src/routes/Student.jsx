import { lazy } from "react";

const StudentLayout = lazy(() =>
  import("../components/Layout/student/StudentLayout")
);
const HomeStudent = lazy(() => import("../pages/student/index"));
const MyLearningPage = lazy(() => import("../pages/student/MyLearning"));
const HelpCenterPage = lazy(() => import("../pages/student/HelpCenter"));
const CourseDetailPage = lazy(() => import("../pages/student/CourseDetail"));
const LearningPage = lazy(() => import("../pages/student/Learning"));
const DiscussionForumsPage = lazy(() => import("../pages/student/Forum"));
const MessagesPage = lazy(() => import("../pages/student/Messages"));
const TestPage = lazy(() => import("../pages/test"));

const StudentRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeStudent,
    Layout: StudentLayout,
    key: "header",
  },
  {
    name: "Search",
    path: "/search",
    component: HomeStudent,
    Layout: StudentLayout,
    key: "",
  },
  {
    name: "Search",
    path: "/search/:searchTerm",
    component: HomeStudent,
    Layout: StudentLayout,
    key: "",
  },
  {
    name: "Course Detail",
    path: "/course-detail",
    component: CourseDetailPage,
    Layout: StudentLayout,
    key: "header",
  },
  {
    name: "Course Detail",
    path: "/course-detail/:courseId",
    component: CourseDetailPage,
    Layout: StudentLayout,
    key: "",
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
    name: "Learning",
    path: "/learning/:lessonId",
    component: LearningPage,
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
    name: "Help Center",
    path: "/help-center",
    component: HelpCenterPage,
    Layout: null,
    key: "" // This route won't appear in the header
  },
  {
    name: "Tesst",
    path: "/test",
    component: TestPage,
    Layout: StudentLayout,
    key: "header" // This route won't appear in the header
  },
  {
    name: "Discussion Forum",
    path: "/discussion-forum/:courseId",
    component: DiscussionForumsPage,
    Layout: StudentLayout,
    key: "",
  },
];

export default StudentRouter;
