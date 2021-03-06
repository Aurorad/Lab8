import React from 'react';
import moment from "moment";
import wind_direction_icon from './wi-direction-up.svg';
import max_temp_icon from './wi-thermometer.svg';
import min_temp_icon from './wi-thermometer-exterior.svg';
import celsius_icon from './wi-celsius.svg';
import barometer_icon from './wi-barometer.svg';
import humidity_icon from './wi-humidity.svg';
import sunrise_icon from './wi-sunrise.svg';
import sunset_icon from './wi-sunset.svg';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            weather: {}
        }
    }
    componentDidMount() {
        let cors = "https://cors-anywhere.herokuapp.com/";
        let uml = "https://www.metaweather.com/api/location/924938/";
        fetch(cors+uml)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    weather: data,
                    isLoaded: true
                });
                console.log(this.state.weather);
            });
    }
    render() {

        if (!this.state.isLoaded) {
            return (
                <div className="d-flex justify-content-center mt-5">
                <div className="spinner-grow text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            );
        }
        else {
            const w = this.state.weather;
            let time = moment(w.time).format("hh:mm a");
            let sun_rise = moment(w.sun_rise).format("hh:mm a");
            let sun_set = moment(w.sun_set).format("hh:mm a");
            return (
                <div className="container-fluid">
                   <header className="row mx-0 my-3">
                       <div className=" mr-auto align-self-md-center header text-info">
                           <h2>{w.title}</h2>
                           <h4>{w.parent.title}</h4>
                       </div>
                        <div className=" align-self-md-end header">
                            <p className="mb-0">Time: {time}</p>
                            <p className="mb-0"><img src={sunrise_icon} alt="Sunrise"/>: {sun_rise}</p>
                            <p className="mb-0"><img src={sunset_icon} alt="Sunset"/>: {sun_set}</p>
                        </div>
                   </header>
                    <div className="container-fluid row ml-0">
                        <OneDay day={w.consolidated_weather[0]}/>
                        <OneDay day={w.consolidated_weather[1]}/>
                        <OneDay day={w.consolidated_weather[2]}/>
                        <OneDay day={w.consolidated_weather[3]}/>
                        <OneDay day={w.consolidated_weather[4]}/>
                        <OneDay day={w.consolidated_weather[5]}/>
                    </div>
                </div>
            );
        }
    }

}
export default Weather;

function OneDay(day) {
    return (
        <div className="col-md-2">
            <h5 className="text-info">{day.day.applicable_date}</h5>
            <p>{day.day.weather_state_name}</p>
            <p>
                <img src={max_temp_icon} alt="Max temp"/>: {Math.round(day.day.max_temp)}
                <img src={celsius_icon} alt="degrees Celsius"/>
            </p>
            <p>
                <img src={min_temp_icon} alt="Min temp"/>: {Math.round(day.day.min_temp)}
                <img src={celsius_icon} alt="degrees Celsius"/>
            </p>
            <p>{<Compas direction={day.day.wind_direction_compass}/> }{day.day.wind_direction_compass} {Math.round(day.day.wind_speed)} mph</p>
            <p><img src={barometer_icon} alt="Air pressure"/> : {Math.round(day.day.air_pressure)}</p>
            <p><img src={humidity_icon} alt="Humidity"/>: {day.day.humidity}%</p>
            <p>Visibility: {Math.round(day.day.visibility)} miles</p>
        </div>
    );
}
function Compas(direction) {
    let className = direction.direction;
    return (
         <img className={className} src={wind_direction_icon} alt={className}/>
    );
}