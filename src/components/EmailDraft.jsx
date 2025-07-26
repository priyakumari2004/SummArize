import React, { useState, useEffect } from 'react';
import { Mail, Copy, Send, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const EmailDraft = ({ emailDraft }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(emailDraft);
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  //const { toast } = useToast();

  const extractSubject = (email) => {
    const subjectMatch = email.match(/Subject: (.+)/);
    return subjectMatch ? subjectMatch[1] : 'Follow-up: Meeting Summary';
  };

  const extractBody = (email) => {
    const bodyStart = email.indexOf('Dear');
    return bodyStart !== -1 ? email.substring(bodyStart) : email;
  };

  useEffect(() => {
    setSubject(extractSubject(emailDraft));
  }, [emailDraft]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedEmail);
      toast({
        title: "Copied to clipboard",
        description: "Email draft has been copied to your clipboard."
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy failed",
        description: "Failed to copy email to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleSendEmail = () => {
    const emailBody = extractBody(editedEmail);
    const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    toast({
      title: "Opening email client",
      description: "Your default email client should open with the draft."
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your email draft has been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Follow-up Email Draft
              </CardTitle>
              <CardDescription>
                AI-generated professional follow-up email based on meeting discussion
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Input
              id="recipients"
              type="email"
              placeholder="Enter email addresses separated by commas"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-body">Email Body</Label>
            {!isEditing ? (
              <div className="bg-gray-50 rounded-lg p-4 border max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {extractBody(editedEmail)}
                </pre>
              </div>
            ) : (
              <Textarea
                id="email-body"
                value={extractBody(editedEmail)}
                onChange={(e) => setEditedEmail(`Subject: ${subject}\n\n${e.target.value}`)}
                className="min-h-96 resize-none"
                placeholder="Compose your follow-up email..."
              />
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSendEmail}
              disabled={!recipients.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Open in Email Client
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {extractBody(editedEmail).split(' ').length}
            </div>
            <div className="text-sm text-gray-500">Words</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.ceil(extractBody(editedEmail).split(' ').length / 200)}
            </div>
            <div className="text-sm text-gray-500">Est. Read Time (min)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {recipients.split(',').filter(email => email.trim()).length || 0}
            </div>
            <div className="text-sm text-gray-500">Recipients</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailDraft;
