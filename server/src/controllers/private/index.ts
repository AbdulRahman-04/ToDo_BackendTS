import express, { Request, Response } from "express";
import multer from "multer";
import todoModel from "../../models/Todos/Todos";

const router = express.Router();

// ✅ Multer Setup (Files "uploads/" folder me jayengi)
const upload = multer({ dest: "uploads/" });

// ✅ Add Todo with File Upload
router.post("/addtodo", upload.single("fileUpload"), async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, todoNo, todoTtitle, todoDescription } = req.body;
    if (!date || !todoNo || !todoTtitle || !todoDescription) {
      res.status(400).json({ msg: "Please provide all fields ❌" });
      return
    }

    // ✅ File Path (if any)
    const filePath = req.file?.path || null;

    // ✅ Todo Save
    const newTodo = new todoModel({ date, todoNo, todoTtitle, todoDescription, fileUpload: filePath });
    await newTodo.save();

    res.status(201).json({ msg: "Todo added ✅", todo: newTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error ❌" });
  }
});

// ✅ Get All Todos
router.get("/alltodos", async (_req: Request, res: Response) => {
  try {
    const todos = await todoModel.find({});
    res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error! ❌" });
  }
});

// ✅ Get One Todo
router.get("/getone/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findById(id);

    if (!todo) {
      res.status(404).json({ msg: "Todo not found! ❌" });
      return 
    }

    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error! ❌" });
  }
});

// ✅ Edit One Todo
router.put("/editone/:id", upload.single("fileUpload"), async (req: Request, res: Response) :Promise<void>=> {
  try {
    const { id } = req.params;
    const { date, todoNo, todoTtitle, todoDescription } = req.body;
    const filePath = req.file?.path || req.body.fileUpload; // Naya file aaya toh update hoga

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { date, todoNo, todoTtitle, todoDescription, fileUpload: filePath },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ msg: "Todo not found! ❌" });
      return 
    }

    res.status(200).json({ msg: "Todo updated successfully! ✅", updatedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error! ❌" });
  }
});

// ✅ Delete One Todo
router.delete("/deleteone/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTodo = await todoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
     res.status(404).json({ msg: "Todo not found! ❌" });
     return 
    }

    res.status(200).json({ msg: "Todo deleted successfully! ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error! ❌" });
  }
});

// ✅ Delete All Todos
router.delete("/deleteall", async (_req: Request, res: Response) => {
  try {
    await todoModel.deleteMany({});
    res.status(200).json({ msg: "All todos deleted successfully! ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error! ❌" });
  }
});

export default router;
