"use client";
import Feature from "@/components/shared/Feature";
import Footer from "@/components/shared/Footer";
import Main from "@/components/shared/Main";
import Navbar from "@/components/shared/Navbar";
import Work from "@/components/shared/Work";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const authToken = localStorage.getItem('authToken');
  //     if (!authToken) {
  //       router.push('/signup');
  //     }
  //   }
  // }, [router]);
  return (
    <>
      <div><Navbar /></div>
      
      <div className="flex flex-col  justify-center items-center min-h-screen w-full">
        <Main />
        <Feature />
        <Work />
        <Footer />
      </div>
    </>
  );
}

