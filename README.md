# Your favorite project

DIFFICULTY: 4.2
USEFULNESS: 4.3
FUN: 4.1
MATERIALS: 3.8

## STORY
Recreate your favorite project (where you used vanilla js) with React.

## What are you going to learn?
- Compare vanilla JS with React side by side
- Event handling in React
- React Hooks

## TASKS
Select a project
Select a project from your previous projects which have event handling, (JSON) data processing, etc. made with (vanilla) JavaScript. You should prepare a plan and review your choice (and plan) with your mentor.
A project is selected, and planned and your Mentor reviewed it.

## Create the project
Create the selected project with React.
The project recreated in its full functionality with React.

## HINTS
You don't have to care about the DOM manipulation part in React. It will solve it for you.
Use Hooks instead of Class Components

## BACKGROUND MATERIALS
React Events: https://reactjs.org/docs/handling-events.html
React Hooks intro: https://reactjs.org/docs/hooks-intro.html
React useState Hook: https://reactjs.org/docs/hooks-state.html
React useEffect Hook: https://reactjs.org/docs/hooks-effect.html
Use fetch with useEffect: https://designcode.io/react-hooks-handbook-fetch-data-from-an-api
Create custom useFetch Hook: https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

## STARTER CODE: Image Gallery project's backend, database, styles


# Image gallery
DIFFICULTY: 4.2
USEFULNESS: 4.1
FUN: 3.6
MATERIALS: 3.6
DURATION: 466 min

##STORY
You've been assigned a project by your boss to create a simple image browsing gallery website, using only Node.JS, Express and vanilla JavaScript. You can find inspiration for the design on Behance.

## What are you going to learn?
- how to do CRUD in Node
- how to upload images in JS
- http methods

## TASKS
Pick a style
Find a nice design on Behance, and use it for this project.
A UI design project selected from Behance.

## Show images
Images should be displayed using a GET request to the backend, to get the list and details of uploaded images using vanilla JavaScript.
There is a GET request towards an endpoint on the backend that returns an array of images with details (URL, title, upload date, photographer's name).
The images are displayed on the website
http://swiperjs.com is implemented on the frontend, and the user can swipe easily between images.

## Add a new image
A new image can be added using forms with inputting all the necessary details (URL, title, upload date, photographer's name)
There is a form on the website, that has a file input, a title input, and a photographer's name input.
Submitting the form sends a POST request towards the backend, which saves the image with the correct upload date.
After saving an image it is shown on the website without needing to reload.
The user should not be able to submit without having all the fields filled

## Delete image
An existing image can be deleted by making a DELETE request to the backend
When the user presses the delete button associated with an image, that image is removed.
After an image is removed it is no longer displayed among the existing images in the frontend (without the need to refresh the page)

## HINTS
you need to start the server if you want to get data from it

## BACKGROUND MATERIALS
Express filesupload package: https://github.com/richardgirges/express-fileupload
HTTP request methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
Fetch API: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
Fetch API overview: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
Behance: https://www.behance.net/
SwiperJS: https://swiperjs.com/
How to save image in Node: https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657