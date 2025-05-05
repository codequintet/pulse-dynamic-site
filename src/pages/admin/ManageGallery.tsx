
import { useState } from 'react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { imagesCollection, db, storage } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash, Image, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

const ManageGallery = () => {
  const { data: images, loading, error } = useFirebaseData<GalleryImage>(imagesCollection);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);

  const validateImage = (file: File) => {
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return 'Image size should not exceed 5MB';
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, GIF, or WEBP)';
    }
    
    return null; // No error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    // Validate image before uploading
    const validationError = validateImage(file);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Upload image to Firebase Storage with optimized filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      // Save image data to Firestore
      await addDoc(collection(db, imagesCollection), {
        url,
        title: formData.title,
        description: formData.description,
        createdAt: new Date(),
      });
      
      // Reset form
      setFormData({ title: '', description: '' });
      setFile(null);
      
      toast({
        title: "Success",
        description: "Image added successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteInProgress(id);
    try {
      await deleteDoc(doc(db, imagesCollection, id));
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteInProgress(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading gallery data...</span>
    </div>
  );

  if (error) return (
    <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
      <h3 className="text-lg font-semibold">Error loading gallery</h3>
      <p>{error.message}</p>
      <Button 
        className="mt-2" 
        variant="outline" 
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Manage Gallery</h2>
      
      {/* Add Image Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">Add New Image</h3>
        <Input
          placeholder="Image Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          placeholder="Image Description (Optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <div className="grid gap-2">
          <label htmlFor="image" className="text-sm font-medium">
            Upload Image
          </label>
          <Input
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            required
          />
          <p className="text-xs text-muted-foreground">
            Supported formats: JPEG, PNG, GIF, WEBP. Max size: 5MB
          </p>
        </div>
        <Button type="submit" disabled={uploading} className="w-full sm:w-auto">
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Image className="mr-2 h-4 w-4" />
              Add Image
            </>
          )}
        </Button>
      </form>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-8 border rounded-md bg-muted/30">
            <Image className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No images yet</h3>
            <p className="text-sm text-muted-foreground">
              Upload your first image to start building your gallery
            </p>
          </div>
        ) : (
          images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{image.title}</h3>
                    {image.description && <p className="text-sm text-muted-foreground">{image.description}</p>}
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={deleteInProgress === image.id}
                      >
                        {deleteInProgress === image.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Image</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this image? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(image.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageGallery;
