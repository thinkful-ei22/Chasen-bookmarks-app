Fundamentals Final Project
Build a Bookmarks App
Project Overview
Using everything you've learned over the Fundamentals section of the course, you will build the frontend for an API-powered Bookmarks application that lets the user store and rate their custom web bookmarks.

Due Date and Grading
You have until the end of day Friday (typically 6PM ET) to complete your project and submit it for evaluation. To receive a passing grade, the project must:

Fulfill every non-extension user story below
Fulfill every non-extension technical requirement below
For successful submission, you MUST:

Push your final version to the gh-pages branch of your repo. Your repo should be inside the cohort's organization and named [yourname]-bookmarks-app.
Submit the project URL on the Goals page of your Dashboard using the section titled "Submit API Hack Capstone".
User Stories
As a user:

I can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)
I can see a list of my bookmarks when I first open the app

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

Detailed view expands to additionally display description and a "Visit Site" link
I can remove bookmarks from my bookmark list

I receive appropriate feedback when I cannot submit a bookmark

Check all validations in the API documentation (e.g. title and url field required)
I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated above the chosen selection

(Extension) I can edit the rating and description of a bookmark in my list

Technical Requirements
Use jQuery for AJAX and DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables!
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component
Use semantic HTML

Use responsive design

Visually and functionally solid in viewports for mobile and desktop
Follow a11y best practices

Refer back to the lessons on accessibility, forms
(Extension) Follow AJAX and a11y best practices

AJAX and Aria Live for help
Process
Before coding anything, think about your user flow. What does the initial loaded page look like? What is each action a user can take and how does it affect the visual layout?

Draw up gray box wireframes using MockFlow, a free wireframing tool of your choice, or on a napkin!

For every wireframed application state, include a populated store object as an example next to it

Set up your project. Create your Git repo, build your boilerplate file structure, connect jQuery and confirm your linked JavaScript/CSS files are being read by your HTML.

Build an HTML version of all the different states of your application. Use multiple HTML files if you wish - these will be deleted later, but useful for establishing the HTML strings your template generator functions will need to build.

Review the API Documention. Perform some test requests with Postman.

Construct your modules and test every new function as you build it.