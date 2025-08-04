
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { Event } from '@/types';

const EventsSection = () => {
  // Mock data for now - will be replaced with Supabase queries
  const events: Event[] = [
    {
      id: '1',
      title: 'AI Research Symposium',
      date: '2024-09-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      description: 'Annual symposium on artificial intelligence research',
      type: 'Conference',
      registrationLink: '#'
    },
    {
      id: '2',
      title: 'Workshop on Machine Learning',
      date: '2024-08-20',
      time: '2:00 PM',
      location: 'Lab 101',
      description: 'Hands-on workshop covering latest ML techniques',
      type: 'Workshop',
      recordingLink: '#'
    }
  ];
  
  const loading = false;
  const error = null;
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Split events into upcoming and past
  const currentDate = new Date();
  const upcomingEvents = events?.filter(event => new Date(event.date) >= currentDate) || [];
  const pastEvents = events?.filter(event => new Date(event.date) < currentDate) || [];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="text-center py-10">Loading events...</div>;
  if (error) return <div className="text-center py-10">Error: {error.message}</div>;
  
  return (
    <section id="events" className="section-padding">
      <div className="container-custom">
        <h2 className="section-heading text-center">Internships And Events</h2>
        <p className="section-subheading text-center">
          Stay updated on our conferences, workshops, seminars, and lectures
        </p>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upcoming" className="flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Past Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    formatDate={formatDate} 
                    isPast={false} 
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Past Events Tab */}
          <TabsContent value="past">
            <div className="space-y-6">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    formatDate={formatDate} 
                    isPast={true} 
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No past events to display.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

// Remove the local Event interface definition since we're importing it from types
interface EventCardProps {
  event: Event;
  formatDate: (date: string) => string;
  isPast: boolean;
}

const EventCard = ({ 
  event, 
  formatDate, 
  isPast 
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription className="text-gray-500">{formatDate(event.date)}</CardDescription>
          </div>
          <Badge 
            variant={event.type === 'Conference' ? 'default' : 
                    event.type === 'Workshop' ? 'secondary' : 
                    event.type === 'Lecture' ? 'outline' : 
                    'default'}
          >
            {event.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{event.description}</p>
        
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isPast ? (
          event.recordingLink && (
            <Button variant="outline" asChild className="w-full">
              <a href={event.recordingLink} target="_blank" rel="noopener noreferrer">
                View Recording
              </a>
            </Button>
          )
        ) : (
          event.registrationLink && (
            <Button asChild className="w-full">
              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default EventsSection;
