"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_modules_1 = __importDefault(require("../modules/user_modules"));
// Create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_modules_1.default(req.body);
        yield user.save();
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//Read (get) user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id; // returns mail instead of id
    try {
        const user = yield user_modules_1.default.findById(userId);
        if (user != null)
            res.send(user);
        else
            res.status(400).send("user not found");
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Update Password by id
const updatePasswordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedUser = yield user_modules_1.default.findOneAndUpdate({ _id: id }, updatedData, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(updatedUser);
    }
    catch (error) {
        res.status(400);
    }
});
// Update fav' pat by id
const updateFavPatById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedUser = yield user_modules_1.default.findOneAndUpdate({ _id: id }, updatedData, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(updatedUser);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Delete user by id
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_modules_1.default.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_modules_1.default.find();
        res.send(users);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.default = { createUser, getUserById, updatePasswordById, updateFavPatById, deleteUserById, getAllUsers };
//# sourceMappingURL=users_controller.js.map