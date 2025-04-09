import express from "express";
import cookieParser from "cookie-parser";

import doctorsRouter from "./src/routes/doctors.js"
import patientsRouter from "./src/routes/patients.js"
import quotesRouter from "./src/routes/quotes.js"

import loginRoute from "./src/routes/login.js"
import registerDoctorsRouter from "./src/routes/registerDoctors.js"
import registerPatientsRouter from "./src/routes/registerPatients.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/doctors", doctorsRouter)
app.use("/api/patients", patientsRouter)
app.use("/api/quotes", quotesRouter)
app.use("/api/login", loginRoute)
app.use("/api/registerDoctors", registerDoctorsRouter)
app.use("/api/registerPatients", registerPatientsRouter)

export default app;
