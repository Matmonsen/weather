import React, { Component } from 'react';

import './style.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import ForecastTable from './table/ForecastTable';
import {sortByWeekdays} from '../services/sort';
import {Translate, WeekDays} from "../i18n";
import {capitalizedWord} from "../utils/utils";



export class TableReport extends Component {
    render() {

        let language = this.props.language;
        let headers = [
            capitalizedWord(Translate[language]["date"]),
            capitalizedWord(Translate[language]["time"]) + ' (UTC)',
            capitalizedWord(Translate[language]["temperature"]),
            capitalizedWord(Translate[language]["symbol"]),
            capitalizedWord(Translate[language]["rain"]),
            capitalizedWord(Translate[language]["direction"]),
            capitalizedWord(Translate[language]["speed"])
        ];
        let tabs = sortByWeekdays(this.props.forecasts, language);
        let weekdays = WeekDays[language];

        return (
                <div className="table-report">
                    <h1 className="center">{this.props.location.name} ({this.props.location.country}) </h1>
                    <Tabs
                        className="table-report-tab-container">
                        {tabs.map( (element, index) => (
                            <Tab selected={element.weekday === weekdays[new Date().getDay()]}
                                 label={element.weekday.slice(0,3)}
                                 key={index}>
                                <ForecastTable language={language} headers={headers} index={index} forecast={element.forecast}/>
                            </Tab>
                        ))}
                    </Tabs>
                </div>
        );
    }
}
