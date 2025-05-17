import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Heart, ShieldCheck } from 'lucide-react';

const ResourceItem: React.FC<{ title: string; description: string; link?: string }> = ({ title, description, link }) => (
  <li className="mb-2">
    {link ? (
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-lavender-dark hover:text-deep-purple hover:underline">
        <strong>{title}:</strong>
      </a>
    ) : (
      <strong>{title}:</strong>
    )}
    {' '}{description}
  </li>
);

const ResourcesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-deep-purple mb-8 text-center">Mental Health Resources</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <BookOpen className="w-8 h-8 text-lavender-medium" />
            <CardTitle className="text-xl text-deep-purple">Coping Mechanisms</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700">
              <ResourceItem title="Deep Breathing Exercises" description="Techniques to calm your mind and body." />
              <ResourceItem title="Mindfulness Meditation" description="Practices to stay present and reduce stress." />
              <ResourceItem title="Grounding Techniques" description="Methods to manage anxiety and flashbacks." />
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Heart className="w-8 h-8 text-lavender-medium" />
            <CardTitle className="text-xl text-deep-purple">Self-Care Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700">
              <ResourceItem title="Healthy Sleep Hygiene" description="Tips for better quality sleep." />
              <ResourceItem title="Nutritious Eating Habits" description="How diet impacts mental well-being." />
              <ResourceItem title="Physical Activity Benefits" description="The role of exercise in mood regulation." />
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-lavender-medium" />
            <CardTitle className="text-xl text-deep-purple">Crisis Management</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700">
              <ResourceItem title="Creating a Safety Plan" description="Steps to take when feeling overwhelmed or unsafe." />
              <ResourceItem title="Identifying Support Systems" description="Who to reach out to in a crisis." />
              <ResourceItem title="When to Seek Professional Help" description="Recognizing signs you need more support." />
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-deep-purple">Emergency Hotlines & Contacts</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <p className="mb-2">If you are in immediate danger or crisis, please reach out to the following resources:</p>
          <ul className="list-disc list-inside">
            <li><strong>National Suicide Prevention Lifeline (USA):</strong> <a href="tel:988" className="text-lavender-dark hover:text-deep-purple">988</a></li>
            <li><strong>Crisis Text Line (USA):</strong> Text HOME to <a href="sms:741741" className="text-lavender-dark hover:text-deep-purple">741741</a></li>
            <li><strong>The Trevor Project (LGBTQ Youth):</strong> <a href="tel:1-866-488-7386" className="text-lavender-dark hover:text-deep-purple">1-866-488-7386</a></li>
            <li><em>Please add local hotlines relevant to your region.</em></li>
          </ul>
          <p className="mt-4">For immediate medical emergencies, please call your local emergency number (e.g., 911 in the USA).</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;