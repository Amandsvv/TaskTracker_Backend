import {Router} from "express"
import { loggedInUser, login, logOut, signup } from "../controllers/auth.controlers.js";
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.get("/check-auth", (req, res, next) => {
    console.log("✅ /check-auth route hit");
    next();
  }, verifyJWT, loggedInUser);
  
router.route("/logout").post(verifyJWT,logOut)

export default router;

