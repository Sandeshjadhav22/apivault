"use client";
import Navbar from "@/components/shared/Navbar";
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
  _id: string;
  name: string;
  encryptedKey: string;
  iv?: string;
  authTag?: string;
  createdAt?: string;
}

interface Project {
  _id: string;
  projectName: string;
  apikeys: ApiKey[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const ProjectPage = () => {
  const router = useRouter();
  const [visibleKeys, setVisibleKeys] = React.useState<
    Record<string, Record<string, boolean>>
  >({});

  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null
  );
  const [deletingKeyId, setDeletingKeyId] = useState<string | null>(null);

  const toggleKeyVisibility = (projectId: string, keyId: string) => {
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
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.log("Error in fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
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
      
      if (!response.ok) {
        const message = await response.json();
        console.error("Response error body:", message);
        throw new Error(message.error || "Failed to delete project");
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error("Error in deleting project", error);
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleDeleteApiKey = async (projectId: string, keyId: string) => {
    try {
      setDeletingKeyId(keyId);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://apivalut-backend.vercel.app/api/projects/${projectId}/apikeys/${keyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || "Failed to delete API key");
      }

      // Update the projects state by removing the deleted API key
      setProjects((prevProjects) =>
        prevProjects.map((project) => {
          if (project._id === projectId) {
            return {
              ...project,
              apikeys: project.apikeys.filter((key) => key._id !== keyId),
            };
          }
          return project;
        })
      );
    } catch (error) {
      console.error("Error in deleting API key", error);
    } finally {
      setDeletingKeyId(null);
    }
  };

  const navigateToEditProject = (projectId: string) => {
    router.push(`/projects/${projectId}/edit`);
  };

  const navigateToEditApiKey = (projectId: string, keyId: string) => {
    router.push(`/projects/${projectId}/apikeys/${keyId}/edit`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-6">All Projects</h1>
          <Button
            variant="default"
            className="mb-4"
            onClick={() => router.push("/projects/create")}
          >
            Create Project
          </Button>
        </div>

        {loading && <p>Loading projects...</p>}
        {!loading && !projects.length && (
          <div className="flex flex-col items-center">
            <p>No projects found.</p>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => router.push("/projects/create")}
            >
              Create Project
            </Button>
          </div>
        )}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            projects.map((project) => (
              <Card key={project._id}>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center justify-between">
                      {project.projectName}
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div className="flex items-center p-2 space-x-2 rounded-md hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure to delete?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your Project and remove your
                              data from our servers.
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
                        {project.apikeys?.map((apiKey) => (
                          <div
                            key={apiKey._id}
                            className="mb-4 last:mb-0"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold">
                                {apiKey.name}
                              </span>
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
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigateToEditApiKey(project._id, apiKey._id)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete API Key?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete this API key.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteApiKey(project._id, apiKey._id)}
                                    >
                                      {deletingKeyId === apiKey._id
                                        ? "Deleting..."
                                        : "Delete"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                            {apiKey.iv && apiKey.authTag && (
                              <div className="mt-2 text-xs text-gray-500">
                                <p>Encrypted with additional security</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigateToEditProject(project._id)}
                  >
                    Manage Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;