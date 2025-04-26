# Task Board Application

## Overview

This is a web-based task management application that allows users to organize and track their tasks across different stages: To Do, In Progress, and Done. It provides a drag-and-drop interface for easy task management and includes features for creating, editing, deleting, filtering, searching, and sorting tasks.

## Key Features

* **Task Creation:** Users can add new tasks with a title, optional tags (comma-separated), an initial status (To Do, In Progress, Done), and a due date.
* **Task Display:** Tasks are displayed in three columns representing their status: "To Do," "In Progress," and "Done."
* **Drag and Drop:** Tasks can be easily moved between columns using drag and drop to update their status.
* **Task Editing:** Users can edit existing tasks' titles, descriptions, tags, and due dates.
* **Task Deletion:** Users can delete tasks.
* **Filtering:**
    * **Status Filtering:** Users can filter tasks by their status using the sidebar navigation.
    * **Tag Filtering:** Users can filter tasks by entering tags in the "Filter by tag" input field.
* **Searching:** The "Search tasks..." input field allows Users to search for tasks by title, description, or tags.
* **Sorting:** Users can sort tasks by:
    * Title (A-Z and Z-A)
    * Due Date (Earliest and Latest)
* **Due Dates:**
    * Users can set a due date for each task.
    * Due dates are displayed on the task cards.
    * Approaching due dates (within 2 days) and overdue dates are visually highlighted.
* **Visual Status:** Each task card has a colored indicator on the left side representing its status (blue for To Do, yellow for In Progress, green for Done).
* **Column Distinction:** The "To Do," "In Progress," and "Done" columns have distinct light background colors for better visual organization.
* **Local Storage:** Tasks are saved to local storage, so they persist across browser sessions.
* **API Integration:** The application interacts with a backend API to fetch, add, update, and delete tasks.

## Technologies Used

* React
* React Beautiful Dnd
* Tailwind CSS
* date-fns (for date manipulation and comparison)
  

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [my-repository-url]
    cd [my-repository-name]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    This will run the application in your browser, usually at `http://localhost:3000`.

## API Endpoints

The application communicates with the following API endpoints:

* `GET /api/v1/tasks`: Fetches all tasks.
* `POST /api/v1/tasks`: Adds a new task.
* `PUT /api/v1/tasks/:id`: Updates an existing task.
* `DELETE /api/v1/tasks/:id`: Deletes a task.
* `GET /api/v1/projects`: Fetches all projects.


## Local Storage

The application uses local storage with the key `taskBoardTasks` to persist task data in the browser.

## Further Improvements

* user authentication, more advanced filtering/sorting options, priority levels, and notifications.



