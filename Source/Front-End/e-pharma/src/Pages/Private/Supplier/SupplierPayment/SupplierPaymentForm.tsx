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
            minWidth: "900px",
            maxHeight: "600px",
        }
    }
}));


const SupplierPaymentForm = ({loading, editMode, open, onClose, suppliers, onChangeSupplier, data, onChangeData, onSubmit}: { loading: boolean, editMode: boolean, open: boolean, onClose: any, suppliers: Array<any>, onChangeSupplier: any, data: any, onChangeData: any, onSubmit: any }) => {
    const classes = useStyles();

    const handleAddParticular = () => {
        if (Number(data.Quantity) < 1) {
            alert("Input quantity!")
            return false;
        }

        if (Number(data.UnitPrice) < 1) {
            alert("Input unit price!")
            return false;
        }

        const particulars = data.Particulars;
        particulars.push({
            name: data.ParticularName,
            quantity: data.Quantity,
            unit_price: data.UnitPrice,
            total_amount: (Number(data.Quantity) * Number(data.UnitPrice)).toFixed(2)
        });

        let TotalAmount = 0;
        for (let i = 0; i < particulars.length; i++) {
            TotalAmount += Number(particulars[i].total_amount);
        }

        onChangeData({
            ParticularName: '',
            Quantity: '',
            UnitPrice: '',
            Particulars: particulars,
            TotalAmount: TotalAmount.toFixed(2),
        });
    };

    const handleDeleteParticular = (ParticularIndex: number) => {
        const particulars = data.Particulars;
        particulars.splice(ParticularIndex, 1);

        let TotalAmount = 0;
        for (let i = 0; i < particulars.length; i++) {
            TotalAmount += Number(particulars[i].total_amount);
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
                        ? "Edit Supplier Payment"
                        : "Add Supplier Payment"
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
                classes={{paper: classes.paper}}>
                <React.Fragment>
                    <Row>
                        <Col md={2}>
                            <Datepicker
                                label={""}
                                value={data.DocumentDate}
                                onChange={(date: any) => {
                                    onChangeData({DocumentDate: APP.FUNCTIONS.CONVERT_DATE(date, "yyyy-mm-dd")})
                                }}
                            />
                        </Col>

                        <Col md={4}>
                            <select
                                className="mr-2 mb-4" value={data.SupplierId}
                                onChange={(e: any) => {
                                    const value = Number(e.target.value);
                                    onChangeData({SupplierId: value});
                                    if(value > 0) {
                                        onChangeSupplier(value);
                                    } else {
                                        onChangeData({
                                            AdvanceAmount: '',
                                            DueAmount: '',
                                        });
                                    }
                                }}>
                                <option value="">Select Supplier</option>
                                {suppliers.map((supplier: any, index: number) => (
                                    <option key={index} value={supplier.id}>{supplier.name}</option>
                                ))}
                            </select>
                        </Col>

                        <Col md={3}>
                            <input
                                type={"text"}
                                placeholder={"Advance Amount"}
                                className="mr-2"
                                style={{background: "#eaf6db", color: "#000000", fontSize: 17, fontWeight: "bold"}}
                                readOnly={true}
                                value={data.AdvanceAmount}
                            />
                        </Col>

                        <Col md={3}>
                            <input
                                type={"text"}
                                placeholder={"Due Amount"}
                                className="mr-2"
                                style={{background: "#fde1e1", color: "#000000", fontSize: 17, fontWeight: "bold"}}
                                readOnly={true}
                                value={data.DueAmount}
                            />
                        </Col>

                        <Col md={8}>
                            <input
                                type={"text"}
                                placeholder={"Comment"}
                                className="mr-2"
                                value={data.Comment}
                                onChange={(e: any) => onChangeData({Comment: e.target.value})}
                            />
                        </Col>

                        <Col md={4}>
                            <input
                                type={"text"}
                                placeholder={"Total Amount"}
                                className="mr-2"
                                style={{background: "#fff8dd", color: "#000000", fontSize: 20, fontWeight: "bold"}}
                                readOnly={true}
                                value={data.TotalAmount}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
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

                        <Col md={3}>
                            <input
                                type={"text"}
                                placeholder={"Quantity"}
                                className="mr-2"
                                value={data.Quantity}
                                onChange={(e: any) => {
                                    const value = Number(e.target.value);
                                    if (value >= 0) {
                                        onChangeData({Quantity: e.target.value})
                                    }
                                }}
                                onKeyDown={(e: any) => {
                                    if (e.keyCode === 13) {
                                        handleAddParticular();
                                    }
                                }}
                            />
                        </Col>

                        <Col md={3}>
                            <input
                                type={"text"}
                                placeholder={"Unit Price"}
                                className="mr-2"
                                value={data.UnitPrice}
                                onChange={(e: any) => {
                                    const value = Number(e.target.value);
                                    if (value >= 0) {
                                        onChangeData({UnitPrice: e.target.value})
                                    }
                                }}
                                onKeyDown={(e: any) => {
                                    if (e.keyCode === 13) {
                                        handleAddParticular();
                                    }
                                }}
                            />
                        </Col>

                        <Col md={2}>
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
                            <th>Particular</th>
                            <th style={{textAlign: "center"}}>Quantity</th>
                            <th style={{textAlign: "center"}}>Unit Price</th>
                            <th style={{textAlign: "center"}}>Total Price</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.Particulars.map((Particular: any, index: number) => (
                            <tr key={index}>
                                <td>{Particular.name}</td>
                                <td style={{textAlign: "center"}}>{Particular.quantity}</td>
                                <td style={{textAlign: "right"}}>{Particular.unit_price}</td>
                                <td style={{textAlign: "right"}}>{Particular.total_amount}</td>
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

export default SupplierPaymentForm;
