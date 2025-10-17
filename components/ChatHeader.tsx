import React from 'react';

const Avatar: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center mr-3 text-white font-bold text-xl">
        M
    </div>
);

const ChatHeader: React.FC = () => {
    return (
        <header className="bg-[#f0f2f5] dark:bg-[#202c33] p-3 flex items-center shadow-sm z-10">
            <Avatar />
            <div>
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">WhatsMARK</h2>
                <p className="text-sm text-green-500 dark:text-green-400">online</p>
            </div>
        </header>
    );
};

export default ChatHeader;
