import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  function handleChange(e) {
    const newIndex = parseInt(e.target.value);

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        onUpdate(updatedQuestion); // This updates App's state
      });
  }

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    }).then(() => onDelete(question.id));
  }

  return (
    <li>
      <h4>{question.prompt}</h4>
      <ul>
        {question.answers.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
      <label htmlFor={`correct-answer-${question.id}`}>Correct Answer</label>
      <select
        id={`correct-answer-${question.id}`}
        aria-label="Correct Answer"
        value={question.correctIndex} // ✅ Use props directly
        onChange={handleChange}
      >
        {question.answers.map((a, i) => (
          <option key={i} value={i}>
            {a}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
