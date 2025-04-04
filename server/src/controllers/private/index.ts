import express, { Request, Response } from "express";
import multer from "multer";
import todoModel from "../../models/Todos/Todos";

const router = express.Router();

// ✅ Multer Setup (Files "uploads/" folder me jayengi)
const upload = multer({ dest: "uploads/" });

// ✅ Add Todo with File Upload
router.post("/addtodo", upload.single("fileUpload"), async (req: Request, res: Response) => {
  try {
    const { date, todoNo, todoTtitle, todoDescription } = req.body;
    if (!date || !todoNo || !todoTtitle || !todoDescription) {
      res.status(400).json({ msg: "Please provide all fields ❌" });
      return;
    }

    // ✅ File Path (agar file hai toh)
    const filePath = req.file?.path || null;

    // ✅ Todo Save
    const newTodo = new todoModel({ date, todoNo, todoTtitle, todoDescription, fileUpload: filePath });
    await newTodo.save();

    res.status(201).json({ msg: "Todo added ✅", todo: newTodo });
  } catch (error) {
    res.status(500).json({ msg: "Server error ❌" });
  }
});

router.get("/alltodos", async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await todoModel.find({});
      res.status(200).json({ todos });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error! ❌" });
    }
  });
  

  router.get("/getone/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const todo = await todoModel.findById(id);
  
      if (!todo) {
        res.status(404).json({ msg: "Todo not found! ❌" });
        return;
      }
  
      res.status(200).json({ todo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error! ❌" });
    }
  });  


  router.put("/editone/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { date, taskNo, taskTitle, taskDescription, taskCreatedBy } = req.body;
  
      const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        { $set: date, taskNo, taskTitle, taskDescription, taskCreatedBy },
        { new: true }
      );
  
      if (!updatedTodo) {
        res.status(404).json({ msg: "Todo not found! ❌" });
        return;
      }
  
      res.status(200).json({ msg: "Todo updated successfully! ✅", updatedTodo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error! ❌" });
    }
  });
  


  router.delete("/deleteone/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedTodo = await todoModel.findByIdAndDelete(id);
  
      if (!deletedTodo) {
        res.status(404).json({ msg: "Todo not found! ❌" });
        return;
      }
  
      res.status(200).json({ msg: "Todo deleted successfully! ✅" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error! ❌" });
    }
  });
  
  router.delete("/deleteall", async (_req: Request, res: Response): Promise<void> => {
    try {
      await todoModel.deleteMany({});
      res.status(200).json({ msg: "All todos deleted successfully! ✅" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error! ❌" });
    }
  });
  
  export default router;
  