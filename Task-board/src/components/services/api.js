
const BASE_URL_TASKS = 'https://68076032e81df7060eb9f118.mockapi.io/api/v1/tasks';
const BASE_URL_PROJECTS = 'https://68076032e81df7060eb9f118.mockapi.io/api/v1/projects';

export const fetchTasks = async () => {
    try {
        const response = await fetch(BASE_URL_TASKS);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const addTask = async (task) => {
    try {
        const response = await fetch(BASE_URL_TASKS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

export const updateTask = async (id, updatedFields) => {
    try {
        const response = await fetch(`${BASE_URL_TASKS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${BASE_URL_TASKS}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};



export const fetchProjects = async () => {
    try {
        const response = await fetch(BASE_URL_PROJECTS);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};

