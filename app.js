const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory post storage
let posts = [];

// Home - show all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Detail View
app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.send("Post not found");
  res.render("detail", { post });
});

// Create New Post
app.post("/create", (req, res) => {
  const newPost = {
    id: uuidv4(),
    username: req.body.username,
    content: req.body.content
  };
  posts.unshift(newPost);
  res.redirect("/");
});

// Delete Post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

// Edit Page
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.send("Post not found");
  res.render("edit", { post });
});

// Update Post
app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.username = req.body.username;
    post.content = req.body.content;
  }
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
