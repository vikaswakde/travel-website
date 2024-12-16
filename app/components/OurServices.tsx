import React from "react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Culture",
    description: "Explore India's rich heritage and diversity",
    icon: "https://discoveryholidays.in/wp-content/uploads/2024/08/traditional-dance.png",
  },
  {
    id: 2,
    title: "Adventure",
    description: "Experience thrilling sports and activities",
    icon: "https://discoveryholidays.in/wp-content/uploads/2024/08/cycling.png",
  },
  {
    id: 3,
    title: "Spa",
    description: "Relax and rejuvenate at wellness centres",
    icon: "https://discoveryholidays.in/wp-content/uploads/2024/08/massage-therapist.png",
  },
  {
    id: 4,
    title: "Breakfast",
    description: "Enjoy complimentary and delicious meals",
    icon: "https://discoveryholidays.in/wp-content/uploads/2024/08/english-breakfast.png",
  },
  {
    id: 5,
    title: "Wi-Fi",
    description: "Stay connected with free internet access",
    icon: "https://discoveryholidays.in/wp-content/uploads/2024/08/wifi-router.png",
  },
  {
    id: 6,
    title: "Customer Service",
    description: "Get 24/7 support and online booking",
    icon: "https://discoveryholidays.in/wp-content/uploads/2024/08/customer-service.png",
  },
];

const OurServices = () => {
  return (
    <section id="travel_services" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#00145A] max-w-2xl mx-auto">
            Suparnam Holidays: Your Dream, Our Destination
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-start space-x-6 bg-white/50  p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-shrink-0 bg-primary/5 p-3 rounded-lg">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
