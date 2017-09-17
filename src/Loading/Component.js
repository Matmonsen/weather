import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './style.scss';

export class Loading extends Component {
    render () {

        return (
            <div className="loading">
                <h1>{this.props.message}</h1>
                <RefreshIndicator className="loading-indicator"
                    loadingColor="#ffffff"
                    size={180}
                    left={0}
                    top={0}
                    status="loading"
                />
            </div>
        )
    }
}
