import React, { useEffect } from "react";
import { Activity, Heart, Phone, Bandage, Stethoscope, Linkedin, Github, Mail, MapPin, Link } from "lucide-react";
import MedicalChatInterface from "@/components/MedicalChatInterface";

const Index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Optional loading effect
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <header className="bg-medical-dark text-white py-4 px-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 group">
              <Heart className="h-6 w-6 text-red-400 group-hover:scale-110 transition-transform" />
              <h1 className="text-xl font-bold text-medical-teal group-hover:text-white transition-colors">
                CareAI
              </h1>
            </div>
            <a
              href="tel:112"
              className="flex items-center text-sm gap-1.5 bg-red-600 px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Emergency: 112</span>
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-12">
          <MedicalChatInterface />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            icon={<Activity className="h-8 w-8 text-medical-blue" />}
            title="Symptom Checker"
            description="Describe your symptoms to get basic health suggestions and advice."
          />
          <FeatureCard
            icon={<Bandage className="h-8 w-8 text-medical-mint" />}
            title="First Aid Tips"
            description="Get step-by-step instructions for common first aid situations."
          />
          <FeatureCard
            icon={<Stethoscope className="h-8 w-8 text-medical-lavender" />}
            title="Health Resources"
            description="Coming soon: Access medicine reminders and health resources."
            comingSoon={true}
          />
        </div>
      </main>

      <footer className="bg-medical-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-400" />
                <h2 className="text-xl font-bold text-medical-white">CareAI</h2>
              </div>
              <p className="text-sm">
                Empowering health with AI. Helping people with just a prompt.
              </p>
              <p className="text-xs italic">
                Made with ❤️ by Aryat
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-gray-500 pb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#symptom-checker" className="hover:text-medical-teal transition-colors">
                    Symptom Checker
                  </a>
                </li>
                <li>
                  <a href="#first-aid" className="hover:text-medical-teal transition-colors">
                    First Aid Tips
                  </a>
                </li>
                <li>
                  <a href="#resources" className="hover:text-medical-teal transition-colors">
                    Health Resources
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-gray-500 pb-2">Connect with Us</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:aryatsrishadow--7@gmail.com" className="hover:text-medical-teal transition-colors">
                    aryatsrishadow007@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>KIET Group of Institutions</span>
                </div>
              </div>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://github.com/aryat10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aryatsrivastavaweb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-500 text-center">
            <p className="text-xs">
              © 2025 CareAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  comingSoon = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-medical-dark transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
      {comingSoon && (
        <p className="mt-2 text-xs text-medical-lavender italic">Coming Soon</p>
      )}
    </div>
  );
};

export default Index;