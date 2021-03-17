/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {ToastStore} from "../../../../Vendor/Utils/Core/Stores/Global/Toast/Toast.Store";

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    Snackbar: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: "400px",
        },
    },

    AlertPaper: {
        width: "100% !important",
        fontSize: 15,
    }
}));


const Alert = (props: any) => {
    const classes = useStyles();
    return <MuiAlert className={classes.AlertPaper} elevation={6} variant="filled" {...props} />;
};

const Action = (props: any) => (
    <IconButton
        style={{color: "#ffffff"}}
        size="medium"
        onClick={props.onClick}>
        <CloseIcon/>
    </IconButton>
);

export default function Toast(props: Partial<{
    open: boolean,
    onClose(): any,
    verticalAlign: 'bottom' | 'top' | '',
    horizontalAlign: 'center' | 'left' | 'right' | '',
    duration: any,
    message: string,
    type: 'general' | 'success' | 'error' | 'warning' | 'info' | '',
}>) {
    const classes = useStyles();

    let verticalAlign = props.verticalAlign,
        horizontalAlign = props.horizontalAlign,
        duration = props.duration,
        message = props.message,
        type = props.type;

    //Default value setup
    verticalAlign = (typeof verticalAlign === 'undefined' || verticalAlign === '') ? 'top' : verticalAlign;
    horizontalAlign = (typeof horizontalAlign === 'undefined' || horizontalAlign === '') ? 'right' : horizontalAlign;
    duration = (typeof duration === 'undefined' || duration === 0) ? 3000 : Number(duration);
    message = (typeof message === 'undefined' || message === '') ? 'Alert!' : message;
    type = (typeof type === 'undefined' || type === '') ? 'general' : type;


    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    };

    return (
        <Snackbar
            className={classes.Snackbar}
            open={typeof props.open !== 'undefined' ? props.open : false}
            anchorOrigin={{
                vertical: verticalAlign,
                horizontal: horizontalAlign,
            }}
            disableWindowBlurListener={true}
            autoHideDuration={duration}
            onClose={handleClose}
            action={(
                <Action onClick={handleClose}/>
            )}
            message={message} {...type !== 'general' ? {
            children: <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        } : null} />
    );
}


Toast.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.oneOf(['error', 'success', 'warning', 'info', 'general']),
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    verticalAlign: PropTypes.oneOf(['top', 'bottom', '']),
    horizontalAlign: PropTypes.oneOf(['center', 'left', 'right', '']),
};

Toast.defaultProps = {
    show: false,
    type: "general",
    message: "Alert!",
    duration: 3000,
    verticalAlign: "top",
    horizontalAlign: "right",
};