import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createTask,deleteTask,getTasksByProject,updateTask } from "../controllers/task.controllers.js";

const router = Router();

router.route("/").post(verifyJWT,createTask);
router.route("/:projectId").get(verifyJWT,getTasksByProject);
router.route("/:id").put(verifyJWT,updateTask);
router.route("/:id").delete(verifyJWT,deleteTask);

export default router;