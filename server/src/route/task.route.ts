import { Router } from "express";
import { addTask, getTasks } from "../controller/task.controller";
const router = Router();

router.route("/").post(addTask);
router.route("/:userId").get(getTasks);
export default router;
