import express from "express";
import quotesController from "../controllers/quotesCtrl.js";

const router = express.Router();

router.route("/")
.get(quotesController.getQuotes)
.post(quotesController.insertQuotes)

router.route("/:id")
.put(quotesController.updateQuotes)
.delete(quotesController.deleteQuotes);

export default router;