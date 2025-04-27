
import { useState } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { eventsCollection, db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/types';

const ManageEvents = () => {
  const { data: events, loading, error } = useFirebaseData<Event>(eventsCollection);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: '',
    registrationLink: '',
    recordingLink: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, eventsCollection), formData);
      setFormData({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        type: '',
        registrationLink: '',
        recordingLink: ''
      });
      toast({
        title: "Success",
        description: "Event added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, eventsCollection, id));
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Manage Events</h2>
      
      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">Add New Event</h3>
        <Input
          placeholder="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          type="date"
          placeholder="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <Input
          type="time"
          placeholder="Time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />
        <Input
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <Input
          placeholder="Event Type (e.g. Webinar, Conference, Workshop)"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />
        <Input
          placeholder="Registration Link (optional)"
          value={formData.registrationLink}
          onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
        />
        <Input
          placeholder="Recording Link (optional)"
          value={formData.recordingLink}
          onChange={(e) => setFormData({ ...formData, recordingLink: e.target.value })}
        />
        <Button type="submit">Add Event</Button>
      </form>

      {/* Events List */}
      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 border rounded-lg flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} | {event.time} | {event.location}</p>
              <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded-full mt-2">{event.type}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;
