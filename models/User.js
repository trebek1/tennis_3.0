const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  passwordDigest: String
});

userSchema.methods.checkPassword = password =>
  bcrypt.compareSync(password, this.passwordDigest);

userSchema.statics.createSecure = function(username, password, cb) {
  let that = this;
  bcrypt.genSalt((err, salt) =>
    bcrypt.hash(password, salt, (err, hash) =>
      that.create(
        {
          username: username,
          passwordDigest: hash
        },
        cb
      )
    )
  );
};

userSchema.statics.encryptPassword = password =>
  bcrypt.hashSync(password, salt);

userSchema.statics.authenticate = (username, password, cb) =>
  this.find(
    {
      username: username
    },
    function(err, user) {
      if (user.length === 0) {
        return cb("no username in database");
      } else if (user[0].checkPassword(password)) {
        cb(null, user[0]);
      } else {
        return cb("incorrect password");
      }
    }
  );

module.exports = mongoose.model("User", userSchema);
