import React from 'react';
import { FileText, Key, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const SummaryResult = ({ summary, keyPoints }) => {
  const { toast } = useToast();

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast({
        title: "Copied to clipboard",
        description: "Summary has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy failed",
        description: "Failed to copy summary to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleCopyKeyPoints = async () => {
    try {
      const keyPointsText = keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n');
      await navigator.clipboard.writeText(keyPointsText);
      toast({
        title: "Copied to clipboard",
        description: "Key points have been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy failed",
        description: "Failed to copy key points to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Meeting Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Meeting Summary
              </CardTitle>
              <CardDescription>
                AI-generated overview of the meeting discussion
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopySummary}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Key Discussion Points
              </CardTitle>
              <CardDescription>
                Important topics and insights from the meeting
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyKeyPoints}>
              <Copy className="h-4 w-4 mr-2" />
              Copy All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Badge variant="secondary" className="mt-0.5 text-xs">
                  {index + 1}
                </Badge>
                <p className="text-sm text-gray-700 flex-1">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {keyPoints.length}
            </div>
            <div className="text-sm text-gray-500">Key Points Identified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {summary.split(' ').length}
            </div>
            <div className="text-sm text-gray-500">Summary Word Count</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryResult;
