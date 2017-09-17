import React, { Component } from 'react';

import Language from 'material-ui/svg-icons/action/language';

import ActionHome from 'material-ui/svg-icons/action/home';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {Routes} from "../routing";
import {NavbarItem} from './item/NavbarItem';
import { NavLink } from 'react-router-dom'
import {Dropdown} from './dropdown/Dropdown';
import {DropdownItem} from './dropdown/item/DropdownItem';
import {Languages} from '../config';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import {Translate} from "../i18n";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showLanguages: false
        };
    }

    componentDidMount() {
        window.addEventListener("mousedown", this.clickHandler.bind(this), false)
    }

    /**
     * Handles click outside of the Navbar dropdown if the dropdown is active.
     * @param e
     */
    clickHandler = (e) => {
        if (this.state.showLanguages && e.target.className.indexOf("dropdown-item") === -1) {
            this.setState({showLanguages: false});
        }
    };

    /**
     * Opens the sidebar menu
     */
    openMenu = () => {
        this.setState({showMenu: true});
    };


    /**
     * Closes the sidebar menu
     */
    closeMenu = () => {
        this.setState({showMenu: false});
        this.forceUpdate();
    };

    /**
     * Foreces a re render of the ui such that the navbars previous active element loses its classname "active",
     * and then its highlight
     */
    reRender = () => {

        this.forceUpdate();
    };

    /**
     * Toggles the language dropdown
     */
    toggleLanguageDropdown = () => {
        this.setState({showLanguages: !this.state.showLanguages});
    };


    /**
     * Switches app languages
     * @param language
     */
    setLanguage(language) {
        if (language !== this.props.language)
            this.props.switchLanguage(language, this.props.searchQuery);
    }

    render() {
        return (
            <header>
                <nav>
                    <div className="nav-left">
                        <NavbarItem text={Translate[this.props.language]["menu"]} handleClick={this.openMenu.bind(this)}><NavigationMenu /></NavbarItem>
                        <NavbarItem text={Translate[this.props.language][Routes.search.translateKey]} id="navbar-search"  handleClick={this.reRender.bind(this)} usesLink={true} to={Routes.search.url}><ActionHome /></NavbarItem>
                    </div>

                    <NavLink className="nav-middle" to={Routes.home.url}>{Translate[this.props.language]["title"]}</NavLink>

                    <div className="nav-right">
                        <NavbarItem text={Translate[this.props.language][Routes.settings.translateKey]} id="navbar-settings"  handleClick={this.reRender.bind(this)} usesLink={true} to={Routes.settings.url} ><ActionHome /></NavbarItem>
                        <NavbarItem text={Translate[this.props.language]["language"]} handleClick={this.toggleLanguageDropdown.bind(this)}>
                            <Language />
                            <Dropdown show={this.state.showLanguages} handleClick={this.toggleLanguageDropdown.bind(this)}>
                                <DropdownItem handleClick={this.setLanguage.bind(this)} lang={Languages.ENGLISH} isActive={this.props.language === Languages.ENGLISH}>
                                    {Translate[this.props.language]["english"]}
                                </DropdownItem>
                                <DropdownItem handleClick={this.setLanguage.bind(this)} lang={Languages.NORSK} isActive={this.props.language === Languages.NORSK}>
                                    {Translate[this.props.language]["norwegianNB"]}
                                </DropdownItem>
                                <DropdownItem handleClick={this.setLanguage.bind(this)} lang={Languages.NYNORSK} isActive={this.props.language === Languages.NYNORSK}>
                                    {Translate[this.props.language]["norwegianNN"]}
                                </DropdownItem>
                            </Dropdown>
                        </NavbarItem>
                    </div>

                </nav>

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.showMenu}
                    onRequestChange={this.closeMenu}>

                    <IconButton onClick={this.closeMenu.bind(this)} className="sidebar-close-right">
                        <NavigationClose  />
                    </IconButton>

                    <MenuItem
                        primaryText={Translate[this.props.language]["menu"]}
                        disabled={true}
                        className="menu-item-title" />
                    <NavLink to={Routes.now.url} activeClassName="active" onClick={this.closeMenu}  onTouchTap={this.closeMenu} >
                        <MenuItem primaryText={Translate[this.props.language][Routes.now.translateKey]} />
                    </NavLink>
                    <NavLink to={Routes.hour.url} activeClassName="active" onClick={this.closeMenu}  onTouchTap={this.closeMenu} >
                        <MenuItem primaryText={Translate[this.props.language][Routes.hour.translateKey]} />
                    </NavLink>
                    <NavLink to={Routes.week.url} activeClassName="active" onClick={this.closeMenu}  onTouchTap={this.closeMenu} >
                        <MenuItem primaryText={Translate[this.props.language][Routes.week.translateKey]} />
                    </NavLink>
                    <NavLink to={Routes.about.url} activeClassName="active" onClick={this.closeMenu}  onTouchTap={this.closeMenu} >
                        <MenuItem primaryText={Translate[this.props.language][Routes.about.translateKey]} />
                    </NavLink>
                    <NavLink to={Routes.cookies.url} activeClassName="active" onClick={this.closeMenu}  onTouchTap={this.closeMenu} >
                        <MenuItem primaryText={Translate[this.props.language][Routes.cookies.translateKey]} />
                    </NavLink>
                </Drawer>
            </header>
        )
    };
}
export default NavBar;
