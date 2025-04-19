"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import clsx from "clsx";

export const MicroFeedbackButtons = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleLike = () => {
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    setDislikeCount(0);

    if (newCount === 1) setFeedbackMessage("Thanks for the feedback!");
    else if (newCount === 2) setFeedbackMessage("You really like this!");
    else if (newCount > 2) setFeedbackMessage("Okay okay, we get it 😄");
  };

  const handleDislike = () => {
    const newCount = dislikeCount + 1;
    setDislikeCount(newCount);
    setLikeCount(0);

    if (newCount === 1) setFeedbackMessage("We'll try to improve!");
    else if (newCount === 2) setFeedbackMessage("Oof. Not your favorite?");
    else if (newCount > 2) setFeedbackMessage("We're crying internally 😢");
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <div className="flex gap-6">
        <button
          onClick={handleLike}
          className={clsx(
            "p-3 rounded-full border border-green-500 transition-transform duration-300 hover:scale-110",
            likeCount > 0 && "bg-green-100 dark:bg-green-800"
          )}
        >
          <ThumbsUp className="text-green-600 dark:text-green-300" />
        </button>
        <button
          onClick={handleDislike}
          className={clsx(
            "p-3 rounded-full border border-red-500 transition-transform duration-300 hover:scale-110",
            dislikeCount > 0 && "bg-red-100 dark:bg-red-800"
          )}
        >
          <ThumbsDown className="text-red-600 dark:text-red-300" />
        </button>
      </div>

      {feedbackMessage && (
        <p className="text-sm text-gray-700 dark:text-gray-200 animate-pulse">
          {feedbackMessage}
        </p>
      )}
    </div>
  );
};
