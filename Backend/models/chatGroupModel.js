import mongoose, { set } from "mongoose";
import validate from "validator";
import slugify from "slugify";

const chatgroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the Chat Group"],
      trim: true,
      maxlength: [25, "Name should be less than or equal to 25 characters"],
      minlength: [2, "Name should be more than or equal to 2 characters"],
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    slug: String,
    users: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      required: [true, "Please enter users of group"],
      validate: {
        validator: function (el) {
          return el.length > 1;
        },
        message: "atleast 2 users should be present",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chatgroupSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const ChatGroup = mongoose.model("ChatGroup", chatgroupSchema);

export default ChatGroup;
