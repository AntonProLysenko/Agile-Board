const { Schema, model} = require("./connection");
const bcrypt = require("bcrypt");

//The SALT_ROUNDS variable determines how much processing time it will take to perform the hash
const SALT_ROUNDS = 6;
const userSchema = Schema({
 name: {type: String, required: true, trim: true,},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },
},
  {
    timestamps: true,
    toJSON: {//we need to return data in json because on responce we need to delete the password
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

//Middleware that will hash the password anytime the password has changed
userSchema.pre('save', async function(next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});



module.exports = model("User", userSchema);