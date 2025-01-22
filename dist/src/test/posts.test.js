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
const post_modules_1 = __importDefault(require("../modules/post_modules"));
const test_posts_json_1 = __importDefault(require("./test_posts.json"));
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
    yield post_modules_1.default.deleteMany();
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
let postId = "";
describe("Posts Tests", () => {
    test("Posts test get all", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    }));
    test("Test Create Post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/posts")
            .set({ authorization: "JWT " + testUser.token })
            .send(test_posts_json_1.default[0]);
        expect(response.statusCode).toBe(200);
        expect(response.body.postData).toBe(test_posts_json_1.default[0].postData);
        expect(response.body.senderId).toBe(test_posts_json_1.default[0].senderId);
        postId = response.body._id;
    }));
    // get all posts
    test("Test Get All Posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    }));
    // get a post by senderId
    test("Test get post by senderId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/posts/filter?senderId=${test_posts_json_1.default[0].senderId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].senderId).toBe(test_posts_json_1.default[0].senderId);
        expect(response.body[0].postData).toBe(test_posts_json_1.default[0].postData);
    }));
    // get post by id
    test("Test Get Post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/posts/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.postData).toBe(test_posts_json_1.default[0].postData);
        expect(response.body.senderId).toBe(test_posts_json_1.default[0].senderId);
    }));
    //update post by id
    test("Test Update Post", () => __awaiter(void 0, void 0, void 0, function* () {
        //if we didnt have the token we would get 401
        const response1 = yield (0, supertest_1.default)(app).put(`/posts/${postId}`).set({}).send({ postData: "Updated Post" });
        expect(response1.statusCode).not.toBe(200);
        //if we had the token we would get 200
        const response2 = yield (0, supertest_1.default)(app).put(`/posts/${postId}`).set({ authorization: "JWT " + testUser.token }).send({ postData: "Updated Post" });
        expect(response2.statusCode).toBe(200);
        expect(response2.body.postData).toBe("Updated Post");
    }));
    // delete posts
    test("Test Delete Posts", () => __awaiter(void 0, void 0, void 0, function* () {
        //if we didnt have the token we would get 401
        const response = yield (0, supertest_1.default)(app).delete("/posts").set({});
        expect(response.statusCode).not.toBe(200);
        //if we had the token we would get 200
        const response2 = yield (0, supertest_1.default)(app).delete("/posts").set({ authorization: "JWT " + testUser.token });
        expect(response2.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=posts.test.js.map