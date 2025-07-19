import React, { useState, useEffect, useRef } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    correctIndex: "0",
  });

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const question = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((r) => r.json())
      .then((newQuestion) => {
        onAddQuestion(newQuestion);
        if (isMounted.current) {
          setFormData({
            prompt: "",
            answer1: "",
            answer2: "",
            correctIndex: "0",
          });
        }
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt
        <input
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 1
        <input
          name="answer1"
          value={formData.answer1}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 2
        <input
          name="answer2"
          value={formData.answer2}
          onChange={handleChange}
        />
      </label>
      <label>
        Correct Answer
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          <option value="0">Answer 1</option>
          <option value="1">Answer 2</option>
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
