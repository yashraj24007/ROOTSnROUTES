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
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-card overflow-hidden">
        <div className="w-full h-full bg-gradient-nature flex items-center justify-center text-white font-bold text-2xl">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <h4 className="text-xl font-bold text-foreground mb-1">{name}</h4>
      <p className="text-primary font-medium mb-3">{role}</p>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
};

export default TeamMember;