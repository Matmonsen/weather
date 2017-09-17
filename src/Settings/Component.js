import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import './styles.css';
import {Translate} from '../i18n';



class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // tab 1
            useAsPrefix: this.props.general.use_location_as_prefix,
            refreshRate: this.props.general.refresh,

            // Tab 2
            location_country: this.props.location.country,
            location_county: this.props.location.county,
            location_city: this.props.location.city,
            location_area: this.props.location.area,

            // Tab 3
            prefix_country: this.props.prefix.country,
            prefix_county: this.props.prefix.county,
            prefix_city: this.props.prefix.city,
            prefix_area: this.props.prefix.area,

        };
    }
    componentDidMount() {
        this.props.hideFooter();
    }

    /**
     * Toggles if user want to use prefix as location.
     */
    checkboxChanged = ()  => {
        this.setState({useAsPrefix: !this.state.useAsPrefix}, () => this.saveGeneral());
    };

    /**
     * Saves the general tab
     * Is always undefined, except when using radio buttons.
     */
    saveGeneral = () => {
        // Cannot save with errors
        if (typeof this.refreshField.state.errorText !== "undefined" && this.refreshField.state.errorText.length > 0)
            return;

        // Refresh rate must have a value
        if (!this.refreshField.state.hasValue) {
            this.refreshField.state.errorText = Translate[this.props.language]["errorMustBeInteger"];
            return;
        }

        // Fetch values
        let useLocation = this.state.useAsPrefix;
        let refresh = this.state.refreshRate;

        this.props.saveGeneral(useLocation, refresh);

        if (useLocation)
            this.props.savePrefix(
                this.location_country.props.value,
                this.location_county.props.value,
                this.location_city.props.value,
                this.location_area.props.value
            );
    };


    /**
     * Saves the location tab
     */
    saveLocation = () => {
        if ((typeof this.location_country.props.errorText !== "undefined" && this.location_country.props.errorText.length > 0)
            || (typeof this.location_county.props.errorText !== "undefined" && this.location_county.props.errorText.length > 0)
            || (typeof this.location_city.props.errorText !== "undefined" && this.location_city.props.errorText.length > 0)
            || (typeof this.location_area.props.errorText !== "undefined" && this.location_area.props.errorText.length > 0)) 
        {
            return;
        }
        
        this.props.saveLocation(
            this.location_country.props.value,
            this.location_county.props.value,
            this.location_city.props.value,
            this.location_area.props.value
        );

        if (this.state.useAsPrefix) {
            this.props.savePrefix(
                this.location_country.props.value,
                this.location_county.props.value,
                this.location_city.props.value,
                this.location_area.props.value
            );
            this.setState({prefix_country: this.location_country.props.value});
            this.setState({prefix_county: this.location_county.props.value});
            this.setState({prefix_city: this.location_city.props.value});
            this.setState({prefix_area: this.location_area.props.value});
        }
    };

    /**
     * Saves the prefix tab
     */
    savePrefix = () => {
        if ((typeof this.prefix_country.props.errorText !== "undefined" && this.prefix_country.props.errorText.length > 0)
            || (typeof this.prefix_county.props.errorText !== "undefined" && this.prefix_county.props.errorText.length > 0)
            || (typeof this.prefix_city.props.errorText !== "undefined" && this.prefix_city.props.errorText.length > 0)
            || (typeof this.prefix_area.props.errorText !== "undefined" && this.prefix_area.props.errorText.length > 0))
        {
            return;
        }
        this.props.savePrefix(
            this.prefix_country.props.value,
            this.prefix_county.props.value,
            this.prefix_city.props.value,
            this.prefix_area.props.value
        );
    };

    textFieldChange = (e, key) => {
        let newState = {};
        newState[key] = e.target.value;
        this.setState(newState);
    };

    validateTextField = (e, element, saveCallback, onlyNumberIsValid = false) => {
        let value = e.target.value;

        if (onlyNumberIsValid) {
            if (Number.isInteger(Number(value))) {
                element.state.errorText = "";
                saveCallback();
            } else {
                element.state.errorText = Translate[this.props.language]["errorMustBeInteger"];
            }
        } else {
            if (value === "" || isNaN(Number(value))) {
                element.state.errorText = "";
                saveCallback();
            } else {
                element.state.errorText = Translate[this.props.language]["errorMustBeString"];
            }
        }
    };

    render() {

        return (
            <div className="settings">
                <h1>{Translate[this.props.language]["settings"]}</h1>
                <Tabs>

                    <Tab label={Translate[this.props.language]["general"]}>
                            <div  className="settings-content">
                                <div className="settings-row">
                                    <div className="settings-column">
                                        <Checkbox
                                            checked={this.state.useAsPrefix}
                                            onCheck={this.checkboxChanged.bind(this)}
                                            ref={(e) => this.useLocationAsPrefix = e}
                                            label={Translate[this.props.language]["useLocationAsPrefix"]} />
                                        <TextField
                                            hintText={Translate[this.props.language]["refreshRate"]}
                                            floatingLabelText={Translate[this.props.language]["refreshRate"]}
                                            floatingLabelFixed={true}
                                            onChange={(e) => this.textFieldChange(e, "refreshRate")}
                                            ref={(e) => this.refreshField = e}
                                            onBlur={(e) => this.validateTextField(e, this.refreshField, this.saveGeneral.bind(this), true)}
                                            value={this.state.refreshRate}/>
                                        </div>

                                </div>
                            </div>
                    </Tab>


                    <Tab label={Translate[this.props.language]["location"]} className="settings-tab">
                            <div className="settings-row">
                                <div className="settings-content">
                                    <TextField
                                        hintText={Translate[this.props.language]["country"]}
                                        floatingLabelText={Translate[this.props.language]["country"]}
                                        floatingLabelFixed={true}
                                        onChange={(e) => this.textFieldChange(e, "location_country")}
                                        ref={(e) => this.location_country = e}
                                        onBlur={(e) => this.validateTextField(e, this.location_country, this.saveLocation.bind(this))}
                                        value={this.state.location_country}/>
                                </div>
                                <div className="settings-content">
                                    <TextField
                                        hintText={Translate[this.props.language]["county"]}
                                        floatingLabelText={Translate[this.props.language]["county"]}
                                        floatingLabelFixed={true}
                                        onChange={(e) => this.textFieldChange(e, "location_county")}
                                        ref={(e) => this.location_county = e}
                                        onBlur={(e) => this.validateTextField(e, this.location_county, this.saveLocation.bind(this))}
                                        value={this.state.location_county}/>
                                </div>
                            </div>
                            <div className="settings-row">
                                <div  className="settings-content">
                                    <TextField
                                        hintText={Translate[this.props.language]["city"]}
                                        floatingLabelText={Translate[this.props.language]["city"]}
                                        floatingLabelFixed={true}
                                        onChange={(e) => this.textFieldChange(e, "location_city")}
                                        ref={(e) => this.location_city = e}
                                        onBlur={(e) => this.validateTextField(e, this.location_city, this.saveLocation.bind(this))}
                                        value={this.state.location_city}/>
                                </div>
                                <div  className="settings-content">
                                    <TextField
                                        hintText={Translate[this.props.language]["area"]}
                                        floatingLabelText={Translate[this.props.language]["area"]}
                                        floatingLabelFixed={true}
                                        onChange={(e) => this.textFieldChange(e, "location_area")}
                                        ref={(e) => this.location_area = e}
                                        onBlur={(e) => this.validateTextField(e, this.location_area, this.saveLocation.bind(this))}
                                        value={this.state.location_area}/>
                                </div>
                            </div>
                    </Tab>
                    <Tab label={Translate[this.props.language]["prefix"]} className="settings-tab">
                        <div className="settings-row">
                            <div  className="settings-content">
                                <TextField
                                    hintText={Translate[this.props.language]["country"]}
                                    floatingLabelText={Translate[this.props.language]["country"]}
                                    floatingLabelFixed={true}
                                    onChange={(e) => this.textFieldChange(e, "prefix_country")}
                                    ref={(e) => this.prefix_country = e}
                                    onBlur={(e) => this.validateTextField(e, this.prefix_country, this.savePrefix.bind(this))}
                                    value={this.state.prefix_country}/>
                            </div>
                            <div className="settings-content">
                                <TextField
                                    hintText={Translate[this.props.language]["county"]}
                                    floatingLabelText={Translate[this.props.language]["county"]}
                                    floatingLabelFixed={true}
                                    onChange={(e) => this.textFieldChange(e, "prefix_county")}
                                    ref={(e) => this.prefix_county = e}
                                    onBlur={(e) => this.validateTextField(e, this.prefix_county, this.savePrefix.bind(this))}
                                    value={this.state.prefix_county}/>
                            </div>
                        </div>
                        <div className="settings-row">
                            <div  className="settings-content">
                                <TextField
                                    hintText={Translate[this.props.language]["city"]}
                                    floatingLabelText={Translate[this.props.language]["city"]}
                                    floatingLabelFixed={true}
                                    onChange={(e) => this.textFieldChange(e, "prefix_city")}
                                    ref={(e) => this.prefix_city = e}
                                    onBlur={(e) => this.validateTextField(e, this.prefix_city, this.savePrefix.bind(this))}
                                    value={this.state.prefix_city}/>
                            </div>
                            <div className="settings-content">
                                <TextField
                                    hintText={Translate[this.props.language]["area"]}
                                    floatingLabelText={Translate[this.props.language]["area"]}
                                    floatingLabelFixed={true}
                                    onChange={(e) => this.textFieldChange(e, "prefix_area")}
                                    ref={(e) => this.prefix_area = e}
                                    onBlur={(e) => this.validateTextField(e, this.prefix_area, this.savePrefix.bind(this))}
                                    value={this.state.prefix_area}/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Settings;