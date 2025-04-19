// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const commands = {
//   "go to home": "/",
//   "take me to pricing": "/pricing",
//   "open docs": "/docs",
//   "toggle dark mode": "toggleTheme",
// };

// export const VoiceCommandHandler = () => {
//   const [listening, setListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const router = useRouter();

//   const toggleTheme = () => {
//     const root = document.documentElement;
//     const isDark = root.classList.contains("dark");
//     root.classList.toggle("dark", !isDark);
//   };

//   useEffect(() => {
//     if (typeof window === "undefined" || !("webkitSpeechRecognition" in window))
//       return;

//     const SpeechRecognition = window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       const lastResult = event.results[event.results.length - 1];
//       if (lastResult.isFinal) {
//         const text = lastResult[0].transcript.toLowerCase().trim();
//         setTranscript(text);

//         Object.entries(commands).forEach(([key, action]) => {
//           if (text.includes(key)) {
//             if (action === "toggleTheme") toggleTheme();
//             else router.push(action);
//           }
//         });
//       }
//     };

//     recognition.onend = () => {
//       if (listening) recognition.start();
//     };

//     if (listening) recognition.start();
//     else recognition.stop();

//     return () => recognition.stop();
//   }, [listening]);

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <button
//         className={`p-3 rounded-full ${
//           listening ? "bg-red-500" : "bg-blue-600"
//         } text-white shadow-lg hover:scale-105 transition`}
//         onClick={() => setListening((prev) => !prev)}
//         title={listening ? "Stop Listening" : "Start Voice Commands"}
//       >
//         🎤
//       </button>
//       {transcript && (
//         <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 max-w-xs bg-white/80 dark:bg-zinc-800 p-2 rounded shadow-md">
//           Heard: “{transcript}”
//         </p>
//       )}
//     </div>
//   );
// };
