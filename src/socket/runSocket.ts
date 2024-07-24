import { Server } from "socket.io";
import Todo from "../models/Todo";

export const runSocket = (server: any) => {
  console.log("Starting socket server...");
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New connection");
    socket.emit("todos", Todo.find({}));

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("createTodo", async (todo) => {
      const newTodo = new Todo(todo);
      await newTodo.save();
      io.emit("todos", await Todo.find({}));
    });

    socket.on("updateTodo", async (updatedTodo) => {
      await Todo.updateOne({ id: updatedTodo.id }, updatedTodo);
      io.emit("todos", await Todo.find({}));
    });

    socket.on("deleteTodo", async (id) => {
      await Todo.deleteOne({ id });
      io.emit("todos", await Todo.find({}));
    });
  });
};
