import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [ user, setUser ] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const [ token, setToken ] = useState(
        localStorage.getItem("token")
    );

    function login(userData, tokenData) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);

        setUser(userData);
        setToken(tokenData);
    }

    function logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
        navigate("/login");
    }

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response, 
            (error) => {
                if (error.response && error.response.status === 401) {
                    console.warn("Sessão expirada. Redirecionando para o login...");

                    alert("A sua sessão expirou. Por favor, faça login novamente.");
                    
                    logout(); 
                }
                return Promise.reject(error);
            }
        );

        // Limpeza do interceptor quando o componente desmontar
        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}