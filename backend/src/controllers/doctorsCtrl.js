const doctorsController = {};
import doctorsMdl from "../models/doctorsMdl.js";

//get
doctorsController.getDoctors = async (req, res) => {
    const doctors = await doctorsMdl.find()
    res.json(doctors)
}

//delete
doctorsController.deleteDoctors = async (req, res) => {
    await doctorsMdl.findByIdAndDelete(req.params.id)
    res.json({message: "Doctor deleted"})
}

//put
doctorsController.updateDoctors = async (req, res) => {
    const { name, especiality, email, password } = req.body;
    const updateDoctor = await doctorsMdl.findByIdAndUpdate(req.params.id, { name, especiality, email, password }, {new: true});
    res.json({message: "Doctor update succesfully"})
}

export default doctorsController;