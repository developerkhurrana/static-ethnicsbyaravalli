import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICatalog extends Document {
  catalogName: string;
  catalogCode: string;
  products: Array<{ productId: Types.ObjectId; isActive: boolean }>;
  accessLevel: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CatalogSchema: Schema = new Schema(
  {
    catalogName: {
      type: String,
      required: true,
    },
    catalogCode: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
    accessLevel: {
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

export default mongoose.models.Catalog ||
  mongoose.model<ICatalog>("Catalog", CatalogSchema);
