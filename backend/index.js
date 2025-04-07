const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');

const app = express();
const url = 'mongodb://localhost/blog';

mongoose.set('strictQuery', true);

async function connectToDB() {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the app if the database connection fails
    }
}

connectToDB(); // Call the async function to connect// I should make this a connect and disconnect, as in not having a connection open?

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/user/login', async (req, res) => {
    try {
        const user = await User.find({
            username: req.body.username,
            password: req.body.password,
        });

        if (user.length === 1) {
            return res.status(200).json({ status: 'success', data: user });
        } else {
            return res.status(401).json({ status: 'fail', message: 'Login Failed' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Internal Server Error');
    }
});

app.post('/api/post/getAllPost', async (req, res) => {
    try {
        const docs = await Post.find({}, null, { sort: { _id: -1 } });
        return res.status(200).json({
            status: 'success',
            data: docs,
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch posts',
            error: err.message,
        });
    }
});

app.post('/api/post/getPostsByAuthor', async (req, res) => {
    try {
        const postsByAuthor = await Post.find({author_id:req.body.author_id}, null, { sort: { _id: -1 } });
        return res.status(200).json({
            status: 'success',
            data: postsByAuthor,
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch Users posts',
            error: err.message,
        });
    }
});

app.post("/api/post/createPost", async (req, res) => {
    try {
        // Validate input data//Thes are actually done in the form section, so basically "useless" here
        // if (!req.body.title || !req.body.text || !req.body.author_id) {
        //     return res.status(400).json({
        //         status: "error",
        //         message: "Missing required fields: title, text, or author_id",
        //     });
        // }

        // Create a new post
        
        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            author_id: new mongoose.Types.ObjectId(req.body.author_id),
        });

        // Save the post to the database
        const savedPost = await post.save();
        return res.status(200).json({
            status: "success",
            data: savedPost,
        });

        //This error is also defined in other parts so "useless"
    } catch (err) {
        // console.error("Error creating post:", err);
        // return res.status(500).json({
        //     status: "error",
        //     message: "Failed to create post",
        //     error: err.message,
        // });
    }
});

app.post('/api/post/updatePost', async (req,res) =>{
    try {
        const {id,title,text}=req.body;
        //Validate required fields
        if(!id|| !title || !text){
            return res.status(400).json({status:'error',message:'Invalid input'});
        }
        //Perform the update with async/await
        const updateDoc = await Post.updateOne(
            {_id:id},
            {title,text}
        );

        //Check if a document was modified
        if(updateDoc.modifiedCount === 0){
            return res.status(404).json({status: 'error',message: 'Post not found or no changes made'});
        }
        res.status(200).json({status: 'success', data:updateDoc});        
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({status:'error',message:'Internsal Server Error'});        
    }
});

app.post('/api/post/deletePost', async (req,res)=>{
    try{
        console.log('Request body:', req.body); // Log incoming data
        //Extract the ID from the request body
        const{id}=req.body;

        //Validate the id
        if(!id){
            return res.status(400).json({status:'error',message:'Invalid input: Id is required'});
        }

        //Perform the delete operation with async/await
        console.log('ID received for deletion:', id);//Id log for confirmation before delete
        
        const deletedDoc = await Post.findByIdAndDelete(id);

        console.log('Deleted Document:', deletedDoc);

        //Check if the post was found and deleted
        if(!deletedDoc){
            return res.status(404).json({status:'error',message:'Post not found' });
        }

        //Send success response with deleted document
        res.status(200).json({status:'success', data:deletedDoc});
    }catch(error){
        console.error('Error deleting post:',error);
        res.status(500).json({status:'error',message:'Internal Server Error'});
    }
});

// //BARE-BONES, no error-handling,validation,or responses 
// app.post('/api/post/deletePost', async (req,res)=>{        
//         const{id}=req.body;
//         const deletedDoc = await Post.findByIdAndDelete(id);
// });

app.listen(3000, () => console.log('Listening on port 3000'));
