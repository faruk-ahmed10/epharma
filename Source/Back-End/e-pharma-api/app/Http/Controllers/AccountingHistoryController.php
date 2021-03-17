<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Classes\AccountingHistoryEntryHandler\AccountingHistoryEntryHandler;
use App\Models\AccountingHistory;
use App\Models\AccountingHistoryParticular;
use App\UAP\UAP;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccountingHistoryController extends Controller
{
    public function index(Request $request)
    {

        try {
            $type = $request->input('type');

            $permission = UAP::getModuleActionPermission(UAP::$MODULES[strtoupper($type)]['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $accounting_histories = AccountingHistory::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->where('type', '=', $type)->get();

                //Format date for view
                foreach ($accounting_histories as $accounting_history) {
                    $accounting_history->document_date = date('d/m/Y', strtotime($accounting_history->document_date));
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Accounting History List Fetched Successfully!',
                    'data' => $accounting_histories,
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

    public function getAccountingHistory(Request $request)
    {
        $id = $request->input('id');

        try {

            $supplier_invoice = AccountingHistory::where('id', '=', $id)->first();

            /**
             * Format date for view
             * @IMPORTANT: DATE MUST BE IN (Y/m/d) FORMAT
             */
            $supplier_invoice->document_date = date('Y/m/d', strtotime($supplier_invoice->document_date));
            $supplier_invoice->particulars = AccountingHistoryParticular::where('accounting_history_id', '=', $id)->get();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Accounting History Fetched Successfully!',
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
        $type = $request->input('type');
        $document_date = $request->input('document_date');
        $comment = $request->input('comment');
        $total_amount = $request->input('total_amount');
        $particulars = $request->input('particulars');

        DB::beginTransaction();

        try {
            AccountingHistoryEntryHandler::CreateOrUpdate($id, $type, $document_date, $comment, $total_amount, $particulars);

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
            AccountingHistory::where('id', '=', $id)->delete();

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
