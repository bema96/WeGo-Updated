//providers/auth.provider.js
"use client"
// Imports 
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);
    const [loading,   setLoading  ] = useState(true);

    useEffect(() => {
        
        try {
            const raw = sessionStorage.getItem("access_token");
            if (raw) { 
                setLoginData(JSON.parse(raw));   
            }
        } catch (error) {
            console.error("Kunne ikke parse access_token fra sessionStorage", error);
            setLoginData(null);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ loginData, setLoginData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);