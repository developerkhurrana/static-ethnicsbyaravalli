// This file ensures all models are registered in the correct order
// Import models that don't depend on other models first
import "@/models/Priority";
import "@/models/Catalog";
import "@/models/Product";

// Then import models that depend on the above
import "@/models/Retailer";
import "@/models/Order";
import "@/models/PurchaseOrder";

// Export a function to ensure models are loaded
export function ensureModelsLoaded() {
  // This function doesn't need to do anything, just importing the models
  // ensures they're registered with Mongoose
} 