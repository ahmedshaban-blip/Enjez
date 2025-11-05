import React, { useRef } from "react";

export default function ServiceMedia({ selectedFiles, setSelectedFiles }) {
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    if (files.length) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setSelectedFiles((prev) => [...prev, ...imageFiles]);
    }
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = null; 
  };
  
  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDeleteImage = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <h3 className="text-lg font-bold mb-4">Images / Media</h3>

      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver} 
        onDrop={handleDrop}    
        className="cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center mb-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <span className="material-symbols-outlined text-4xl text-gray-400">
          upload_file
        </span>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">
          JPG, PNG, GIF (max 5MB per image)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Previews */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {selectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="relative border rounded-lg p-2 bg-gray-50 dark:bg-gray-800"
            >
              <img
                src={URL.createObjectURL(file)} 
                alt={file.name}
                className="h-24 w-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}