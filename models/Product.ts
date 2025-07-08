import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  itemCode: string;
  itemName: string;
  color: string;
  fabric: string;
  pricePerPc: number;
  pricePerSet: number;
  images: Array<{ 
    url: string; 
    alt: string; 
    isPrimary?: boolean; // Mark primary image for display
  }>;
  category: string;
  sizes: string[]; // Available sizes for the product
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
      trim: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    fabric: {
      type: String,
      required: true,
      trim: true,
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
          trim: true,
          validate: {
            validator: function(v: string) {
              return /^https?:\/\/.+/.test(v);
            },
            message: 'Image URL must be a valid HTTP/HTTPS URL'
          }
        },
        alt: {
          type: String,
          default: '',
          trim: true,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sizes: {
      type: [String],
      default: [],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0;
        },
        message: 'At least one size must be selected'
      }
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
    this.pricePerSet = Number(this.pricePerPc) * 5;
  }
  
  // Ensure at least one image is marked as primary
  if (this.images && this.images.length > 0) {
    const hasPrimary = this.images.some(img => img.isPrimary);
    if (!hasPrimary) {
      this.images[0].isPrimary = true;
    }
  }
  
  next();
});

// Virtual for getting primary image
ProductSchema.virtual('primaryImage').get(function() {
  if (this.images && this.images.length > 0) {
    return this.images.find(img => img.isPrimary) || this.images[0];
  }
  return null;
});

// Ensure virtuals are serialized
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
