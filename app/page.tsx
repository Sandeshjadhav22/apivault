import Feature from "@/components/shared/Feature";
import Footer from "@/components/shared/Footer";
import Main from "@/components/shared/Main";
import Navbar from "@/components/shared/Navbar";
import Work from "@/components/shared/Work";

export default function Home() {
  return (
    <>
      <Navbar />
    <div className="flex flex-col  justify-center items-center min-h-screen">

      <Main />
      <Feature />
      <Work />

      <Footer />
    </div>
    </>
  );
}
