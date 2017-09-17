import React, { Component } from 'react';

import moment from 'moment';

class ForecastTable extends Component {
    render() {
        let lang = this.props.language;
        return (
            <table className="responsive-table striped">
                <thead>
                    <tr>
                        {this.props.headers.map((value, key) => (
                            <th key={key}>{value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                {this.props.forecast.map( (row, index) => (
                    <tr key={index}>
                        <td>{moment(row.start).locale(lang).format("DD MMM")}</td>
                        <td>{moment(row.start).locale(lang).format("HH:mm")} - {moment(row.end).locale(lang).format("HH:mm")}</td>
                        <td>{row.temperature.value} &#8451; </td>
                        <td><span className={"table-icons yr-icon-" + row.symbol.var}/> </td>
                        <td>{row.precipitation.value} mm </td>
                        <td>{row.wind_direction.name}  </td>
                        <td>{row.wind_speed.mps} mps </td>
                    </tr>
                ))}

                </tbody>
            </table>
        );
    }
}
export default ForecastTable;



