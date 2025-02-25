"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
    sendMessage: (msg: string) => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null)

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log("Sending message", msg);
        if (socket) {
            socket.emit("event:message", { message: msg });
        }
    }, [socket]);


    useEffect(() => {
        const _socket = io("http://localhost:4000");

        setSocket(_socket);
        return () => {
            _socket.disconnect();
            setSocket(null);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
