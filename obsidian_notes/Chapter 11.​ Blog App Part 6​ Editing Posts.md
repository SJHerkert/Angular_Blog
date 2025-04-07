==11_Blog App Part 6: Editing Posts==

"In this chapter, we will focus on editing posts, getting closer to finalizing the basic functionality of the application, although of course there will be details that we will have to deal with later."  -Victor Hugo Garcia

---
*Start date: 17.3.2025*

Frontend Post Model - *done*
Common Service - *done*
Post Component - *done*
Dashboard Component - *done*
AddPost Component - *done*
AddPost Service - *done*
updatePost - *done*

---

Issue1:
using the <i tag in post.compoent.html causes not firing issue, switching to guns, no to span, and wrapping it inside another tag. Solved.
Issue2:
As per tutorial code, old bootstrap, in every where where data* is used, switch to gu... no to data-bs-*. Solved.
Issue3:
Mongo dont do well with the tutorials update code, when using edit modal, trying to save it crashes the server side, 
MongooseError: Query.prototype.exec() no longer accepts a callback
    at model.Query.exec (C:\PersonalDevProjects\Angular\blog\backend\node_modules\mongoose\lib\query.js:4405:11)
    at _update (C:\PersonalDevProjects\Angular\blog\backend\node_modules\mongoose\lib\query.js:4249:11)
    at Query.updateOne (C:\PersonalDevProjects\Angular\blog\backend\node_modules\mongoose\lib\query.js:4140:10)
    at _update (C:\PersonalDevProjects\Angular\blog\backend\node_modules\mongoose\lib\model.js:4136:16)
    at Function.updateOne (C:\PersonalDevProjects\Angular\blog\backend\node_modules\mongoose\lib\model.js:4067:10)
    at C:\PersonalDevProjects\Angular\blog\backend\index.js:117:10
    at Layer.handle [as handle_request] (C:\PersonalDevProjects\Angular\blog\backend\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\PersonalDevProjects\Angular\blog\backend\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\PersonalDevProjects\Angular\blog\backend\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\PersonalDevProjects\Angular\blog\backend\node_modules\express\lib\router\layer.js:95:5)

CoPilots explanation:
"This error is coming from a breaking change in Mongoose: the Query.prototype.exec() method no longer accepts a callback function. Instead, Mongoose now fully supports async/await and Promises for handling database queries. This means that any code relying on callbacks needs to be updated."

And its suggestion to write the uppdateOne query again using asnc/await:
"In your case, the `updateOne` query is causing the issue. You should rewrite the code to use `await`. Here’s an updated example of how to handle `updateOne` in your `updatePost` endpoint:"

And its suggestion for code:
app.post('/api/post/updatePost', async (req, res) => {
  try {
    const { id, title, text } = req.body;

    // Validate required fields
    if (!id || !title || !text) {
      return res.status(400).json({ status: 'error', message: 'Invalid input' });
    }

    // Perform the update query with async/await
    const updatedDoc = await Post.updateOne(
      { _id: id },
      { title, text }
    );

    // Check if a document was modified
    if (updatedDoc.modifiedCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Post not found or no changes made' });
    }

    res.status(200).json({ status: 'success', data: updatedDoc });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

Issue Solved.
