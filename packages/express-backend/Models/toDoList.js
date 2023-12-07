import mongoose from "mongoose";

const { Schema } = mongoose;

const toDoSchema = new Schema(
  {
    task: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ["School", "Work", "Other"]
    },
    due: {
      type: Date,
      default: () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to midnight
        return currentDate;
      },
      required: false
    },
    priority: {
      type: String,
      default: "None",
      enum: ["Low", "Medium", "High", "None"]
    },
    status: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      required: false
    },
    user: {
      type: Number,
      required: false
    }
  },
  {
    virtuals: {
      isOverdue: {
        get() {
          const currentDate = new Date();
          return !this.status && this.due > currentDate;
        }
      }
    }
  },

  { collection: "toDoList" }
);

const toDoModel = mongoose.model("toDoList", toDoSchema);

export default toDoModel;
