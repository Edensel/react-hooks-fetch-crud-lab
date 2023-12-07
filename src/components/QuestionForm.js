import React, { useState } from "react";

function QuestionForm() {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "correctIndex") {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    } else if (name.startsWith("answer")) {
      const index = parseInt(name.slice(-1), 10);
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index - 1] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          answers: formData.answers,
          correctIndex: formData.correctIndex,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("New question added: ", data);
        // Handle updating state or any other actions upon successful POST
      } else {
        console.error("Failed to add new question");
        // Handle error case if the POST request fails
      }
    } catch (error) {
      console.error("Error adding new question: ", error);
      // Handle network errors or exceptions during the POST request
    }
  };
  

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {[1, 2, 3, 4].map((num) => (
          <label key={num}>
            {`Answer ${num}:`}
            <input
              type="text"
              name={`answer${num}`}
              value={formData.answers[num - 1]}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
