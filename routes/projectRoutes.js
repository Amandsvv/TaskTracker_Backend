import {Router} from "express"
import {createProject, deleteProject, getUserProjects, projectById} from "../controllers/project.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();

router.route("/").post(verifyJWT,createProject);
router.route("/").get(verifyJWT,getUserProjects);
router.route("/:id").get(verifyJWT,projectById);
router.route("/:id").delete(verifyJWT,deleteProject);

export default router;
