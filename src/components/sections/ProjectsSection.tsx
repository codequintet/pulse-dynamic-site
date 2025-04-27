
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample data for projects
const projectsData = [
  {
    id: 1,
    title: "AI-Driven Climate Prediction",
    description: "Using machine learning algorithms to improve climate change prediction models and enhance understanding of global warming patterns.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    categories: ["AI", "Climate", "Data Science"],
    link: "#"
  },
  {
    id: 2,
    title: "Quantum Computing Applications",
    description: "Exploring novel applications of quantum computing in solving complex optimization problems in various scientific domains.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    categories: ["Quantum", "Computing", "Physics"],
    link: "#"
  },
  {
    id: 3,
    title: "Neural Interface Systems",
    description: "Developing brain-computer interfaces that allow direct communication between the human brain and external devices.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    categories: ["Neuroscience", "Hardware", "AI"],
    link: "#"
  },
  {
    id: 4,
    title: "Sustainable Energy Solutions",
    description: "Researching innovative approaches to renewable energy generation, storage, and distribution.",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    categories: ["Energy", "Sustainability", "Engineering"],
    link: "#"
  },
  {
    id: 5,
    title: "Blockchain for Scientific Data",
    description: "Implementing blockchain technology to ensure integrity and transparency in scientific research data.",
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    categories: ["Blockchain", "Data", "Security"],
    link: "#"
  },
  {
    id: 6,
    title: "Robotics in Healthcare",
    description: "Designing robotic systems to assist in medical procedures and healthcare delivery in remote areas.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    categories: ["Robotics", "Healthcare", "Engineering"],
    link: "#"
  },
];

// Extract unique categories from project data
const allCategories = Array.from(
  new Set(projectsData.flatMap(project => project.categories))
);

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(project => project.categories.includes(activeFilter));
  
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
