
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

const highlight = "#AD1B59";
const transparent = "rgba(0, 0, 0, 0)";
const blackOpacity = 'rgba(0, 0, 0, 0.54)';
const palette = {
    primary1Color: "#22282B",
        primary2Color: "rgba(34, 40, 43, 0.8)",
        primary3Color: "#ffffff",
        accent1Color: "#AD1B59",
        accent2Color: "#ffffff",
        accent3Color: "#ffffff",
        textColor: "#ffffff",
        alternateTextColor: "#ffffff",
        canvasColor: "#22282B",
        borderColor: "#ffffff",
        disabledColor: "#ffffff",
        pickerHeaderColor: "#ffffff",
        secondaryTextColor:"#ffffff",
        clockCircleColor: "#ffffff",
        shadowColor: "#ffffff",
};

export const Theme =  {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: 'Avant Garde, Avantgarde, Century Gothic, CenturyGothic, AppleGothic, sans-serif',
    palette: palette,
    tooltip: {
        color: "#ffffff",
        rippleBackgroundColor: highlight
    },
    appBar: {
        color: palette.primary1Color,
        textColor: palette.textColor,
    },    
    avatar: {
        color: palette.canvasColor,
        backgroundColor: highlight
    },
    badge: {
        color: palette.alternateTextColor,
        textColor: palette.textColor,
        primaryColor: palette.primary1Color,
        primaryTextColor: palette.alternateTextColor,
        secondaryColor: palette.accent1Color,
        secondaryTextColor: palette.alternateTextColor,
    },
    bottomNavigation: {
        backgroundColor: palette.canvasColor,
        unselectedColor: palette.textColor,
        selectedColor: palette.primary1Color,
    },
    card: {
        titleColor: palette.textColor,
        subtitleColor: palette.textColor,
    },
    cardText: {
        textColor: palette.textColor
    },
    checkbox: {
        boxColor: palette.textColor,
        checkedColor: highlight,
        requiredColor: palette.primary1Color,
        disabledColor: palette.disabledColor,
        labelColor: palette.primary1Color,
        labelDisabledColor: palette.disabledColor
    },
    datePicker: {
        color: palette.primary1Color,
        textColor: palette.alternateTextColor,
        calendarTextColor: palette.textColor,
        selectColor: palette.primary2Color,
        selectTextColor: palette.alternateTextColor,
        calendarYearBackgroundColor: palette.canvasColor
    },
    dropDownMenu: {
        accentColor: palette.borderColor
    },
    enhancedButton: {
        tapHighlightColor: transparent
    },
    flatButton: {
        color: transparent,
        buttonFilterColor: highlight,
        disabledTextColor: highlight,
        textColor: palette.textColor,
        primaryTextColor: palette.primary1Color,
        secondaryTextColor: palette.accent1Color,
    },
    floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: palette.primary1Color,
        iconColor: palette.alternateTextColor,
        secondaryColor: palette.accent1Color,
        secondaryIconColor: palette.alternateTextColor,
        disabledTextColor: palette.disabledColor,
        disabledColor: highlight
    },
    gridTile: {
        textColor: palette.textColor
    },
    icon: {
        color: palette.canvasColor,
        backgroundColor: palette.primary1Color
    },
    inkBar: {
        backgroundColor: palette.accent1Color
    },
    drawer: {
        color: palette.canvasColor
    },
    listItem: {
        secondaryTextColor: palette.secondaryTextColor,
        leftIconColor: palette.textColor,
        rightIconColor: palette.textColor,
    },
    menu: {
        backgroundColor: palette.canvasColor,
        containerBackgroundColor: palette.canvasColor
    },
    menuItem: {
        hoverColor: highlight,
        selectedTextColor: palette.accent1Color,
        rightIconDesktopFill: palette.textColor
    },
    menuSubheader: {
        borderColor: palette.borderColor,
        textColor: palette.primary1Color
    },
    overlay: {
        backgroundColor: blackOpacity
    },
    paper: {
        color: palette.textColor,
        backgroundColor: palette.canvasColor
    },
    radioButton: {
        borderColor: highlight,
        backgroundColor: highlight,
        checkedColor: highlight,
        requiredColor: highlight,
        disabledColor: highlight,
        labelColor: palette.primary1Color,
        labelDisabledColor: highlight
    },
    raisedButton: {
        color: palette.alternateTextColor,
        textColor: palette.textColor,
        primaryColor: palette.primary1Color,
        primaryTextColor: palette.alternateTextColor,
        secondaryColor: palette.accent1Color,
        secondaryTextColor: palette.alternateTextColor,
        disabledColor: highlight,
        disabledTextColor: highlight,
    },
    refreshIndicator: {
        strokeColor: palette.borderColor,
        loadingStrokeColor: palette.primary1Color
    },
    ripple: {
        color: highlight
    },
    slider: {
        trackSize: 2,
        trackColor: palette.primary3Color,
        trackColorSelected: palette.accent3Color,
        handleSize: 12,
        handleSizeDisabled: 8,
        handleSizeActive: 18,
        handleColorZero: palette.primary3Color,
        handleFillColor: palette.alternateTextColor,
        selectionColor: palette.primary1Color,
        rippleColor: highlight
    },
    snackbar: {
        textColor: palette.alternateTextColor,
        backgroundColor: palette.textColor,
        actionColor: palette.accent1Color
    },
    subheader: {
        color: palette.primary1Color,
    },
    stepper: {
        backgroundColor: transparent,
        hoverBackgroundColor: highlight,
        iconColor: palette.primary1Color,
        hoveredIconColor: highlight,
        textColor: palette.textColor,
        connectorLineColor: highlight
    },
    svgIcon: {
        color: palette.textColor
    },
    table: {
        backgroundColor: palette.textColor
    },
    tableFooter: {
        borderColor: palette.borderColor,
        textColor: palette.accent3Color
    },
    tableHeader: {
        borderColor: palette.borderColor
    },
    tableHeaderColumn: {
        textColor: palette.accent3Color,
        height: 56,
        spacing: 24
    },
    tableRow: {
        hoverColor: palette.accent2Color,
        stripeColor: palette.primary1Color,
        selectedColor: palette.borderColor,
        textColor: palette.textColor,
        borderColor: palette.borderColor,
    },
    tabs: {
        backgroundColor: '#e9e9e9',
        textColor: palette.primary1Color,
        selectedTextColor: palette.primary1Color
    },
    textField: {
        textColor: palette.primary1Color,
        hintColor: palette.primary2Color,
        floatingLabelColor: palette.primary1Color,
        disabledTextColor: palette.disabledColor,
        errorColor: "red",
        focusColor: highlight,
        backgroundColor: transparent,
        borderColor: palette.primary1Color
    },
    timePicker: {
        color: palette.alternateTextColor,
        textColor: palette.accent3Color,
        accentColor: palette.primary1Color,
        clockColor: palette.textColor,
        clockCircleColor: palette.clockCircleColor,
        headerColor: palette.pickerHeaderColor || palette.primary1Color,
        selectColor: palette.primary2Color,
        selectTextColor: palette.alternateTextColor
    },
    toggle: {
        thumbOnColor: palette.primary1Color,
        thumbOffColor: palette.accent2Color,
        thumbDisabledColor: palette.borderColor,
        thumbRequiredColor: palette.primary1Color,
        trackOnColor: highlight,
        trackOffColor: palette.primary3Color,
        trackDisabledColor: palette.primary3Color,
        labelColor: palette.textColor,
        labelDisabledColor: palette.disabledColor,
        trackRequiredColor: highlight
    },
};



