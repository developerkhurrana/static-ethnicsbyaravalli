import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  images: Array<{ url: string; alt: string }>;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    itemCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      required: true,
    },
    pricePerPc: {
      type: Number,
      required: true,
      min: 0,
    },
    pricePerSet: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: true,
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

// Pre-save middleware to calculate pricePerSet if not provided
ProductSchema.pre("save", function (next) {
  if (!this.pricePerSet && this.pricePerPc) {
    this.pricePerSet = this.pricePerPc * 5;
  }
  next();
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
