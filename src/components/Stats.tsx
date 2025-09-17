import { useLanguage } from "@/hooks/useLanguage";

const Stats = () => {
  const { t } = useLanguage();
  
  const stats = [
    { numberKey: "stats.destinations.number", labelKey: "stats.destinations.label" },
    { numberKey: "stats.homestays.number", labelKey: "stats.homestays.label" },
    { numberKey: "stats.artisans.number", labelKey: "stats.artisans.label" },
    { numberKey: "stats.travelers.number", labelKey: "stats.travelers.label" },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {t(stat.numberKey)}
              </div>
              <div className="text-lg text-muted-foreground">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;