"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import SecurityAPI from "@/lib/api/security";
import TurnstileAccessGate from "@/components/molecules/security/TurnstileAccessGate";
import { registerTurnstileRequiredListener } from "@/lib/security/turnstileEvents";

type TurnstileContextValue = {
  requiresTurnstile: boolean;
  refreshRisk: () => Promise<void>;
};

const TurnstileContext = createContext<TurnstileContextValue>({
  requiresTurnstile: false,
  refreshRisk: async () => {},
});

export const useTurnstile = () => useContext(TurnstileContext);

export default function TurnstileProvider({ children }: { children: ReactNode }) {
  const [requiresTurnstile, setRequiresTurnstile] = useState(false);
  const [ready, setReady] = useState(false);

  const refreshRisk = useCallback(async () => {
    const risk = await SecurityAPI.getRisk();
    setRequiresTurnstile(Boolean(risk?.requiresTurnstile));
    setReady(true);
  }, []);

  useEffect(() => {
    void refreshRisk();
    registerTurnstileRequiredListener(() => {
      setRequiresTurnstile(true);
      setReady(true);
    });
  }, [refreshRisk]);

  const handleVerified = useCallback(async () => {
    await refreshRisk();
  }, [refreshRisk]);

  return (
    <TurnstileContext.Provider value={{ requiresTurnstile, refreshRisk }}>
      {requiresTurnstile ? (
        <TurnstileAccessGate onVerified={handleVerified} />
      ) : ready ? (
        children
      ) : null}
    </TurnstileContext.Provider>
  );
}
