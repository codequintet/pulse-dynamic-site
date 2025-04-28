
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { publicationsCollection } from '@/lib/firebase';
import type { Publication } from '@/types';

const PublicationsSection = () => {
  const { data: publications, loading, error } = useFirebaseData<Publication>(publicationsCollection);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("year");
  const [sortOrder, setSortOrder] = useState("desc");
  
  // Filter publications based on search term
  const filteredPublications = publications?.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.year.toString().includes(searchTerm)
  ) || [];
  
  // Sort publications based on selected criteria
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    const sortOrderMultiplier = sortOrder === "asc" ? 1 : -1;
    
    if (sortBy === "year") {
      return sortOrderMultiplier * (a.year - b.year);
    } else if (sortBy === "citations") {
      return sortOrderMultiplier * (a.citationCount - b.citationCount);
    } else {
      // Default to title sort
      return sortOrderMultiplier * a.title.localeCompare(b.title);
    }
  });

  if (loading) return <div className="text-center py-10">Loading publications...</div>;
  if (error) return <div className="text-center py-10">Error: {error.message}</div>;
  
  return (
    <section id="publications" className="section-padding">
      <div className="container-custom">
        <h2 className="section-heading text-center">Publications</h2>
        <p className="section-subheading text-center">
          Our research team publishes regularly in leading academic journals and conferences
        </p>
        
        {/* Search and Sort Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md p-2 bg-white"
              >
                <option value="year">Year</option>
                <option value="citations">Citations</option>
                <option value="title">Title</option>
              </select>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
              className="w-10 h-10"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </Button>
          </div>
        </div>
        
        {/* Publications List */}
        <div className="space-y-6">
          {sortedPublications.length > 0 ? (
            sortedPublications.map(publication => (
              <div 
                key={publication.id} 
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  <a href={publication.link} className="hover:underline">
                    {publication.title}
                  </a>
                </h3>
                
                <p className="text-muted-foreground mb-2">{publication.authors}</p>
                
                <div className="flex flex-wrap justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{publication.journal}</span>, {publication.year}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm">
                      Citations: <strong>{publication.citationCount}</strong>
                    </span>
                    
                    <Button variant="outline" size="sm" asChild>
                      <a href={publication.link} target="_blank" rel="noopener noreferrer">
                        View Paper
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No publications found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
