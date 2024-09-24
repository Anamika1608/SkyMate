import { useLoaderData } from "react-router-dom"

export default function Weather() {

    const data = useLoaderData();

    return (
        <div>
            <div>
                <h1>Current Weather</h1>
                <h2>Location -{data.location.name}</h2>
                <h2>Region - {data.location.region}</h2>
                <h2>Country -{data.location.country}</h2>
                <h2> Temp - {data.current.temp_c} / {data.current.temp_f} </h2>
               
                <h2>Humidity - {data.current.humidity}%</h2>
                <h2>Cloud Cover - {data.current.cloud}%</h2>
                <h2>UV Index - {data.current.uv}</h2>
                <h2>Windchill temperature in celcius- {data.current.windchill_c}</h2>
                <h2>Heat index in celcius - {data.current.heatindex_c}</h2>
                <h2>Condiiton-{data.current.condition.text}</h2>
                <img src={data.current.condition.icon} alt="condition" />
                <h2>Air Quality </h2>
                <h2>co - {data.current.air_quality.co} ug/m3</h2>
                <h2>no2 - {data.current.air_quality.no2} ug/m3</h2>
                <h2>o3 - {data.current.air_quality.o3} ug/m3</h2>
                <h2>so2 {data.current.air_quality.so2} ug/m3</h2>
            </div>
            <div>
                <br /> <br />
                <h1>Forecast weather</h1>
                <div>{data.forecast.forecastday.map((d)=>(
                    <div>
                        <div>Date - {d.date}</div>
                        <div>Max Temp in Celsius - {d.day.maxtemp_c}</div>
                        <div>Min Temp in Celsius - {d.day.mintemp_c}</div>
                        <div>Avg Temp in Celsius - {d.day.avgtemp_c}</div>
                        <div> maxwind_mph - {d.day.maxwind_mph}</div>
                        <div>uv - {d.day.uv}</div>
                        <div>condition - {d.day.condition.text}</div>
                        <img src={d.day.condition.icon} alt="" />
                        <div> chance_of_rain- {d.day.daily_chance_of_rain}</div>
                        <div>avghumidity - {d.day.avghumidity}</div>
                        <div>sunrise - {d.astro.sunrise}</div>
                        <div> sunset- {d.astro.sunset}</div>
                        <div> moonrise - {d.astro.moonrise}</div>
                        <div> moonset- {d.astro.moonset}</div>
                        <br />
                        <div>Hour Wise </div>
                        <div>
                         {d.hour.map((h)=>(
                            <div>
                                <div>{h.time}</div>
                                <div>Temp - {h.temp_c} / {h.temp_f}</div>
                                <img src={h.condition.icon} alt="condition" />
                                <div>{h.condition.text}</div>
                            </div>
                         ))}
                        </div>
                    </div>
                ))}</div>
            </div>
        </div>
    )
}

export const WeatherGen = async ({ request }) => {
    const url = new URL(request.url);
    const location = url.searchParams.get('location') || 'New Delhi';
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ab552eb127da4739bd1190605242309&q=${location}&days=3&aqi=yes&alerts=yes`);
    return response.json();
};
