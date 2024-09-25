import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Hero() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const getCoordinate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPCosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    navigate(`/weather?location=${latitude},${longitude}`);
                },
                (error) => {
                    setError("Unable to retrieve your location. Please check your permissions.");
                    console.error(error);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    };

    return (
        <div className="text-center p-5 sm:p-8">
            <h1 className="text-4xl p-3 font-medium drop-shadow sm:text-5xl dark:text-white dark:drop-shadow">Your Personal Weather Assistant</h1>
            <h3 className="p-3 text-lg font-normal dark:text-slate-300">Get Personalized Forecasts, Activity suggestions, and Health alerts – All in one place</h3>
            <button onClick={getCoordinate} className="btn bg-[#f0f0f0] m-2 p-2 w-30 rounded-xl hover:bg-[#FFF0DA] text-base sm:w-40 sm:p-2 sm:m-3">Use my location</button>
            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
}
