const { Schema, mongoose } = require("mongoose");

//making connection with Mongo DB
mongoose.connect(process.env.MONGO_DB_URL);

//Schemas

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
});

const accountSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", accountSchema);

module.exports = {
  User,
  Accounts,
};
