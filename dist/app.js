"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Ophir Segal 324023894
//Lin Tibi 318232139
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT;
(0, server_1.default)().then((app) => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});
//# sourceMappingURL=app.js.map