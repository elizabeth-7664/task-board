// Projects.jsx
import React, { useState, useEffect } from 'react';
import * as api from "./services/api";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjectData();
    }, []);

    const fetchProjectData = async () => {
        setLoading(true);
        setError(null);
        try {
            const projectList = await api.fetchProjects();
            setProjects(projectList);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error loading projects: {error}</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            {projects.length > 0 ? (
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No projects available.</p>
            )}
            {/* You can add UI here to create new projects, etc. */}
        </div>
    );
};

export default Projects;