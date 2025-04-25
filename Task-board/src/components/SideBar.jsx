
import React from 'react';

const SideBar = ({ onItemClick }) => {
    const items = [
        { label: 'Dashboard' },
        { label: 'Projects' },
        { label: 'Settings' },
    ];

    return (
        <div className="w-64 bg-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-4">Sidebar</h3>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.label}
                        className="mb-2 cursor-pointer hover:bg-gray-300 p-2 rounded"
                        onClick={() => onItemClick(item.label)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;