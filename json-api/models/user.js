// const { Schema, model} = require("./connection");

// const userSchema = Schema(
//   {
//     userName: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       trim: true,
//       minLength: 3,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//     transform: function(doc, ret) {
//       delete ret.password;
//       return ret;
//     }
//   }
// });


// userSchema.pre("save", async function (next) {
//   // 'this' is the user doc
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
//   return next();
// });



// module.exports = model("User", userSchema);