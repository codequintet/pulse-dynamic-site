import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManagePublications = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Publications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Publications Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Publications management will be implemented with Supabase integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePublications;