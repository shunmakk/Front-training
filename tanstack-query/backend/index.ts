import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("hello");
});

const prisma = new PrismaClient();

app.get("/todo", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
