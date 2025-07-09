import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPurchaseOrder extends Document {
  poNumber: string;
  orderId: Types.ObjectId;
  retailerInfo: {
    phoneNumber: string;
    businessName: string;
    contactPerson: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
  };
  items: Array<{
    itemCode: string;
    itemName: string;
    color: string;
    fabric: string;
    pricePerPc: number;
    pricePerSet: number;
    quantityPcs: number;
    quantitySets: number;
    totalPcs: number;
    totalAmount: number;
  }>;
  poSummary: {
    totalPcs: number;
    totalSets: number;
    totalAmountBeforeGST: number;
    gstRate: number;
    gstAmount: number;
    totalAmountAfterGST: number;
  };
  terms: {
    paymentTerms: string;
    deliveryTerms: string;
    warranty: string;
  };
  pdfUrl: string;
  status: "GENERATED" | "SENT" | "ACKNOWLEDGED";
  generatedBy: string;
  sentAt: Date;
  createdAt: Date;
  updatedAt: Date;

}

const PurchaseOrderSchema: Schema = new Schema(
  {
    poNumber: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    retailerInfo: {
      phoneNumber: {
        type: String,
        required: true,
      },
      businessName: {
        type: String,
        required: true,
      },
      contactPerson: {
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
    },
    items: [
      {
        itemCode: {
          type: String,
          required: true,
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
        },
        pricePerSet: {
          type: Number,
          required: true,
        },
        quantityPcs: {
          type: Number,
          default: 0,
        },
        quantitySets: {
          type: Number,
          default: 0,
        },
        totalPcs: {
          type: Number,
          required: true,
        },
        totalAmount: {
          type: Number,
          required: true,
        },
      },
    ],
    poSummary: {
      totalPcs: {
        type: Number,
        required: true,
      },
      totalSets: {
        type: Number,
        required: true,
      },
      totalAmountBeforeGST: {
        type: Number,
        required: true,
      },
      gstRate: {
        type: Number,
        default: 18,
      },
      gstAmount: {
        type: Number,
        required: true,
      },
      totalAmountAfterGST: {
        type: Number,
        required: true,
      },
    },
    terms: {
      paymentTerms: {
        type: String,
        default: "50% advance, 50% before delivery",
      },
      deliveryTerms: {
        type: String,
        default: "15-20 days from order confirmation",
      },
      warranty: {
        type: String,
        default: "No warranty on ethnic wear",
      },
    },
    pdfUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["GENERATED", "SENT", "ACKNOWLEDGED"],
      default: "GENERATED",
    },
    generatedBy: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PurchaseOrder ||
  mongoose.model<IPurchaseOrder>("PurchaseOrder", PurchaseOrderSchema);
