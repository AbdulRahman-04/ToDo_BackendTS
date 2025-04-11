import express, { Request, Response } from "express";
import upload from "../../middleware/multer";
import { uploadToCloudinary } from  "../../utils/uploadCloudinary";
import todoModel from "../../models/Todos/Todos";

const router = express.Router();



router.post("/addtodo", upload.single("file"), async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, taskNo, taskTitle, taskDescription, taskCreatedBy } = req.body;

    if (!date || !taskNo || !taskTitle || !taskDescription || !taskCreatedBy) {
      res.status(400).json({ msg: "Please provide all required fields! ❌" });
      return;
    }

    // ✅ Upload image if file is there
    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path);
    }

    const newTodo = new todoModel({
      date,
      taskNo,
      taskTitle,
      taskDescription,
      taskCreatedBy,
      image: imageUrl // ⬅️ optional: schema me image field hona chahiye
    });

    await newTodo.save();

    res.status(201).json({ msg: "Todo added successfully! ✅", todo: newTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error! ❌" });
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
