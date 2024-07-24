import { Router } from "express";
import Todo from "../models/Todo";

const router = Router();

router.get("/", async (req, res) => {
  return res.json({
    message: "Hello from server",
  });
});

router.post("/create", async (req, res) => {
  const { title, description, userId } = req.body;
  console.log(req.body);

  await Todo.create({
    title,
    description,
    userId,
  });

  return res.json({
    message: "Todo created successfully",
    status: 200,
  });
});

router.get("/fetch", async (req, res) => {
  const todos = await Todo.find();

  return res.json(todos);
});

//pass id in the url

router.delete("/delete", async (req, res) => {
  const { id } = req.query;

  const data = await Todo.findByIdAndDelete(id);
  console.log(data);

  if (data) {
    return res.json({
      message: "Todo deleted successfully",
      status: 200,
    });
  } else {
    return res.json({
      message: "Todo not found",
      status: 404,
    });
  }
});

router.put("/update", async (req, res) => {
  const { id } = req.query;
  const updateData = req.body;
  console.log(updateData);
  console.log(id);

  try {
    const data = await Todo.findByIdAndUpdate(id, updateData, { new: true });
    console.log(data, "data");

    if (!data) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.json({
      message: "Todo updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Update Todo Error: ", error);
    return res.status(500).json({
      message: "An error occurred while updating the Todo",
    });
  }
});

export default router;
