==6_Blog App Part 1==

"In this chapter, we will go further, building an application that interacts with a database through a backend. We will use MongoDB as the database, and the API of our backend will be developed with NodeJS. Now, this book is focused on Angular, so we will not dwell in great detail on Node’s learning; however, we will learn enough to not feel lost."  -Victor Hugo Garcia

---
*Start date: 12.3.2025*

MongoDB -*done*
What We Will Be Doing -*done*
Starting the Project -*done*
Installing Bootstrap -*done*
Login Component -*done*
Routes of the Application -*done*
User Model -*done*
Login Service -*done*
Adding the Logic of the Form -*done*

---

in tutorial the version for MongoDB COmmunity Server is 4.0.9 and the latest is 8.0.5.

Installing bootstrap, popper, and jquery, 
Login Component
Routes of the Application

Maximum call stack size exceeded - error
issue is in app.component.html and there in this:

app-root/app-login/app-login/app-root
router-outlet/router-outlet

if i remove the app-root issue resolves. Heres copilots explanation:

!It seems like the issue you're facing is related to the improper nesting of components within your Angular app. Here’s why removing `<app-root>` might resolve the issue:

### Problem Analysis:

1. **Conflicting Component Structures**:
    
    - `<app-root>` is typically the main entry point for your Angular application and should not appear _inside itself_. Nesting `<app-login>` within `<app-root>` while also using `<router-outlet>` creates structural conflicts.
        
    - The `RouterOutlet` is designed to dynamically load routed components, and manually placing `<app-login>` within `<app-root>` alongside `<router-outlet>` can result in overlapping or redundant renderings.
        
2. **Duplicate Components**:
    
    - Declaring `<app-login>` directly in your template conflicts with routing logic if you’ve already specified a route (like `path: ''`) to load the `LoginComponent` through the `RouterOutlet`.
---

Summary:
"In this chapter, we have laid the foundations of our application. By far, this will be the most complex application built so far by us, but it will undoubtedly help us to put together all the concepts seen so far. In the next chapter, we will work with the backend by writing the API to authenticate the user. It will be developed in NodeJS and will communicate with a database in MongoDB." -Victor Hugo Garcia

