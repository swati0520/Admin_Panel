import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
    title : {
        type :String,
        requerd : true,
        unique : true
    },
    description : {
        type : String,
        required : false    
    },
    department : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Department", 
        required : true
    },
    status : {  
        type : String,
        enum : ["active", "inactive"],
        default : "active"
    }
}, {timestamps : true});    
const Designation = mongoose.model("Designation", designationSchema);
export default Designation;
