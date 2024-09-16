import mongoose from 'mongoose';

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);
export default mongoose.model('PdfDetails', PdfDetailsSchema); 
