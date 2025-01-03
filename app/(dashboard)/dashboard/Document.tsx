import { Trash, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";

interface Document {
  id: number;
  name: string;
  size: string;
  date: string;
}

const DocumentUploader = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);
      const uploadedFiles = Array.from(event.target.files).map(
        (file, index) => ({
          id: Date.now() + index,
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} mb`,
          date: new Date().toLocaleDateString(),
        })
      );
      setDocuments((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const handleDelete = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="w-full mx-auto p-6 font-body">
      <h1 className="text-foreground mt-12 mb-4 text-3xl font-body font-medium ">
        Add Document
      </h1>
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <div className="p-3 bg-background rounded-xl w-full">
          <div className="border m-5 border-blue-400 rounded-xl p-6 text-center mb-6">
            <label
              htmlFor="file-upload"
              className="cursor-pointer hover:underline font-body flex justify-center items-center gap-4"
            >
              <Upload /> Upload any public or private docs
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
          </div>
        </div>
        <div className="mt-4 w-full">
          {documents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="relative bg-background border border-blue-500  rounded-xl p-4 flex flex-col items-center"
                >
                  <div className="w-20 py-8 bg-red-100 mb-4 text-red-500 flex items-center justify-center rounded mb-8">
                    <span className="font-bold text-lg uppercase ">
                      {doc.name.split(".")[1]}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-center mb-3">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {doc.date} / {doc.size}
                  </p>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="absolute top-2 right-2 text-blue-3   00 hover:text-red-700"
                  >
                    <Trash2  />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
          Continue
        </button>
      </div>
    </div>
  );
};

export default DocumentUploader;
