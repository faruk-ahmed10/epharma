/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from 'react';
import {APP} from "../../../../App/Init/App.Init";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const BackDrop = ({open}: { open: boolean }) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}

class ServicePreparation extends React.Component<any, any> {
    public componentDidMount(): void {
        APP.SERVICES.AUTH.fetchAuthUser();
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                {(Number(this.props.AUTH_USER.id) < 1) ? (
                    <BackDrop open={Number(this.props.AUTH_USER.id) < 1}/>
                ) : this.props.children}
            </React.Fragment>
        );
    }
}

export default APP.SERVICES.CORE.GLOBAL_DATA.WITH_STORE((state: any) => {
    return {
        AUTH_USER: state.AUTH_USER,
    }
}, null)(ServicePreparation);
