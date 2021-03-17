<?php

namespace App\Http\Controllers;

use App\Helpers\DocumentCode;
use App\Http\Controllers\Classes\TransactionHistory\TransactionHistory;
use App\Models\SupplierPayment;
use App\Models\SupplierPaymentParticular;
use App\UAP\UAP;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SupplierPaymentController extends Controller
{
    public function index()
    {
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['SUPPLIER_PAYMENT']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $supplier_payments = SupplierPayment::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->with('supplier')->get();

                //Format date for view
                foreach ($supplier_payments as $supplier_payment) {
                    $supplier_payment->document_date = date('d/m/Y', strtotime($supplier_payment->document_date));
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Supplier Payment List Fetched Successfully!',
                    'data' => $supplier_payments,
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

    public function getSupplierPayment(Request $request)
    {
        $id = $request->input('id');

        try {

            $supplier_payment = SupplierPayment::where('id', '=', $id)->with('supplier')->first();

            /**
             * Format date for view
             * @IMPORTANT: DATE MUST BE IN (Y/m/d) FORMAT
             */
            $supplier_payment->document_date = date('Y/m/d', strtotime($supplier_payment->document_date));
            $supplier_payment->particulars = SupplierPaymentParticular::where('payment_id', '=', $id)->get();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Supplier Payment Fetched Successfully!',
                'data' => $supplier_payment,
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
            if ($id > 0) {
                $supplier_payment = SupplierPayment::find($id);
            } else {
                $supplier_payment = new SupplierPayment();

                //generate the document code
                $module_code = UAP::$MODULES['SUPPLIER_PAYMENT']['Code'];
                $prefix = UAP::$MODULES['SUPPLIER_PAYMENT']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $supplier_payment->code = $generated_doc_code;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $supplier_payment->supplier_id = $supplier_id;
            $supplier_payment->comment = $comment;
            $supplier_payment->total_amount = $total_amount;
            $supplier_payment->pharmacy_id = auth()->user()->pharmacy_id;
            $supplier_payment->document_date = date('Y-m-d H:i:s', strtotime($document_date));
            $supplier_payment->created_by = auth()->user()->id;

            $supplier_payment->save();

            //Drop the particulars
            SupplierPaymentParticular::where('payment_id', '=', $supplier_payment->id)->delete();

            foreach ($particulars as $particular) {
                SupplierPaymentParticular::Insert([
                    'payment_id' => $supplier_payment->id,
                    'name' => $particular['name'],
                    'quantity' => $particular['quantity'],
                    'unit_price' => $particular['unit_price'],
                    'total_amount' => $particular['total_amount'],
                ]);
            }


            //TODO:: Insert Or Update the Existing Expense Entry With this Supplier Payment


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
            SupplierPayment::where('id', '=', $id)->delete();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Supplier Payment Deleted Successfully!',
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => 'UNKNOWN',
                'message' => 'Error !' . $exception->getMessage(),
            ];
        }
    }

    public function getSupplierTransactionDetails(Request $request) {
        $supplier_id = $request->input('id');

        try {
            $data = TransactionHistory::getSupplierTransactionHistory($supplier_id);

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Supplier Transaction History Successfully!',
                'data' => $data,
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
