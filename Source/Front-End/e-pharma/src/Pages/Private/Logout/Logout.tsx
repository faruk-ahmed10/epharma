/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React, {useEffect} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {APP} from "../../../App/Init/App.Init";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);


const Logout = () => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(true);

    const tryLogout = () => {
        APP.SERVICES.HTTP_REQUEST.send('post', '/auth/logout', {}, {}, (data: any) => {
            APP.EXCEPTIONS.FORBIDDEN();
        }, (error: any) => {
            setLoading(false);
        });
    };

    useEffect(() => {
        if(loading) {
            tryLogout();
        }
    });

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </React.Fragment>
    );
}

export default Logout;