
import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Settings</h2>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">User Preferences</h3>
                <div className="mb-3">
                    <label htmlFor="theme" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Theme
                    </label>
                    <select
                        id="theme"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
                        value={theme}
                        onChange={handleThemeChange}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        {}
                    </select>
                </div>
                {}
            </div>
            {}
        </div>
    );
};

export default Settings;