==8_Blog App Part 3: Showing Posts==

"Our goal in this chapter is to build a component that represents an individual post, which will be displayed on the home page. This also implies adding a collection in our database that allows hosting these posts."  - Victor Hugo Garcia

---
*Start date: 14.3.2025*

Modifying the User Class - *done*
Post Component - *done*
Creating the Post Collection - *done*
Post Service - *done*
Post Component - *done*

---
Modifying the User Class

user class -add two methods: setId,getId, add private id variable
login component: this.user.setId(result['data'][0]._id); 

AuthService: modify two methods: setCurrentUser, isAuthenticated
JSON.stringify method to convert loggedInUser object(from MongoDB) into a JSON string. JSON.parse method to convert JSON text string into an object.

---
Post Component

new post component
ng g c components/post

in post.html add a blog post content from home.html, replace in home html with a app-post placeholders, modify home.component add import of post component.

Revising code, debuggin, checking namings done correctly.

"NG02801: Angular detected that `HttpClient` is not configured to use `fetch` APIs. It's strongly recommended to enable `fetch` for applications that use Server-Side Rendering for better performance and compatibility. To enable `fetch`, add the `withFetch()` to the `provideHttpClient()` call at the root of the application."

export const appConfig: ApplicationConfig = {
  providers:
  [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ]
};


Create post collection . MongoDB compass, to add data, that is a collection, that is our post collection, that is our post.
Create collection -> Insert Document -> Put content inside

Manually updating author_id: to what is found in user collection, to match the id to the loggedinuser to show the posts of this user.

When creating the collection using text from tutorial:

	   {  "title": "Sample Post",  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.) Duis et tortorcondimentum, accumsan metus at, hendrerit metus, Lorem ipsum dolor sitamet, consectetur adipiscing elit, Donec dictum eros vitae eros vulputate, inmaximus sem egestas, Maecenas egestas pharetra gravida, Vestibulum neclectus feugiat, finibus ante eget, convallis arcu, Nam ligula erat, fermentum actortor nec, efficienur facilisis eros Nulla elementum felis ut my consequat sagittisCras viverra enim mi, vel condimentum est dignissim quis Pellentesque ut liberolobortis, porta mauris non, blandit velit Aenean cursus blandit scelerisque Donecbibendum massa ut tellus euismod, ut euismod arcu gravida Integer dignissimsem hare, vel suscipit sem faucibus id Nulla nec nibh est Vestibulum convallismagna vitae placerat eleifend Duis lacinia rhoncus elit, a sodales maurissollicitudin eu.Proin tincidunt finibus cursus. ",  "author_id": {    "$oid": "6345f87e429dc42f97964406"  }}
   
the "$oid..." will contain references to a user in the user collection in MongoDB. It must match the id.

Adding a couple of more records.

1.Create Post class in models/backend (post.js) - > define the mongoose Schema
2.In index.js, add the post - contrary to the tutorial use the async method, otherwise there will be errors probably. try(if/else)catch
3.Create Post service: ng g s services/post .
	
	Issue: After generating the service, no files shown and running the command again gives : Nothind to do here. I had to manually search for the file and then it popped in the file explorer and the IDE explorer...? 

Copilot explanation:
"Ah, the classic disappearing-and-reappearing file mystery! It's possible there was a delay in your IDE or file explorer refreshing, especially if the system was caching. Either way, I'm glad they decided to make an appearance!"

Issues: 
-Using tutorial code, as im now using SSR, i had to use async/await code, with help of copilot the index.js is working with mongoose, and db connection. It is looping through the posts and they are represented at html page.
-Local storage error popped up, must revisit the code and check if i should inject or do something with this.

---

"Summary:
In this chapter, we have seen how to recover the posts stored in a collection of our database.We modified the home to present the posts thanks to a new component. If we analyze our application until now, it presents a series of problems that many of you will surely have noticed. One of them, and not unimportant, is that of security. User passwords are saved as plain text in the user collection. This is not only bad practice, but inadmissible. In later chapters, we will solve this and other issues, but for now we will continue advancing until the application performs all CRUD operations on the posts." - Victor Hugo Garcia

