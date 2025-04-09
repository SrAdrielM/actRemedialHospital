import express from "express";
import registerPatientsController from "../controllers/registerPatientsCtrl.js";

const router = express.Router();

router.route("/")
.post(registerPatientsController.register);

export default router;