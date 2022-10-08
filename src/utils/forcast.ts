import * as request from "request";

export const forcast = function (latitude: number, longtitude: number, callback: (error: string | undefined, data: string | undefined) => void): void {
    const url = `http://api.weatherstack.com/current?access_key=9ba002ba4268b75e3bfaf5636e8daa9f&query=${latitude},${longtitude}&units=m`
    
    // destructing body from response.body
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const currentProperty = body.current;
            callback(undefined, `${currentProperty.weather_descriptions[0]}. It is currently ${currentProperty.temperature} degrees out. It feels like ${currentProperty.feelslike} degrees out. The humidity is ${currentProperty.humidity}%`)
        }
    })
}