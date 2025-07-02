import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  orderNumber: string;
  retailerInfo: {
    retailerId: Types.ObjectId;
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
    productId: Types.ObjectId;
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
  orderSummary: {
    totalPcs: number;
    totalSets: number;
    totalAmountBeforeGST: number;
    gstAmount: number;
    totalAmountAfterGST: number;
  };
  status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "PO_GENERATED";
  notes: string;
  submittedAt: Date;
  reviewedAt: Date;
  approvedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    retailerInfo: {
      retailerId: {
        type: Schema.Types.ObjectId,
        ref: "Retailer",
        required: true,
      },
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
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
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
          min: 0,
        },
        quantitySets: {
          type: Number,
          default: 0,
          min: 0,
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
    orderSummary: {
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
      gstAmount: {
        type: Number,
        required: true,
      },
      totalAmountAfterGST: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "PO_GENERATED"],
      default: "DRAFT",
    },
    notes: {
      type: String,
      default: "",
    },
    submittedAt: {
      type: Date,
    },
    reviewedAt: {
      type: Date,
    },
    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to calculate totals
OrderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    let totalPcs = 0;
    let totalSets = 0;
    let totalAmountBeforeGST = 0;

    this.items.forEach((item) => {
      item.totalPcs = item.quantityPcs + item.quantitySets * 5;
      item.totalAmount =
        item.quantityPcs * item.pricePerPc +
        item.quantitySets * item.pricePerSet;

      totalPcs += item.totalPcs;
      totalSets += item.quantitySets;
      totalAmountBeforeGST += item.totalAmount;
    });

    this.orderSummary = {
      totalPcs,
      totalSets,
      totalAmountBeforeGST,
      gstAmount: totalAmountBeforeGST * 0.18, // 18% GST
      totalAmountAfterGST: totalAmountBeforeGST * 1.18,
    };
  }
  next();
});

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
