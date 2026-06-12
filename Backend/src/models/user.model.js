import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: false,
    },
    role:{
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    try{
        if (!this.isModified("password")) return;
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return;
    }catch(error){
        console.log(error);
        throw new Error("Error hashing password")
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);

export default userModel;
