// ประวัติการเปลี่ยนสถานะงาน;
import mongoose from "mongoose";

const RepairTaskLogSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RepairTask",
    required: true,
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromStatus: { type: String, required: true },
  toStatus: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String },
});

export const RepairTaskLog =
  mongoose.models.RepairTaskLog ||
  mongoose.model("RepairTaskLog", RepairTaskLogSchema);
