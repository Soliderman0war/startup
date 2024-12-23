# Startup
Startup for BYU class cs260

### Link to notes
[notes](notes.md)

## Elevator Pitch
Many people in their lives want to change or improve. However, they don't know how to start or sometimes even what to start on. I am proposing to create a website that selects an acitvity to do in 15 minutes to improve slightly each day. People can sign in and ultize it as they keep track on what they improved on, as well as select an activity again to improve further. If they are unsure what to do then they can use the random option to get one selected for them.

## Website

### Key features
* A login feature
* Randomize selection button
* selection drop down
* timer
* databank of activities to pull from
* Completed acivities if logged in
  

### Description of Technology
1. HTML - Two HTML pages for the login as well as the activity selection page. Hyperlinks are used on activities that would bring you to a specific activity page.
2. CSS - Styling that looks good on different screen sizes, uses good color choices as well as splitting the content evenly. Animating different interactions
3. JavaScript - Provides login, dropdown menus, loads in content automatically when the acivity is selected
4. React - Application will react according to user action
5. Service - Backend service for
     * completing acitivties
     * retrieving acitivies
     * display the acitivity
     * allow youtube functionality using [https://developers.google.com/youtube/](https://developers.google.com/youtube/) api service
7. DB/Login - Store users and activities in databases. Register and login users. Securely stored Credentials.
8. WebSocket - Comparing user completion rate of acivities as they are completed (if deemed necessary to use) 

### Sketches
![image of page with activity](https://github.com/user-attachments/assets/73e6d999-6ead-4107-8e09-ae061d134bd5)

![image of login page](https://github.com/user-attachments/assets/8d372585-497b-4fdb-abb4-83c4733df61c)


## HTML deliverable
For this deliverable I built the structure using HTML
 - [x] HTML pages - two HTML pages that represent the login and activity page
 - [x] Links - The login pages links to the activity page
 - [x] Text - Each Activity is represented by text for now
 - [x] Images - Image for motivation
 - [x] DB/Login - Has the inputs and sumbit for login, activities completed will be pulled from database
 - [x] WebSocket - The count of highest completed acitivies will be shown in realtime
  

## CSS deliverable
For this deliverable I properly styled the application
 - [x]  Header, footer, and main content body
 - [x]  Navigation elements - Bolded to produce important feel for navigation and removed underline
 - [x] Responsive to window resizing - capable of being minimized and extended with minimal impact
 - [x] Application elements - Used proper spacing to have a nice design look
 - [x] Application text content - Consistent fonts
 - [x] Application images - resizing to not induce overwhelming feel and look more professional

## React deliverable
For this deliverable I used JavaScript and React to have the application work for a user with placeholders for items that require API
 - [x]  Bundled and transpiled - Yep!
 - [x]  Components - Login, Signup, Completed Activity Count, Buttons for mock API, Timer
     - [x] Login - Tries to match a registered user with the login and once entered correctly will redirect, No database so use admin/password for now to see it redirect.
     - [x] Signup - Text boxes and Signup button to signup which will be used with a database later on.
     - [x] Completed Activity Count - Completed Activity Button will increase count, this will be implemented with Websocket in order to get a correct number across all users.
     - [x] Buttons to call API - The randomizer and the confirm activty will cause the buttons to call that API but for now it just randomizes which activity to call.
     - [x] Timer - 15 minutes timer in top right counting down.
 - [x] Router - Routing between Login, Signup, Activity, and About Components
 - [x] Hooks - Home page uses class properties instead of useState or useEffect to track changes in activity state.


## Service deliverable
For this deliverable I added backend endpoints that collects the activity data and displays all activties completed and call to a third-party API
 - [x]  Node.js/Express HTTP service - done!
 - [x]  Static middleware for frontend - done!
 - [x] Calls to third party endpoints - randomizer calls youtube API when it gets chess or juggling
 - [x] Backend service endpoints - Placeholders for login that stores the current user on the server. Endpoints for activities.
 - [x]  Frontend calls service endpoints - I did this using the fetch function. (example on about page, catching the activities)
