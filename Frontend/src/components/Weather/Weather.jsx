import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import { Sun, Cloud, Droplets, Wind, Thermometer, Sunrise, Sunset, Moon, CloudRain, Umbrella } from 'lucide-react';
import { motion } from 'framer-motion';
import './AiButton.css'
import useAppContext from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';

const WeatherIcon = ({ condition, icon, size = 48 }) => (
    <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
        <img src={icon} alt={condition} className={`w-${size} h-${size}`} />
    </motion.div>
);

const GradientCard = ({ children, className }) => (
    <motion.div
        className={`bg-white/80 backdrop-blur-md text-gray-800 p-6 rounded-xl shadow-lg ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const WeatherCard = ({ title, value, icon: Icon }) => (
    <motion.div
        className="bg-blue-100/70 p-4 rounded-lg flex items-center space-x-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
        <Icon className="text-blue-600" size={28} />
        <div>
            <h3 className="text-sm font-medium text-blue-800">{title}</h3>
            <p className="text-lg font-semibold text-blue-900">{value}</p>
        </div>
    </motion.div>
);

const ForecastCard = ({ day, isSelected, onClick }) => {
    const date = new Date(day.date);
    return (
        <motion.div
            className={`p-4 rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-blue-200 text-black' : 'bg-white/70 text-gray-800 hover:bg-blue-100'}`}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >   <div>
                <p className="text-lg font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className="text-lg text-black font-medium">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <WeatherIcon condition={day.day.condition.text} icon={day.day.condition.icon} size={10} />
            </div>
            <div>
                <p className="text-xs sm:text-sm mt-1 flex flex-col sm:flex-row items-center sm:space-x-2">
                    <div className="flex items-center space-x-1">
                        <Thermometer size={16} className="text-red-600" />
                        <span className="text-xs sm:text-sm font-medium text-black">Highest: {day.day.maxtemp_c}°C</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                        <Thermometer size={16} className="text-blue-600" />
                        <span className="text-xs sm:text-sm font-medium text-black">Lowest: {day.day.mintemp_c}°C</span>
                    </div>
                </p>

            </div>

        </motion.div>
    );
};

const HourlyForecast = ({ hours }) => (
    <div className="mt-6 overflow-x-auto">
        <motion.div
            className="flex space-x-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {hours.map((hour, index) => {
                const time = new Date(hour.time);
                return (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center bg-blue-50/70 p-4 rounded-lg backdrop-blur-sm min-w-[100px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <p className="text-sm font-medium text-blue-800">{time.getHours()}:00</p>
                        <br />
                        <WeatherIcon condition={hour.condition.text} icon={hour.condition.icon} size={10} />
                        <p className="text-lg font-semibold text-blue-900 mt-2">{hour.temp_c}°C</p>

                        <div className="flex items-center mt-1">

                            <p className="text-xs text-blue-700">{hour.condition.text}</p>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    </div>
);

const AirQualityCard = ({ airQuality }) => (
    <GradientCard className="col-span-2">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">Air Quality</h3>
        <div className="grid grid-cols-2 gap-4">
            <WeatherCard title="CO" value={`${airQuality.co.toFixed(2)} µg/m³`} icon={Cloud} />
            <WeatherCard title="NO₂" value={`${airQuality.no2.toFixed(2)} µg/m³`} icon={Cloud} />
            <WeatherCard title="O₃" value={`${airQuality.o3.toFixed(2)} µg/m³`} icon={Cloud} />
            <WeatherCard title="SO₂" value={`${airQuality.so2.toFixed(2)} µg/m³`} icon={Cloud} />
        </div>
    </GradientCard>
);

const AstroCard = ({ astro }) => (
    <GradientCard>
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">Astronomical Data</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
                <Sunrise size={28} className="mr-2 text-yellow-500" />
                <div>
                    <p className="text-sm text-blue-700">Sunrise</p>
                    <p className="text-lg font-semibold text-blue-900">{astro.sunrise}</p>
                </div>
            </div>
            <div className="flex items-center">
                <Sunset size={28} className="mr-2 text-orange-500" />
                <div>
                    <p className="text-sm text-blue-700">Sunset</p>
                    <p className="text-lg font-semibold text-blue-900">{astro.sunset}</p>
                </div>
            </div>
            <div className="flex items-center">
                <Moon size={28} className="mr-2 text-indigo-400" />
                <div>
                    <p className="text-sm text-blue-700">Moonrise</p>
                    <p className="text-lg font-semibold text-blue-900">{astro.moonrise}</p>
                </div>
            </div>
            <div className="flex items-center">
                <Moon size={28} className="mr-2 text-indigo-600" />
                <div>
                    <p className="text-sm text-blue-700">Moonset</p>
                    <p className="text-lg font-semibold text-blue-900">{astro.moonset}</p>
                </div>
            </div>
        </div>
    </GradientCard>
);

const getBackgroundStyle = (condition) => {
    const timeOfDay = new Date().getHours() > 6 && new Date().getHours() < 18 ? 'day' : 'night';

    const gradients = {
        day: 'from-blue-400 via-teal-600 to-cyan-800',
        night: 'from-indigo-400 via-purple-600 to-blue-600',
        cloudy: 'from-gray-400 via-blue-300 to-gray-300',
        rainy: 'from-gray-700 via-blue-500 to-gray-400',
    };

    switch (condition.toLowerCase()) {
        case 'clear':
        case 'sunny':
            return `bg-gradient-to-br ${gradients.day}`;
        case 'partly cloudy':
            return `bg-gradient-to-br ${gradients.cloudy}`;
        case 'cloudy':
        case 'overcast':
            return `bg-gradient-to-br ${gradients.cloudy}`;
        case 'rain':
        case 'light rain':
        case 'moderate rain':
        case 'heavy rain':
            return `bg-gradient-to-br ${gradients.rainy}`;
        default:
            return `bg-gradient-to-br ${timeOfDay === 'day' ? gradients.day : gradients.night}`;
    }
};


export default function Weather() {

    const data = useLoaderData();
    const { setData , setAlerts} = useAppContext();
    const navigate = useNavigate();

    const getSuggestion = () => {
        setData({
            'Location': data.location.name,
            'Region': data.location.region,
            'Country': data.location.country,
            'CurrentTemp': data.current.temp_c,
            'Humidity': data.current.humidity,
            'CloudCover': data.current.cloud,
            'UV': data.current.uv,
            'HeatIndex': data.current.heatindex_c,
            'Conditon': data.current.condition.text,
            'WindchillTemperature': data.current.windchill_c,
        });
        navigate('/activity-suggestion');
    }

    const [selectedDay, setSelectedDay] = useState(0);
    const backgroundStyle = getBackgroundStyle(data.current.condition.text);

    return (
        <div className={`min-h-screen ${backgroundStyle} p-8 text-gray-800 transition-all duration-1000`}>
            <div className="max-w-6xl mx-auto">
                <motion.header
                    className="text-center mb-12"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='flex flex-col sm:flex-row justify-around items-center'>
                        <div className="mb-4 sm:mb-0 text-center sm:text-left">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white drop-shadow-lg">
                                Weather Insights
                            </h1>
                            <p className="text-lg sm:text-xl text-blue-100 drop-shadow">
                                {data.location.name}, {data.location.region}, {data.location.country}
                            </p>
                        </div>
                        <div>
                            <button
                                className="shadow-md px-7 py-3 text-lg sm:text-xl bg-[#6c3ff2] text-white rounded-[12px] hover:bg-[#3437eb] transition duration-300 hover:text-white hover:text-medium"
                                onClick={() => getSuggestion()}
                            >
                                <div className='flex flex-col justify-center items-center sm:flex-row'>
                                    <span>Get Personalized</span>
                                    <span className="sm:ml-2">Activity Suggestion</span>
                                    <div class="star-1">
                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                            style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }}
                                            version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Layer_x0020_1">
                                                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                                <path
                                                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                                    class="fil0"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="star-2">
                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                            style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }}
                                            version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Layer_x0020_1">
                                                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                                <path
                                                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                                    class="fil0"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="star-3">
                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                            style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }}
                                            version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Layer_x0020_1">
                                                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                                <path
                                                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                                    class="fil0"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="star-4">
                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                            style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }}
                                            version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Layer_x0020_1">
                                                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                                <path
                                                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                                    class="fil0"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="star-5">
                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                            style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }}
                                            version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Layer_x0020_1">
                                                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                                <path
                                                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                                    class="fil0"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="star-6">
                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                            style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", imageRendering: "optimizeQuality", fillRule: "evenodd", clipRule: "evenodd" }}
                                            version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Layer_x0020_1">
                                                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                                <path
                                                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                                    class="fil0"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>



                </motion.header>

                <main className="space-y-12">
                    <section>
                        <GradientCard className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-6 md:mb-0">
                                <WeatherIcon condition={data.current.condition.text} icon={data.current.condition.icon} size={24} />
                                <div className="ml-6">
                                    <p className="text-6xl font-bold text-blue-900">{data.current.temp_c}°C</p>
                                    <p className="text-xl text-blue-700">Feels like {data.current.feelslike_c}°C</p>
                                    <p className="text-lg mt-2 text-blue-800">{data.current.condition.text}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <WeatherCard title="Humidity" value={`${data.current.humidity}%`} icon={Droplets} />
                                <WeatherCard title="Wind" value={`${data.current.wind_kph} km/h`} icon={Wind} />
                                <WeatherCard title="UV Index" value={data.current.uv} icon={Sun} />
                                <WeatherCard title="Cloud Cover" value={`${data.current.cloud}%`} icon={Cloud} />
                            </div>
                        </GradientCard>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold mb-4 text-white drop-shadow">3-Day Forecast</h2>
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {data.forecast.forecastday.map((day, index) => (
                                <ForecastCard
                                    key={day.date}
                                    day={day}
                                    isSelected={selectedDay === index}
                                    onClick={() => setSelectedDay(index)}
                                />
                            ))}
                        </div>
                        <GradientCard>
                            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Hourly Forecast</h3>
                            <HourlyForecast hours={data.forecast.forecastday[selectedDay].hour} />
                        </GradientCard>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AirQualityCard airQuality={data.current.air_quality} />
                        <AstroCard astro={data.forecast.forecastday[selectedDay].astro} />
                    </section>
                </main>
            </div>
        </div>
    );
}

export const WeatherGen = async ({ request }) => {
    const url = new URL(request.url);
    const location = url.searchParams.get('location') || 'Canada';
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ab552eb127da4739bd1190605242309&q=${location}&days=3&aqi=yes&alerts=yes`);
    return response.json();
};