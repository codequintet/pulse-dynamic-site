import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, FileText } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { studentsCollection, facultyCollection, researchersCollection } from '@/lib/firebase';
import { TeamMember } from '@/types';

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState("faculty");
  const { data: studentsData, loading: studentsLoading } = useFirebaseData<TeamMember>(studentsCollection);
  const { data: facultyData, loading: facultyLoading } = useFirebaseData<TeamMember>(facultyCollection);
  const { data: researchersData, loading: researchersLoading } = useFirebaseData<TeamMember>(researchersCollection);
  
  return (
    <section id="team" className="section-padding bg-secondary">
      <div className="container-custom">
        <h2 className="section-heading text-center">Our Team</h2>
        <p className="section-subheading text-center">
          Meet our dedicated  Researchers, Students and Interns working together on groundbreaking research
        </p>
        
        <Tabs defaultValue="faculty" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              
              <TabsTrigger value="researchers" className="flex items-center justify-center">
                Researchers
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center justify-center">
                Students
              </TabsTrigger>
              <TabsTrigger value="faculty" className="flex items-center justify-center">
                Intern
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Faculty Tab */}
          <TabsContent value="faculty">
            {facultyLoading ? (
              <div className="text-center py-10">Loading Intern...</div>
            ) : facultyData.length === 0 ? (
              <div className="text-center py-10">No Intern found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facultyData.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Researchers Tab */}
          <TabsContent value="researchers">
            {researchersLoading ? (
              <div className="text-center py-10">Loading researchers...</div>
            ) : researchersData.length === 0 ? (
              <div className="text-center py-10">No researchers found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchersData.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
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
      </div>
    </section>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <Card className="border border-primary/20 hover:border-primary transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-primary">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
          </div>
          
          <p className="text-sm text-muted-foreground">{member.bio}</p>
          
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                {member.email}
              </a>
            </div>
            
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              <span>{member.publications} Publications</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamSection;
