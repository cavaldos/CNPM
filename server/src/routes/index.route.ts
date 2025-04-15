import { Router } from "express";
import MainRouter from "../api/routes";
import DomainRouter from "../modules/domain.route";

const router = Router();


router.use(MainRouter);
// Mount Domain routes
router.use("/apiv2", DomainRouter);

export default router;