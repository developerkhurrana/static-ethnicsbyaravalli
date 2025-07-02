import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRetailer extends Document {
  phoneNumber: string;
  businessName: string;
  contactPerson: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  priority: "R1" | "R2" | "R3";
  gstNumber: string;
  accessibleCatalogs: Types.ObjectId[];
  isActive: boolean;
  sheetRowId: string;
  lastSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RetailerSchema: Schema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "India",
      },
    },
    priority: {
      type: String,
      enum: ["R1", "R2", "R3"],
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
    accessibleCatalogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Catalog",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    sheetRowId: {
      type: String,
      required: true,
    },
    lastSyncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Retailer ||
  mongoose.model<IRetailer>("Retailer", RetailerSchema);
