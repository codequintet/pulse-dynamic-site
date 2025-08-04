import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManageGallery = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Gallery</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gallery Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Gallery management will be implemented with Supabase integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageGallery;