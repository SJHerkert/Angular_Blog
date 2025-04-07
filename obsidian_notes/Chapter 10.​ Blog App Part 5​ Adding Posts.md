==10_Blog App Part 5: Adding Posts==

"In this chapter, we will add the necessary functionality to register new posts. For this, we will design a simple form, with two fields to complete: the title and text of the post. In addition, as part of the data that will be sent to the backend, we will include the user id so that they can be filtered when the user enters their dashboard."  -Victor Hugo Garcia

---
*Start date: 17.3.2025*

AddPost Component -*done*
	Modal
	Nodemon
Postmodel - *done*
Observables - *done*

---

AddPostComponent

ng g c components/addPost
implements onInit, uses forms, define forms, import form stuff
(import { FormBuilder, FormGroup, Validators } from '@angular/forms';))

Modal doesnt work as tutorial so diving into that and has there been hanges how modals work in angular 19.

from stackOverflow:"
If you are using [**bootstrap 5**](https://getbootstrap.com/docs/5.1/getting-started/introduction/) change **all** attributes `data-`to `data-bs-` because it is one of the changes described in migrating from previous versions of bootstrap."
[Migrating to v5 · Bootstrap v5.1](https://getbootstrap.com/docs/5.1/migration/#javascript)
## JavaScript[](https://getbootstrap.com/docs/5.1/migration/#javascript)

- **Dropped jQuery dependency** and rewrote plugins to be in regular JavaScript.
    
- Breaking Data attributes for all JavaScript plugins are now namespaced to help distinguish Bootstrap functionality from third parties and your own code. For example, we use `data-bs-toggle` instead of `data-toggle`.
    
- **All plugins can now accept a CSS selector as the first argument.** You can either pass a DOM element or any valid CSS selector to create a new instance of the plugin:
    
    Copy
    
    ```js
    var modal = new bootstrap.Modal('#myModal')
    var dropdown = new bootstrap.Dropdown('[data-bs-toggle="dropdown"]')
    ```
    
- `popperConfig` can be passed as a function that accepts the Bootstrap’s default Popper config as an argument, so that you can merge this default configuration in your way. **Applies to dropdowns, popovers, and tooltips.**
    
- The default value for the `fallbackPlacements` is changed to `['top', 'right', 'bottom', 'left']` for better placement of Popper elements. **Applies to dropdowns, popovers, and tooltips.**
    
- Removed underscore from public static methods like `_getInstance()` → `getInstance()`.

-> Modal works


-> Modal works

install nodemon
![[Pasted image 20250317102455.png]]

app.post("/api/post/createPost", async (req, res) => {

    try {

        // Validate input data

        if (!req.body.title || !req.body.text || !req.body.author_id) {

            return res.status(400).json({

                status: "error",

                message: "Missing required fields: title, text, or author_id",

            });

        }

  

        // Create a new post

        const post = new Post({

            title: req.body.title,

            text: req.body.text,

            author_id: mongoose.Types.ObjectId(req.body.author_id),

        });

  

        // Save the post to the database

        const savedPost = await post.save();

        return res.status(200).json({

            status: "success",

            data: savedPost,

        });

    } catch (err) {

        console.error("Error creating post:", err);

        return res.status(500).json({

            status: "error",

            message: "Failed to create post",

            error: err.message,

        });

    }

});

---

Post Model

new filein model : post.model.ts
new service: ng g s services/addPost
use the service in: add-post.components.ts
	-import service
	-constructor inject the service
	-import model post 
create works

Modal ViewChild close when post made referencing to the close button using ViewChild

---

Observables

subscribers get a message from observable they are subscribed to. Observable is wacthing in events, when something is triggered it can send message to subscribers?

add new service: ng g s services/common
CommonSerice
Imports->Constructors->Methods->Subscribers.

