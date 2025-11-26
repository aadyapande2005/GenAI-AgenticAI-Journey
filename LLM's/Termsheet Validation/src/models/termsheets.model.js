import mongoose from "mongoose";

const termsheetSchema = new mongoose.Schema({}, { strict: false, collection: 'sample_data' })

const Termsheet = mongoose.model('Termsheet', termsheetSchema)

export default Termsheet