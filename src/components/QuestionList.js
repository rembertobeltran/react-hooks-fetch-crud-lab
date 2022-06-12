import React from "react";
import { useEffect, useState } from "react/cjs/react.production.min";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions))
  }, []);

  function handlePatch(id, answer) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: answer }),
    });
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(questions.filter((question) => question.id !== id))
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onPatch={handlePatch}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
