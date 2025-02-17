import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [status, setStatus] = useState<UploadStatus>("idle");
    const [file, setFile] = useState<File | null>(null);
    const [summary, setSummary] = useState("")
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!file) {
            return 
        }
        setStatus("uploading")
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await axios.post('https://parthivsaikia-neurathon-backend.hf.space/analyze/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            setSummary(response.data.summary)
            setFile(null)
            setStatus("success")
        } catch {
            setStatus('error')
        }

    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          {file && status !== "uploading" && (
            <button type="submit">Upload</button>
          )}
        </form>
        <div>{summary}</div>
      </div>
    );
};

export default FileUploader;
