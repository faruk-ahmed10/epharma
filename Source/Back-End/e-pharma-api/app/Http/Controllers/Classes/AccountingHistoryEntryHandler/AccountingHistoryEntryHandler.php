<?php

namespace App\Http\Controllers\Classes\AccountingHistoryEntryHandler;

use App\Helpers\DocumentCode;
use App\Models\AccountingHistory;
use App\Models\AccountingHistoryParticular;
use App\UAP\UAP;

class AccountingHistoryEntryHandler
{
    public static function CreateOrUpdate($id, $type, $document_date, $comment, $total_amount, $particulars)
    {
        if ($id > 0) {
            $accounting_history = AccountingHistory::find($id);
        } else {
            $accounting_history = new AccountingHistory();

            $prefix = '';
            $module_code = '';

            if ($type === 'Income') {
                $module_code = UAP::$MODULES['INCOME']['Code'];
                $prefix = UAP::$MODULES['INCOME']['DocCodePrefix'];
            } elseif ($type === 'Expense') {
                $module_code = UAP::$MODULES['EXPENSE']['Code'];
                $prefix = UAP::$MODULES['EXPENSE']['DocCodePrefix'];
            }

            //generate the document code
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

            $accounting_history->code = $generated_doc_code;

            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);
        }

        $accounting_history->type = $type;
        $accounting_history->comment = $comment;
        $accounting_history->total_amount = $total_amount;
        $accounting_history->pharmacy_id = auth()->user()->pharmacy_id;
        $accounting_history->document_date = date('Y-m-d H:i:s', strtotime($document_date));
        $accounting_history->created_by = auth()->user()->id;

        $accounting_history->save();

        //Drop the particulars
        AccountingHistoryParticular::where('accounting_history_id', '=', $accounting_history->id)->delete();

        foreach ($particulars as $particular) {
            AccountingHistoryParticular::Insert([
                'accounting_history_id' => $accounting_history->id,
                'account_category_name' => $particular['account_category_name'],
                'account_head_name' => $particular['account_head_name'],
                'name' => $particular['name'],
                'amount' => $particular['amount'],
            ]);
        }
    }
}
