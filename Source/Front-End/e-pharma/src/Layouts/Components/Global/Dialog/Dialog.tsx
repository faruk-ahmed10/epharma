/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import {
    createStyles, makeStyles,
    Theme,
    withStyles,
    WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import {css} from "@emotion/css";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogTitleRootDense: {
            padding: "10px 16px !important",
        },
        main: {
            color: 'red !important'
        },
    }),
);

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });


export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string,
    children: React.ReactNode,
    onClose: () => void,
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function __Dialog({open, children, title, subtitle, actionBar, fullScreen, fullWidth, scroll, onClose, classes}: Partial<{
    open: boolean;
    children: React.ReactChild;
    title: string;
    subtitle: string;
    actionBar: any;
    fullScreen: boolean;
    scroll: 'paper' | 'body';
    fullWidth: boolean;
    classes: any,
    onClose(): any;
}>) {

    const __classes = useStyles();

    const mainContainer = css(`
        & * {
            font-size: 15px !important;
        }
    `);

    return (
        <div>
            <Dialog
                onClose={onClose}
                open={typeof open !== "undefined" ? open : false}
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                scroll={scroll}
                classes={classes}
            >
                <DialogTitle
                    id={""}
                    classes={{root: subtitle !== '' && typeof subtitle !== 'undefined' ? __classes.dialogTitleRootDense : undefined}}
                    onClose={typeof onClose === "function" ? onClose : () => {
                    }}>
                    {title !== '' && typeof title !== 'undefined' &&
                    <Typography variant="h4" style={{fontSize: 18}}>{title}</Typography>}
                    {subtitle !== '' && typeof subtitle !== 'undefined' &&
                    <Typography variant="h4" style={{fontSize: 13}}>{subtitle}</Typography>}
                </DialogTitle>

                <DialogContent dividers>
                    <div style={{fontSize: 15}} className={mainContainer}>{children}</div>
                </DialogContent>
                <DialogActions>{actionBar}</DialogActions>
            </Dialog>
        </div>
    );
}

export {__Dialog as Dialog};
