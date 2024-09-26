import React, { useState, useEffect } from 'react';
import Groq from 'groq-sdk';
import useAppContext from "../../context/AppContext";
import { motion } from 'framer-motion';
import { Sun, Cloud, Droplet, Wind, PanelTop, Lightbulb, Leaf } from 'lucide-react';

const categoryImages = {
    family: "/family.jpeg",
    solo: "/solo.jpeg",
    'health-conscious': "/healthy.jpeg",
    budget: "/budget.jpeg",
    'quick-preparation': "/quick.jpeg",
};

const categoryIcons = {
    family: <PanelTop className="h-8 w-8 text-indigo-500" />,
    solo: <PanelTop className="h-8 w-8 text-pink-500" />,
    'health-conscious': <PanelTop className="h-8 w-8 text-green-500" />,
    budget: <PanelTop className="h-8 w-8 text-yellow-500" />,
    'quick-preparation': <PanelTop className="h-8 w-8 text-red-500" />,
};

function Energy() {
    const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
    });
    const { data } = useAppContext();
    const [ans, setAns] = useState('');
    const [activeTab, setActiveTab] = useState('Recipes');
    const isLocationDataAvailable = data.Location && data.Region;

    const getGroqChatCompletion = async () => {
        return groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Based on the following weather and home data, provide a comprehensive overview that includes personalized meal recommendations, energy-saving tips and seasonal advice. Tailor the responses to the given weather conditions, home type, energy bill, and appliances used. Provide actionable insights that are unique to the user's situation, focusing on energy efficiency and improving daily life based on the weather.

Here is the data:
Location: ${data.Location}
Region: ${data.Region}
Country: ${data.Country}
Current Temperature: ${data.CurrentTemp}°C
Humidity: ${data.Humidity}%
Cloud Cover: ${data.CloudCover}%
Wind Speed: ${data.WindSpeed} km/h
Condition: ${data.Condition}
Season: ${data.Season} (e.g., summer, winter)
Home Type: ${data.HomeType} (e.g., apartment, house)
Appliances: ${data.Appliances} (e.g., air conditioner, heater, fridge)
Energy Bill: ${data.EnergyBill}

Provide the following:
1. *Weather-Driven Recipes*: Suggest meals suitable for the current weather conditions, including family, solo, health-conscious, budget-friendly, and quick-preparation meal options. Consider energy-efficient meal preparation tips.
   
2. *Custom Energy Savings Plan*: Provide energy-saving tips for heating, cooling, and appliance usage, tailored to the home type and weather. Include smart home integration if applicable.

3. *Seasonal Insights*: Offer seasonal energy-saving strategies based on the current season and weather conditions, including daily actions users can take to reduce costs.


Format the response as a JSON object with the following structure:
{
  "recipes": {
    "family": [{"meal": "Meal Title", "description": "Meal description"}],
    "solo": [{"meal": "Meal Title", "description": "Meal description"}],
    "health-conscious": [{"meal": "Meal Title", "description": "Meal description"}],
    "budget": [{"meal": "Meal Title", "description": "Meal description"}],
    "quick-preparation": [{"meal": "Meal Title", "description": "Meal description"}]
  },
  "energy-savings": {
    "cooling": [{"tip": "Tip description", "details": "Additional information"}],
    "heating": [{"tip": "Tip description", "details": "Additional information"}],
    "appliances": [{"tip": "Tip description", "details": "Additional information"}],
    "smart-home": [{"tip": "Tip description", "details": "Additional information"}]
  },
  "seasonal-insights": {
    "summer": [{"tip": "Tip description", "details": "Additional information"}],
    "winter": [{"tip": "Tip description", "details": "Additional information"}],
    "daily-actions": [{"tip": "Tip description", "details": "Additional information"}]
  }
}

Important: Return only the JSON object, without any markdown formatting or additional text. Do include always atleast the 2 recieps in each section or category and atleast 1 in energy saving and seasonal insights section.
`,
                },
            ],
            model: 'llama3-8b-8192',
        });
    };
    const main = async () => {
        try {
            const chatCompletion = await getGroqChatCompletion();
            const generatedAns = chatCompletion.choices[0]?.message?.content;
            const cleanedResponse = generatedAns.replace(/json|/g, '').trim();
            const parsedActivities = JSON.parse(cleanedResponse);
            console.log(parsedActivities)
            setAns(parsedActivities);
        } catch (error) {
            console.error('Error fetching Groq completion:', error);
        }
    };

    useEffect(() => {
        if (data.Location && data.Region) {
            main();
        }
        return;
    }, [data.Location, data.Region]);

    const WeatherIcon = ({ condition }) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return <Sun className="h-8 w-8 text-yellow-400" />;
            case 'cloudy':
                return <Cloud className="h-8 w-8 text-gray-400" />;
            case 'rainy':
                return <Droplet className="h-8 w-8 text-blue-400" />;
            case 'windy':
                return <Wind className="h-8 w-8 text-teal-400" />;
            default:
                return null;
        }
    };
    const RecipeCard = ({ category, meals }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={categoryImages[category]}
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h4 className="text-2xl font-semibold capitalize text-white p-4 flex items-center">

                        <span className="ml-2">{category.replace('-', ' ')}</span>
                    </h4>
                </div>
            </div>
            <div className="p-6 space-y-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg ">
                {meals.map((meal, i) => (
                    <div key={i} className="border-b border-gray-300 pb-3 last:border-b-0">
                        <h4 className="font-semibold text-xl text-gray-900 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                            {meal.meal}
                        </h4>
                        <p className="text-gray-700 mt-2">{meal.description}</p>
                    </div>
                ))}
            </div>

        </motion.div>
    );
    const TabButton = ({ label, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-300 ${isActive
                ? 'bg-white shadow text-blue-700 transform scale-105'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`}
        >
            {label}
        </button>
    );

    const tabContent = {
        Recipes: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ans && ans.recipes && Object.entries(ans.recipes).map(([category, meals], index) => (
                    <RecipeCard key={index} category={category} meals={meals} />
                ))}
            </div>
        ),
        'Energy Savings': (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ans && ans['energy-savings'] && Object.entries(ans['energy-savings']).map(([category, tips], index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-4 capitalize text-blue-800 flex items-center">
                            <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                            {category.replace('-', ' ')}
                        </h3>
                        <ul className="space-y-2">
                            {tips.map((tip, i) => (
                                <li key={i} className="flex items-start bg-white/50 rounded-lg p-3 shadow-sm">
                                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-blue-700">{tip.tip}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        ),
        'Seasonal Insights': (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ans && ans['seasonal-insights'] && Object.entries(ans['seasonal-insights']).map(([category, insights], index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold capitalize text-purple-800 flex items-center">
                                <Leaf className="h-6 w-6 mr-2 text-green-500" />
                                {category.replace('-', ' ')}
                            </h3>
                            <WeatherIcon condition={category} />
                        </div>
                        <ul className="space-y-2">
                            {Array.isArray(insights) ? (
                                insights.map((insight, i) => (
                                    <li key={i} className="text-purple-700 bg-white/50 rounded-lg p-3 shadow-sm">
                                        {typeof insight === 'string' ? insight : insight.tip || JSON.stringify(insight)}
                                    </li>
                                ))
                            ) : typeof insights === 'object' ? (
                                Object.entries(insights).map(([key, value], i) => (
                                    <li key={i} className="text-purple-700 bg-white/50 rounded-lg p-3 shadow-sm">
                                        <strong>{key}:</strong> {typeof value === 'string' ? value : JSON.stringify(value)}
                                    </li>
                                ))
                            ) : (
                                <li className="text-purple-700 bg-white/50 rounded-lg p-3 shadow-sm">
                                    {JSON.stringify(insights)}
                                </li>
                            )}
                        </ul>
                    </motion.div>
                ))}
            </div>
        ),
    };

    return (
        (isLocationDataAvailable) ?
            <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200 p-6">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Weather-Driven Lifestyle - {data.Location} , {data.Country}</h1>

                    <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
                        {Object.keys(tabContent).map((tabName) => (
                            <TabButton
                                key={tabName}
                                label={tabName}
                                isActive={activeTab === tabName}
                                onClick={() => setActiveTab(tabName)}
                            />
                        ))}
                    </div>

                    {ans ? tabContent[activeTab] : (
                        <div className="text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="inline-block"
                            >
                                <svg className="h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </motion.div>
                            <p className="mt-4 text-lg font-semibold text-gray-700">Loading content...</p>
                        </div>
                    )}
                </motion.div>
            </div> :
            <div>
                You have not entered any location
            </div>


    );
}

export default Energy;