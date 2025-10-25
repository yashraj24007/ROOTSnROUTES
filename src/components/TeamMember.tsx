import { Card } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TeamMember = ({ name, role, description, image }: TeamMemberProps) => {
  return (
    <Card className="p-6 bg-card/50 border-border hover:bg-card/80 transition-all duration-300 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-card overflow-hidden team-avatar-container">
        <div className="w-full h-full bg-gradient-nature flex items-center justify-center text-white font-bold text-2xl avatar-initials relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-4 right-3 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-3 left-4 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          {/* Geometric pattern */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-6 h-0.5 bg-white transform rotate-45"></div>
              <div className="absolute bottom-1/4 right-1/4 w-4 h-0.5 bg-white transform -rotate-45"></div>
            </div>
          </div>
          {/* Main initials */}
          <span className="relative z-10">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>
      <h4 className="text-xl font-bold text-foreground mb-1">{name}</h4>
      <p className="text-primary font-medium mb-3">{role}</p>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
};

export default TeamMember;