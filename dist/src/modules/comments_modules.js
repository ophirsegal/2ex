"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    commentData: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
});
const commentsModel = mongoose_1.default.model("Comments", commentSchema);
exports.default = commentsModel;
//# sourceMappingURL=comments_modules.js.map