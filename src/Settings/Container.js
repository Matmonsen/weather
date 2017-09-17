import {connect} from 'react-redux';
import Settings from "./Component";
import {updateSettingsGeneral, updateSettingPrefix, updateSettingLocation} from '../redux/actions';
import {setFooterVisibliity} from "../redux/actions";
import {FooterFilter} from "../redux/actionTypes";

function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveGeneral: (use, refresh) =>{
            dispatch(updateSettingsGeneral({
                use_location_as_prefix: use,
                refresh: refresh
            }));
        },
        saveLocation: (country, county, city, area) =>{
            dispatch(updateSettingLocation({country: country, county: county, city: city, area: area}));
    },
        savePrefix: (country, county, city, area) =>{
            dispatch(updateSettingPrefix({country: country, county: county, city: city, area: area}));
        },
        hideFooter: () => dispatch(setFooterVisibliity(FooterFilter.HIDE_CREDIT)),
    }
}

function mapStateToProps(state) {
    return {
        general: state.settings.general,
        location: state.settings.location,
        prefix: state.settings.prefix,
        language: state.language.current
    }
}
export const SettingsContainer = connect(mapStateToProps,mapDispatchToProps)(Settings);
