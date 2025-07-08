import mongoose, { Schema, Document } from "mongoose";

export interface IPriority extends Document {
  priorityCode: string;
  priorityName: string;
  description: string;
  discountPercentage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PrioritySchema: Schema = new Schema(
  {
    priorityCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    priorityName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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

// Pre-remove middleware to handle cascading updates
PrioritySchema.pre("deleteOne", { document: true, query: false }, async function(next) {
  try {
    const Retailer = mongoose.model("Retailer");
    
    // Find retailers using this priority
    const retailersWithPriority = await Retailer.find({ priority: this._id });
    
    if (retailersWithPriority.length > 0) {
      // Find the default priority (or first available priority)
      const defaultPriority = await mongoose.model("Priority").findOne({ 
        _id: { $ne: this._id } 
      }).sort({ priorityCode: 1 });
      
      if (defaultPriority) {
        // Update all retailers to use the default priority
        await Retailer.updateMany(
          { priority: this._id },
          { priority: defaultPriority._id }
        );
      } else {
        // If no other priority exists, deactivate retailers
        await Retailer.updateMany(
          { priority: this._id },
          { isActive: false }
        );
      }
    }
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Pre-save middleware to handle priority code changes
PrioritySchema.pre("save", function(next) {
  // If priority code is being changed, update retailers
  if (this.isModified("priorityCode")) {
    this.wasPriorityCodeChanged = true;
  }
  next();
});

// Post-save middleware to handle priority code changes
PrioritySchema.post("save", async function() {
  if (this.wasPriorityCodeChanged) {
    try {
      const Retailer = mongoose.model("Retailer");
      // Update any retailers that might be using the old priority code
      // This is a safety measure in case there are any string-based references
      await Retailer.updateMany(
        { priority: this._id },
        { $set: { priority: this._id } }
      );
    } catch (error) {
      console.error("Error updating retailers after priority change:", error);
    }
  }
});

export default mongoose.models.Priority ||
  mongoose.model<IPriority>("Priority", PrioritySchema); 