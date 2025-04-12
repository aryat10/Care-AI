import React, { useEffect } from "react";
import { Activity, Heart, Phone, Bandage, Stethoscope } from "lucide-react";
import MedicalChatInterface from "@/components/MedicalChatInterface";

const Index = () => {
  // Simulate a loading effect for the chat interface
  useEffect(() => {
    const timer = setTimeout(() => {
      // Could add a loading state here if needed
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

      <main className="container mx-auto py-8 px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-8 bg-medical-blue p-6 rounded-lg shadow-md" // Changed to solid medical-blue
        >
          <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg"> 
            Your Personal Medical Assistant
          </h1>
          <p className="text-white max-w-2xl mx-auto"> 
            Get quick health advice and first-aid information. 
            Remember, this is not a substitute for professional medical care.
          </p>
        </div>

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

      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="container mx-auto text-center text-sm">
          <p className="mb-2 text-gray-300">
            <strong className="text-white">Important Disclaimer:</strong> This medical assistant provides general information only and is not a substitute for professional medical advice.
          </p>
          <p className="text-gray-400">
            © 2025 CareAI. All rights reserved. |{" "}
            <a href="#" className="underline hover:text-medical-teal">Terms</a> |{" "}
            <a href="#" className="underline hover:text-medical-teal">Privacy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  comingSoon = false
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