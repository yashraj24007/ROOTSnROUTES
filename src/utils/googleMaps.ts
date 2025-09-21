/**
 * Utility functions for Google Maps integration
 */

interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Generate Google Maps URL for a location
 * @param location - Location name (e.g., "Ranchi, Jharkhand")
 * @param coordinates - Optional coordinates for more precise location
 * @returns Google Maps URL
 */
export const generateGoogleMapsUrl = (
  location: string, 
  coordinates?: Coordinates
): string => {
  const baseUrl = 'https://www.google.com/maps';
  
  if (coordinates) {
    // Use coordinates for precise location
    return `${baseUrl}/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
  } else {
    // Use location name for search
    const encodedLocation = encodeURIComponent(location);
    return `${baseUrl}/search/?api=1&query=${encodedLocation}`;
  }
};

/**
 * Generate Google Maps directions URL
 * @param destination - Destination location
 * @param coordinates - Optional coordinates for destination
 * @returns Google Maps directions URL
 */
export const generateDirectionsUrl = (
  destination: string,
  coordinates?: Coordinates
): string => {
  const baseUrl = 'https://www.google.com/maps/dir';
  
  if (coordinates) {
    return `${baseUrl}//${coordinates.lat},${coordinates.lng}`;
  } else {
    const encodedDestination = encodeURIComponent(destination);
    return `${baseUrl}//${encodedDestination}`;
  }
};

/**
 * Generate a complete location string for Jharkhand destinations
 * @param name - Place name
 * @param district - District name
 * @param state - State (default: Jharkhand)
 * @returns Formatted location string
 */
export const formatLocationString = (
  name: string,
  district: string,
  state: string = 'Jharkhand'
): string => {
  return `${name}, ${district}, ${state}, India`;
};

/**
 * District coordinates for Jharkhand (approximate center points)
 */
export const districtCoordinates: Record<string, Coordinates> = {
  'Ranchi': { lat: 23.3441, lng: 85.3096 },
  'Jamshedpur': { lat: 22.8046, lng: 86.2029 },
  'Dhanbad': { lat: 23.7979, lng: 86.4304 },
  'Bokaro': { lat: 23.6693, lng: 86.1511 },
  'Deoghar': { lat: 24.4823, lng: 86.6958 },
  'Hazaribag': { lat: 23.9929, lng: 85.3647 },
  'Giridih': { lat: 24.1901, lng: 86.3000 },
  'Ramgarh': { lat: 23.6128, lng: 85.5176 },
  'Dumka': { lat: 24.2676, lng: 87.2497 },
  'Pakur': { lat: 24.6340, lng: 87.8492 },
  'Palamu': { lat: 24.0364, lng: 84.0664 },
  'Chatra': { lat: 24.2089, lng: 84.8728 },
  'Koderma': { lat: 24.4681, lng: 85.5965 },
  'Jamtara': { lat: 23.9629, lng: 86.8065 },
  'Garhwa': { lat: 24.1542, lng: 83.8064 },
  'Latehar': { lat: 23.7440, lng: 84.5000 },
  'Gumla': { lat: 23.0433, lng: 84.5383 },
  'Simdega': { lat: 22.6172, lng: 84.5113 },
  'Lohardaga': { lat: 23.4319, lng: 84.6804 },
  'Khunti': { lat: 23.0715, lng: 85.2788 },
  'West Singhbhum': { lat: 22.5562, lng: 85.0460 },
  'East Singhbhum': { lat: 22.8046, lng: 86.2029 },
  'Saraikela Kharsawan': { lat: 22.7000, lng: 86.1500 },
  'Godda': { lat: 24.8267, lng: 87.2142 },
  'Sahibganj': { lat: 25.2386, lng: 87.6411 }
};

/**
 * Get coordinates for a district
 * @param district - District name
 * @returns Coordinates or null if not found
 */
export const getDistrictCoordinates = (district: string): Coordinates | null => {
  return districtCoordinates[district] || null;
};