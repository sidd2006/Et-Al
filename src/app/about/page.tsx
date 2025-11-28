import Image from "next/image";

export default function About() {
  const teamMembers = [
    {
      name: "Senior Mentors",
      role: "Guidance & Leadership",
      description: "Experienced students guiding research projects"
    },
    {
      name: "Alumni Network",
      role: "Industry Insights",
      description: "Former members sharing real-world expertise"
    },
    {
      name: "Faculty Advisors",
      role: "Academic Support",
      description: "Faculty members providing academic guidance"
    },
    {
      name: "Research Interns",
      role: "Active Researchers",
      description: "Students working on innovative projects"
    }
  ];

  const activities = [
    {
      title: "Research Paper Presentations",
      description: "Students present and discuss cutting-edge research papers from top conferences",
      icon: "📄"
    },
    {
      title: "Technical Workshops",
      description: "Hands-on sessions covering research methodologies, tools, and best practices",
      icon: "🛠️"
    },
    {
      title: "Annual Hackathon",
      description: "Club's signature event bringing together innovative minds to solve real-world problems",
      icon: "💡"
    },
    {
      title: "Mentorship Programs",
      description: "One-on-one guidance from seniors, alumni, and faculty for research projects",
      icon: "🎓"
    },
    {
      title: "Publication Support",
      description: "Assistance with writing, reviewing, and submitting research papers to conferences",
      icon: "✍️"
    },
    {
      title: "Community Building",
      description: "Regular meetups and events to connect with like-minded researchers",
      icon: "🤝"
    }
  ];

  const achievements = [
    "Successfully published high-quality research papers in well-known conferences",
    "Mentored dozens of students in their research journey",
    "Organized multiple successful workshops and hackathons",
    "Built a thriving community of student researchers",
    "Established connections with industry and academia"
  ];

  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
      {/* Background particles */}
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
        
        <div className="absolute top-[25%] right-[30%] w-8 h-8 bg-primary/20 rounded-full animate-float-3 blur-sm"></div>
        <div className="absolute top-[55%] left-[40%] w-6 h-6 bg-primary/25 rounded-full animate-float-4 blur-sm"></div>
        <div className="absolute top-[70%] right-[45%] w-7 h-7 bg-primary/20 rounded-full animate-float-5 blur-sm"></div>
        
        <div className="absolute top-[40%] right-[5%] w-24 h-24 bg-primary/15 rounded-full animate-float-5 blur-md"></div>
        <div className="absolute top-[10%] left-[70%] w-32 h-32 bg-primary/10 rounded-full animate-float-6 blur-lg"></div>
        <div className="absolute bottom-[15%] right-[25%] w-28 h-28 bg-primary/12 rounded-full animate-float-1 blur-md"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="text-primary">Research et AL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              The official research and paper club for CSE at PES University
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-primary/30 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                To promote research and academic publishing among students by providing mentorship, resources, and opportunities to develop technical skills and publish innovative work.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-primary/30 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <div className="text-4xl mb-4">🔬</div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                To be a hub for like-minded students to connect, collaborate, and grow as engineers and researchers while contributing meaningful work to the academic community.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="text-white">What We </span>
              <span className="text-primary">Do</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-md rounded-2xl border border-primary/30 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
                >
                  <div className="text-5xl mb-4">{activity.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{activity.title}</h3>
                  <p className="text-white/70 leading-relaxed">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mentorship Section */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              <span className="text-white">Mentorship & </span>
              <span className="text-primary">Growth</span>
            </h2>
            <p className="text-xl text-white/70 text-center max-w-3xl mx-auto mb-12">
              Our interns are mentored by experienced seniors, accomplished alumni, and dedicated faculty members who help them hone their skills and work on innovative research projects.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-md rounded-2xl border border-primary/30 p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/30 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                  <p className="text-white/60 text-sm mb-2">{member.role}</p>
                  <p className="text-white/70 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="text-white">Our </span>
              <span className="text-primary">Achievements</span>
            </h2>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-primary/30 p-8 max-w-4xl mx-auto">
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary text-2xl mr-4">✓</span>
                    <span className="text-white/80 text-lg">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Community & Connect */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Join Our </span>
              <span className="text-primary">Community</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Follow us on Instagram to stay updated with our latest activities, workshops, events, and student achievements.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/etal.pesu/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/20 backdrop-blur-md rounded-xl border border-primary/40 px-8 py-4 text-primary font-semibold hover:bg-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                <span className="text-2xl">📱</span>
                Follow Us on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-32"></div>

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
