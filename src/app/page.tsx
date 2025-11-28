import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large blurred orbs */}
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-1 opacity-40"></div>
        <div className="absolute top-[40%] right-[5%] w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-float-2 opacity-40"></div>
        <div className="absolute bottom-[10%] left-[20%] w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-float-3 opacity-30"></div>
        <div className="absolute top-[50%] right-[40%] w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-float-4 opacity-30"></div>
        
        {/* Floating particles */}
        <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-purple-400/60 rounded-full animate-float-1"></div>
        <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-pink-400/50 rounded-full animate-float-2"></div>
        <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-purple-400/40 rounded-full animate-float-3"></div>
        <div className="absolute top-[45%] right-[8%] w-3 h-3 bg-pink-400/45 rounded-full animate-float-4"></div>
        <div className="absolute top-[60%] left-[12%] w-2 h-2 bg-purple-400/50 rounded-full animate-float-5"></div>
        <div className="absolute top-[75%] right-[20%] w-4 h-4 bg-pink-400/40 rounded-full animate-float-6"></div>
        <div className="absolute top-[15%] left-[45%] w-3 h-3 bg-purple-400/50 rounded-full animate-float-1"></div>
        <div className="absolute top-[85%] left-[35%] w-2 h-2 bg-pink-400/45 rounded-full animate-float-2"></div>
        <div className="absolute top-[8%] right-[50%] w-2 h-2 bg-purple-400/60 rounded-full animate-float-3"></div>
        <div className="absolute top-[50%] left-[60%] w-2 h-2 bg-pink-400/40 rounded-full animate-float-4"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Logo with enhanced animation */}
            <div className="mb-12 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <Image
                  src="/logo.jpeg"
                  alt="Research et AL Logo"
                  fill
                  className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Research </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">et AL</span>
            </h1>
            
            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Exploring the frontiers of research, innovation, and knowledge discovery
            </p>
            
            <p className="text-sm sm:text-base text-gray-400 mb-12 max-w-2xl mx-auto">
              Dive into groundbreaking articles written by our passionate researchers
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 inline-block"
              >
                Explore Articles
              </Link>
              <a
                href="#footer"
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 font-bold rounded-full hover:bg-purple-500/10 transition-all duration-300 inline-block"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cutting-Edge Research",
                description: "Explore the latest research articles on emerging technologies and scientific breakthroughs",
                icon: "🔬"
              },
              {
                title: "Expert Insights",
                description: "Learn from experienced researchers and industry professionals sharing their knowledge",
                icon: "💡"
              },
              {
                title: "Community Driven",
                description: "Join a vibrant community of learners and researchers passionate about discovery",
                icon: "🌍"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:from-gray-800/70 hover:to-gray-700/50 transition-all duration-500 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-8 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 bg-black/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Research et AL © {new Date().getFullYear()}
          </p>
          <p className="text-gray-500 text-sm">
            Empowering minds through research and innovation
          </p>
        </div>
      </footer>
    </main>
  );
}
