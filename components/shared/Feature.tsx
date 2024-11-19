import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Globe, Lock, Zap } from "lucide-react";

const Feature = () => {
  return (
    <div className="">
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Key Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Lock className="w-8 h-8 mb-2" />
                <CardTitle>Secure Storage</CardTitle>
              </CardHeader>
              <CardContent>
                Your API keys are encrypted and stored securely, ensuring
                maximum protection for your sensitive data.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 mb-2" />
                <CardTitle>Access Anywhere</CardTitle>
              </CardHeader>
              <CardContent>
                Retrieve your API keys from any machine, making development and
                deployment seamless across environments.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 mb-2" />
                <CardTitle>Developer-First</CardTitle>
              </CardHeader>
              <CardContent>
                Designed with developers in mind, offering a simple and
                intuitive interface for managing your API keys.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
