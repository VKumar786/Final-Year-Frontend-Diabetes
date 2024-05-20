import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-7 px-10 gap-2 flex flex-col">
      <h2 className="font-semibold text-3xl text-center mb-6">About 👋</h2>
      <div className="mb-4">
        <p>
          This application serves a dual purpose, benefiting both healthcare
          professionals and users alike.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">For Doctors:</h2>
        <ul className="list-disc ml-8">
          <li>Quickly obtain preliminary results for diabetes diagnosis.</li>
          <li>
            Enhance diagnostic accuracy through a two-step verification process.
          </li>
          <li>Streamline testing procedures for improved patient care.</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">For Users:</h2>
        <ul className="list-disc ml-8">
          <li>
            Conveniently monitor health status from anywhere. Receive instant
          </li>
          <li>
            feedback on likelihood of having diabetes. Empower proactive health
          </li>
          <li>management and informed decision-making.</li>
        </ul>
      </div>
      <p>
        With its user-friendly interface and powerful predictive capabilities,
        the Diabetes Prediction Web Application aims to improve healthcare
        outcomes, enhance patient engagement, and contribute towards a healthier
        future for all.
      </p>
      <div className="divider" />
      <div className="mb-4">
        <h2 className="font-semibold text-2xl mb-4">
          Data Sources and Methodology
        </h2>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-md">Data Sources:</h2>
          <p>
            The dataset used in this project was obtained from Kaggle. It can be
            accessed at:
          </p>
        </div>
        <CodeBlock text="https://www.kaggle.com/code/melikedilekci/diabetes-dataset-for-beginners" />
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-md">Methodology:</h2>
          <p>
            The following machine learning algorithms were used in this project:
          </p>
        </div>
        <ul className="list-disc ml-8">
          <li>Support Vector Machine (SVM).</li>
          <li>Random Forest.</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-md">Algorithm Selection:</h2>
        <ul className="list-disc ml-8">
          <li>
            Support Vector Machine (SVM) algorithm was chosen for its robustness
            in handling complex datasets and its ability to find optimal
            decision boundaries. SVM performs well in high-dimensional spaces
            and is effective in cases where the data may not be linearly
            separable.
          </li>
          <li>
            Random Forest, on the other hand, was selected for its ensemble
            learning approach, which combines multiple decision trees to improve
            prediction accuracy. It is capable of handling large datasets with
            high dimensionality and is less prone to overfitting compared to
            individual decision trees.
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-semibold text-md">Technology Used: </h2>
        <p>
          This web application was developed using Streamlit, a powerful Python
          library for creating interactive web applications.
        </p>
      </div>
    </div>
  );
};

export default About;
