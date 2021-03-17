<?php

namespace App\Http\Controllers;

use App\Helpers\DocumentCode;
use App\Http\Controllers\Classes\TransactionHistory\TransactionHistory;
use App\Models\CustomerPayment;
use App\Models\CustomerPaymentParticular;
use App\UAP\UAP;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerPaymentController extends Controller
{
    public function index()
    {
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['CUSTOMER_PAYMENT']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $customer_payments = CustomerPayment::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->with('customer')->get();

                //Format date for view
                foreach ($customer_payments as $customer_payment) {
                    $customer_payment->document_date = date('d/m/Y', strtotime($customer_payment->document_date));
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Customer Payment List Fetched Successfully!',
                    'data' => $customer_payments,
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

    public function getCustomerPayment(Request $request)
    {
        $id = $request->input('id');

        try {

            $customer_payment = CustomerPayment::where('id', '=', $id)->with('customer')->first();

            /**
             * Format date for view
             * @IMPORTANT: DATE MUST BE IN (Y/m/d) FORMAT
             */
            $customer_payment->document_date = date('Y/m/d', strtotime($customer_payment->document_date));
            $customer_payment->particulars = CustomerPaymentParticular::where('payment_id', '=', $id)->get();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Customer Payment Fetched Successfully!',
                'data' => $customer_payment,
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
            if ($id > 0) {
                $customer_payment = CustomerPayment::find($id);
            } else {
                $customer_payment = new CustomerPayment();

                //generate the document code
                $module_code = UAP::$MODULES['CUSTOMER_PAYMENT']['Code'];
                $prefix = UAP::$MODULES['CUSTOMER_PAYMENT']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));
                $customer_payment->code = $generated_doc_code;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
            }

            $customer_payment->customer_id = $customer_id;
            $customer_payment->comment = $comment;
            $customer_payment->total_amount = $total_amount;
            $customer_payment->pharmacy_id = auth()->user()->pharmacy_id;
            $customer_payment->document_date = date('Y-m-d H:i:s', strtotime($document_date));
            $customer_payment->created_by = auth()->user()->id;

            $customer_payment->save();

            //Drop the particulars
            CustomerPaymentParticular::where('payment_id', '=', $customer_payment->id)->delete();

            foreach ($particulars as $particular) {
                CustomerPaymentParticular::Insert([
                    'payment_id' => $customer_payment->id,
                    'name' => $particular['name'],
                    'quantity' => $particular['quantity'],
                    'unit_price' => $particular['unit_price'],
                    'total_amount' => $particular['total_amount'],
                ]);
            }


            //TODO:: Insert Or Update the Existing Expense Entry With this Customer Payment


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
            CustomerPayment::where('id', '=', $id)->delete();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Customer Payment Deleted Successfully!',
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => 'UNKNOWN',
                'message' => 'Error !' . $exception->getMessage(),
            ];
        }
    }

    public function getCustomerTransactionDetails(Request $request) {
        $supplier_id = $request->input('id');

        try {
            $data = TransactionHistory::getCustomerTransactionHistory($supplier_id);

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Customer Transaction History Successfully!',
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
