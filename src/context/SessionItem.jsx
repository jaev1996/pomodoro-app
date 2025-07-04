import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [sessionId, setSessionId] = useState(generateSessionId());

  function generateSessionId() {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  function startNewSession() {
    setSessionId(generateSessionId());
  }

  return (
    <SessionContext.Provider value={{ sessionId, startNewSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
