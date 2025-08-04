import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageProjects = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Projects</h1>
      <Card>
        <CardHeader>
          <CardTitle>Projects Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Project management will be implemented with Supabase integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageProjects;