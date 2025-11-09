import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-primary/40 rounded-full animate-float-1"></div>
        <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-primary/30 rounded-full animate-float-2"></div>
        <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-primary/50 rounded-full animate-float-3"></div>
        <div className="absolute top-[45%] right-[8%] w-3 h-3 bg-primary/35 rounded-full animate-float-4"></div>
        <div className="absolute top-[60%] left-[12%] w-2 h-2 bg-primary/40 rounded-full animate-float-5"></div>
        <div className="absolute top-[75%] right-[20%] w-4 h-4 bg-primary/45 rounded-full animate-float-6"></div>
        <div className="absolute top-[15%] left-[45%] w-3 h-3 bg-primary/30 rounded-full animate-float-1"></div>
        <div className="absolute top-[85%] left-[35%] w-2 h-2 bg-primary/35 rounded-full animate-float-2"></div>
        <div className="absolute top-[8%] right-[50%] w-2 h-2 bg-primary/40 rounded-full animate-float-3"></div>
        <div className="absolute top-[50%] left-[60%] w-2 h-2 bg-primary/35 rounded-full animate-float-4"></div>
        <div className="absolute top-[90%] right-[60%] w-3 h-3 bg-primary/40 rounded-full animate-float-5"></div>
        <div className="absolute top-[35%] left-[80%] w-2 h-2 bg-primary/30 rounded-full animate-float-6"></div>
        <div className="absolute top-[5%] left-[15%] w-3 h-3 bg-primary/35 rounded-full animate-float-1"></div>
        <div className="absolute top-[65%] right-[35%] w-2 h-2 bg-primary/40 rounded-full animate-float-2"></div>
        <div className="absolute top-[25%] left-[70%] w-4 h-4 bg-primary/30 rounded-full animate-float-3"></div>
        <div className="absolute top-[80%] right-[12%] w-3 h-3 bg-primary/45 rounded-full animate-float-4"></div>
        <div className="absolute top-[40%] left-[8%] w-2 h-2 bg-primary/35 rounded-full animate-float-5"></div>
        <div className="absolute top-[55%] right-[42%] w-3 h-3 bg-primary/40 rounded-full animate-float-6"></div>
        <div className="absolute top-[12%] left-[55%] w-2 h-2 bg-primary/30 rounded-full animate-float-1"></div>
        <div className="absolute top-[70%] right-[55%] w-4 h-4 bg-primary/35 rounded-full animate-float-2"></div>
        
        <div className="absolute top-[25%] right-[30%] w-8 h-8 bg-primary/20 rounded-full animate-float-3 blur-sm"></div>
        <div className="absolute top-[55%] left-[40%] w-6 h-6 bg-primary/25 rounded-full animate-float-4 blur-sm"></div>
        <div className="absolute top-[70%] right-[45%] w-7 h-7 bg-primary/20 rounded-full animate-float-5 blur-sm"></div>
        <div className="absolute top-[18%] left-[32%] w-9 h-9 bg-primary/18 rounded-full animate-float-6 blur-sm"></div>
        <div className="absolute top-[48%] right-[18%] w-7 h-7 bg-primary/22 rounded-full animate-float-1 blur-sm"></div>
        <div className="absolute top-[82%] left-[65%] w-8 h-8 bg-primary/20 rounded-full animate-float-2 blur-sm"></div>
        <div className="absolute top-[33%] right-[65%] w-6 h-6 bg-primary/24 rounded-full animate-float-3 blur-sm"></div>
        <div className="absolute top-[62%] left-[22%] w-9 h-9 bg-primary/19 rounded-full animate-float-4 blur-sm"></div>
        
        <div className="absolute top-[40%] right-[5%] w-24 h-24 bg-primary/15 rounded-full animate-float-5 blur-md"></div>
        <div className="absolute top-[10%] left-[70%] w-32 h-32 bg-primary/10 rounded-full animate-float-6 blur-lg"></div>
        <div className="absolute bottom-[15%] right-[25%] w-28 h-28 bg-primary/12 rounded-full animate-float-1 blur-md"></div>
        <div className="absolute bottom-[5%] left-[15%] w-20 h-20 bg-primary/18 rounded-full animate-float-2 blur-md"></div>
        <div className="absolute top-[22%] left-[5%] w-26 h-26 bg-primary/14 rounded-full animate-float-3 blur-lg"></div>
        <div className="absolute top-[58%] right-[68%] w-30 h-30 bg-primary/11 rounded-full animate-float-4 blur-md"></div>
        <div className="absolute bottom-[25%] left-[50%] w-22 h-22 bg-primary/16 rounded-full animate-float-5 blur-md"></div>
        <div className="absolute top-[72%] right-[78%] w-28 h-28 bg-primary/13 rounded-full animate-float-6 blur-lg"></div>
        
        <div className="absolute top-[17%] left-[88%] w-1.5 h-1.5 bg-primary/50 rounded-full animate-float-1"></div>
        <div className="absolute top-[42%] right-[92%] w-1.5 h-1.5 bg-primary/45 rounded-full animate-float-2"></div>
        <div className="absolute top-[68%] left-[48%] w-1.5 h-1.5 bg-primary/40 rounded-full animate-float-3"></div>
        <div className="absolute top-[28%] right-[22%] w-1.5 h-1.5 bg-primary/50 rounded-full animate-float-4"></div>
        <div className="absolute top-[88%] left-[78%] w-1.5 h-1.5 bg-primary/45 rounded-full animate-float-5"></div>
        <div className="absolute top-[52%] right-[58%] w-1.5 h-1.5 bg-primary/40 rounded-full animate-float-6"></div>
      </div>
      <Navbar />

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative w-80 h-80 animate-fade-in">
                <Image
                  src="/logo.jpeg"
                  alt="Research et AL Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Research </span>
              <span className="text-primary">et AL</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto">
              Welcome to the Research Club
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-primary/20 bg-black/50 backdrop-blur-sm fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">
            Research et AL © 2025
          </p>
        </div>
      </footer>
    </main>
  );
}
