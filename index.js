import express from "express";
import mongoose from "mongoose";

import { con } from "./db.js";
const app = express();
const date = new Date();
const isoString = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
let Item;
const blue_print = {
  displayId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
};
async function startserver() {
  try {
    await con("blog");
    Item = mongoose.model("Item", blue_print);
    app.listen(4000, () => {
      console.log("application started");
    });
  } catch (er) {
    console.log(er.message);
  }
}
async function fetch() {
  return await Item.find({});
}

const posts = async () => {
  const fetchedPosts = await Item.find({});
  return fetchedPosts.length;
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const find = async (number) => {
  try {
    const findone = await Item.findOne({ displayId: number });
    return findone;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
app.get("/getall", async (req, res) => {
  let val = await fetch();

  res.json(val);
});
app.get("/getall/:id", async (req, res) => {
  const get_id = req.params.id;
  let find_post = await find(get_id);
  if (!find_post) return res.status(404).json({ message: "Post not found" });
  res.json(find_post);
});
app.post("/posts", async (req, res) => {
  try {
    const length = await posts();
    const newItem = await new Item({
      displayId: length + 1,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: isoString,
    }).save();
    res.status(201).json(newItem);
  } catch (er) {
    console.log(er.message);
  }
});
app.patch("/posts/:id", async (req, res) => {
  const get_id = req.params.id;
  let find_post = await Item.findOne({ displayId: get_id });
  if (!find_post) return res.status(404).json({ message: "Post not found" });
  let setTitle = req.body.title ? req.body.title : find_post.title;
  let setContent = req.body.content ? req.body.content : find_post.content;
  let setAuthor = req.body.author ? req.body.author : find_post.author;
  await Item.findOneAndUpdate(
    { displayId: get_id },
    {
      title: setTitle,
      content: setContent,
      author: setAuthor,
      date: isoString,
    }
  );
  res.json(await Item.findOne({ displayId: get_id }));
});
app.delete("/posts/:id", async (req, res) => {
  let postIdToDelete = req.params.id;
  postIdToDelete = Number.parseInt(postIdToDelete);
  const check = await Item.findOne({ displayId: postIdToDelete });

  if (!check) {
    return res.status(404).json({ message: "Post not found" });
  }
  const remainingPosts = await Item.find({
    displayId: { $gt: postIdToDelete },
  });
  for (let i = 0; i < remainingPosts.length; i++) {
    const updatedDisplayId = postIdToDelete + i;
    await Item.findOneAndUpdate(
      { _id: remainingPosts[i]._id },
      { displayId: updatedDisplayId }
    );
  }
  await Item.findOneAndDelete({ displayId: postIdToDelete });
  res.json({ message: "Post deleted" });
});

startserver();
