import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageEvents = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Events</h1>
      <Card>
        <CardHeader>
          <CardTitle>Events Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Events management will be implemented with Supabase integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageEvents;