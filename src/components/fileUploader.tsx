import { ChangeEvent, useState, FormEvent, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [route, setRoute] = useState("");
  const [summary, setSummary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setErrorMessage("");
    }
  };

  const handleCustomButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate file and route selection
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }
    if (!route) {
      setErrorMessage("Please select a document type.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setStatus("uploading");
    setErrorMessage("");

    try {
      const response = await axios.post(
        `https://parthivsaikia-neurathon-backend.hf.space/analyze/${route}/`,
        formData,
        {
          headers: {
          "Content-Type": "multipart/form-data"
        }}
      );
      setSummary(response.data.summary);
      setStatus("success");
    } catch  {
      setStatus("error");
      setErrorMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-purple-950 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg border border-indigo-100 dark:border-purple-900 w-full max-w-md space-y-8 transition-all duration-300 hover:shadow-xl"
      >
        <div className="flex justify-center mb-6">
          <svg
            className="w-14 h-14 text-indigo-600 dark:text-indigo-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <path d="M14 2v6h6"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
            <path d="M10 9H8"></path>
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-300 text-center mb-8">
          Upload Your Document
        </h2>

        <div className="space-y-4 mb-8">
          <Label
            htmlFor="file"
            className="block text-sm font-medium text-indigo-700 dark:text-indigo-300"
          >
            Select File
          </Label>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={handleCustomButtonClick}
              className="w-full h-32 border-2 border-dashed border-indigo-300 dark:border-purple-700 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-indigo-50 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-slate-600 transition-colors"
            >
              <svg
                className="w-12 h-12 text-indigo-500 dark:text-indigo-400 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {file ? (
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  {file.name}
                </p>
              ) : (
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Drag & drop your file or click to browse
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <Label
            htmlFor="document-type"
            className="block text-sm font-medium text-indigo-700 dark:text-indigo-300"
          >
            Document Type
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                id="document-type"
                variant="outline"
                className="w-full border-indigo-300 dark:border-purple-700 bg-indigo-50 dark:bg-slate-700  dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-600 transition-colors text-white"
              >
                {route ? `Type: ${route}` : "Choose Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-purple-800">
              <DropdownMenuLabel className="text-indigo-700 dark:text-indigo-300">
                Document Type
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-indigo-200 dark:bg-purple-800" />
              <DropdownMenuRadioGroup
                value={route}
                onValueChange={(value) => {
                  setRoute(value);
                  setErrorMessage("");
                }}
              >
                <DropdownMenuRadioItem
                  value="research"
                  className="text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Research Paper
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="legal"
                  className="text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Legal Paper
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="contract"
                  className="text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Contract Paper
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {errorMessage && (
          <div className="my-6">
            <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
              {errorMessage}
            </p>
          </div>
        )}

        {status === "success" && summary && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-800 my-6">
            <p className="text-sm text-green-600 dark:text-green-400">
              {summary}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            disabled={status === "uploading"}
            className="px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "uploading" ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0116 0H4z"
                  ></path>
                </svg>
                <span>Uploading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-indigo-500 dark:text-indigo-400 mt-6">
          Supported file types: PDF, DOCX, TXT
        </p>
      </form>
    </div>
  );
};

export default FileUploader;
