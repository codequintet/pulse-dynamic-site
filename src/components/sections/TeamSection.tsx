
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, FileText, Users } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { studentsCollection } from '@/lib/firebase';
import { TeamMember } from '@/types';

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState("faculty");
  const { data: studentsData, loading: studentsLoading } = useFirebaseData<TeamMember>(studentsCollection);
  
  // Sample data for faculty and researchers (to be replaced later with Firebase data)
  const teamData = {
    faculty: [
      {
        id: "1",
        name: "Dr. Jennifer Smith",
        role: "Director & Professor",
        bio: "Dr. Smith leads our research lab with over 20 years of experience in AI and machine learning applications.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        email: "jsmith@researchlab.edu",
        publications: 120,
        website: "#"
      },
      {
        id: "2",
        name: "Dr. Michael Chen",
        role: "Associate Professor",
        bio: "Specializing in quantum computing and theoretical physics, Dr. Chen has pioneered several breakthrough algorithms.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        email: "mchen@researchlab.edu",
        publications: 85,
        website: "#"
      },
      {
        id: "3",
        name: "Dr. Sarah Rodriguez",
        role: "Assistant Professor",
        bio: "Dr. Rodriguez focuses on neural interfaces and their applications in healthcare and accessibility.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
        email: "srodriguez@researchlab.edu",
        publications: 42,
        website: "#"
      }
    ],
    researchers: [
      {
        id: "4",
        name: "Dr. James Wilson",
        role: "Senior Researcher",
        bio: "Dr. Wilson's work centers on sustainable energy technologies and their global implementation.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        email: "jwilson@researchlab.edu",
        publications: 56,
        website: "#"
      },
      {
        id: "5",
        name: "Dr. Emily Taylor",
        role: "Research Scientist",
        bio: "With expertise in blockchain technologies, Dr. Taylor explores applications in scientific data integrity.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        email: "etaylor@researchlab.edu",
        publications: 31,
        website: "#"
      },
      {
        id: "6",
        name: "Dr. David Park",
        role: "Research Scientist",
        bio: "Dr. Park specializes in robotics for healthcare applications, particularly in surgical assistance.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        email: "dpark@researchlab.edu",
        publications: 28,
        website: "#"
      }
    ]
  };
  
  return (
    <section id="team" className="section-padding bg-secondary">
      <div className="container-custom">
        <h2 className="section-heading text-center">Our Team</h2>
        <p className="section-subheading text-center">
          Meet our dedicated faculty, researchers, and students working together on groundbreaking research
        </p>
        
        <Tabs defaultValue="faculty" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="faculty" className="flex items-center justify-center">
                <Users className="mr-2 h-4 w-4" />
                Faculty
              </TabsTrigger>
              <TabsTrigger value="researchers" className="flex items-center justify-center">
                <FileText className="mr-2 h-4 w-4" />
                Researchers
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center justify-center">
                <Users className="mr-2 h-4 w-4" />
                Students
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Faculty Tab */}
          <TabsContent value="faculty">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.faculty.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
          
          {/* Researchers Tab */}
          <TabsContent value="researchers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.researchers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
          
          {/* Students Tab */}
          <TabsContent value="students">
            {studentsLoading ? (
              <div className="text-center py-10">Loading students...</div>
            ) : studentsData.length === 0 ? (
              <div className="text-center py-10">No students found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentsData.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Join Our Team Button */}
        <div className="mt-12 text-center">
          <Button size="lg">Join Our Team</Button>
        </div>
      </div>
    </section>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-all">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{member.name}</h3>
          <p className="text-white/80 text-sm">{member.role}</p>
        </div>
      </div>
      <CardContent className="pt-4">
        <p className="text-muted-foreground mb-4">{member.bio}</p>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-primary" />
            <a href={`mailto:${member.email}`} className="hover:text-primary">
              {member.email}
            </a>
          </div>
          
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            <span>{member.publications} Publications</span>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href={member.website}>View Profile</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamSection;
