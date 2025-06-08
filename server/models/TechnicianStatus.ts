// ตรวจสอบสถานะของช่าง (ว่าง/ไม่ว่าง)
import mongoose from "mongoose";

const TechnicianStatusSchema = new mongoose.Schema({
  technicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  available: { type: Boolean, default: true },
  currentTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RepairTask",
    default: null,
  },
  updatedAt: { type: Date, default: Date.now },
});

export const TechnicianStatus =
  mongoose.models.TechnicianStatus ||
  mongoose.model("TechnicianStatus", TechnicianStatusSchema);
