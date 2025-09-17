// Example usage of WeatherSafetyWidget in a destination page
// Add this to your existing destination components

import WeatherSafetyWidget from '@/components/WeatherSafetyWidget';

// Example integration in Destinations page
const ExampleDestinationWithWeather = () => {
  const destinations = [
    {
      name: "Hundru Falls",
      location: "Ranchi, Jharkhand", // This will be used for weather API
      description: "A magnificent 98-meter waterfall...",
      // ... other destination data
    },
    {
      name: "Betla National Park",
      location: "Palamu, Jharkhand",
      description: "Rich wildlife sanctuary...",
      // ... other destination data
    }
  ];

  return (
    <div className="space-y-6">
      {destinations.map((destination, index) => (
        <div key={index} className="grid lg:grid-cols-3 gap-6">
          {/* Destination Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold">{destination.name}</h3>
            <p className="text-muted-foreground">{destination.description}</p>
            {/* ... other destination content */}
          </div>
          
          {/* Weather Safety Widget */}
          <div className="lg:col-span-1">
            <WeatherSafetyWidget 
              location={destination.location}
              showDetails={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Compact usage for cards
interface Destination {
  name: string;
  location: string;
  description: string;
}

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="font-bold">{destination.name}</h3>
      
      {/* Compact weather widget */}
      <WeatherSafetyWidget 
        location={destination.location}
        showDetails={false}
        className="w-full"
      />
      
      <p>{destination.description}</p>
    </div>
  );
};

export { ExampleDestinationWithWeather, DestinationCard };