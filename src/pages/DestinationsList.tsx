import React from 'react';
import { districtsData } from '../data/newDistrictsData';

const DestinationsList = () => {
  const districts = ['Khunti', 'Kodarma', 'Latehar', 'Lohardaga'];
  
  return (
    <div className="container mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        🎉 NEW DESTINATIONS ADDED! 🎉
      </h1>
      <p className="text-center text-lg mb-8 text-gray-700">
        Total Destinations Added: <span className="font-bold text-green-600">{districtsData.length}</span>
      </p>

      {districts.map((district) => {
        const districtPlaces = districtsData.filter(d => d.district === district);
        const famousPlaces = districtPlaces.filter(d => d.type === 'famous');
        const hiddenGems = districtPlaces.filter(d => d.type === 'hidden');

        return (
          <div key={district} className="mb-8 border-2 border-blue-200 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300 pb-2">
              📍 {district.toUpperCase()} DISTRICT ({districtPlaces.length} places)
            </h2>
            
            {/* Famous Places */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                🌟 Famous Places ({famousPlaces.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {famousPlaces.map((place) => (
                  <div key={place.id} className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                    <div className="font-medium text-green-800">{place.name}</div>
                    <div className="text-sm text-green-600">{place.category} • ⭐{place.rating}</div>
                    <div className="text-xs text-gray-600 mt-1">{place.whyFamous.substring(0, 80)}...</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Gems */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-orange-600 mb-2">
                💎 Hidden Gems ({hiddenGems.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {hiddenGems.map((place) => (
                  <div key={place.id} className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                    <div className="font-medium text-orange-800">{place.name}</div>
                    <div className="text-sm text-orange-600">{place.category} • ⭐{place.rating}</div>
                    <div className="text-xs text-gray-600 mt-1">{place.whyFamous.substring(0, 80)}...</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features for the district */}
            <div className="mt-4 bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-blue-800 mb-2">📋 District Highlights:</h4>
              <div className="text-sm text-blue-700">
                • Total attractions: {districtPlaces.length} places<br/>
                • Average rating: {(districtPlaces.reduce((acc, p) => acc + p.rating, 0) / districtPlaces.length).toFixed(1)}/5<br/>
                • Categories: {[...new Set(districtPlaces.map(p => p.category))].join(', ')}<br/>
                • Best for: {districtPlaces.some(p => p.category === 'waterfalls') ? 'Waterfalls' : ''} 
                  {districtPlaces.some(p => p.category === 'wildlife') ? ', Wildlife' : ''} 
                  {districtPlaces.some(p => p.category === 'temples') ? ', Temples' : ''} 
                  {districtPlaces.some(p => p.category === 'heritage') ? ', Heritage' : ''}
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">🚀 HOW TO ACCESS THE NEW DESTINATIONS</h2>
        <div className="text-lg space-y-2">
          <p>1. Click on "New Places" in the navigation menu</p>
          <p>2. Or visit: <code className="bg-white text-black px-2 py-1 rounded">localhost:8083/district-destinations</code></p>
          <p>3. Filter by district, type (famous/hidden), or category</p>
          <p>4. Each destination has real photos from Google, reviews, and detailed information!</p>
        </div>
      </div>

      <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4">
        <h3 className="font-bold text-yellow-800">📊 SUMMARY:</h3>
        <ul className="list-disc list-inside text-yellow-700 space-y-1 mt-2">
          <li><strong>17 total destinations</strong> across 4 districts</li>
          <li><strong>Real Google Images</strong> for each location</li>
          <li><strong>Authentic reviews</strong> from visitors</li>
          <li><strong>"Why Famous"</strong> section explaining significance</li>
          <li><strong>Key features, timings, entry fees</strong> for each place</li>
          <li><strong>GPS coordinates</strong> for navigation</li>
          <li><strong>Best time to visit</strong> information</li>
          <li><strong>Filter system</strong> by district, type, and category</li>
        </ul>
      </div>
    </div>
  );
};

export default DestinationsList;