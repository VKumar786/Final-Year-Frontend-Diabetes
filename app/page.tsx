"use client";

import { useState } from "react";

const inputFields = [
  {
    label: "Select Gender",
    type: "select",
    options: ["Male", "Female"],
    state: "gender",
  },
  {
    label: "Number of Pregnancies",
    type: "number",
    min: 0,
    max: 1000,
    state: "pregnancies",
    condition: { field: "gender", value: "Female" },
  },
  {
    label: "Glucose Level (0 to 200)",
    type: "number",
    min: 0,
    max: 200,
    state: "glucose",
  },
  {
    label: "Blood Pressure Value (0 to 200)",
    type: "number",
    min: 0,
    max: 200,
    state: "bloodPressure",
  },
  {
    label: "Skin Thickness Value (0 to 100)",
    type: "number",
    min: 0,
    max: 100,
    state: "skinThickness",
  },
  {
    label: "Insulin Level (0 to 500)",
    type: "number",
    min: 0,
    max: 500,
    state: "insulin",
  },
  {
    label: "Enter Weight (kg)",
    type: "number",
    min: 0,
    step: 0.1,
    state: "weight",
  },
  {
    label: "Enter Height (cm)",
    type: "number",
    min: 0,
    step: 0.01,
    state: "height",
  },
  {
    label: "Diabetes Pedigree Function value (0 to 5)",
    type: "number",
    min: 0,
    max: 5,
    step: 0.01,
    state: "diabetesPedigreeFunction",
  },
  {
    label: "Age of Person (0 to 120)",
    type: "number",
    min: 0,
    max: 120,
    state: "age",
  },
];

export default function DiabetesPredictionForm() {
  const [diagnosis, setDiagnosis] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handlePrediction = () => {
    // Perform prediction logic here
    // You need to implement the diabetes_prediction function
    // Example:
    // const result = diabetes_prediction(Object.values(formData));
    // setDiagnosis(result);
  };

  return (
    <div>
      <h1>Diabetes Prediction 😎</h1>
      {inputFields.map((field, index) => (
        <div key={index}>
          {field.type === "select" ? (
            <label>
              {field.label}:
              <select
                value={formData[field.state] || ""}
                onChange={(e) => handleChange(field.state, e.target.value)}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label>
              {field.label}:
              <input
                type={field.type}
                value={formData[field.state] || ""}
                onChange={(e) => handleChange(field.state, e.target.value)}
                min={field.min || ""}
                max={field.max || ""}
                step={field.step || ""}
              />
            </label>
          )}
          {field.condition &&
            formData[field.condition.field] === field.condition.value && (
              <label>
                Additional Field:
                <input
                  type="text"
                  value={formData.additionalField || ""}
                  onChange={(e) =>
                    handleChange("additionalField", e.target.value)
                  }
                />
              </label>
            )}
        </div>
      ))}
      <button onClick={handlePrediction}>Diabetes Test Result</button>
      {diagnosis && (
        <div
          className={diagnosis === "Person is diabetic" ? "success" : "error"}
        >
          {diagnosis}
        </div>
      )}
    </div>
  );
}
