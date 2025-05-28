import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a UserContext
const UserContext = createContext(null);

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Helper function to check if the stored data has expired
const isExpired = (expiryTime) => {
    const now = new Date().getTime();
    return now > expiryTime;
};

// UserProvider component with expiration handling
export const UserProvider = ({ children }) => {
    // Initialize state by checking localStorage and expiration
    const [user, setUser] = useState(() => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            const { user, expiry } = JSON.parse(storedData);
            if (!isExpired(expiry)) {
                return user; // Return the user if not expired
            }
            localStorage.removeItem('user'); // Remove expired data
        }
        return null; // Return null if no valid user found
    });

    // Save user to localStorage with an expiration date whenever it changes
    useEffect(() => {
        if (user) {
            const expiryTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // Set expiry for 1 week
            localStorage.setItem('user', JSON.stringify({ user, expiry: expiryTime }));
        } else {
            localStorage.removeItem('user'); // Remove user if null
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
