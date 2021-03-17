<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Classes\InvoiceEntryHandler\AccountingHistoryEntryHandler;
use App\Http\Controllers\Classes\InvoiceEntryHandler\InvoiceEntryHandler;
use App\Models\SupplierInvoice;
use App\Models\SupplierInvoiceParticular;
use App\UAP\UAP;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierInvoiceController extends Controller
{
    public function index()
    {
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['SUPPLIER_INVOICE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $supplier_invoices = SupplierInvoice::with('supplier')->where('pharmacy_id', '=', auth()->user()->pharmacy_id)->get();

                //Format date for view
                foreach ($supplier_invoices as $supplier_invoice) {
                    $supplier_invoice->document_date = date('d/m/Y', strtotime($supplier_invoice->document_date));
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Supplier Invoice List Fetched Successfully!',
                    'data' => $supplier_invoices,
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

    public function getSupplierInvoice(Request $request)
    {
        $id = $request->input('id');

        try {

            $supplier_invoice = SupplierInvoice::where('id', '=', $id)->with('supplier')->first();

            /**
             * Format date for view
             * @IMPORTANT: DATE MUST BE IN (Y/m/d) FORMAT
             */
            $supplier_invoice->document_date = date('Y/m/d', strtotime($supplier_invoice->document_date));
            $supplier_invoice->particulars = SupplierInvoiceParticular::where('invoice_id', '=', $id)->get();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Supplier Invoice Fetched Successfully!',
                'data' => $supplier_invoice,
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
        $supplier_id = $request->input('supplier_id');
        $comment = $request->input('comment');
        $total_amount = $request->input('total_amount');
        $particulars = $request->input('particulars');

        DB::beginTransaction();

        try {
            InvoiceEntryHandler::SupplierInvoiceEntry($id, $document_date, $supplier_id, $comment, $total_amount, $particulars);

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
            SupplierInvoice::where('id', '=', $id)->delete();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Supplier Invoice Deleted Successfully!',
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
