// Weather service for travel safety recommendations
// This service supports multiple weather API providers including Weatherbit, OpenWeatherMap, and WeatherAPI

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  description: string;
  condition: string;
  pressure: number;
  uvIndex?: number;
  cloudCover?: number;
  precipitationChance?: number;
  timestamp: Date;
}

interface WeatherbitCurrentResponse {
  data: Array<{
    city_name: string;
    country_code: string;
    temp: number;
    app_temp: number;
    rh: number;
    wind_spd: number;
    wind_dir: number;
    vis: number;
    weather: {
      description: string;
      code: number;
    };
    pres: number;
    uv?: number;
    clouds?: number;
    precip?: number;
  }>;
}

interface WeatherbitForecastResponse {
  data: Array<{
    datetime: string;
    temp: number;
    app_temp: number;
    rh: number;
    wind_spd: number;
    wind_dir: number;
    vis: number;
    weather: {
      description: string;
      code: number;
    };
    pres: number;
    uv?: number;
    clouds?: number;
    pop?: number;
  }>;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  name?: string;
}

export interface WeatherSafety {
  isSafe: boolean;
  safetyLevel: 'excellent' | 'good' | 'moderate' | 'poor' | 'dangerous';
  safetyScore: number; // 0-100
  recommendations: string[];
  warnings: string[];
  bestTimeToVisit: string;
  activitiesRecommended: string[];
  activitiesNotRecommended: string[];
}

export interface WeatherForecast {
  daily: Array<WeatherData & { date: string }>;
  hourly?: Array<WeatherData & { hour: string }>;
}

class WeatherService {
  private apiKey: string;
  private provider: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    this.provider = import.meta.env.VITE_WEATHER_API_PROVIDER || 'weatherbit';
    
    // Set base URL based on provider
    switch (this.provider) {
      case 'weatherbit':
        this.baseUrl = import.meta.env.VITE_WEATHERBIT_BASE_URL || 'https://api.weatherbit.io/v2.0';
        break;
      case 'openweather':
        this.baseUrl = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';
        break;
      case 'weatherapi':
        this.baseUrl = import.meta.env.VITE_WEATHERAPI_BASE_URL || 'https://api.weatherapi.com/v1';
        break;
      default:
        this.baseUrl = 'https://api.weatherbit.io/v2.0';
        this.provider = 'weatherbit';
    }
    
    if (!this.apiKey) {
      console.warn('Weather API key not found. Please set VITE_WEATHER_API_KEY in your .env file');
    }
  }

  // Get current weather for a location
  async getCurrentWeather(location: string): Promise<WeatherData | null> {
    if (!this.apiKey) {
      throw new Error('Weather API key not configured');
    }

    try {
      let response;
      
      switch (this.provider) {
        case 'weatherbit':
          response = await this.getWeatherbitCurrent(location);
          break;
        case 'openweather':
          response = await this.getOpenWeatherCurrent(location);
          break;
        default:
          response = await this.getWeatherbitCurrent(location);
      }
      
      return response;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return null;
    }
  }

  // Weatherbit API implementation
  private async getWeatherbitCurrent(location: string): Promise<WeatherData | null> {
    const response = await fetch(
      `${this.baseUrl}/current?city=${encodeURIComponent(location)}&key=${this.apiKey}&units=M`
    );

    if (!response.ok) {
      throw new Error(`Weatherbit API error: ${response.status}`);
    }

    const data: WeatherbitCurrentResponse = await response.json();
    
    if (!data.data || data.data.length === 0) {
      throw new Error('No weather data found for this location');
    }

    const weatherData = data.data[0];
    
    return {
      location: `${weatherData.city_name}, ${weatherData.country_code}`,
      temperature: Math.round(weatherData.temp),
      feelsLike: Math.round(weatherData.app_temp),
      humidity: weatherData.rh,
      windSpeed: weatherData.wind_spd,
      windDirection: weatherData.wind_dir,
      visibility: weatherData.vis,
      description: weatherData.weather.description,
      condition: this.mapWeatherbitCondition(weatherData.weather.code),
      pressure: weatherData.pres,
      uvIndex: weatherData.uv,
      cloudCover: weatherData.clouds,
      precipitationChance: weatherData.precip,
      timestamp: new Date()
    };
  }

  // OpenWeatherMap API implementation (fallback)
  private async getOpenWeatherCurrent(location: string): Promise<WeatherData | null> {
    const response = await fetch(
      `${this.baseUrl}/weather?q=${encodeURIComponent(location)}&appid=${this.apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000, // Convert to km
      description: data.weather[0].description,
      condition: data.weather[0].main,
      pressure: data.main.pressure,
      timestamp: new Date()
    };
  }

  // Map Weatherbit weather codes to general conditions
  private mapWeatherbitCondition(code: number): string {
    if (code >= 200 && code < 300) return 'Thunderstorm';
    if (code >= 300 && code < 400) return 'Drizzle';
    if (code >= 500 && code < 600) return 'Rain';
    if (code >= 600 && code < 700) return 'Snow';
    if (code >= 700 && code < 800) return 'Atmosphere';
    if (code === 800) return 'Clear';
    if (code > 800) return 'Clouds';
    return 'Unknown';
  }

  // Get weather forecast for a location
  async getWeatherForecast(location: string, days: number = 5): Promise<WeatherForecast | null> {
    if (!this.apiKey) {
      throw new Error('Weather API key not configured');
    }

    try {
      let response;
      
      switch (this.provider) {
        case 'weatherbit':
          response = await this.getWeatherbitForecast(location, days);
          break;
        case 'openweather':
          response = await this.getOpenWeatherForecast(location, days);
          break;
        default:
          response = await this.getWeatherbitForecast(location, days);
      }
      
      return response;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      return null;
    }
  }

  // Weatherbit forecast implementation
  private async getWeatherbitForecast(location: string, days: number): Promise<WeatherForecast | null> {
    const response = await fetch(
      `${this.baseUrl}/forecast/daily?city=${encodeURIComponent(location)}&key=${this.apiKey}&days=${days}&units=M`
    );

    if (!response.ok) {
      throw new Error(`Weatherbit API error: ${response.status}`);
    }

    const data: WeatherbitForecastResponse = await response.json();
    
    const dailyForecast = data.data.map(item => ({
      date: item.datetime,
      location: location,
      temperature: Math.round(item.temp),
      feelsLike: Math.round(item.app_temp),
      humidity: item.rh,
      windSpeed: item.wind_spd,
      windDirection: item.wind_dir,
      visibility: item.vis,
      description: item.weather.description,
      condition: this.mapWeatherbitCondition(item.weather.code),
      pressure: item.pres,
      uvIndex: item.uv,
      cloudCover: item.clouds,
      precipitationChance: item.pop,
      timestamp: new Date(item.datetime)
    }));
    
    return { daily: dailyForecast };
  }

  // OpenWeatherMap forecast implementation (fallback)
  private async getOpenWeatherForecast(location: string, days: number): Promise<WeatherForecast | null> {
    const response = await fetch(
      `${this.baseUrl}/forecast?q=${encodeURIComponent(location)}&appid=${this.apiKey}&units=metric&cnt=${days * 8}`
    );

    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.status}`);
    }

    const data = await response.json();
    const dailyForecast = this.processForecastData(data.list);
    
    return { daily: dailyForecast };
  }

  // Process forecast data to get daily summaries
  private processForecastData(forecastList: ForecastItem[]): Array<WeatherData & { date: string }> {
    const dailyData: { [key: string]: ForecastItem[] } = {};
    
    // Group by date
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // Create daily summaries
    return Object.entries(dailyData).map(([date, dayData]) => {
      const midDayData = dayData.find(item => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 12 && hour <= 15;
      }) || dayData[0];

      return {
        date,
        location: dayData[0].name || '',
        temperature: Math.round(midDayData.main.temp),
        feelsLike: Math.round(midDayData.main.feels_like),
        humidity: midDayData.main.humidity,
        windSpeed: midDayData.wind.speed,
        windDirection: midDayData.wind.deg,
        visibility: midDayData.visibility / 1000,
        description: midDayData.weather[0].description,
        condition: midDayData.weather[0].main,
        pressure: midDayData.main.pressure,
        timestamp: new Date(midDayData.dt * 1000)
      };
    });
  }

  // Analyze weather safety for travel with enhanced Weatherbit data
  analyzeTravelSafety(weather: WeatherData): WeatherSafety {
    let safetyScore = 100;
    const recommendations: string[] = [];
    const warnings: string[] = [];
    const activitiesRecommended: string[] = [];
    const activitiesNotRecommended: string[] = [];

    // Temperature analysis
    if (weather.temperature < 0) {
      safetyScore -= 20;
      warnings.push('Freezing temperatures - risk of frostbite and icy conditions');
      recommendations.push('Wear warm clothing and be cautious of icy surfaces');
      activitiesNotRecommended.push('Outdoor water activities', 'Camping without proper gear');
    } else if (weather.temperature < 10) {
      safetyScore -= 10;
      recommendations.push('Dress warmly and layer clothing');
      activitiesRecommended.push('Indoor sightseeing', 'Hot beverages and warm meals');
    } else if (weather.temperature > 35) {
      safetyScore -= 15;
      warnings.push('High temperatures - risk of heat exhaustion');
      recommendations.push('Stay hydrated and seek shade during peak hours');
      activitiesNotRecommended.push('Strenuous outdoor activities during midday');
    } else if (weather.temperature > 40) {
      safetyScore -= 25;
      warnings.push('Extreme heat - dangerous for outdoor activities');
      recommendations.push('Avoid outdoor activities during 10 AM - 4 PM');
      activitiesNotRecommended.push('Hiking', 'Outdoor sports', 'Long walks');
    }

    // Wind analysis (Weatherbit provides more accurate wind data)
    if (weather.windSpeed > 10) {
      safetyScore -= 10;
      recommendations.push('Be cautious of strong winds during outdoor activities');
    }
    if (weather.windSpeed > 15) {
      safetyScore -= 15;
      warnings.push('Strong winds - potential travel disruptions');
      recommendations.push('Secure loose items and be cautious near water bodies');
      activitiesNotRecommended.push('Boat rides', 'Outdoor photography setups');
    } else if (weather.windSpeed > 25) {
      safetyScore -= 30;
      warnings.push('Very strong winds - dangerous for outdoor activities');
      activitiesNotRecommended.push('All water activities', 'Mountain hiking', 'Cable car rides');
    }

    // Weather condition analysis
    const condition = weather.condition.toLowerCase();
    if (condition.includes('thunderstorm')) {
      safetyScore -= 40;
      warnings.push('Thunderstorm conditions - high risk activity');
      recommendations.push('Stay indoors and avoid outdoor activities');
      activitiesNotRecommended.push('All outdoor activities', 'Water activities', 'Hiking');
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      safetyScore -= 15;
      recommendations.push('Carry umbrella and wear waterproof clothing');
      activitiesRecommended.push('Indoor museums', 'Covered markets', 'Cultural centers');
      activitiesNotRecommended.push('Outdoor photography', 'Hiking without proper gear');
    } else if (condition.includes('snow')) {
      safetyScore -= 20;
      recommendations.push('Wear appropriate winter gear and non-slip footwear');
      activitiesRecommended.push('Winter sports (if equipped)', 'Scenic snow viewing');
      activitiesNotRecommended.push('Driving without snow chains', 'Outdoor camping');
    } else if (condition.includes('clear') || condition.includes('sun')) {
      activitiesRecommended.push('Outdoor sightseeing', 'Photography', 'Nature walks', 'Cultural tours');
    }

    // Enhanced analysis with Weatherbit-specific data
    if (weather.uvIndex && weather.uvIndex > 7) {
      safetyScore -= 10;
      warnings.push('High UV index - risk of sunburn');
      recommendations.push('Use sunscreen SPF 30+, wear hat and sunglasses');
    } else if (weather.uvIndex && weather.uvIndex > 10) {
      safetyScore -= 20;
      warnings.push('Very high UV index - extreme sun exposure risk');
      recommendations.push('Minimize sun exposure between 10 AM - 4 PM');
    }

    // Cloud cover analysis (if available)
    if (weather.cloudCover && weather.cloudCover > 80) {
      recommendations.push('Overcast conditions - good for outdoor activities without sun exposure concerns');
      activitiesRecommended.push('Hiking', 'Outdoor photography', 'Sightseeing');
    }

    // Precipitation chance analysis (Weatherbit provides this)
    if (weather.precipitationChance && weather.precipitationChance > 70) {
      safetyScore -= 15;
      warnings.push('High chance of precipitation - plan indoor alternatives');
      recommendations.push('Check weather updates frequently and have backup indoor plans');
    } else if (weather.precipitationChance && weather.precipitationChance > 40) {
      safetyScore -= 8;
      recommendations.push('Moderate chance of rain - carry umbrella as precaution');
    }

    // Humidity analysis
    if (weather.humidity > 80) {
      safetyScore -= 10;
      recommendations.push('High humidity - stay hydrated and take frequent breaks');
    } else if (weather.humidity < 30) {
      safetyScore -= 5;
      recommendations.push('Low humidity - stay hydrated and use moisturizer');
    }

    // Visibility analysis
    if (weather.visibility < 1) {
      safetyScore -= 25;
      warnings.push('Poor visibility - travel with extreme caution');
      recommendations.push('Avoid driving and use public transport when possible');
      activitiesNotRecommended.push('Driving', 'Outdoor photography', 'Sightseeing tours');
    } else if (weather.visibility < 5) {
      safetyScore -= 10;
      recommendations.push('Reduced visibility - exercise caution during travel');
    }

    // Determine safety level
    let safetyLevel: WeatherSafety['safetyLevel'];
    if (safetyScore >= 85) safetyLevel = 'excellent';
    else if (safetyScore >= 70) safetyLevel = 'good';
    else if (safetyScore >= 50) safetyLevel = 'moderate';
    else if (safetyScore >= 30) safetyLevel = 'poor';
    else safetyLevel = 'dangerous';

    // Best time to visit recommendations
    let bestTimeToVisit = 'Current conditions are suitable for travel';
    if (safetyLevel === 'poor' || safetyLevel === 'dangerous') {
      bestTimeToVisit = 'Consider postponing travel or wait for better weather conditions';
    } else if (safetyLevel === 'moderate') {
      bestTimeToVisit = 'Travel with caution and proper preparation';
    } else if (safetyLevel === 'excellent') {
      bestTimeToVisit = 'Perfect conditions for outdoor activities and sightseeing';
    }

    // Default recommendations for good weather
    if (recommendations.length === 0) {
      recommendations.push('Excellent weather conditions for all outdoor activities');
    }

    return {
      isSafe: safetyScore >= 50,
      safetyLevel,
      safetyScore: Math.max(0, Math.min(100, safetyScore)),
      recommendations,
      warnings,
      bestTimeToVisit,
      activitiesRecommended,
      activitiesNotRecommended
    };
  }

  // Get comprehensive travel weather report
  async getTravelWeatherReport(location: string): Promise<{
    current: WeatherData;
    safety: WeatherSafety;
    forecast?: WeatherForecast;
  } | null> {
    try {
      const currentWeather = await this.getCurrentWeather(location);
      if (!currentWeather) return null;

      const safety = this.analyzeTravelSafety(currentWeather);
      const forecast = await this.getWeatherForecast(location, 3);

      return {
        current: currentWeather,
        safety,
        forecast: forecast || undefined
      };
    } catch (error) {
      console.error('Error getting travel weather report:', error);
      return null;
    }
  }
}

export const weatherService = new WeatherService();