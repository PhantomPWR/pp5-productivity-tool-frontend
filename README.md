#Tick Off
![Tick Off Mockup](docs/readme/mock-up.png)

## Table of Contents

-   [Table of Contents](#table-of-contents)
-   [About Tick Off](#about-tick-off)
-   [Project Goal](#project-goal)
-   [User Experience](#user-experience)
    -   [Target Audience](#target-audience)
    -   [User Requirements](#user-requirements)
    -   [User Stories](#user-stories)
        -   [User Account/Profile](#user-accountprofile)
        -   [Task Management](#task-management)
        -   [Discussions](#discussions)
        -   [Category Management](#category-management)
        -   [Navigation](#navigation)
    -   [Owner Stories](#owner-stories)
-   [Technical Design](#technical-design)
    -   [Agile Methodology](#agile-methodology)
    -   [CRUD Functionality](#crud-functionality)
    -   [Colours](#colours)
    -   [Fonts](#fonts)
    -   [Wireframes](#wireframes)
-   [Technologies](#technologies)
    -   [Programming Languages](#programming-languages)
    -   [Frameworks \& Tools](#frameworks--tools)
    -   [Libraries](#libraries)
-   [Frontend](#frontend)
    -   [React](#react)
-   [Backend API](#backend-api)
    -   [Django REST Framework](#django-rest-framework)
-   [Features](#features)
    -   [Registration](#registration)
    -   [Authentication](#authentication)
    -   [Sign In](#sign-in)
    -   [Sign Out](#sign-out)
    -   [Navigation Bar](#navigation-bar)
    -   [Home Page](#home-page)
    -   [Dashboard](#dashboard)
    -   [Tasks List](#tasks-list)
    -   [Task Search \& Filter](#task-search--filter)
    -   [Add a Task](#add-a-task)
    -   [Edit a Task](#edit-a-task)
    -   [Delete a Task](#delete-a-task)
    -   [Categories](#categories)
    -   [Add a Category](#add-a-category)
    -   [Edit a Category](#edit-a-category)
    -   [Delete a Category](#delete-a-category)
    -   [Task Comments](#task-comments)
    -   [Create a Comment](#create-a-comment)
    -   [Update a Comment](#update-a-comment)
    -   [Delete a Comment](#delete-a-comment)
    -   [Profile Page](#profile-page)
    -   [Task Count](#task-count)
    -   [Edit Profile](#edit-profile)
    -   [Update Username](#update-username)
    -   [Update Password](#update-password)
    -   [User List](#user-list)
    -   [Error Page](#error-page)
    -   [User Action Feedback](#user-action-feedback)
    -   [Future Improvements](#future-improvements)
-   [Validation](#validation)
    -   [HTML Validation](#html-validation)
    -   [CSS Validation](#css-validation)
    -   [ESLint Javascript Validation](#eslint-javascript-validation)
    -   [Chrome Dev Tools Lighthouse Validation](#chrome-dev-tools-lighthouse-validation)
        -   [Mobile](#mobile)
    -   [WAVE Accessibility Validation](#wave-accessibility-validation)
-   [Testing](#testing)
    -   [Devices](#devices)
    -   [Web Browsers](#web-browsers)
    -   [Manual Tests](#manual-tests)
-   [Bugs](#bugs)
    -   [Users are unable to set task due date](#users-are-unable-to-set-task-due-date)
    -   [Due date reverts to current date, regardless of the date selected in the date picker](#due-date-reverts-to-current-date-regardless-of-the-date-selected-in-the-date-picker)
    -   [When task status is set to COMPLETED, the display reads "invalid date" until page is reloaded](#when-task-status-is-set-to-completed-the-display-reads-invalid-date-until-page-is-reloaded)
    -   [Profile task count always displays 10, until result 11+ are loaded via InfiniteScroll component](#profile-task-count-always-displays-10-until-result-11-are-loaded-via-infinitescroll-component)
-   [Deployment](#deployment)
    -   [Heroku](#heroku)
    -   [Cloning a GitHub Repository](#cloning-a-github-repository)
-   [Credits](#credits)
    -   [Images](#images)
    -   [README](#readme)

## About Tick Off

Tick Off is a task manager aimed at a team working together on a project.

## Project Goal

The goal is to provide a productivity platform where users can collaborate on tasks. Users can create tasks and assign them to other users.

Key features:

-   User registration
-   User authentication
-   User profile containing avatar, username, tasks they created and tasks assigned to them
-   The app is easy to use and contains intuitive navigation across all pages
-   CRUD functionality for tasks, categories, comments & user profiles
-   Task filtering by keyword search, category, status & priority

View the live website **[HERE](https://tick-it-app-pp5.herokuapp.com/)**

Access the backend repository on **[Github](https://github.com/PhantomPWR/pp5-productivity-tool-backend)**

## User Experience

### Target Audience

The main audience for Tick Off are remote workers who need to collaborate with each other. Individuals who have to manage their own schedules, yet have to stay on top of the progress & deadlines associated with the project they're working on.

### User Requirements

-

### User Stories

#### User Account/Profile

1. As a new user I can register an account so that I can take part in managing and completing tasks
2. As a user I can log into my account so that I can view & manage tasks and update my profile
3. As a user I can update my username so that I can change it if I need to
4. As a user I can reset my password so that I can always access my account
5. As a user I can edit my profile so that my information is up to date
6. As a user I can view a home page so that I can read instructions on how to use the Tick Off

#### Task Management

1. As a user I can access my own dashboard so that I can get an overview of tasks I created and tasks assigned to me
2. As a user I can create tasks so that I can track and manage my activities
3. As a user I can view a list of tasks so that I can see details of tasks I own and tasks assigned to me
4. As a user I can search and filter a task list so that I can quickly find what I'm looking for
5. As a user I can edit tasks I own so that task details can be correct and up to date
6. As an assigned user I can update a task's status so that the task progress is clear
7. As a user I can delete tasks i own so that I can remove any duplicates, or tasks created in error
8. As a user I can add attachments to tasks so that I can clearly demonstrate a point an avoid describing it insufficiently
9. As an assigned user I can update a task's status so that the task progress is clear

#### Discussions

1. As a role I can create comments so that I can take part in discussions around a task
2. As a user I can view comments so that I can stay up to date with task discussions
3. As a user I can update my own comments so that I can keep information relevant and up to date
4. As a user I can delete my own comments so that I can correct any mistakes

#### Category Management

1. As a user I can create categories so that keep tasks organised
2. As a user I can view a list of categories so that I know if a certain category already exists
3. As a user I can update categories so that they are always relevant and up to date
4. As a user I can delete categories so that unnecessary clutter can be avoided

#### Navigation

1. As a user I can access a navbar on every page so that I can easily navigate between pages
2. As a user I can see a 404 - Not Found page with a redirect button so that I can easily navigate back to a working page

### Owner Stories

1. As the app owner I want to validate user details on registration so that it meets the security criteria
2. As the app owner I want to ensure logged-in users can only post in their own name and update their own details so that user data stays private & secure
3. As the app owner I want to have full control over all areas of the app so that submitted content can be moderated
4. As the owner I want the app to be responsive so that it can be used on a wide range of devices
5. As the app owner I want users to be able to collaborate so that tasks can be completed timely and efficiently

## Technical Design

### Agile Methodology

I followed Agile principles during creation of this app. I used a GitHub project to create Kanban boards and issues.

#### The Kanban board contains 4 columns:

**Backlog** - An issue hasn't been reviewed/assigned yet  
**Todo** - An issue hasn't been started  
**In Progress** - Issue actively being worked on  
**Done** - Completed issues

#### **MoSCoW Prioritisation**

I created issue labels for:  
**Must Have** - Non-negotiable and must be delivered  



**Should Have** - Adds significant value, but isn't vital  
**Could Have** - No significant impact, if left out  
**Won't Have** - Not a priority for this iteration  

Following Agile principles allowed me to know exactly where I was in the process.

Here is the [**GitHub Project**](https://github.com/users/PhantomPWR/projects/5)

### CRUD Functionality

-

### Colours
- I used limited colours to keep the user interface clean and focused
- Various shades of slate for backgrounds
- Dark orange navigation, accents and decoration
- Red for overdue tasks and alerts
- Bright orange for tasks due today
- Green for completed tasks and success messages

### Fonts

- Google Fonts - Montserrat
- Fallback - Sans Serif, system-ui

### Wireframes

-

## Technologies

### Programming Languages

- HTML
- CSS
- JavaScript

### Frameworks & Tools

- Axios - Used for sending API requests from React to the backend API and avoid any CORS errors when sending cookies.
- JWT For decoding JSON Web tokens. JWT was used for transmitting data securely verifying integrity.
- React 17 - A JavaScript library for building user interfaces. Used because it allows for rapid building of interactive user interfaces.
- React-Bootstrap 1.6.3 - A CSS framework. I used Bootstrap React library for consistent layout, styling and responsiveness of UI components.
- React Infinite Scroll - Infinite scroll component. Used to automatically load additional content without the need for next/previous buttons.
- React Router - A Javascript framework for routing. Used for navigating between page components and display content based on the URL in the user's browser.
- Chrome Developer Tools - Used extensively for code debugging and rapid responsive testing & development.
- Cloudinary - File storage platform. Used for storing all required static files.
- Font Awesome - An Icon library. Used to enhance the identification of various links and data elements
- Google Fonts - Font library. I used this library in order to access more versatile and elegant font choices than the system & browser defaults. System fonts were added as a fallback for backwards compatibility.
- Git - Version control system. Used for version control and management of the code repository
- GitHub - A cloud-based hosting service. Used as a remote repository for storing the application code.
- Gitpod - A cloud development environment. I used GitPod as a virtual machine and workspace.


- Validation:
  - WC3 Validator - An HTML Validator. Used for validating the app's HTML markup.
  - Jigsaw W3 Validator - A CSS Validator. Used for validating the app's CSS code.
  - ESLint - JavaScript Validator. I used ESLint to validate the app's JSX code.
  - Lighthouse A website auditing tool. I used Lighthouse to gauge the app's performance, accessibility, best practice and SEO
  - Wave - Accesibility auditor. Used to identify accessibility issues, e.g colour contrast, image alt tags, etc.

## Frontend

### React

-

## Backend API

### Django REST Framework

-

## Features

hgfd

### Registration

-

### Authentication

-

### Sign In

-

### Sign Out

-

### Navigation Bar

-

### Home Page

-

### Dashboard

-

### Tasks List

-

### Task Search & Filter

-

### Add a Task

-

### Edit a Task

-

### Delete a Task

-

### Categories

-

### Add a Category

-

### Edit a Category

-

### Delete a Category

-

### Task Comments

-

### Create a Comment

-

### Update a Comment

-

### Delete a Comment

-

### Profile Page

-

### Task Count

-

### Edit Profile

-

### Update Username

-

### Update Password

-

### User List

-

### Error Page

-

### User Action Feedback

-

### Future Improvements

-

## Validation

### HTML Validation

-

### CSS Validation

-

### ESLint Javascript Validation

-

### Chrome Dev Tools Lighthouse Validation

-

#### Mobile

-

### WAVE Accessibility Validation

-

## Testing

### Devices

-

### Web Browsers

-

### Manual Tests

-

## Bugs

### Users are unable to set task due date

**Fix:**  
Add Due Date field, which was missing from API

### Due date reverts to current date, regardless of the date selected in the date picker

**Fix:**  
Set `auto_now=False` in Task model

### When task status is set to COMPLETED, the display reads "invalid date" until page is reloaded

**Fix:**  
Added
`completed_date: newStatus === "Completed" ? new Date() : null,` to the `submitForm` function.

This change ensures that `completed_date` is properly formatted and prevents the "Invalid Date" message.

### Profile task count always displays 10, until result 11+ are loaded via InfiniteScroll component

**Fix:**  
Replace `const profileTaskCount = profileTasks.results.length;` with `const profileTaskCount = profileTasks.count;`  
and `const assignedTaskCount = assignedTasks.results.length;` with `const assignedTaskCount = assignedTasks.count;`

## Deployment to Heroku

The project was deployed to [Heroku](https://www.heroku.com) as follows:

#### 1. requirements.txt

1.1 In the terminal, run `pip freeze > requirements.txt` - this will save a list of all libraries the project requires

#### 2. Cloudinary

Task attachments & profile images are hosted on [Cloudinary](https://cloudinary.com/).  
2.1 Once an account is created, log in  
2.2 Navigate to your Cloudinary dashboard  
2.3 Copy the API Environment variable (without CLOUDINARY_URL=) and keep it to hand

#### 3. ElephantSQL

The database is hosted on [ElephantSQL](https://www.elephantsql.com/).  
3.1 Once an account is created, log in  
3.2 Click on "Create New Instance  
3.3 Enter a plan name  
3.4 Select "Tiny Turtle (Free)"  
3.5 Ignore the tags  
3.6 Click "Select Region"  
3.7 Select an appropriate data center  
3.8 Click "Review"  
3.9 Review the details and click "Create Instance"  
3.10 On the instances page, click on the name of the newly created instance  
3.11 On the details page, copy the database URL and keep it to hand

#### 4. Heroku

4.1 Visit to [Heroku](https://www.heroku.com)  
4.2 Once an account is created, log in  
4.3 On the top right, click "New" and select "Create new app"  
4.4 Enter an app name, confirm the app owner & select a region  
4.5 Click "Create app"  
4.6 Click on the newly created app  
4.7 Select the "Settings" tab  
4.8 Scroll past "App Information" and click on "Reveal Config Vars"  
4.9 Enter the following config vars:

-   `CLOUDINARY_URL`: _your saved Cloudinary URL_
-   `DATABASE_URL`: _your saved ElephantSQL database URL_
-   `PORT`: `8000`
-   `SECRET_KEY`: _your secret key_

**Hint:** You can generate a secret key at [miniwebtool](https://miniwebtool.com/django-secret-key-generator/)

4.10 Scroll to the top of the page & select the "Deploy" tab  
4.11 Select GitHub as the Deployment method  
4.12 Search for & select the relevant repository  
4.13 Enable Automatic deploys (optional)  
4.14 Once the build is completed, click on the "View" link to view the app.

### Cloning a GitHub Repository

Clone the repository as follows:

1. Navigate to [GitHub]https://github.com/ and log in
2. Navigate to the relevant [Repository](https://github.com/PhantomPWR/pp5-productivity-tool-frontend/)
3. Find green button labelled "Code" at the top right, above "commits""
4. Select the preferred clone method and click the copy button
5. Open Git Bash
6. Change the working directory to the directory where you'd like to create the clone
7. Enter `git clone` and paste the URL copied in Step 4 above
8. Enter `$ clone https://github.com/PhantomPWR/pp5-productivity-tool-frontend.git`
9. Press enter and the local clone will be created

## Credits

### Code

- I used the Moments walkthrough project as a starting point for my codebase.
- [Stack Overflow](https://stackoverflow.com/) for various solutions

### Images

- [Pexels](https://www.pexels.com/search/rombo/) for sample user avatars
- [Pixabay](https://pixabay.com/users/chadonihi-634818/) for the 404 page background image
- [Real Time Audio Website](https://www.realtimeaudio.ca/blog/what-is-phantom-power/) - For the phantom power avatar

### README

- [Code Institue README Template](https://github.com/Code-Institute-Solutions/readme-template) - README structure example
- [Jamie King](https://github.com/jkingportfolio/ci_pp5_tick_it_react/tree/main#readme) - README structure example
