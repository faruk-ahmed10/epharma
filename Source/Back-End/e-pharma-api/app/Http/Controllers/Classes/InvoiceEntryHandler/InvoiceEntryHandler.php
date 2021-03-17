<?php

namespace App\Http\Controllers\Classes\InvoiceEntryHandler;

use App\Helpers\DocumentCode;
use App\Models\CustomerInvoice;
use App\Models\CustomerInvoiceParticular;
use App\Models\SupplierInvoice;
use App\Models\SupplierInvoiceParticular;
use App\UAP\UAP;

class InvoiceEntryHandler
{
    public static function SupplierInvoiceEntry($id, $document_date, $supplier_id, $comment, $total_amount, $particulars)
    {
        if ($id > 0) {
            $supplier_invoice = SupplierInvoice::find($id);
        } else {
            $supplier_invoice = new SupplierInvoice();

            //generate the document code
            $module_code = UAP::$MODULES['SUPPLIER_INVOICE']['Code'];
            $prefix = UAP::$MODULES['SUPPLIER_INVOICE']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
            $supplier_invoice->code = $generated_doc_code;

            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }

        $supplier_invoice->supplier_id = $supplier_id;
        $supplier_invoice->comment = $comment;
        $supplier_invoice->total_amount = $total_amount;
        $supplier_invoice->pharmacy_id = auth()->user()->pharmacy_id;
        $supplier_invoice->document_date = date('Y-m-d H:i:s', strtotime($document_date));
        $supplier_invoice->created_by = auth()->user()->id;

        $supplier_invoice->save();

        //Drop the particulars
        SupplierInvoiceParticular::where('invoice_id', '=', $supplier_invoice->id)->delete();

        foreach ($particulars as $particular) {
            SupplierInvoiceParticular::Insert([
                'invoice_id' => $supplier_invoice->id,
                'name' => $particular['name'],
                'quantity' => $particular['quantity'],
                'unit_price' => $particular['unit_price'],
                'total_amount' => $particular['total_amount'],
            ]);
        }


        //TODO:: Insert Or Update the Existing Expense Entry With this Supplier Invoice
    }

    public static function CustomerInvoiceEntry($id, $document_date, $customer_id, $comment, $total_amount, $particulars)
    {
        if ($id > 0) {
            $customer_invoice = CustomerInvoice::find($id);
        } else {
            $customer_invoice = new CustomerInvoice();

            //generate the document code
            $module_code = UAP::$MODULES['CUSTOMER_INVOICE']['Code'];
            $prefix = UAP::$MODULES['CUSTOMER_INVOICE']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
            $customer_invoice->code = $generated_doc_code;

            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }

        $customer_invoice->customer_id = $customer_id;
        $customer_invoice->comment = $comment;
        $customer_invoice->total_amount = $total_amount;
        $customer_invoice->pharmacy_id = auth()->user()->pharmacy_id;
        $customer_invoice->document_date = date('Y-m-d H:i:s', strtotime($document_date));
        $customer_invoice->created_by = auth()->user()->id;

        $customer_invoice->save();

        //Drop the particulars
        CustomerInvoiceParticular::where('invoice_id', '=', $customer_invoice->id)->delete();

        foreach ($particulars as $particular) {
            CustomerInvoiceParticular::Insert([
                'invoice_id' => $customer_invoice->id,
                'name' => $particular['name'],
                'quantity' => $particular['quantity'],
                'unit_price' => $particular['unit_price'],
                'total_amount' => $particular['total_amount'],
            ]);
        }


        //TODO:: Insert Or Update the Existing Expense Entry With this Customer Invoice
    }
}
