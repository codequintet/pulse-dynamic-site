
import { useState } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { studentsCollection, db, storage } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { TeamMember } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { trash } from 'lucide-react';

const ManageTeam = () => {
  const { data: teamMembers, loading, error } = useFirebaseData<TeamMember>(studentsCollection);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    email: '',
    publications: '0',
    website: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      let imageUrl = formData.image;
      
      // Upload image if selected
      if (imageFile) {
        const storageRef = ref(storage, `team/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      
      await addDoc(collection(db, studentsCollection), {
        ...formData,
        image: imageUrl,
        publications: parseInt(formData.publications)
      });
      
      setFormData({
        name: '',
        role: '',
        bio: '',
        image: '',
        email: '',
        publications: '0',
        website: ''
      });
      setImageFile(null);
      
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, studentsCollection, id));
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Manage Team</h2>
      
      {/* Add Team Member Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">Add New Team Member</h3>
        
        <div>
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Input
            placeholder="Role/Position"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Biography"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="image">Profile Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        
        {!imageFile && (
          <div>
            <Input
              placeholder="Image URL (if not uploading)"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
        )}
        
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Input
            type="number"
            placeholder="Number of Publications"
            value={formData.publications}
            onChange={(e) => setFormData({ ...formData, publications: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Input
            placeholder="Personal Website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>
        
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Add Team Member"}
        </Button>
      </form>

      {/* Team Members List */}
      <h3 className="text-xl font-semibold">Current Team Members</h3>
      {teamMembers.length === 0 ? (
        <p>No team members found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  {member.image && (
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                  >
                    <trash className="h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageTeam;
