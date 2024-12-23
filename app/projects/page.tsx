"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

// const projects = [
//   {
//     id: 1,
//     name: "Project Alpha",
//     apiKeys: [
//       { id: 1, name: "Production API Key", key: "prod_abcdefghijklmnop" },
//       { id: 2, name: "Development API Key", key: "dev_qrstuvwxyz123456" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Project Beta",
//     apiKeys: [{ id: 3, name: "Main API Key", key: "main_7890abcdefghijkl" }],
//   },
// ];

interface ApiKey {
  _id: number;
  name: string;
  encryptedKey: string;
}

interface Project {
  _id: number;
  projectName: string;
  apikeys: ApiKey[];
}

const ProjectPage = () => {
  const [visibleKeys, setVisibleKeys] = React.useState<
    Record<number, Record<number, boolean>>
  >({});

  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>("");

  const toggleKeyVisibility = (projectId: number, keyId: number) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [keyId]: !prev[projectId]?.[keyId],
      },
    }));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");
        // if (!userId) {
        //   setError("User ID not found. Please log in.");
        //   return;
        // }
        const response = await fetch(
          "https://apivalut-backend.vercel.app/api/projects/getAllProjects",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        console.log("Response status:", response.status); // log the response status
        if (!response.ok) {
          const message = await response.json();
          console.error("Response error body:", message); // log the error message
          throw new Error(message.error || "Failed to fetch projects");
        }

        const data = await response.json();
        console.log("Projects data:", data); // log the projects data
        setProjects(data.projects);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching projects", error);
        setError("Failed to load projects. Please try again later.");
      }finally{
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>
      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !projects.length && <p>No projects found.</p>}
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {!loading && projects.map((project, index) => (
          <Card key={project._id || index}>
            <CardHeader>
              <CardTitle>{project.projectName}  </CardTitle>
              <CardDescription>
                {project.apikeys?.length} API Key(s) 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="api-keys">
                  <AccordionTrigger>View API Keys</AccordionTrigger>
                  <AccordionContent>
                    {project.apikeys?.map((apiKey, index) => (
                      <div key={apiKey._id || index} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{apiKey.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              toggleKeyVisibility(project._id, apiKey._id)
                            }
                          >
                            {visibleKeys[project._id]?.[apiKey._id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className="font-mono text-xs"
                          >
                            {visibleKeys[project._id]?.[apiKey._id]
                              ? apiKey.encryptedKey
                              : apiKey.encryptedKey
                              ? apiKey.encryptedKey.replace(/./g, "•")
                              : "No Key Available"} 
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
