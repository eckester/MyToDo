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
        enum: ['School', 'Work', 'Other'],
    }, 
    due: { 
        type: Date,
        default: Date.now,
        required: true,
    },
    priority: {
        type: String,
        default: 'None',
        enum: ['Low', 'Medium', 'High', 'None'],
    },
    status: {
        type: Boolean,
        default: false,
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
