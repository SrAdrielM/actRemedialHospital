import express from "express";
import patientsController from "../controllers/patientsCtrl.js";

const router = express.Router();

router.route("/")
.get(patientsController.getPatients);

router.route("/:id")
.put(patientsController.updatePatients)
.delete(patientsController.deletePatients);

export default router;