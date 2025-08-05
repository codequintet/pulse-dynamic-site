import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useSupabaseData";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { data: projects, isLoading, error } = useProjects();
  
  if (isLoading) {
    return (
      <section id="projects" className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-heading text-center">Our Research Projects</h2>
          <div className="text-center py-10">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-heading text-center">Our Research Projects</h2>
          <div className="text-center py-10 text-muted-foreground">
            {!projects || projects.length === 0 ? "No projects available yet." : "Error loading projects."}
          </div>
        </div>
      </section>
    );
  }

  const mockProjects = [
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

  // Use real projects if available, fallback to mock data
  const displayProjects = projects && projects.length > 0 ? projects : mockProjects;
  
  // Convert Supabase data to match the component interface
  const formattedProjects = displayProjects.map(project => {
    if ('tech_stack' in project) {
      // This is Supabase data
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image_url,
        categories: project.tech_stack,
        link: project.demo_url || project.github_url || '#',
        github_url: project.github_url,
        demo_url: project.demo_url
      };
    }
    // This is mock data
    return project;
  });

  const allCategories = Array.from(
    new Set(formattedProjects.flatMap(project => project.categories))
  );

  const filteredProjects = activeFilter === "All"
    ? formattedProjects
    : formattedProjects.filter(project => project.categories.includes(activeFilter));
  
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
              <CardFooter className="flex gap-2">
                {project.github_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demo_url && (
                  <Button size="sm" asChild>
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
                {!project.github_url && !project.demo_url && (
                  <Button asChild variant="link" className="p-0">
                    <a href={project.link}>Learn More</a>
                  </Button>
                )}
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
