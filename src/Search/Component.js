import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/accessibility';
import './style.css';
import {Translate} from "../i18n";
import Loading from '../Loading';
import {searchQueryIsValid} from "../utils/utils";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {errorMessage: this.props.errorMessage, loading: this.props.isLoading,prefixFloat: this.formatPrefix(this.props.language)};
    }
    componentDidMount() {
        this.props.stopLoading();
    }
    componentWillReceiveProps(next) {
        this.setState({errorMessage: next.errorMessage, prefixFloat: this.formatPrefix(next.language)});
    }

    componentWillUnmount() {
        this.props.reset();
        this.props.hideFooter();
    }


    /**
     * Searches after forecast base on a Search query.
     */
    search() {
        this.setState({errorMessage: ""});

        if (typeof this.textField !== "undefined" && typeof this.textField.input !== "undefined" && this.textField.input.value.length > 0)
        {
            let input = this.textField.input.value.replace(/\s/g,'');
            let termCount = input.split(',').length;
            let userInput = input.split(',').join("/");

            let query = "";
            let query2 = "";

            // Assembles 2 queries.
            // One with just the user input
            // and one with a prefix stored in Settings
            let country = this.props.prefix.country || "";
            let county = this.props.prefix.county || "";
            let city = this.props.prefix.city || "";

            if (termCount === 1) {
                query = `${country}/${county}/${userInput}`;
                query2 = `${country}/${county}/${city}/${userInput}`;
            }
            else if (termCount === 2) {
                query = `${country}/${userInput}`;
                query2 = `${country}/${county}/${userInput}`;
            }
            else if (termCount === 3) {
                query = `${userInput}`;
                query2 = `${country}/${userInput}`;
            } else if (termCount === 4) {
                query = `${userInput}`;
            }

            // Checks which query is valid and acts accordingly
            let queryIsValid = searchQueryIsValid(query);
            let query2IsValid = searchQueryIsValid(query2);

            if (queryIsValid && query2IsValid) {
                this.props.updateSearchQuery(query);
                this.props.search(query, this.props.language, true, () => {
                    this.props.updateSearchQuery(query2);
                    this.props.search(query2, this.props.language, false);
                });
            } else if (queryIsValid) {
                this.props.updateSearchQuery(query);
                this.props.search(query, this.props.language);
            } else if (query2IsValid) {
                this.props.updateSearchQuery(query2);
                this.props.search(query2, this.props.language);
            } else {
                this.setState({errorMessage: Translate[this.props.language]["errorSearchQueryFormat"]})
            }

        } else
            this.setState({errorMessage: Translate[this.props.language]["errorSearchQueryMissing"]});
    }

    formatPrefix(lang) {
        if (typeof this.props.prefix === "undefined" || this.props.prefix === null)
            return "";

        if (this.props.prefix.country === "")
            return "";
        else {
            if (this.props.prefix.county === "") {
                return `${this.props.prefix.country}, (${Translate[lang]["county"]}), (${Translate[lang]["city"]}), (${Translate[lang]["area"]})`
            } else {
                if (this.props.prefix.city === "") {
                    return `${this.props.prefix.country}, ${this.props.prefix.county}, (${Translate[lang]["city"]}), (${Translate[lang]["area"]})`
                } else {
                    if (this.props.prefix.area === "") {
                        return `${this.props.prefix.country}, ${this.props.prefix.county}, ${this.props.prefix.city}, (${Translate[lang]["area"]})`
                    } else {
                        return `${this.props.prefix.country}, ${this.props.prefix.county}, ${this.props.prefix.city}, ${this.props.prefix.area}`
                    }
                }
            }
        }
    }

    enterListener(e) {
        if (e.keyCode === 13)
            this.search();
    }


    render() {
        if (this.props.isLoading) {
            return (<div className="now">
                <Loading message={this.props.loadingMessage}/>
            </div>);
        }

        return (
                <div className="search">
                        <TextField
                            className="search-textField"
                            hintText={Translate[this.props.language]["searchPlaceholder"]}
                            fullWidth={true}
                            floatingLabelText={this.state.prefixFloat.length === 0 ? Translate[this.props.language]["searchPlaceholder"] : this.state.prefixFloat}
                            errorText={this.state.errorMessage}
                            ref={(textField) => { this.textField = textField; }}
                            onKeyDown={this.enterListener.bind(this)}
                        />

                        <RaisedButton
                            className="search-button"
                            label={Translate[this.props.language]["search"]}
                            secondary={true}
                            icon={<ActionSearch />}
                            onClick={this.search.bind(this)}
                        />
                    <div style={{display: this.props.loading ? "block" : "none"}}>Loading</div>
                </div>
        );
    }
}


export default Search;
