import React, { Component } from 'react';
import moment from '../../node_modules/moment';
import './style.css'
import {Translate} from "../i18n";

class SingleReport extends Component {
    render() {
        let forecast = this.props.forecast;

        if (typeof forecast === "undefined" || forecast === null)
            return (<div>Error</div>);

        // Meta info
        let location = typeof this.props.location === 'undefined' ? '' : this.props.location.name + ' (' + this.props.location.country + ')';

        let d = moment(forecast.start).locale(this.props.language).format("dddd LL");

        let date = typeof forecast.start === 'undefined' ? '' : d.substring(0,1).toUpperCase() + d.substring(1, d.length);
        let start = typeof forecast.start === 'undefined' ? '' : moment(forecast.start).locale(this.props.language).format('LT');
        let end = typeof forecast.end === 'undefined' ? '' : moment(forecast.end).locale(this.props.language).format('LT');

        // Forecast info
        let tempUnit = typeof  forecast.temperature === 'undefined' ? '' : '\u00B0';
        let icon = typeof forecast.symbol === 'undefined' ? '' : 'single-report-temp-icon yr-icon-' + forecast.symbol.var;
        let temperature = typeof forecast.temperature === 'undefined' ? '' : forecast.temperature.value;
        let speed = typeof forecast.wind_speed === 'undefined' ? '' : forecast.wind_speed.mps + ' mps';
        let wind = typeof forecast.wind_speed === 'undefined' ? '' : forecast.wind_speed.name;
        let rain = typeof forecast.precipitation === 'undefined' ? '' : forecast.precipitation.value + ' mm';
        let direction = typeof forecast.wind_direction === 'undefined' ? '' : forecast.wind_direction.name;
        let pressure = typeof forecast.pressure === 'undefined' ? '' : forecast.pressure.value;
        let pressureUnit = typeof forecast.pressure === 'undefined' ? '' : forecast.pressure.unit;



        return (
            <div className="single-report ">
                <h1>{this.props.title}</h1>
                <span className="single-elm-title">{date} </span>
                <span className="single-elm-title">{start} - {end} UTC </span>
                <span className="single-elm-location">{location}</span>
                        <div className="single-report-middle">
                            <div className="single-elm-middle-left">
                                    <span className={icon} />
                            </div>
                            <div className="single-elm-middle-right">
                                <span className="single-report-temp-icon">
                                    {temperature}{tempUnit}
                                </span>
                            </div>
                        </div>

                        <div className="single-report-bottom">
                            <div className="single-elm-left">
                                <span>{Translate[this.props.language]["rain"]}:</span>
                                <span>{Translate[this.props.language]["wind"]}:</span>
                                <span>{Translate[this.props.language]["speed"]}:</span>
                                <span>{Translate[this.props.language]["direction"]}:</span>
                                <span>{Translate[this.props.language]["pressure"]}:</span>
                            </div>

                            <div className="single-elm-right">
                                <span>{rain}</span>
                                <span>{wind}</span>
                                <span>{speed}</span>
                                <span>{direction}</span>
                                <span>{pressure} {pressureUnit}</span>
                            </div>
                        </div>
                </div>
            );
    }
}

export default SingleReport;
