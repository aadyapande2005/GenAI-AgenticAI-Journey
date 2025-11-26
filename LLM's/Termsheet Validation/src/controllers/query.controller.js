import Termsheet from "../models/termsheets.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import validateTermsheet from "./gemma3.controller.js";


const getQueryHandler = asyncHandler ( async (req, res) => {
    const company = req.query.name

    const foundCompany = await Termsheet.find({Issuer : company})
    const validation = await validateTermsheet(foundCompany)

    if (!foundCompany) {
        return res.status(404).json({ message: "Query not found" });
    }
    
    res.status(200).json(validation);
})

export { getQueryHandler };