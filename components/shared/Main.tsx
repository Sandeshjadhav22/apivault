import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Main = () => {
  return (
   <div className="flex justify-center items-center">
     <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Secure API Key Management for Developers
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Store and access your API keys securely from any machine. Simple,
              fast, and developer-friendly.
            </p>
          </div>
          <div className="space-x-4">
            <Link href={"/projects"}><Button >Get Started</Button></Link>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
   </div>
  );
};

export default Main;
