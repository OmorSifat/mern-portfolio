import { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://server-liard-psi.vercel.app/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="text-center py-10 bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold my-5 text-cyan-300">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 shadow-xl rounded-xl transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-cyan-200 mb-3">{service.name}</h2>
            <p className="text-cyan-400">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;