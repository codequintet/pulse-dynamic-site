import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageTeam = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Team</h1>
      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Team management will be implemented with Supabase integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTeam;