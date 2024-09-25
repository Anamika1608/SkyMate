import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import useAppContext from "../../context/AppContext";
import { Heart, Star, ThumbsUp, Sun, Users, Umbrella, Clock, MapPin, Thermometer, Droplets, Cloud, Wind } from 'lucide-react';

const ActivityCard = ({ title, content, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-indigo-500">
        <div className="flex items-center mb-3">
            <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <Icon className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{content}</p>
    </div>
);

const WeatherInfo = ({ data }) => (
    <div className="bg-gray-100 text-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Current Weather</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { icon: MapPin, label: 'Location', value: `${data.Location}, ${data.Country}` },
                { icon: Thermometer, label: 'Temperature', value: `${data.CurrentTemp}°C` },
                { icon: Droplets, label: 'Humidity', value: `${data.Humidity}%` },
                { icon: Cloud, label: 'Cloud Cover', value: `${data.CloudCover}%` },
                { icon: Sun, label: 'UV Index', value: data.UV },
                { icon: Wind, label: 'Wind Chill', value: `${data.WindchillTemperature}°C` },
            ].map((item, index) => (
                <div key={index} className="bg-[#c23ff2] bg-opacity-20 p-4 rounded-lg shadow-md flex items-center transition-transform duration-300 transform hover:scale-105">
                    <item.icon className="w-8 h-8 mr-4 text-blue-500" />
                    <div className=''>
                        <p className="text-sm  text-[#6a626e] opacity-80">{item.label}</p>
                        <p className="text-lg text-[#493e4d] font-semibold">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ActivitySuggestion = () => {
    const [activities, setActivities] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { data } = useAppContext();

    const hasLocationData = data?.Location && data?.Country;

    useEffect(() => {
        if (!hasLocationData) return; 
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Based on the following weather data, suggest personalized and unique outdoor activities that are safe, enjoyable, and suitable for the given conditions. Consider the temperature, humidity, UV index, and other factors such as cloud cover, windchill, and heat index. Additionally, provide safety tips or preparations that someone should take for each activity. Ensure the activities are creative and tailored for different types of users (e.g., solo, families, adventure seekers, relaxation).

  Here is the current weather data:
  Location: ${data.Location}
  Region: ${data.Region}
  Country: ${data.Country}
  Current Temperature: ${data.CurrentTemp}°C
  Humidity: ${data.Humidity}%
  Cloud Cover: ${data.CloudCover}%
  UV Index: ${data.UV}
  Heat Index: ${data.HeatIndex}°C
  Condition: ${data.Condition}
  Windchill Temperature: ${data.WindchillTemperature}°C

  Suggest multiple activities for different user preferences and scenarios such as:
  Activities for solo individuals, families, and groups
  Adventurous and relaxing options
  Time-of-day-specific recommendations (e.g., early morning, afternoon, evening)
  Ideas for both short and long durations
  Provide an estimate of how the weather might impact the activities.
  Please also include alternative indoor activities for weather conditions that may not be ideal for outdoor plans.
  Do not include more than 3 activities in each section.

  Format the response as a JSON object with the following structure:
  {
    "solo": [{"title": "Activity Title", "description": "Activity description"}],
    "family": [{"title": "Activity Title", "description": "Activity description"}],
    "group": [{"title": "Activity Title", "description": "Activity description"}],
    "adventure": [{"title": "Activity Title", "description": "Activity description"}],
    "relaxation": [{"title": "Activity Title", "description": "Activity description"}],
    "indoor": [{"title": "Activity Title", "description": "Activity description"}]
  }
  
  Important: Return only the JSON object, without any markdown formatting or additional text.`;

        const fetchResult = async () => {
            try {
                const result = await model.generateContent(prompt);
                const responseText = result.response.text();

                const cleanedResponse = responseText.replace(/json|/g, '').trim();
                const parsedActivities = JSON.parse(cleanedResponse);

                setActivities(parsedActivities);
                setError(null);
            } catch (error) {
                console.error("Error fetching AI response:", error);
                setActivities(null);
                setError("There was an error generating activity suggestions. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [data, hasLocationData]);

    const activityTypes = [
        { key: 'solo', icon: Sun, title: 'Solo Adventures', bgColor: 'bg-yellow-100 bg-gradient-to-r from-yellow-100 to-yellow-200' },
        { key: 'family', icon: Users, title: 'Family Fun', bgColor: 'bg-green-100 bg-gradient-to-r from-green-100 to-green-300' },
        { key: 'group', icon: Users, title: 'Group Excitement', bgColor: 'bg-blue-100 bg-gradient-to-r from-blue-100 to-blue-300' },
        { key: 'adventure', icon: MapPin, title: 'Thrill Seekers', bgColor: 'bg-red-100 bg-gradient-to-r from-red-100 to-red-300' },
        { key: 'relaxation', icon: Umbrella, title: 'Relaxation Station', bgColor: 'bg-purple-100 bg-gradient-to-r from-purple-100 to-purple-300' },
        { key: 'indoor', icon: Clock, title: 'Indoor Escapades', bgColor: 'bg-indigo-100 bg-gradient-to-r from-indigo-100 to-indigo-300' },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 rounded-lg ">
            <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Weather-Inspired Activity Ideas
            </h1>

            {!hasLocationData ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p className="font-bold">No Location Data</p>
                    <p className='text-black'>You have not entered a location. Please provide your location to get activity suggestions.</p>
                </div>
            ) : (
                <div>
                    <WeatherInfo data={data} />

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    ) : activities ? (
                        <div className="space-y-12">
                            {activityTypes.map(({ key, icon: Icon, title, bgColor }) => (
                                <div key={key} className={`${bgColor} p-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1`}>
                                    <div className="flex items-center mb-4">
                                        <Icon className="w-8 h-8 mr-3 text-indigo-600" />
                                        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {activities[key]?.map((activity, index) => (
                                            <ActivityCard key={index} title={activity.title} content={activity.description} icon={Icon} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default ActivitySuggestion;
