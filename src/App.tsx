import "./index.css";
import FileUploader from "./components/fileUploader";
import GradientText from "./blocks/TextAnimations/GradientText/GradientText";
import { useState } from "react";


const App = () => {
  const [summary, setSummary] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-x-hidden overflow-y-auto p-4">
      {!summary && (
        <GradientText
          colors={["#FF6347", "#4CAF50", "#FF4500", "#D32F2F", "#FFD700"]}
          animationSpeed={5}
          showBorder={false}
          className="custom-class text-center text-4xl m-4"
        >
          <h1>Squeeze Out the Juicy Insights! 🍅</h1>
        </GradientText>
      )}
      <div className="flex items-center justify-center w-full max-w-md px-4">
        <FileUploader setSummary={setSummary} summary={summary} />
      </div>
    </div>
  );
};

export default App;
