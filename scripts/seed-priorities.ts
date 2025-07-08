import dbConnect from "../lib/mongodb";
import Priority from "../models/Priority";

async function seedPriorities() {
  try {
    await dbConnect();

    const priorities = [
      {
        priorityCode: "R1",
        priorityName: "High Priority",
        description: "Premium retailers with high order volumes",
        discountPercentage: 5,
      },
      {
        priorityCode: "R2",
        priorityName: "Medium Priority",
        description: "Regular retailers with moderate order volumes",
        discountPercentage: 3,
      },
      {
        priorityCode: "R3",
        priorityName: "Low Priority",
        description: "New or small retailers",
        discountPercentage: 0,
      },
    ];

    for (const priorityData of priorities) {
      const existingPriority = await Priority.findOne({ priorityCode: priorityData.priorityCode });
      
      if (!existingPriority) {
        const priority = new Priority(priorityData);
        await priority.save();
        console.log(`Created priority: ${priorityData.priorityCode}`);
      } else {
        console.log(`Priority ${priorityData.priorityCode} already exists`);
      }
    }

    console.log("Priority seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding priorities:", error);
    process.exit(1);
  }
}

seedPriorities(); 