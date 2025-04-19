// components/persona/PersonaShifterProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Persona = "developer" | "designer" | "manager" | "guest";

const PersonaContext = createContext<{ persona: Persona }>({
  persona: "guest",
});

export const PersonaShifterProvider = ({
  children,
  email,
}: {
  children: ReactNode;
  email?: string;
}) => {
  const [persona, setPersona] = useState<Persona>("guest");

  useEffect(() => {
    if (email) {
      if (email.includes("dev") || email.includes("engineer"))
        setPersona("developer");
      else if (email.includes("design")) setPersona("designer");
      else if (email.includes("manager") || email.includes("exec"))
        setPersona("manager");
    }
  }, [email]);

  return (
    <PersonaContext.Provider value={{ persona }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => useContext(PersonaContext);

// import { usePersona } from "./persona/PersonaShifterProvider";

// export const SmartGreeting = () => {
//   const { persona } = usePersona();

//   const greetings: Record<string, string> = {
//     developer: "Yo dev! Ready to ship something sick?",
//     designer: "Hey creator 🎨 Let's make something beautiful.",
//     manager: "Welcome back! Ready to drive results?",
//     guest: "Welcome! Let’s build something cool.",
//   };

//   return (
//     <div className="text-xl font-semibold py-4 text-center">
//       {greetings[persona]}
//     </div>
//   );
// };
