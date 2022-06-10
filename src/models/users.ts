import { Schema, Model, SchemaTypes, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    role: {
      type: SchemaTypes.String,
      required: true,
    },
    limit: {
      type: SchemaTypes.Number,
      min: 0,
      default: 2100,
    },
    tokens: [{
          type: SchemaTypes.String,
          required: true
      },
    ],
    foodEntrys: [{
      type: SchemaTypes.ObjectId,
      ref: "FoodEntry",
    }],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "c-t-user");

  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  console.log(email);
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Account Not Found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }
  return user;
};

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  console.log("About to save");
});

const UserModel = model<any, any>("User", UserSchema);
export default UserModel;
