==9_Blog app Part 4: Filtering posts==

"In this chapter, we will focus on building a board(dashboard) from which users who have logged in will be able to manage their own posts. We’ll also make changes to improve the interface(only authenticated users can see their own posts)."  -Victor Hugo Garcia

---
*Start date: 16.3.2025*

Dashboard Component - *done*
Post Component - *done*
Filtering Posts -*done*
Sharpening Details - *done*

---

Dashboard component

new component Dashboard
ng g c components/dashboard

html-> component code (oninit, imports)
routes @ app.routes.ts
authguard- service ->
ng g g services/auth
AuthGuard(Injectable/can activate(inject constructor with authservice)/true/false)

Delving into ngOninit and Injectable, and angular lifetime hooks (implements)

Remove post continue reading from posts in dashboard view.
@Input() read = true; -> in post.component.html ngIf="read" (which is true) -> now for dashboard.html -> <app-post [post]="post" [read]="false"></app-post> (which means read is false)

Using @input for boolean to show or not to show a link, or any other things or tags.

npm install --save-dev @fortawesome/fontawesome-free
(buttons for page)
edit and delete buttons, -> hiding them from home screen, as to only visile in dashboard.
@Input() admin = false -> in post.html *ngIf* ->
in dashboard html <app-post [post]="post" [read]="false" [admin]="true"></app-post>

---

Filtering Posts

add new endpoint in index.js (posts by author)->
add new method to post.service.ts (getPostsByAuthor())
	- define variable const currentUser = (the current logged in user, get JSON data from local storage) (currentUser is stored in localStorage when using login.comp... onSubmit() method)
		-   const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
	-return from api using new endpoint logic api/post/getPostsbyAuthor by using Objet literal, this defines what we want from the http request.
	
		
add second user in MongoDB - test filtering - works.

---

Sharpening Details

Adding logout button to dashboard, removing some things.
