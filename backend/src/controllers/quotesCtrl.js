const quotesController = {};
import quotesMdl from "../models/quotesMdl.js";

//get
quotesController.getQuotes = async (req, res) => {
    const quotes = await quotesMdl.find().populate("doctorId").populate("patientId")
    res.json(quotes)
}

//insert
quotesController.insertQuotes = async (req, res) => {
    const { date, hour, reason, doctorId, patientId } = req.body;
    const newQuote = new quotesMdl ({ date, hour, reason, doctorId, patientId })
    await newQuote.save()
    res.json({message: "Quote saved"})
}

//delete
quotesController.deleteQuotes = async (req, res) => {
    await quotesMdl.findByIdAndDelete(req.params.id)
    res.json({message: "Quote deleted"})
}

//put
quotesController.updateQuotes = async (req, res) => {
    const { date, hour, reason, doctorId, patientId } = req.body;
    const updateQuotes = await quotesMdl.findByIdAndUpdate(req.params.id, { date, hour, reason, doctorId, patientId }, {new: true});
    res.json({message: "Quote update succesfully"})
}

export default quotesController;