import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import React from "react";

const Info = () => {
  return (
    <div className="max-w-7xl mx-auto py-7 px-10 gap-2 flex flex-col">
      <h2 className="font-semibold text-3xl text-center mb-6">
        Information 📚
      </h2>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Pregnancies:</h2>
        <p>This represents the number of pregnancies the individual has had.</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Glucose Level:</h2>
        <p>
          The concentration of glucose in the blood. It is measured in mg/dL.
          Normal range: 70-99 mg/dL.
        </p>
        <p>
          Medical Fact: Glucose is the primary source of energy for the
          body&apos;s cells, and maintaining a stable glucose level is essential
          for overall health.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Blood Pressure Value:</h2>
        <p>
          The blood pressure of the individual. It is measured in mmHg
          (millimeters of mercury). Normal range: 90/60 mmHg to 120/80 mmHg.
        </p>
        <p>
          Medical Fact: Blood pressure measures the force of blood against the
          walls of the arteries. High blood pressure can lead to cardiovascular
          diseases.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Skin Thickness Value:</h2>
        <p>The thickness of skin folds on the triceps. It is measured in mm.</p>
        <p>
          Medical Fact: Skin thickness measurements can provide insight into an
          individual&apos;s body composition and risk factors for certain health
          conditions.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Insulin Level:</h2>
        <p>The insulin level in the blood. It is measured in units/mL.</p>
        <p>
          Medical Fact: Insulin is a hormone that regulates blood sugar levels.
          Insufficient insulin production or insulin resistance can lead to
          diabetes.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">BMI (Body Mass Index):</h2>
        <p>
          BMI is a measure of body fat based on height and weight. It is
          calculated by dividing weight in kilograms by the square of height in
          meters. BMI indicates whether an individual is underweight, normal
          weight, overweight, or obese.
        </p>
        <CodeBlock text="BMI = weight (kg) / (height (m) ** 2)" />
        <p className="mt-2">BMI Categories and Health Risks:</p>
        <ul className="list-disc ml-8">
          <li>Underweight: BMI &lt; 18.5</li>
          <li>Normal weight: 18.5 &le; BMI &lt; 25</li>
          <li>Overweight: 25 &le; BMI &lt; 30</li>
          <li>Obesity: BMI &ge; 30</li>
        </ul>
        <p>
          BMI values outside the normal range may indicate increased health
          risks, including diabetes.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Diabetes Pedigree Function:</h2>
        <p>
          A function that scores the likelihood of diabetes based on family
          history.
        </p>
        <CodeBlock
          text="DPF = sum of diabetes cases in relatives / total number of relatives"
        />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Age of Person:</h2>
        <p>The age of the individual in years.</p>
      </div>
    </div>
  );
};

export default Info;
