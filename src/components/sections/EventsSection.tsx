
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from 'lucide-react';

// Sample events data
const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "Annual Research Symposium",
      date: "2025-05-15",
      time: "09:00 - 17:00",
      location: "Main Campus, Auditorium A",
      description: "Join us for a day of research presentations, keynote speeches, and networking with leading researchers in various fields.",
      type: "Conference",
      registrationLink: "#"
    },
    {
      id: 2,
      title: "AI Ethics Workshop",
      date: "2025-05-28",
      time: "13:00 - 16:00",
      location: "Virtual (Zoom)",
      description: "An interactive workshop discussing ethical considerations in AI development and implementation.",
      type: "Workshop",
      registrationLink: "#"
    },
    {
      id: 3,
      title: "Guest Lecture: Quantum Computing",
      date: "2025-06-10",
      time: "15:00 - 17:00",
      location: "Science Building, Room 305",
      description: "Distinguished lecture by Dr. Robert Lee on recent advancements in quantum computing algorithms.",
      type: "Lecture",
      registrationLink: "#"
    }
  ],
  past: [
    {
      id: 4,
      title: "Research Funding Workshop",
      date: "2025-04-05",
      time: "10:00 - 12:00",
      location: "Engineering Building, Room 201",
      description: "Workshop on strategies for securing research grants and managing research funds effectively.",
      type: "Workshop",
      recordingLink: "#"
    },
    {
      id: 5,
      title: "Climate Tech Innovation Panel",
      date: "2025-03-20",
      time: "14:00 - 16:00",
      location: "Environmental Sciences Center",
      description: "Panel discussion on technological innovations addressing climate change challenges.",
      type: "Panel",
      recordingLink: "#"
    },
    {
      id: 6,
      title: "Neural Interfaces Seminar",
      date: "2025-03-08",
      time: "11:00 - 13:00",
      location: "Medical Sciences Building, Room 150",
      description: "Seminar on recent developments in neural interface technologies for healthcare applications.",
      type: "Seminar",
      recordingLink: "#"
    },
    {
      id: 7,
      title: "Blockchain in Science Symposium",
      date: "2025-02-15",
      time: "09:00 - 17:00",
      location: "Conference Center, Hall B",
      description: "Full-day symposium exploring blockchain applications in scientific research and data integrity.",
      type: "Conference",
      recordingLink: "#"
    }
  ]
};

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <section id="events" className="section-padding">
      <div className="container-custom">
        <h2 className="section-heading text-center">Events</h2>
        <p className="section-subheading text-center">
          Stay updated on our conferences, workshops, seminars, and lectures
        </p>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upcoming" className="flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Past Events
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {eventsData.upcoming.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  formatDate={formatDate} 
                  isPast={false} 
                />
              ))}
              
              {eventsData.upcoming.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Past Events Tab */}
          <TabsContent value="past">
            <div className="space-y-6">
              {eventsData.past.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  formatDate={formatDate} 
                  isPast={true} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Calendar Subscription Button */}
        <div className="mt-12 text-center">
          <Button size="lg">
            <Calendar className="mr-2 h-4 w-4" />
            Subscribe to Our Calendar
          </Button>
        </div>
      </div>
    </section>
  );
};

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  registrationLink?: string;
  recordingLink?: string;
}

const EventCard = ({ 
  event, 
  formatDate, 
  isPast 
}: { 
  event: Event; 
  formatDate: (date: string) => string;
  isPast: boolean;
}) => {
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
          <Button variant="outline" asChild className="w-full">
            <a href={event.recordingLink} target="_blank" rel="noopener noreferrer">
              View Recording
            </a>
          </Button>
        ) : (
          <Button asChild className="w-full">
            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              Register Now
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventsSection;
