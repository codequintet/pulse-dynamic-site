
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { 
  projectsCollection, 
  publicationsCollection,
  eventsCollection,
  studentsCollection
} from '@/lib/firebase';

const AdminDashboard = () => {
  const { data: projects, loading: projectsLoading } = useFirebaseData(projectsCollection);
  const { data: publications, loading: publicationsLoading } = useFirebaseData(publicationsCollection);
  const { data: events, loading: eventsLoading } = useFirebaseData(eventsCollection);
  const { data: students, loading: studentsLoading } = useFirebaseData(studentsCollection);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      <p className="text-gray-600">Manage your website content from this dashboard.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {projectsLoading ? "..." : projects.length}
            </p>
            <p className="text-sm text-muted-foreground">Total projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {publicationsLoading ? "..." : publications.length}
            </p>
            <p className="text-sm text-muted-foreground">Total publications</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {studentsLoading ? "..." : students.length}
            </p>
            <p className="text-sm text-muted-foreground">Total team members</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {eventsLoading ? "..." : events.length}
            </p>
            <p className="text-sm text-muted-foreground">Total events</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
