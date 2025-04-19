"use client";

import { useState } from "react";

type ValidationResult = {
  isValid: boolean;
  issues: string[];
};

const validateFormWithHeuristics = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): ValidationResult => {
  const issues: string[] = [];

  if (!name || name.trim().length < 2) issues.push("Name seems too short.");
  if (/test|asdf|qwerty/i.test(name))
    issues.push("Name may be placeholder text.");
  if (!email.includes("@") || email.endsWith("@email.com"))
    issues.push("Email seems fake.");
  if (email.startsWith("spam") || email.includes("xyz123"))
    issues.push("Email may be suspicious.");
  if (message.length < 10) issues.push("Message is too short to be useful.");
  if (/buy now|click here|visit|promo/i.test(message))
    issues.push("Message might sound spammy.");

  return {
    isValid: issues.length === 0,
    issues,
  };
};

export const AIFormValidator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState<ValidationResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidate = () => {
    const result = validateFormWithHeuristics(formData);
    setFeedback(result);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Smart Form Validation
      </h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={formData.name}
        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white"
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white"
      />
      <textarea
        name="message"
        placeholder="Your message"
        onChange={handleChange}
        value={formData.message}
        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white"
        rows={4}
      />

      <button
        onClick={handleValidate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Validate
      </button>

      {feedback && (
        <div
          className={`mt-4 p-4 rounded ${
            feedback.isValid
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {feedback.isValid ? (
            <p>✅ Looks good!</p>
          ) : (
            <>
              <p>⚠️ Issues detected:</p>
              <ul className="list-disc list-inside">
                {feedback.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};
