import mongoose, { Document, Schema, Types } from "mongoose";

interface IAccount extends Document {
  user_id: Types.ObjectId;
  account_id: string;
}

const AccountSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account_id: {
    type: String,
    required: true,
    unique: true,
  },
});

const AccountModel = mongoose.model<IAccount>("Account", AccountSchema);

export default AccountModel;
