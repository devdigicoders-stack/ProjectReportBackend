import mongoose from 'mongoose';

const StudentFormSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    projectId: { type: String },
    personalDetails: {
      name: { type: String },
      enrollmentNumber: { type: String },
      email: { type: String },
      phone: { type: String },
      certificateNumber: { type: String },
      certificateImage: { url: { type: String }, public_id: { type: String } },
    },
    collegeInfo: {
      collegeName: { type: String },
      collegeLogo: { url: { type: String }, public_id: { type: String } },
      TeacherName: { type: String },
      course: { type: String },
      branch: { type: String },
      session: { type: String },
    },
    projectDetails: {
      projectName: { type: String },
      projectTitle: { type: String },
      TrainingType: { type: String },
      TeamName: { type: String },
      StartDate: { type: String },
      EndDate: { type: String },
      backendTechnology: { type: String },
      frontendTechnology: { type: String },
      database: { type: String },
      duration: { type: String },
    },
    projectAssets: {
      projectCode: [{ type: String }],
      uiScreenshots: [{ url: { type: String }, public_id: { type: String } }],
      dfdDiagram: { url: { type: String }, public_id: { type: String } },
      erDiagram: { url: { type: String }, public_id: { type: String } },
    },
    currentStep: { type: Number, default: 1 },
    isPrint: { type: Number, default: 0 },
    pdfSendStudent: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ["draft", "new", "accept", "reject", "requestForPrint", "isSendToPrint", "printed", "isSendToStudent"], 
      default: "draft" 
    },
    submittedAt: { type: Date },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for better query performance
StudentFormSchema.index({ userId: 1 });
StudentFormSchema.index({ status: 1 });
StudentFormSchema.index({ projectId: 1 });
StudentFormSchema.index({ 'personalDetails.email': 1 });
StudentFormSchema.index({ 'collegeInfo.collegeName': 1 });
StudentFormSchema.index({ createdAt: -1 });

const StudentForm = mongoose.model('StudentForm', StudentFormSchema);

export default StudentForm;