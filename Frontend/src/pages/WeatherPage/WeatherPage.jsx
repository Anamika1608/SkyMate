import Weather from "../../components/Weather/Weather";

export default function WeatherPage() {
    const data = useLoaderData();
    return (
        <div>
            <Weather/>
        </div>
    )
}

