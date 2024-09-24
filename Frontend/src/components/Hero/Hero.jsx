export default function Hero(){
    const getCoordinate = ()=>{
        
    }
    return(
        <div className="text-center p-5 sm:p-8">
            <h1 className="text-4xl p-3 font-medium drop-shadow sm:text-5xl dark:text-white dark:drop-shadow">Your Personal Weather Assistant</h1>
            <h3 className="p-3 text-lg font-normal dark:text-slate-300">Get Personalized Forecasts, Activity suggestions, and Health alerts – All in one place</h3>
            <button onClick={getCoordinate}
            className="btn bg-[#f0f0f0] m-2 p-2 w-30 rounded-xl hover:bg-[#FFF0DA] text-base sm:w-40 sm:p-2 sm:m-3">Use my location</button>
        </div>
    )
}
