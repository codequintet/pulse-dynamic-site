import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewMessages = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">View Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Messages functionality will be implemented with Supabase integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewMessages;