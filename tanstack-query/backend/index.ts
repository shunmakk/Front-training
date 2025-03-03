import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 3001;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

const prisma = new PrismaClient();

app.get("/todos", async (req: any, res: any) => {
  //意図的にエラーを起こす
  //   return res.status(500).json({ message: "Internal Server Error" });

  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/todos/create", async (req: any, res: any) => {
  const { name } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
      isCompleted: false,
    },
  });
  return res.json(todo);
});

app.delete("/todos/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json(todo);
});

app.patch("/todos/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const todo = await prisma.todo.update({
    where: {
      id: Number(id),
    },
    data: {
      isCompleted,
    },
  });
  return res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
