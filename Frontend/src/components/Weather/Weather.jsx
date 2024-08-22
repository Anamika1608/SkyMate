import { useLoaderData } from "react-router-dom"

export default function Weather() {
    const data = useLoaderData();
    return ( 
        <div>
            <h1>Weather Page</h1>
            <h2>{data.followers}</h2>
        </div>
    )
}       

export const WeatherGen = async ()=>{
    const response = await fetch("https://api.github.com/users/Anamika1608");
    return response.json();
}