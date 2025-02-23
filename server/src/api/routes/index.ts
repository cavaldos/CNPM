import AdminRouter from "./Admin.route";
import StudentRouter from "./Student.route";
import InstructorRouter from "./Instructor.route";

import { Router } from "express";


const MainRoute = Router();

MainRoute.use("/admin", AdminRouter);
MainRoute.use("/student", StudentRouter);
MainRoute.use("/instructor", InstructorRouter);

export default MainRoute;