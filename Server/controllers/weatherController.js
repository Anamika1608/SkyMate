export const weatherForecast = (req,res)=>{
    const {location } = req.body
    console.log(location);
    res.status(200).json(location);
}
