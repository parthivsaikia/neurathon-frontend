import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState, FormEvent } from "react";
import { XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Summary from "./summaryCard";
import axios from "axios";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = ({ summary, setSummary }) => {
  const [file, setFile] = useState<File | null>(null);
  const [route, setRoute] = useState("");
  const [fileStatus, setFileStatus] = useState<UploadStatus>("idle");
  const [error, setErrorMessage] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setErrorMessage("");
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }
    if (!route) {
      setErrorMessage("Please select a document type.");
      return;
    }

    setFileStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://parthivsaikia-neurathon-backend.hf.space/analyze/${route}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSummary(response.data.summary);
      setFileStatus("success");
      setErrorMessage("");
    } catch (error) {
      setFileStatus("error");
      setErrorMessage("Failed to upload file. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md flex flex-col justify-center items-center overflow-hidden shadow-xl bg-[#FFF5E1]">
        <CardHeader className="text-center">
          <CardTitle className="text-[#D32F2F]">Squeeze Your Tomato</CardTitle>
          <CardDescription className="text-[#4CAF50]">
            Unleash the juiciest insights from your document 🍅
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center w-full">
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center w-full mb-4">
              <Label className="text-center border-2 border-[#FF6347] py-3 bg-[#FFD700] rounded-full text-[#333] cursor-pointer px-4 hover:bg-[#FF4500] hover:text-white transition hover:border-2 hover:border-green-400">
                Pick Your Ripe Tomato
                <Input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="destructive">
                  {route ? route : `Chose your document type`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>File Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={route}
                  onValueChange={(value) => {
                    setRoute(value);
                    setErrorMessage("");
                  }}
                >
                  <DropdownMenuRadioItem value="research">
                    Research Paper
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="legal">
                    Legal Paper
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="contract">
                    Contract Paper
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {file && (
              <div className="flex items-center justify-between bg-[#FFEBCC] px-4 py-2 rounded-lg shadow-md w-full mt-2">
                <span className="text-[#D32F2F] font-medium">{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFileRemove}
                  className="text-[#D32F2F] hover:text-[#FF4500]"
                  title="Remove this tomato"
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            )}

            {error && (
              <div className="my-4">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-center p-5 w-full gap-5">
              <Button
                type="submit"
                disabled={fileStatus === "uploading"}
                className="rounded-full w-28 bg-[#4CAF50] text-white hover:bg-[#388E3C] disabled:opacity-70"
              >
                {fileStatus === "uploading" ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Juicing...</span>
                  </div>
                ) : (
                  "Juice It"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {(fileStatus === "success" || fileStatus === "uploading") && (
        <Summary summary={summary} />
      )}
    </div>
  );
};

export default FileUploader;
