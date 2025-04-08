const patientsController = {};
import patientsMdl from "../models/patientsMdl.js";

//get
patientsController.getPatients = async (req, res) => {
    const patients = await patientsMdl.find()
    res.json(patients)
}

//delete
patientsController.deletePatients = async (req, res) => {
    await patientsMdl.findByIdAndDelete(req.params.id)
    res.json({message: "Patient deleted"})
}

//put
patientsController.updatePatients = async (req, res) => {
    const { name, age, email, password, telephone, isVerified } = req.body;
    const updatePatients = await patientsMdl.findByIdAndUpdate(req.params.id, { name, age, email, password, telephone, isVerified }, {new: true});
    res.json({message: "Patient update succesfully"})
}

export default patientsController;