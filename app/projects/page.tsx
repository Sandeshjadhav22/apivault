"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const router = useRouter();
  const [visibleKeys, setVisibleKeys] = React.useState<
    Record<number, Record<number, boolean>>
  >({});

  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>("");
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(
    null
  );

  const toggleKeyVisibility = (projectId: number, keyId: number) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [keyId]: !prev[projectId]?.[keyId],
      },
    }));
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      setDeletingProjectId(projectId);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://apivalut-backend.vercel.app/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      console.log("Response status:", response.status);
      if (!response.ok) {
        const message = await response.json();
        console.error("Response error body:", message);
        throw new Error(message.error || "Failed to delete project");
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      setError("Failed to delete project. Please try again later.");
      console.error("Error in deleting project", error);
    } finally {
      setDeletingProjectId(null);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>
      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !projects.length && (
        <div className="flex flex-col items-center">
          <p>No projects found.</p>
          <Button
            variant="default"
            className="mt-4"
            onClick={() => router.push("/create")}
          >
            Create Project
          </Button>
        </div>
      )}
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          projects.map((project, index) => (
            <Card key={project._id || index}>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    {project.projectName}{" "}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        {" "}
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={deletingProjectId === project._id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure to delete ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your Project and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProject(project._id)}
                          >
                            {deletingProjectId === project._id
                              ? "Deleting..."
                              : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardTitle>
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
                        <div
                          key={apiKey._id || index}
                          className="mb-4 last:mb-0"
                        >
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
