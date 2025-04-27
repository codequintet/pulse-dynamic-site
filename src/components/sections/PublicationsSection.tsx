
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

// Sample publications data
const publicationsData = [
  {
    id: 1,
    title: "Machine Learning Approaches to Climate Change Prediction",
    authors: "Smith, J., Johnson, A., Williams, R.",
    journal: "Journal of Climate Informatics",
    year: 2023,
    link: "#",
    citationCount: 42
  },
  {
    id: 2,
    title: "Quantum Computing: Current Status and Future Prospects",
    authors: "Chen, L., Brown, M., Garcia, P.",
    journal: "Quantum Information Processing",
    year: 2022,
    link: "#",
    citationCount: 78
  },
  {
    id: 3,
    title: "Neural Interfaces: A Review of Technologies and Applications",
    authors: "Taylor, S., Anderson, K., White, T.",
    journal: "IEEE Transactions on Neural Networks",
    year: 2023,
    link: "#",
    citationCount: 25
  },
  {
    id: 4,
    title: "Renewable Energy Integration: Challenges and Solutions",
    authors: "Miller, D., Rodriguez, E., Lee, H.",
    journal: "Energy Policy Journal",
    year: 2022,
    link: "#",
    citationCount: 63
  },
  {
    id: 5,
    title: "Blockchain Applications in Scientific Research",
    authors: "Wilson, P., Clark, N., Davis, S.",
    journal: "Distributed Ledger Technology",
    year: 2021,
    link: "#",
    citationCount: 37
  },
  {
    id: 6,
    title: "Advanced Robotics in Surgical Procedures",
    authors: "Robinson, C., Thompson, J., Walker, M.",
    journal: "Journal of Medical Robotics",
    year: 2023,
    link: "#",
    citationCount: 29
  },
  {
    id: 7,
    title: "AI Ethics: Ensuring Responsible Innovation",
    authors: "Adams, T., Martinez, R., King, S.",
    journal: "AI & Society",
    year: 2022,
    link: "#",
    citationCount: 54
  },
  {
    id: 8,
    title: "Data Security in Cloud Computing Environments",
    authors: "Lewis, F., Hall, A., Young, B.",
    journal: "Journal of Cybersecurity",
    year: 2021,
    link: "#",
    citationCount: 41
  }
];

const PublicationsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("year");
  const [sortOrder, setSortOrder] = useState("desc");
  
  // Filter publications based on search term
  const filteredPublications = publicationsData.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.year.toString().includes(searchTerm)
  );
  
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
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };
  
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
              onClick={toggleSortOrder}
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
        
        {/* View All Button */}
        <div className="mt-10 text-center">
          <Button size="lg">Browse All Publications</Button>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
