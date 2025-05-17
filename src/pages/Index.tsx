
import React from 'react';
import { Button } from '@/components/ui/button'; // Using shadcn button
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="text-center py-12 md:py-20 px-4">
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-deep-purple mb-4">
          Welcome to MindLink <span className="text-4xl md:text-5xl">🐰</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
          A safe and anonymous space to share, connect, and find support for your mental well-being.
        </p>
      </header>

      <section className="mb-16">
        <Link to="/forum">
          <Button size="lg" className="bg-lavender-medium hover:bg-lavender-dark text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Explore the Forum
          </Button>
        </Link>
        <p className="mt-4 text-gray-600">or <Link to="/new" className="text-lavender-dark hover:underline">share your thoughts</Link></p>
      </section>

      <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-lavender">
          <Heart size={40} className="text-lavender-medium mb-3" />
          <h2 className="text-2xl font-semibold text-deep-purple mb-2">Share Anonymously</h2>
          <p className="text-gray-600">
            Express your feelings and experiences without revealing your identity. Your privacy is paramount.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-lavender">
          <MessageCircle size={40} className="text-lavender-medium mb-3" />
          <h2 className="text-2xl font-semibold text-deep-purple mb-2">Peer Support</h2>
          <p className="text-gray-600">
            Connect with others who understand. Offer and receive support in a compassionate community.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-lavender">
          <Shield size={40} className="text-lavender-medium mb-3" />
          <h2 className="text-2xl font-semibold text-deep-purple mb-2">Safe Environment</h2>
          <p className="text-gray-600">
            Our community is actively moderated to ensure a respectful and supportive atmosphere for everyone.
          </p>
        </div>
      </section>

      <section className="mt-16 py-12 bg-lavender rounded-lg">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-deep-purple mb-6">Your Voice Matters</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
                Whether you're facing challenges related to GBV, stress, depression, or suicidal thoughts, 
                MindLink is here to listen. You are not alone.
            </p>
            <Link to="/new">
                 <Button variant="outline" size="lg" className="border-lavender-dark text-lavender-dark hover:bg-lavender-dark hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out">
                    Create a Post
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
