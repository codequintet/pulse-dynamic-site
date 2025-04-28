
import { useState } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { db } from '@/lib/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: {
    toDate: () => Date;
  };
  status: 'read' | 'unread';
}

const ViewMessages = () => {
  const { data: messages, loading } = useFirebaseData<Message>('messages');
  const { toast } = useToast();
  
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'messages', id), {
        status: 'read'
      });
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Messages</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id} className={msg.status === 'unread' ? 'bg-muted/50' : ''}>
              <TableCell>{format(msg.timestamp.toDate(), 'PPp')}</TableCell>
              <TableCell>{msg.name}</TableCell>
              <TableCell>{msg.email}</TableCell>
              <TableCell>{msg.subject}</TableCell>
              <TableCell className="max-w-md truncate">{msg.message}</TableCell>
              <TableCell>
                {msg.status === 'unread' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(msg.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                ) : (
                  <span className="text-muted-foreground">Read</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(msg.id)}
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewMessages;
