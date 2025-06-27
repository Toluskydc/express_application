const express = require("express")
const { createPost, deletePost, updatePost, getUserPosts, getAllPost, getPost } = require("../controllers/post.controller");
const authentication = require("../middlewares/auth.middlewares");


const route = express.Router()

route.post("/posts", authentication, createPost)

route.delete("/", authentication, deletePost)

route.put("/post-update", authentication, updatePost)

route.get("/get-user-post", authentication, getUserPosts)

route.get("/", getAllPost)

route.get("/get-post", getPost)

module.exports = route;