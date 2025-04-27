
import { useState } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { projectsCollection, db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/types';

const ManageProjects = () => {
  const { data: projects, loading, error } = useFirebaseData<Project>(projectsCollection);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    categories: '',
    link: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const categoriesArray = formData.categories.split(',').map(cat => cat.trim());
      await addDoc(collection(db, projectsCollection), {
        ...formData,
        categories: categoriesArray
      });
      setFormData({
        title: '',
        description: '',
        image: '',
        categories: '',
        link: ''
      });
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, projectsCollection, id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Manage Projects</h2>
      
      {/* Add Project Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">Add New Project</h3>
        <Input
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Project Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <Input
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
        <Input
          placeholder="Categories (comma-separated)"
          value={formData.categories}
          onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
          required
        />
        <Input
          placeholder="Project Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
        />
        <Button type="submit">Add Project</Button>
      </form>

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-lg flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <div className="flex gap-2 mt-2">
                {project.categories.map((category, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;
