const postModel = require("../models/post.model");
const userModel = require("../models/user.model");



const getAllPost = async (req, res) => {
    try {
        const allPosts = await postModel.find().select("title creator");
        return res.json(allPosts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    const body = req.body;
    const { id } = req.user;
    try {
        const newPost = new postModel({ creator: id, ...body });
        const savedPost = await newPost.save();
        // modify user account
        await userModel.findByIdAndUpdate(
            id,
            { $push: { posts: savedPost.id } },
            { new: true }
        );
        return res.send("Post created successfully!!");
    } catch (error) {
        console.log(error.message);
        return res.send(error.message);
    }
};

const deletePost = async (req, res) => {
    const { postId } = req.query;
    const { id, admin } = req.user;

    // check for post existence
    const post = await postModel.findById(postId);
    if (!post) {
        return res.send("Post does not exist");
    }
    console.log(typeof userId);
    console.log(typeof postId);
    // check if the post belong to the creator
    if (id != post.creator && !admin) {
        return res.send("Post does not belong to creator");
    }

    try {
        await postModel.findByIdAndDelete(postId);
        return res.send("Post deleted successfully!!!");
    } catch (error) {
        return res.send(error.message);
    }
};


const updatePost = async (req, res) => {
    const { postId } = req.query;
    const body = req.body;
    const { id } = req.user; // This assumes `req.user` contains the logged-in user's information

    try {
        // Get the post
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send("Post does not exist");
        }

        console.log(`User ID: ${id}, Post Creator ID: ${post.creator}`);

        // Check if the logged-in user is the creator of the post
        if (id !== post.creator.toString()) {
            return res.send("You can only update your own posts");
        }

        // Update the post
        await postModel.findByIdAndUpdate(postId, { ...body }, { new: true });
        res.send("Post updated successfully!");
    } catch (error) {
        res.send( error.message);
    }
};




const getUserPosts = async (req, res) => {
    const { id } = req.user;
    try {
        const posts = await postModel.find({ creator: id });
        return res.json(posts);
    } catch (error) {
        return res.send(error.message);
    }
};

const getPost = async (req, res) => {
    const { postId } = req.query;
    try {
        const post = await postModel.findById(postId).populate("creator", "name email");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    deletePost,
    updatePost,
    getUserPosts,
    getAllPost,
    getPost,
};

