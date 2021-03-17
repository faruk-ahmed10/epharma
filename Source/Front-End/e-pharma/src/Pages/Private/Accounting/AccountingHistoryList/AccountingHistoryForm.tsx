/*
 * Copyright (c) Mohammed Nayeem 2021 - React Clock Work <http://reactwithphp.com>
 * Team: eDorpon React Development Team <http://edorpon.com>
 * @Web <http://react-programmers.com>
 * @Email <chiefnayeem@gmail.com>
 *
 * @package ePharama
 */

import React from 'react';
import Button from "../../../../Layouts/Components/Private/Common/Button";
import {Dialog} from "../../../../Layouts/Components/Global/Dialog/Dialog";
import {makeStyles} from "@material-ui/core/styles";
import {Col, Row, Table} from 'react-bootstrap';
import {APP} from "../../../../App/Init/App.Init";
import {Datepicker} from "../../../../Layouts/Components/Global/Datepicker/Datepicker";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: any) => ({
    paper: {
        [theme.breakpoints.up('sm')]: {
            minWidth: "1100px",
            maxHeight: "600px",
        }
    }
}));


const AccountingHistoryForm = ({loading, editMode, open, onClose, type, accountCategories, accountHeads, data, onChangeData, onChangeAccountCategory, onSubmit}: { loading: boolean, editMode: boolean, open: boolean, onClose: any, type: 'Income' | 'Expense', accountCategories: Array<any>, accountHeads: Array<any>, data: any, onChangeData: any, onChangeAccountCategory: any, onSubmit: any }) => {
    const classes = useStyles();

    const FindAccountCategoryById = (CatList: Array<any>, CatId: number) => {
        return CatList.find((x: any) => x.id === CatId);
    };

    const FindAccountHeadById = (HeadList: Array<any>, HeadId: number) => {
        return HeadList.find((x: any) => x.id === HeadId);
    };

    const handleAddParticular = () => {
        if (Number(data.AccountCatId) < 1) {
            alert("Select account category!");
            return false;
        }

        if (Number(data.AccountHeadId) < 1) {
            alert("Select account head!");
            return false;
        }

        if (Number(data.Amount) < 1) {
            alert("Input amount!")
            return false;
        }

        const particulars = data.Particulars;
        particulars.push({
            account_category_name: data.AccountCatName,
            account_head_name: data.AccountHeadName,
            name: data.ParticularName,
            amount: Number(data.Amount).toFixed(2)
        });

        let TotalAmount = 0;
        for (let i = 0; i < particulars.length; i++) {
            TotalAmount += Number(particulars[i].amount);
        }

        onChangeData({
            AccountCatId: 0,
            AccountCatName: '',
            AccountHeadId: 0,
            AccountHeadName: '',
            ParticularName: '',
            Amount: '',
            Particulars: particulars,
            TotalAmount: TotalAmount.toFixed(2),
        });
    };

    const handleDeleteParticular = (ParticularIndex: number) => {
        const particulars = data.Particulars;
        particulars.splice(ParticularIndex, 1);

        let TotalAmount = 0;
        for (let i = 0; i < particulars.length; i++) {
            TotalAmount += Number(particulars[i].amount);
        }

        onChangeData({
            Particulars: particulars,
            TotalAmount: TotalAmount.toFixed(2),
        });
    };

    return (
        <React.Fragment>
            <Dialog
                title={
                    editMode
                        ? `Edit ${type}`
                        : `Add ${type}`
                }
                open={open}
                onClose={onClose}
                fullWidth={true}
                actionBar={
                    loading ? (
                        <Button
                            label="Loading..."
                            disable={true}
                            className="cbtn--lg cbtn--danger"
                        />
                    ) : (
                        <Button
                            label="Save"
                            className="cbtn--lg cbtn--primary"
                            onClick={onSubmit}
                        />
                    )
                }
                classes={{paper: classes.paper}}
            >
                <React.Fragment>
                    <Row>
                        <Col md={3}>
                            <Datepicker
                                label={""}
                                value={data.DocumentDate}
                                onChange={(date: any) => {
                                    onChangeData({DocumentDate: APP.FUNCTIONS.CONVERT_DATE(date, "yyyy-mm-dd")})
                                }}
                            />
                        </Col>

                        <Col md={6}>
                            <input
                                type={"text"}
                                placeholder={"Comment"}
                                className="mr-2"
                                value={data.Comment}
                                onChange={(e: any) => onChangeData({Comment: e.target.value})}
                            />
                        </Col>

                        <Col md={3}>
                            <input
                                type={"text"}
                                placeholder={"Total Amount"}
                                className="mr-2"
                                style={{
                                    background: "#fff8dd",
                                    color: "#000000",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    textAlign: "right"
                                }}
                                readOnly={true}
                                value={Number(data.TotalAmount).toFixed(2)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <select
                                className="mr-2 mb-4" value={data.AccountCatId}
                                onChange={(e: any) => {
                                    const value = Number(e.target.value);
                                    onChangeData({
                                        AccountCatId: value,
                                        AccountCatName: (value > 0) ? FindAccountCategoryById(accountCategories, value).name : '',
                                        AccountHeadId: 0,
                                        AccountHeadName: '',
                                    });
                                    onChangeAccountCategory(value);
                                }}>
                                <option value="">-- Select Account Category --</option>
                                {accountCategories.map((accountCategory: any, index: number) => (
                                    <option key={index} value={accountCategory.id}>{accountCategory.name}</option>
                                ))}
                            </select>
                        </Col>

                        <Col md={3}>
                            <select
                                className="mr-2 mb-4" value={data.AccountHeadId}
                                onChange={(e: any) => {
                                    if(Number(data.AccountCatId) < 1) {
                                        onChangeData({
                                            AccountHeadId: 0,
                                            AccountHeadName: '',
                                        });

                                        alert('Please select account category!');
                                        return;
                                    }

                                    const value = Number(e.target.value);
                                    onChangeData({
                                        AccountHeadId: value,
                                        AccountHeadName: (value > 0) ? FindAccountHeadById(accountHeads, value).name : '',
                                    });
                                }}>
                                <option value="">-- Select Account Head --</option>
                                {accountHeads.map((accountHead: any, index: number) => (
                                    <option key={index} value={accountHead.id}>{accountHead.name}</option>
                                ))}
                            </select>
                        </Col>

                        <Col md={3}>
                            <input
                                type={"text"}
                                placeholder={"Particular Name"}
                                className="mr-2"
                                value={data.ParticularName}
                                onChange={(e: any) => onChangeData({ParticularName: e.target.value})}
                                onKeyDown={(e: any) => {
                                    if (e.keyCode === 13) {
                                        handleAddParticular();
                                    }
                                }}
                            />
                        </Col>

                        <Col md={2}>
                            <input
                                type={"text"}
                                placeholder={"Amount"}
                                className="mr-2"
                                value={data.Amount}
                                onChange={(e: any) => {
                                    const value = Number(e.target.value);
                                    if (value >= 0) {
                                        onChangeData({Amount: e.target.value})
                                    }
                                }}
                                onKeyDown={(e: any) => {
                                    if (e.keyCode === 13) {
                                        handleAddParticular();
                                    }
                                }}
                            />
                        </Col>

                        <Col md={1}>
                            <Button
                                label="Add"
                                className="cbtn--lg cbtn--primary"
                                style={{width: "100%"}}
                                onClick={handleAddParticular}
                            />
                        </Col>
                    </Row>

                    <hr/>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Category</th>
                            <th>Head</th>
                            <th>Particular Name</th>
                            <th style={{textAlign: "center"}}>Amount</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.Particulars.map((Particular: any, index: number) => (
                            <tr key={index}>
                                <td>{Particular.account_category_name}</td>
                                <td>{Particular.account_head_name}</td>
                                <td>{Particular.name}</td>
                                <td style={{textAlign: "right"}}>{Number(Particular.amount).toFixed(2)}</td>
                                <td style={{textAlign: "center"}}>
                                    <Button
                                        label=""
                                        className="cbtn--sm cbtn--danger"
                                        icon={<DeleteIcon/>}
                                        onClick={() => {
                                            handleDeleteParticular(index);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </React.Fragment>
            </Dialog>
        </React.Fragment>
    );
};

export default AccountingHistoryForm;
