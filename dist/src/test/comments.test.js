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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const comments_modules_1 = __importDefault(require("../modules/comments_modules"));
const test_comments_json_1 = __importDefault(require("./test_comments.json"));
const user_modules_1 = __importDefault(require("../modules/user_modules"));
var app;
const testUser = {
    email: "test@user.com",
    favPat: "dog",
    password: "testpassword",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("beforeAll");
    app = yield (0, server_1.default)();
    yield comments_modules_1.default.deleteMany();
    yield user_modules_1.default.deleteMany();
    const response = yield (0, supertest_1.default)(app).post("/auth/register").send(testUser);
    const res = yield (0, supertest_1.default)(app).post("/auth/login").send(testUser);
    testUser.token = res.body.accessToken; //not as eliav did
    testUser._id = res.body._id;
    expect(testUser.token).toBeDefined();
}));
afterAll((done) => {
    console.log("afterAll");
    mongoose_1.default.connection.close();
    done();
});
let commentId = "";
describe("Comments Tests", () => {
    test("Comments test get all", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    }));
    // add a comment
    test("Test Create Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/comments").set({ authorization: "JWT " + testUser.token }).send(test_comments_json_1.default[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.userId).toBe(test_comments_json_1.default[0].userId);
        expect(response.body.postId).toBe(test_comments_json_1.default[0].postId);
        expect(response.body.commentData).toBe(test_comments_json_1.default[0].commentData);
        commentId = response.body._id;
    }));
    // get comment by id
    test("Test Get Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/comments/${commentId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.userId).toBe(test_comments_json_1.default[0].userId);
        expect(response.body.postId).toBe(test_comments_json_1.default[0].postId);
        expect(response.body.commentData).toBe(test_comments_json_1.default[0].commentData);
    }));
    // get all comments
    test("Test Get All Comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    }));
    // update comment by id
    test("Test Update Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/comments/${commentId}`).set({ authorization: "JWT " + testUser.token }).send({ commentData: "Updated Comment" });
        expect(response.statusCode).toBe(200);
        expect(response.body.commentData).toBe("Updated Comment");
    }));
    // delete comment by id
    test("Test Delete Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/comments/${commentId}`).set({ authorization: "JWT " + testUser.token });
        expect(response.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=comments.test.js.map