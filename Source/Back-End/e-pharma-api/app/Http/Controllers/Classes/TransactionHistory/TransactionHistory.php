<?php

namespace App\Http\Controllers\Classes\TransactionHistory;

use App\Models\CustomerInvoice;
use App\Models\CustomerPayment;
use App\Models\SupplierInvoice;
use App\Models\SupplierPayment;

class TransactionHistory
{
    public static function getSupplierTransactionHistory($supplier_id)
    {
        $invoices_total = (double)SupplierInvoice::where('supplier_id', '=', $supplier_id)->sum('total_amount');
        $payments_total = (double)SupplierPayment::where('supplier_id', '=', $supplier_id)->sum('total_amount');

        return [
            'AdvanceAmount' => ($payments_total > $invoices_total) ? $payments_total - $invoices_total : 0,
            'DueAmount' => ($invoices_total >= $payments_total) ? $invoices_total - $payments_total : 0,
        ];
    }

    public static function getCustomerTransactionHistory($customer_id)
    {
        $invoices_total = (double)CustomerInvoice::where('customer_id', '=', $customer_id)->sum('total_amount');
        $payments_total = (double)CustomerPayment::where('customer_id', '=', $customer_id)->sum('total_amount');

        return [
            'AdvanceAmount' => ($payments_total > $invoices_total) ? $payments_total - $invoices_total : 0,
            'DueAmount' => ($invoices_total >= $payments_total) ? $invoices_total - $payments_total : 0,
        ];
    }
}
