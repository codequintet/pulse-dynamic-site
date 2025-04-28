import { useState } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { studentsCollection, facultyCollection, researchersCollection, db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { TeamMember } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ManageTeam = () => {
  const { data: students } = useFirebaseData<TeamMember>(studentsCollection);
  const { data: faculty } = useFirebaseData<TeamMember>(facultyCollection);
  const { data: researchers } = useFirebaseData<TeamMember>(researchersCollection);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    email: '',
    publications: '0',
    website: '',
    type: 'student'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCollectionByType = (type: string) => {
    switch(type) {
      case 'faculty':
        return facultyCollection;
      case 'researcher':
        return researchersCollection;
      default:
        return studentsCollection;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const collectionName = getCollectionByType(formData.type);
      
      await addDoc(collection(db, collectionName), {
        ...formData,
        publications: parseInt(formData.publications)
      });
      
      setFormData({
        name: '',
        role: '',
        bio: '',
        email: '',
        publications: '0',
        website: '',
        type: 'student'
      });
      
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
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    try {
      const collectionName = getCollectionByType(type);
      await deleteDoc(doc(db, collectionName, id));
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

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Manage Team</h2>
      
      {/* Add Team Member Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">Add New Team Member</h3>
        
        <div>
          <Label>Team Type</Label>
          <Select 
            onValueChange={(value) => setFormData({ ...formData, type: value })}
            value={formData.type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select team type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="faculty">Faculty</SelectItem>
              <SelectItem value="researcher">Researcher</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Add Team Member"}
        </Button>
      </form>

      {/* Team Members Lists */}
      <div className="space-y-8">
        {/* Faculty List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Faculty Members</h3>
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
              {faculty.map((member) => (
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
                      onClick={() => handleDelete(member.id, 'faculty')}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Researchers List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Researchers</h3>
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
              {researchers.map((member) => (
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
                      onClick={() => handleDelete(member.id, 'researcher')}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Students List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Students</h3>
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
              {students.map((member) => (
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
                      onClick={() => handleDelete(member.id, 'student')}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageTeam;
