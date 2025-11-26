import { Router } from "express";
import { getQueryHandler } from "../controllers/query.controller.js";

const router = Router();

router.route("/query").get(getQueryHandler);

export default router