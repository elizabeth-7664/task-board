# Task Board Application

## Overview

This is a simple task management application that allows users to organize their tasks into different statuses: "To Do", "In Progress", and "Done". It features drag-and-drop functionality for easy task movement between columns and persists task data using both a Mock API for remote storage and local storage for offline access and improved performance. Users can also add, edit, and delete tasks, and categorize them using tags.

## Core Features

* **Task Management by Status:** Organize tasks into "To Do", "In Progress", and "Done" columns.
* **Add, Edit, and Delete Tasks:** Create new tasks, modify existing ones, and remove tasks as needed.
* **Drag-and-Drop Functionality:** Move tasks seamlessly between different status columns using drag and drop.
* **Local Storage Persistence:** Tasks are stored in the browser's local storage, allowing for offline access and faster loading.
* **Mock API Integration:** Utilizes MockAPI.io to simulate a backend for persistent storage and data synchronization.
* **Task Categorization:** Add and view tags or labels associated with each task.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **react-beautiful-dnd:** A library for creating beautiful and accessible drag and drop interfaces.
* **MockAPI.io:** A service for creating mock REST APIs for development and testing.
* **Tailwind CSS:** A utility-first CSS framework for rapid styling.
* **JavaScript (ES6+)**
* **HTML**

## Live Demo



## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will typically start the application at `http://localhost:5173/`.

## Mock API Setup

This application uses MockAPI.io for backend simulation. To ensure it works correctly:

1.  Go to [https://mockapi.io/](https://mockapi.io/) and create a new project if you haven't already.
2.  Within your project, create a resource named `tasks`.
3.  Define the properties for your `tasks` resource (e.g., `id`, `title`, `status`, `tags`).
4.  (Optional) Add some initial task data in the "Data" section of your `tasks` resource to have some tasks displayed when the application first loads. Example data:

    ```json
    [
      { "id": "1", "title": "Example Task 1", "status": "toDo", "tags": ["example"] },
      { "id": "2", "title": "Another Task", "status": "inprogress", "tags": ["sample"] }
    ]
    ```

5.  Ensure that the API base URL used in your `src/api.js` file (or wherever your API functions are defined) matches the base URL provided by MockAPI for your project.

## Local Storage

The application utilizes the browser's local storage to persist task data. You can observe the stored data in your browser's developer tools under the "Application" or "Storage" tab.

## Contributing

Contributions to this project are welcome. Please feel free to fork the repository, create a branch with your changes, and submit a pull request.

## License

