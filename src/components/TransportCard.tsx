import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Globe, MapPin, Clock } from "lucide-react";

interface TransportCardProps {
  name: string;
  type: string;
  rating: number;
  description: string;
  routes: string[];
  timing: string;
  avgFare: string;
  contact: string;
  icon: React.ReactNode;
  bookingUrl?: string;
}

const TransportCard = ({ 
  name, 
  type, 
  rating, 
  description, 
  routes, 
  timing, 
  avgFare, 
  contact, 
  icon,
  bookingUrl
}: TransportCardProps) => {
  return (
    <Card className="p-6 bg-card border-border hover:shadow-card transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-card rounded-xl flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-primary">{type}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
          
          <div className="space-y-3 mb-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Key Routes:</h4>
              <div className="flex flex-wrap gap-2">
                {routes.map((route, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {route}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{timing}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-primary">{avgFare}</span>
                <span>Average Fare</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Contact: {contact}
            </div>
            <div className="flex gap-2">
              {!bookingUrl ? (
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => window.open(bookingUrl, '_blank')}
                  className="bg-gradient-to-r from-forest-500 to-autumn-500 hover:from-forest-600 hover:to-autumn-600 text-white"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TransportCard;