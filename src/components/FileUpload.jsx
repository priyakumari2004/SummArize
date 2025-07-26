import React, { useCallback, useState } from 'react';
import { Upload, FileAudio, FileVideo, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  //const { toast } = useToast();

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file) => {
    if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an audio or video file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 100MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('audio/')) {
      return <FileAudio className="h-8 w-8 text-blue-500" />;
    } else if (fileType.startsWith('video/')) {
      return <FileVideo className="h-8 w-8 text-purple-500" />;
    }
    return <Upload className="h-8 w-8 text-gray-400" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-4">
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop your meeting file here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse files
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <FileAudio className="h-4 w-4 mr-1" />
                Audio
              </span>
              <span className="flex items-center">
                <FileVideo className="h-4 w-4 mr-1" />
                Video
              </span>
              <span>Max 100MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon(selectedFile.type)}
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {selectedFile && (
        <Button onClick={handleUpload} className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          Process Meeting
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
