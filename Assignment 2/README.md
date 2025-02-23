To-Do List App
A simple, lightweight To-Do List application built using Node.js, Express, and EJS. This app allows users to add, edit, delete, mark as completed, and search tasks. All tasks are stored in a JSON file, making it a great starting point for understanding backend persistence without a database.

Features
Add Tasks: Use a floating add button that opens a popup form for adding new tasks.
Edit Tasks: Inline editing is available by clicking the edit icon that appears on hover.
Delete Tasks: Remove tasks easily with the delete icon.
Task Completion: Mark tasks as complete with checkboxes, which also apply a strikethrough style.
Search: Quickly filter tasks using the search bar.
Persistent Storage: Tasks are stored in a tasks.json file.
Clean UI: Styled using inline CSS with a modern, minimal design and Font Awesome icons.
Getting Started

Clone the repository:
git clone <repository-url>
cd Assignment-2
cd todo-list-app

Install dependencies:
npm install express body-parser fs
Start the server:
npm start

Open your browser:
Visit http://localhost:3000 to see the app in action.

File Structure
index.js - Main server file handling routes and middleware.
views/index.ejs - EJS template rendering the user interface.
tasks.json - JSON file for storing tasks.
README.md - This file, which provides an overview of the project.