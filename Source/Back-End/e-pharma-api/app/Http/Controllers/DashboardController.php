<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\AccountingHistory;
use App\Models\Customer;
use App\Models\CustomerInvoice;
use App\Models\Manufacturer;
use App\Models\Medicine;
use App\Models\SupplierInvoice;
use Exception;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function summaryObject() {
        try {
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Dashboard summary object fetched successfully!',
                'data' => [
                    'total_customers' => Helper::setPharmacyID('Customer')->count(),
                    'total_suppliers' => Helper::setPharmacyID('Supplier')->count(),
                    'total_medicines' => Helper::setPharmacyID('Medicine')->count(),
                    'total_income' =>  Helper::setPharmacyID('AccountingHistory')->where('type', '=', 'Income')->sum('total_amount'),
                    'total_expense' => Helper::setPharmacyID('AccountingHistory')->where('type', '=', 'Expense')->sum('total_amount'),
                    'total_invoices' => Helper::setPharmacyID('SupplierInvoice')->count() + Helper::setPharmacyID('CustomerInvoice')->count(),
                ]
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => null,
                'message' => $exception->getMessage(),
            ];
        }
    }
}
