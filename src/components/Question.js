import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const { id, prompt, answers, correctIndex } = question;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId); // ✅ Clears on unmount
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onAnswered(false); // ✅ Calls onAnswered after 10 seconds
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
