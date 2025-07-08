import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRetailer extends Document {
  phoneNumber: string;
  contactPerson: string;
  businessName: string;
  priorities: Types.ObjectId[]; // Now supports multiple priorities
  accessibleCatalogs: Types.ObjectId[];
  address: {
    city: string;
  };
  isActive: boolean;
}

const RetailerSchema: Schema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: { 
      type: String,
      required: true,
      trim: true,
    },
    priorities: [{
      type: Schema.Types.ObjectId,
      ref: "Priority",
      required: false, // allow empty for migration
    }],
    accessibleCatalogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Catalog",
        required: true,
      },
    ],
    address: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Retailer ||
  mongoose.model<IRetailer>("Retailer", RetailerSchema);
