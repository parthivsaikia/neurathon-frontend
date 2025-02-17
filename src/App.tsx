import axios from "axios";
import { useEffect } from "react";
import FileUploader from "./components/fileUploader";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://parthivsaikia-neurathon-backend.hf.space",
      );
      console.log(response.data);
    };
    fetchData();
  }, []);
  return <div>
    <FileUploader/>
  </div>;
};

export default App;
