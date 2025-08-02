import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, FileText } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { btechStudentsCollection, mtechStudentsCollection, facultyCollection, researchersCollection } from '@/lib/firebase';
import { TeamMember } from '@/types';

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState("researchers");
  const { data: btechStudentsData, loading: btechStudentsLoading } = useFirebaseData<TeamMember>(btechStudentsCollection);
  const { data: mtechStudentsData, loading: mtechStudentsLoading } = useFirebaseData<TeamMember>(mtechStudentsCollection);
  const { data: facultyData, loading: facultyLoading } = useFirebaseData<TeamMember>(facultyCollection);
  const { data: researchersData, loading: researchersLoading } = useFirebaseData<TeamMember>(researchersCollection);
  
  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our dedicated researchers, students and interns working together on groundbreaking research
          </p>
        </div>
        
        <Tabs defaultValue="researchers" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 h-12">
              <TabsTrigger value="researchers" className="text-sm font-medium">
                Researchers
              </TabsTrigger>
              <TabsTrigger value="btech" className="text-sm font-medium">
                BTech Students
              </TabsTrigger>
              <TabsTrigger value="mtech" className="text-sm font-medium">
                MTech Students
              </TabsTrigger>
              <TabsTrigger value="faculty" className="text-sm font-medium">
                Interns
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Researchers Tab */}
          <TabsContent value="researchers">
            {researchersLoading ? (
              <div className="text-center py-16">
                <div className="animate-pulse text-muted-foreground">Loading researchers...</div>
              </div>
            ) : researchersData.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No researchers found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {researchersData.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* BTech Students Tab */}
          <TabsContent value="btech">
            {btechStudentsLoading ? (
              <div className="text-center py-16">
                <div className="animate-pulse text-muted-foreground">Loading BTech students...</div>
              </div>
            ) : btechStudentsData.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No BTech students found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {btechStudentsData.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* MTech Students Tab */}
          <TabsContent value="mtech">
            {mtechStudentsLoading ? (
              <div className="text-center py-16">
                <div className="animate-pulse text-muted-foreground">Loading MTech students...</div>
              </div>
            ) : mtechStudentsData.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No MTech students found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mtechStudentsData.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Faculty/Interns Tab */}
          <TabsContent value="faculty">
            {facultyLoading ? (
              <div className="text-center py-16">
                <div className="animate-pulse text-muted-foreground">Loading interns...</div>
              </div>
            ) : facultyData.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No interns found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facultyData.map((member) => (
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
    <Card className="group border-2 border-muted hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Member Image */}
          {member.image && (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-all duration-300">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Member Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
            <p className="text-primary font-medium text-sm">{member.role}</p>
          </div>
          
          {/* Bio */}
          {member.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed text-center">{member.bio}</p>
          )}
          
          {/* Contact & Publications */}
          <div className="flex flex-col space-y-3 pt-4 border-t border-muted">
            {member.email && (
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  {member.email}
                </a>
              </div>
            )}
            
            {member.publications > 0 && (
              <div className="flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">{member.publications} Publications</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamSection;
