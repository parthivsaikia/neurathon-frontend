import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
    </div>
  );
};

export default FileUploader;
