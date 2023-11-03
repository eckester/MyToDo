import mongoose from "mongoose";

const {Schema} = mongoose;

const toDoSchema = new Schema ({ 
 
    task: {
        type: String,
        required: true, 
    },
    category: { // create categories for school i.e. class type?
        type: String,
        required: true, 
        enum: ['school', 'work', 'other'],
    }, 
    due: { 
        type: Date,
        default: Date.now,
        required: true,
    },
    priority: {
        type: String,
        default: 'none',
        enum: ['low', 'medium', 'high', 'none']
    },
    status: {
        type: Boolean,
        default: false
        // false if not done, true if done
    },
    notes: {
        type: String,
        required: false,
    },
}, 
{ virtuals: {
    isOverdue: {
        get() {
            const currentDate = new Date();
            return !this.status && this.due > currentDate;
        }
    }
},},

{ collection: "toDoList" }

); 

const ToDo = mongoose.model("ToDoList", toDoSchema);

export default ToDo;
