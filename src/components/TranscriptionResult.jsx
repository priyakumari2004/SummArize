import React, { useState } from 'react';
import { Copy, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const TranscriptionResult = ({ transcription }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscription, setEditedTranscription] = useState(transcription);
  //const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
      toast({
        title: "Copied to clipboard",
        description: "Transcription has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy failed",
        description: "Failed to copy transcription to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([transcription], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'meeting-transcription.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Download started",
      description: "Transcription file is being downloaded.",
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your edits have been saved successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Full Transcription
              </CardTitle>
              <CardDescription>
                Complete transcript of the meeting audio
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              ) : (
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {transcription}
              </pre>
            </div>
          ) : (
            <Textarea
              value={editedTranscription}
              onChange={(e) => setEditedTranscription(e.target.value)}
              className="min-h-96 resize-none"
              placeholder="Edit your transcription..."
            />
          )}
        </CardContent>
      </Card>

      {/* Transcription Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {transcription.split(' ').length}
            </div>
            <div className="text-sm text-gray-500">Words</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {transcription.length}
            </div>
            <div className="text-sm text-gray-500">Characters</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.ceil(transcription.split(' ').length / 150)}
            </div>
            <div className="text-sm text-gray-500">Est. Minutes</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranscriptionResult;
