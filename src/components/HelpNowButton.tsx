
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { PhoneOutgoing, ShieldAlert } from 'lucide-react';

const HelpNowButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-xl z-50 animate-pulse bg-red-500 hover:bg-red-600"
        onClick={() => setIsOpen(true)}
        aria-label="Help Now"
      >
        <ShieldAlert size={28} className="text-white" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600 flex items-center">
              <ShieldAlert size={28} className="mr-2" /> Urgent Help Needed?
            </DialogTitle>
            <DialogDescription className="mt-2 text-gray-600">
              If you are in crisis, feeling overwhelmed, or in danger, please use these resources immediately.
              These services are available to provide support. Your safety is the priority.
              Remember, reaching out is a sign of strength.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4 space-y-3">
            <p className="font-semibold text-deep-purple">Emergency Contacts:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>National Suicide Prevention Lifeline (USA):</strong> Call or Text <a href="tel:988" className="text-red-500 hover:underline font-bold">988</a></li>
              <li><strong>Crisis Text Line (USA):</strong> Text HOME to <a href="sms:741741" className="text-red-500 hover:underline font-bold">741741</a></li>
              <li><strong>The Trevor Project (LGBTQ Youth):</strong> Call <a href="tel:1-866-488-7386" className="text-red-500 hover:underline font-bold">1-866-488-7386</a></li>
              <li><em>(You can find local/regional hotlines by searching online for "crisis hotlines [your area]")</em></li>
            </ul>
             <p className="mt-3 text-sm text-gray-500">
              For immediate medical emergencies or if you are in physical danger, please call your local emergency number (e.g., 911 in the USA, 112 in Europe, etc.) without delay.
            </p>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HelpNowButton;
