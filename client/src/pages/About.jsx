import { useState, useEffect } from "react";

const AboutPage = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("https://server-liard-psi.vercel.app/api/team") // Backend থেকে Team Data আনবে
      .then((res) => res.json())
      .then((data) => setTeam(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-900 text-white">
      {/* About Section */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-cyan-300">About Our Company</h1>
        <p className="mt-4 text-cyan-100 text-lg max-w-3xl mx-auto">
          We are a leading tech company specializing in web and software development, committed to delivering high-quality solutions for our clients.
        </p>
      </section>

      {/* Team Section */}
      <section className="mt-16">
        <h2 className="text-4xl font-bold text-center text-cyan-300">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {team.map((member) => (
            <div
              key={member.id}
              className="p-6 shadow-lg rounded-2xl text-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-cyan-300"
              />
              <div className="mt-4">
                <h3 className="text-2xl font-medium text-cyan-200">{member.name}</h3>
                <p className="text-cyan-400 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;