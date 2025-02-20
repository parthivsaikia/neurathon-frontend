import "./index.css";
import FileUploader from "./components/fileUploader";
import GradientText from "./blocks/TextAnimations/GradientText/GradientText";
const App = () => {
  return (
    <div>
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class text-8xl"
      >
        <h1>Add a splash of color!</h1>
      </GradientText>
      <div className="flex justify-center items-center h-screen">
        <FileUploader />
      </div>
    </div>
  );
};

export default App;
