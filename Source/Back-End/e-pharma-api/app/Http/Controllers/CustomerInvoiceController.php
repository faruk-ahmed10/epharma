<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Classes\InvoiceEntryHandler\AccountingHistoryEntryHandler;
use App\Http\Controllers\Classes\InvoiceEntryHandler\InvoiceEntryHandler;
use App\Models\CustomerInvoice;
use App\Models\CustomerInvoiceParticular;
use App\UAP\UAP;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerInvoiceController extends Controller
{
    public function index()
    {
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['CUSTOMER_INVOICE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $customer_invoices = CustomerInvoice::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->with('customer')->get();

                //Format date for view
                foreach ($customer_invoices as $customer_invoice) {
                    $customer_invoice->document_date = date('d/m/Y', strtotime($customer_invoice->document_date));
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Customer Invoice List Fetched Successfully!',
                    'data' => $customer_invoices,
                ];
            }

            return [
                'success' => false,
                'error_code' => 'PERMISSION_DENIED',
                'message' => 'You have no permission to do this action!',
            ];

        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => 'UNKNOWN',
                'message' => 'Error !' . $exception->getMessage(),
            ];
        }
    }

    public function getCustomerInvoice(Request $request)
    {
        $id = $request->input('id');

        try {

            $customer_invoice = CustomerInvoice::where('id', '=', $id)->with('customer')->first();

            /**
             * Format date for view
             * @IMPORTANT: DATE MUST BE IN (Y/m/d) FORMAT
             */
            $customer_invoice->document_date = date('Y/m/d', strtotime($customer_invoice->document_date));
            $customer_invoice->particulars = CustomerInvoiceParticular::where('invoice_id', '=', $id)->get();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Customer Invoice Fetched Successfully!',
                'data' => $customer_invoice,
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => 'UNKNOWN',
                'message' => 'Error !' . $exception->getMessage(),
            ];
        }
    }

    public function store(Request $request)
    {
        $id = (int)$request->input('id');
        $document_date = $request->input('document_date');
        $customer_id = $request->input('customer_id');
        $comment = $request->input('comment');
        $total_amount = $request->input('total_amount');
        $particulars = $request->input('particulars');

        DB::beginTransaction();

        try {
            InvoiceEntryHandler::CustomerInvoiceEntry($id, $document_date, $customer_id, $comment, $total_amount, $particulars);

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Saved Successfully!',
            ];

        } catch (Exception $exception) {
            DB::rollBack();
            return [
                'success' => false,
                'error_code' => 'UNKNOWN',
                'message' => 'Error !' . $exception->getMessage(),
            ];
        }
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        try {
            CustomerInvoice::where('id', '=', $id)->delete();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Customer Invoice Deleted Successfully!',
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => 'UNKNOWN',
                'message' => 'Error !' . $exception->getMessage(),
            ];
        }
    }
}
