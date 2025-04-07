==12_ Blog App Part 7: Deleting Posts==

"The logic that we will use to eliminate posts is very similar to the one we use to edit components. From the post component, which is responsible for showing each of the posts that the user has created, an event will trigger when the elimination icon is clicked.This event will cause that in the class of the component, a method will be executed that will send the selected post to the Common Service. This will perform some operations with said post and issue a notification. In the Dashboard Component, we will subscribe to this notification, to present a modal window where the confirmation of the deletion is requested." - Victor Hugo Garcia

---
*Start date: 18.3.2025*

Common Service - *done*
Dashboard Component - *done*
Post Component - *done*
index.js - *done*

issue1:
the delete operation doesn't delete.
-fixed

---
Summary
"Throughout these last chapters, we have built a functional application that illustrates concepts such as communication between components and use of services to communicate with an API hosted on a server. Our blog performs the basic CRUD operations on a type of entity, and in that sense, it is very simple, but at the same time with it as a guide, we can build arbitrarily complex applications. There are details to be polished, and we will take care of them as you add material to this book." - Victor Hugo Garcia