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
const user_modules_1 = __importDefault(require("../modules/user_modules"));
const test_users_json_1 = __importDefault(require("./test_users.json"));
const user_modules_2 = __importDefault(require("../modules/user_modules"));
var app;
const testUser = {
    email: "test@user.com",
    favPat: "dog",
    password: "testpassword",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("beforeAll");
    app = yield (0, server_1.default)();
    yield user_modules_1.default.deleteMany();
    yield user_modules_2.default.deleteMany();
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
let userId = "";
describe("User Tests", () => {
    //create a user
    test("Test Create User", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(test_users_json_1.default[0]);
        const response = yield (0, supertest_1.default)(app).post("/users").send(test_users_json_1.default[0]);
        console.log("response email: " + response.body.email);
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe(test_users_json_1.default[0].email);
        expect(response.body.favPat).toBe(test_users_json_1.default[0].favPat);
        expect(response.body.password).toBe(test_users_json_1.default[0].password);
        userId = response.body._id;
        console.log("userId: " + userId);
    }));
    test("User test get all", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/users");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    }));
    // add function- get user by id
    test("Test Get User by Id", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("tests userId: " + userId);
        const response = yield (0, supertest_1.default)(app).get(`/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(userId);
        expect(response.body.email).toBe(test_users_json_1.default[0].email);
        expect(response.body.favPat).toBe(test_users_json_1.default[0].favPat);
        expect(response.body.password).toBe(test_users_json_1.default[0].password);
    }));
    // update password by id
    test("Test Update Password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/users/${userId}`)
            .set({ authorization: "JWT " + testUser.token })
            .send({ password: "Updated Password" });
        expect(response.statusCode).toBe(200);
        expect(response.body.password).toBe("Updated Password");
    }));
    // update fav' pat by id
    test("Test Update Fav' Pat", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .put(`/users/${userId}`)
            .set({ authorization: "JWT " + testUser.token })
            .send({ favPat: "Updated Fav' Pat" });
        expect(response.statusCode).toBe(200);
        expect(response.body.favPat).toBe("Updated Fav' Pat");
    }));
    // delete user by id
    test("Test Delete User", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete(`/users/${userId}`)
            .set({ authorization: "JWT " + testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe(test_users_json_1.default[0].email);
        expect(response.body.favPat).toBe("Updated Fav' Pat");
        expect(response.body._id).toBe(userId);
        expect(response.body.password).toBe("Updated Password");
    }));
});
//# sourceMappingURL=users.test.js.map