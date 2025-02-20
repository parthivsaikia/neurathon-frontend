import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FileUploader = () => {
  return (

      <div className="flex items-center justify-center my-auto w-full md:w-1/3 shadow-4xl">
        <Card className="w-4/5 flex-col justify-center items-center overflow-hidden ">
          <CardHeader className="text-center">
            <CardTitle>Upload your file</CardTitle>
            <CardDescription>Summarise your document</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="" className="flex-col items-center justify-center">
              <div className="flex justify-center w-full items-center p-5">
                <Label className="text-center border-2 border-gray-200 p-3 bg-pink-100 rounded-full w-full text-black">
                  Upload your file
                  <Input type="file" className="my-3 rounded-full hidden" />
                </Label>
              </div>
              <div className="flex items-center justify-between  p-5 w-full">
                <Button className="rounded-full w-28">Cancel</Button>
                <Button className="rounded-full w-28">Summarise</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
};

export default FileUploader;
