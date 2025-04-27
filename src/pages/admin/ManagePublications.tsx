
import { useState } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { publicationsCollection, db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Publication } from '@/types';

const ManagePublications = () => {
  const { data: publications, loading, error } = useFirebaseData<Publication>(publicationsCollection);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    link: '',
    citationCount: '0'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, publicationsCollection), {
        ...formData,
        year: parseInt(formData.year),
        citationCount: parseInt(formData.citationCount)
      });
      setFormData({
        title: '',
        authors: '',
        journal: '',
        year: '',
        link: '',
        citationCount: '0'
      });
      toast({
        title: "Success",
        description: "Publication added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add publication",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, publicationsCollection, id));
      toast({
        title: "Success",
        description: "Publication deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete publication",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Manage Publications</h2>
      
      {/* Add Publication Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">Add New Publication</h3>
        <Input
          placeholder="Publication Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          placeholder="Authors (e.g. Smith, J., Doe, A.)"
          value={formData.authors}
          onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
          required
        />
        <Input
          placeholder="Journal Name"
          value={formData.journal}
          onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Publication Year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          required
        />
        <Input
          placeholder="Publication Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Citation Count"
          value={formData.citationCount}
          onChange={(e) => setFormData({ ...formData, citationCount: e.target.value })}
          required
        />
        <Button type="submit">Add Publication</Button>
      </form>

      {/* Publications List */}
      <div className="grid gap-4">
        {publications.map((publication) => (
          <div key={publication.id} className="p-4 border rounded-lg flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{publication.title}</h3>
              <p className="text-sm text-gray-600">{publication.authors}</p>
              <p className="text-xs text-gray-500">{publication.journal}, {publication.year}</p>
              <p className="text-xs text-gray-500">Citations: {publication.citationCount}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(publication.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePublications;
