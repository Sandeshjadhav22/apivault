"use client";
import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiKey {
  name: string;
  key: string;
}

export default function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([{ name: "", key: "" }]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleAddApiKey = () => {
    setApiKeys([...apiKeys, { name: "", key: "" }]);
  };

  const handleRemoveApiKey = (index: number) => {
    const newApiKeys = apiKeys.filter((_, i) => i !== index);
    setApiKeys(newApiKeys);
  };

  const handleApiKeyChange = (
    index: number,
    field: keyof ApiKey,
    value: string
  ) => {
    const newApiKeys = apiKeys.map((apiKey, i) => {
      if (i === index) {
        return { ...apiKey, [field]: value };
      }
      return apiKey;
    });
    setApiKeys(newApiKeys);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    const userId = "674c7a04eae9505ee3e27b19";

    try {
      const bodyData = {
        projectName,
        userId,
        apiKeys,
      };
      const response = await fetch(
        "https://apivalut-backend.vercel.app/api/projects/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to created project");
        return;
      }
      setLoading(false)
      toast.success("Project created successfully!!", { duration: 4000 });

      setProjectName("");
      setApiKeys([{ name: "", key: "" }]);
    } catch (error) {
      setError("Something went wrong. Please try again");
      console.error("Error during project submiting...", error);
      toast.error("This is an error!");
    }

    console.log("Project Name:", projectName);
    console.log("API Keys:", apiKeys);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="mb-4"
              required
            />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            {apiKeys.map((apiKey, index) => (
              <div key={index} className="flex flex-wrap mb-4 items-end">
                <div className="w-full md:w-1/3 pr-2 mb-2 md:mb-0">
                  <Label htmlFor={`apiKeyName-${index}`}>API Key Name</Label>
                  <Input
                    id={`apiKeyName-${index}`}
                    value={apiKey.name}
                    onChange={(e) =>
                      handleApiKeyChange(index, "name", e.target.value)
                    }
                    placeholder="Enter API key name"
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 pr-2 mb-2 md:mb-0">
                  <Label htmlFor={`apiKey-${index}`}>API Key</Label>
                  <Input
                    id={`apiKey-${index}`}
                    value={apiKey.key}
                    onChange={(e) =>
                      handleApiKeyChange(index, "key", e.target.value)
                    }
                    placeholder="Enter API key"
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveApiKey(index)}
                    disabled={apiKeys.length === 1}
                    aria-label="Remove API Key"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddApiKey}
              className="mt-2"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Another API Key
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>{loading ? 'Creating Project...':'Create Project'}</Button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
