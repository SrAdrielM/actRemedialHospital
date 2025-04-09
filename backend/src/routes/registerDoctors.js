import express from "express";
import registerDoctorsController from "../controllers/registerDoctorsCtrl.js";

const router = express.Router();

router.route("/")
.post(registerDoctorsController.register);

export default router;