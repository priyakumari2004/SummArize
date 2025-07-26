import React, { useState } from 'react';
import { toast } from 'sonner';
import { Upload, FileAudio, FileVideo, Loader2, CheckCircle, Mail, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

import FileUpload from '@/components/FileUpload';
import TranscriptionResult from '@/components/TranscriptionResult';
import SummaryResult from '@/components/SummaryResult';
import EmailDraft from '@/components/EmailDraft';



const Index = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  

  const handleFileUpload = async (file) => {
    const meetingId = Date.now().toString();
    const newMeeting = {
      id: meetingId,
      fileName: file.name,
      transcription: '',
      summary: '',
      keyPoints: [],
      actionItems: [],
      emailDraft: '',
      status: 'uploading',
      uploadedAt: new Date(),
    };

    setMeetings(prev => [newMeeting, ...prev]);
    setSelectedMeeting(newMeeting);

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update status to transcribing
      setMeetings(prev => prev.map(m => 
        m.id === meetingId ? { ...m, status: 'transcribing' } : m
      ));

      // Simulate transcription process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTranscription = `...transcription here...`;/*`Welcome everyone to today's quarterly review meeting. I'm glad to see we have all team members present. 

      Let's start with our progress review. Sarah, could you please share the marketing metrics from last quarter? 

      Sarah: Thank you, John. Our marketing efforts have shown significant improvement. We've seen a 35% increase in lead generation compared to the previous quarter. The social media campaigns performed exceptionally well, with engagement rates up by 45%. However, we did notice some challenges with our email marketing conversion rates, which dropped by 8%.

      John: That's great progress on the lead generation front. What do you think caused the email marketing decline?

      Sarah: We believe it's due to changes in email algorithms and increased competition in our customers' inboxes. We're planning to A/B test new subject lines and personalization strategies.

      Mike: From the development side, we've successfully launched two major features this quarter. The new dashboard has received positive feedback from 89% of our beta users. We did encounter some performance issues initially, but those have been resolved. Our next priority is implementing the requested mobile app features.

      John: Excellent work, Mike. Lisa, how are we doing on the customer support front?

      Lisa: Customer satisfaction scores have improved to 4.6 out of 5. We've reduced average response time from 24 hours to 8 hours. However, we're seeing an increase in technical support requests, which suggests we need better user onboarding.

      John: These are all valuable insights. Let's discuss action items for next quarter. Sarah, can you prepare a detailed email marketing optimization plan? Mike, let's prioritize the mobile features based on user feedback. Lisa, please work with Mike on improving the onboarding process.

      Meeting adjourned. Thank you everyone for your time and excellent work.`;*/

      // Update with transcription and set to summarizing
      setMeetings(prev => prev.map(m => 
        m.id === meetingId ? { 
          ...m, 
          transcription: mockTranscription,
          status: 'summarizing' 
        } : m
      ));

      // Simulate summarization process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockSummary = "...summary here...";
      
      const mockKeyPoints = ["...key points here..."];
        /*"Lead generation increased by 35% this quarter",
        "Social media engagement rates up 45%",
        "Email marketing conversion rates declined 8%",
        "New dashboard received 89% positive feedback from beta users",
        "Customer satisfaction improved to 4.6/5",
        "Average support response time reduced from 24 to 8 hours"
      ];*/

      const mockActionItems = ["...action item..."];

      const mockEmailDraft = `...email draft here...`;/*`Subject: Follow-up: Quarterly Review Meeting - Action Items and Next Steps

Dear Team,

Thank you for your participation in today's quarterly review meeting. I'm pleased to share that we've made significant progress across all departments.

**Key Highlights:**
• Marketing: 35% increase in lead generation, 45% boost in social media engagement
• Development: Successful launch of two major features with 89% positive user feedback
• Customer Support: Improved satisfaction score to 4.6/5 and reduced response time to 8 hours

**Action Items for Next Quarter:**

Sarah (Marketing):
- Develop comprehensive email marketing optimization plan
- Implement A/B testing for subject lines and personalization strategies
- Target: Improve email conversion rates by 15%

Mike (Development):
- Prioritize mobile app features based on beta user feedback
- Continue monitoring dashboard performance metrics
- Timeline: Mobile features rollout by end of next month

Lisa (Customer Support):
- Collaborate with Mike on enhanced user onboarding process
- Focus on reducing technical support requests through better UX
- Goal: Maintain 4.5+ satisfaction rating

**Next Steps:**
- Individual department plans due by [Date]
- Progress review meeting scheduled for [Date]
- Monthly check-ins to ensure we stay on track

Please let me know if you have any questions or need additional resources to complete your action items.

Best regards,
John Smith
Project Manager`;*/

      // Final update with all results
      const completedMeeting = {
        ...newMeeting,
        transcription: mockTranscription,
        summary: mockSummary,
        keyPoints: mockKeyPoints,
        actionItems: mockActionItems,
        emailDraft: mockEmailDraft,
        status: 'completed' 
      };

      setMeetings(prev => prev.map(m => 
        m.id === meetingId ? completedMeeting : m
      ));
      
      setSelectedMeeting(completedMeeting);

      toast({
        title: "Processing Complete!",
        description: "Your meeting has been transcribed and summarized successfully.",
      });

    } catch (error) {
      console.error('Processing error:', error);
      setMeetings(prev => prev.map(m => 
        m.id === meetingId ? { ...m, status: 'error' } : m
      ));
      
      toast({
        title: "Processing Failed",
        description: "There was an error processing your meeting. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
      case 'transcribing':
      case 'summarizing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <div className="h-4 w-4 bg-red-500 rounded-full" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'transcribing':
        return 'Transcribing audio...';
      case 'summarizing':
        return 'Generating summary...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">SummArize</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your meetings into actionable insights. Upload audio or video files to get instant transcriptions and summaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Upload and Meeting List */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Meeting
                </CardTitle>
                <CardDescription>
                  Upload audio or video files to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileUpload={handleFileUpload} />
              </CardContent>
            </Card>

            {/* Meeting History */}
            {meetings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Meetings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedMeeting?.id === meeting.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedMeeting(meeting)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm truncate">
                          {meeting.fileName}
                        </span>
                        {getStatusIcon(meeting.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {getStatusText(meeting.status)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {meeting.uploadedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {selectedMeeting ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedMeeting.fileName}</span>
                    <Badge 
                      variant={selectedMeeting.status === 'completed' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {getStatusText(selectedMeeting.status)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Meeting processed on {selectedMeeting.uploadedAt.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedMeeting.status === 'completed' ? (
                    <Tabs defaultValue="summary" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="transcription">Transcription</TabsTrigger>
                        <TabsTrigger value="email">Email Draft</TabsTrigger>
                        <TabsTrigger value="actions">Actions</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="summary" className="mt-6">
                        <SummaryResult 
                          summary={selectedMeeting.summary}
                          keyPoints={selectedMeeting.keyPoints}
                        />
                      </TabsContent>
                      
                      <TabsContent value="transcription" className="mt-6">
                        <TranscriptionResult transcription={selectedMeeting.transcription} />
                      </TabsContent>
                      
                      <TabsContent value="email" className="mt-6">
                        <EmailDraft emailDraft={selectedMeeting.emailDraft} />
                      </TabsContent>
                      
                      <TabsContent value="actions" className="mt-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Action Items</h3>
                          <div className="space-y-2">
                            {selectedMeeting.actionItems.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="text-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
                      <h3 className="text-lg font-semibold mb-2">
                        {getStatusText(selectedMeeting.status)}
                      </h3>
                      <p className="text-gray-600">
                        Please wait while we process your meeting...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileAudio className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Meeting Selected</h3>
                  <p className="text-gray-600 mb-6">
                    Upload a meeting file or select from your recent meetings to get started.
                  </p>
                  <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FileAudio className="h-4 w-4 mr-2" />
                      Audio Files
                    </div>
                    <div className="flex items-center">
                      <FileVideo className="h-4 w-4 mr-2" />
                      Video Files
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Transcription
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Drafts
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;