
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-lavender-light border-t border-lavender mt-12">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600">
        <p className="mb-2">MindLink &copy; {currentYear}. A safe space for everyone.</p>
        <p className="text-sm">
          If you are in distress, please reach out to a crisis hotline or mental health professional.
        </p>
        <div className="mt-4">
          <span className="text-2xl">🐰</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
