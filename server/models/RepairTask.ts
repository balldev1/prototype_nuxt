// งานแจ้งซ่อม;
import mongoose from "mongoose";

const RepairTaskSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillRequired: { type: String, required: true },
  requiredTechnicianCount: { type: Number, default: 1 },
  matchedTechnicians: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: [
      "pending",
      "waiting_confirm",
      "technic_cancel",
      "repair_success",
      "user_confirm_success",
    ],
    default: "pending",
  },
  confirmedAt: Date,
  repairedAt: Date,
  userConfirmedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export const RepairTask =
  mongoose.models.RepairTask || mongoose.model("RepairTask", RepairTaskSchema);
