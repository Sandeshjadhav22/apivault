"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react'
import React from 'react'

const projects = [
  {
    id: 1,
    name: "Project Alpha",
    apiKeys: [
      { id: 1, name: "Production API Key", key: "prod_abcdefghijklmnop" },
      { id: 2, name: "Development API Key", key: "dev_qrstuvwxyz123456" },
    ],
  },
  {
    id: 2,
    name: "Project Beta",
    apiKeys: [
      { id: 3, name: "Main API Key", key: "main_7890abcdefghijkl" },
    ],
  },
]

const ProjectPage = () => {
  const [visibleKeys, setVisibleKeys] = React.useState<Record<number, Record<number, boolean>>>({})

  const toggleKeyVisibility = (projectId: number, keyId: number) => {
    setVisibleKeys(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [keyId]: !prev[projectId]?.[keyId]
      }
    }))
  }
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">All Projects</h1>
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.apiKeys.length} API Key(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="api-keys">
                <AccordionTrigger>View API Keys</AccordionTrigger>
                <AccordionContent>
                  {project.apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{apiKey.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(project.id, apiKey.id)}
                        >
                          {visibleKeys[project.id]?.[apiKey.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {visibleKeys[project.id]?.[apiKey.id] 
                            ? apiKey.key 
                            : apiKey.key.replace(/./g, '•')}
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
            <Button variant="outline" className="w-full">Manage Project</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
    
  )
}

export default ProjectPage