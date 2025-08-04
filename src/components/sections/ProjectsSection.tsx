import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  link: string;
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  // Mock data for now - you can replace this with actual Supabase queries when tables are set up
  const projects: Project[] = [
    {
      id: '1',
      title: 'AI Research Project',
      description: 'Exploring machine learning applications in data analysis',
      image: '/placeholder.svg',
      categories: ['AI', 'Research'],
      link: '#'
    },
    {
      id: '2',
      title: 'Quantum Computing Study',
      description: 'Investigating quantum algorithms for optimization problems',
      image: '/placeholder.svg',
      categories: ['Quantum', 'Computing'],
      link: '#'
    },
    {
      id: '3',
      title: 'Biomedical Engineering',
      description: 'Developing innovative medical devices and treatments',
      image: '/placeholder.svg',
      categories: ['Biomedical', 'Engineering'],
      link: '#'
    }
  ];
  
  const loading = false;
  const error = null;

  if (loading) {
    return <div className="text-center py-10">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading projects: {error.message}</div>;
  }

  const allCategories = Array.from(
    new Set(projects.flatMap(project => project.categories))
  );

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.categories.includes(activeFilter));
  
  return (
    <section id="projects" className="section-padding bg-muted">
      <div className="container-custom">
        <h2 className="section-heading text-center">Our Research Projects</h2>
        <p className="section-subheading text-center">
          Explore our innovative research initiatives across various disciplines
        </p>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={activeFilter === "All" ? "default" : "outline"}
            onClick={() => setActiveFilter("All")}
            className="rounded-full"
          >
            All
          </Button>
          {allCategories.map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden h-full flex flex-col transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.categories.map(category => (
                    <Badge key={category} variant="secondary">{category}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0">
                  <a href={project.link}>Learn More</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button size="lg">View All Projects</Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
