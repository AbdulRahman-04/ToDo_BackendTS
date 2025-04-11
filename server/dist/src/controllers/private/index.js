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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../../middleware/multer"));
const uploadCloudinary_1 = require("../../utils/uploadCloudinary");
const Todos_1 = __importDefault(require("../../models/Todos/Todos"));
const router = express_1.default.Router();
router.post("/addtodo", multer_1.default.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, taskNo, taskTitle, taskDescription, taskCreatedBy } = req.body;
        if (!date || !taskNo || !taskTitle || !taskDescription || !taskCreatedBy) {
            res.status(400).json({ msg: "Please provide all required fields! ❌" });
            return;
        }
        // ✅ Upload image if file is there
        let imageUrl = "";
        if (req.file) {
            imageUrl = yield (0, uploadCloudinary_1.uploadToCloudinary)(req.file.path);
        }
        const newTodo = new Todos_1.default({
            date,
            taskNo,
            taskTitle,
            taskDescription,
            taskCreatedBy,
            image: imageUrl // ⬅️ optional: schema me image field hona chahiye
        });
        yield newTodo.save();
        res.status(201).json({ msg: "Todo added successfully! ✅", todo: newTodo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error! ❌" });
    }
}));
// ✅ Get All Todos
router.get("/alltodos", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todos_1.default.find({});
        res.status(200).json({ todos });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error! ❌" });
    }
}));
// ✅ Get One Todo
router.get("/getone/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todos_1.default.findById(id);
        if (!todo) {
            res.status(404).json({ msg: "Todo not found! ❌" });
            return;
        }
        res.status(200).json({ todo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error! ❌" });
    }
}));
// ✅ Edit One Todo
router.put("/editone/:id", multer_1.default.single("fileUpload"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { date, todoNo, todoTtitle, todoDescription } = req.body;
        const filePath = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || req.body.fileUpload; // Naya file aaya toh update hoga
        const updatedTodo = yield Todos_1.default.findByIdAndUpdate(id, { date, todoNo, todoTtitle, todoDescription, fileUpload: filePath }, { new: true });
        if (!updatedTodo) {
            res.status(404).json({ msg: "Todo not found! ❌" });
            return;
        }
        res.status(200).json({ msg: "Todo updated successfully! ✅", updatedTodo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error! ❌" });
    }
}));
// ✅ Delete One Todo
router.delete("/deleteone/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield Todos_1.default.findByIdAndDelete(id);
        if (!deletedTodo) {
            res.status(404).json({ msg: "Todo not found! ❌" });
            return;
        }
        res.status(200).json({ msg: "Todo deleted successfully! ✅" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error! ❌" });
    }
}));
// ✅ Delete All Todos
router.delete("/deleteall", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Todos_1.default.deleteMany({});
        res.status(200).json({ msg: "All todos deleted successfully! ✅" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error! ❌" });
    }
}));
exports.default = router;
