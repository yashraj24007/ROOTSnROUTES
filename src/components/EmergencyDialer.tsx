import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, AlertTriangle, Heart, Shield, MapPin } from 'lucide-react';

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  icon: React.ComponentType;
  color: string;
}

const EmergencyDialer = () => {
  const emergencyContacts: EmergencyContact[] = [
    {
      name: 'Emergency Services',
      number: '100',
      description: 'Police, Fire, Ambulance',
      icon: AlertTriangle,
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'Medical Emergency',
      number: '108',
      description: 'Ambulance Service',
      icon: Heart,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      name: 'Tourist Helpline',
      number: '1363',
      description: '24/7 Tourist Assistance',
      icon: MapPin,
      color: 'bg-teal-600 hover:bg-teal-700'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      description: 'Women Safety & Support',
      icon: Shield,
      color: 'bg-amber-600 hover:bg-amber-700'
    }
  ];

  const handleEmergencyCall = (number: string, name: string) => {
    if (typeof navigator !== 'undefined' && 'userAgent' in navigator) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Direct dial on mobile devices
        window.location.href = `tel:${number}`;
      } else {
        // Show instruction dialog for desktop users
        const message = `To call ${name} (${number}):\\n\\n` +
          '1. Open your phone dialer\\n' +
          `2. Dial ${number}\\n` +
          '3. Press call button\\n\\n' +
          'This number will be copied to your clipboard.';
        
        alert(message);
        
        // Copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(number).catch(() => {
            console.log('Failed to copy to clipboard');
          });
        }
      }
    }
  };

  const detectMobileDevice = () => {
    return typeof navigator !== 'undefined' && 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  return (
    <div className="w-full">
      <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Emergency Contacts
          </h3>
        </div>
        <p className="text-sm text-red-700 dark:text-red-300">
          {detectMobileDevice() 
            ? 'Tap any number below to call immediately in case of emergency.'
            : 'Numbers will be copied to clipboard. Use your mobile device to dial.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact) => {
          const IconComponent = contact.icon;
          
          return (
            <Card key={contact.number} className="hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${contact.color.split(' ')[0]} text-white flex-shrink-0`}>
                    <IconComponent />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg mb-1 truncate">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {contact.description}
                    </p>
                    
                    <Button
                      onClick={() => handleEmergencyCall(contact.number, contact.name)}
                      className={`w-full ${contact.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call {contact.number}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Safety Information */}
      <Card className="mt-6 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
        <div className="p-6">
          <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">
            📍 Safety Tips for Travelers
          </h4>
          <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
            <li>• Always inform someone about your travel plans and itinerary</li>
            <li>• Keep emergency contacts saved in your phone</li>
            <li>• Carry a physical copy of important documents</li>
            <li>• Stay connected - ensure your phone has network coverage</li>
            <li>• Follow local guidelines and respect cultural practices</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default EmergencyDialer;