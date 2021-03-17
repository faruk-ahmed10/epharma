<?php

use App\Http\Controllers\AccountingHistoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerInvoiceController;
use App\Http\Controllers\CustomerPaymentController;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeAttendanceController;

use App\Http\Controllers\GeneralSettingController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\SupplierInvoiceController;
use App\Http\Controllers\SupplierPaymentController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AccountingController;
use App\Http\Controllers\LeavePurposeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\PharmacyController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'v-1'], function () {
    Route::post('/auth/attempt', [AuthController::class, 'attempt']);

    Route::group(['middleware' => ['jwt-auth']], function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/user', [AuthController::class, 'authUser']);

        Route::get('/dashboard/summary_object', [DashboardController::class, 'summaryObject']);

        Route::get('categories', [CategoryController::class, 'index']);
        Route::post('category', [CategoryController::class, 'store']);
        Route::get('category/{id}', [CategoryController::class, 'edit']);
        Route::post('category/update', [CategoryController::class, 'update']);
        Route::get('category/status/active/{id}', [CategoryController::class, 'updateStatusActive']);
        Route::get('category/status/inactive/{id}', [CategoryController::class, 'updateStatusInactive']);
        Route::delete('category/{id}', [CategoryController::class, 'delete']);

        Route::get('units', [UnitController::class, 'index']);
        Route::post('unit', [UnitController::class, 'store']);
        Route::get('unit/{id}', [UnitController::class, 'edit']);
        Route::post('unit/update', [UnitController::class, 'update']);
        Route::delete('unit/{id}', [UnitController::class, 'delete']);
        Route::get('unit/status/active/{id}', [UnitController::class, 'updateStatusActive']);
        Route::get('unit/status/inactive/{id}', [UnitController::class, 'updateStatusInactive']);

        Route::get('taxes', [TaxController::class, 'index']);
        Route::post('tax', [TaxController::class, 'store']);
        // Route::get('tax/status/active/{id}',[TaxController::class,'updateStatusActive']);
        // Route::get('tax/status/inactive/{id}',[TaxController::class,'updateStatusInactive']);


        Route::get('tax/{id}', [TaxController::class, 'edit']);

        Route::post('tax/update', [TaxController::class, 'update']);
        Route::delete('tax/{id}', [TaxController::class, 'delete']);

        Route::get('brands', [BrandController::class, 'index']);
        Route::post('brand', [BrandController::class, 'store']);
        Route::get('brand/status/active/{id}', [BrandController::class, 'updateStatusActive']);
        Route::get('brand/status/inactive/{id}', [BrandController::class, 'updateStatusInactive']);
        Route::get('brand/{id}', [BrandController::class, 'edit']);
        Route::post('brand/update', [BrandController::class, 'update']);
        Route::delete('brand/{id}', [BrandController::class, 'delete']);


        Route::get('currencies', [CurrencyController::class, 'index']);
        Route::post('currency', [CurrencyController::class, 'store']);
        Route::get('currency/{id}', [CurrencyController::class, 'edit']);
        Route::post('currency/update', [CurrencyController::class, 'update']);
        Route::delete('currency/{id}', [CurrencyController::class, 'delete']);


        Route::get('leave_purposes', [LeavePurposeController::class, 'index']);
        Route::post('leave_purpose', [LeavePurposeController::class, 'store']);
        Route::get('leave_purpose/{id}', [LeavePurposeController::class, 'edit']);
        Route::post('leave_purpose/update', [LeavePurposeController::class, 'update']);
        Route::delete('leave_purpose/{id}', [LeavePurposeController::class, 'delete']);


        Route::get('medicines', [MedicineController::class, 'index']);
        Route::post('medicine', [MedicineController::class, 'store']);
        Route::get('medicine/{id}', [MedicineController::class, 'edit']);
        Route::post('medicine/update', [MedicineController::class, 'update']);
        Route::get('medicine/status/active/{id}', [MedicineController::class, 'updateStatusActive']);
        Route::get('medicine/status/inactive/{id}', [MedicineController::class, 'updateStatusInactive']);
        Route::delete('medicine/{id}', [MedicineController::class, 'delete']);
        Route::get('/medicine-file/download', function () {
            $file_name = 'Medicines.xlsx';
            $file = public_path() . '/assets/' . $file_name;
            if (file_exists($file)) {
                return Response::download($file);
            }
        });


        Route::get('customers', [CustomerController::class, 'index']);
        Route::post('customer', [CustomerController::class, 'store']);
        Route::get('customer/{id}', [CustomerController::class, 'edit']);
        Route::post('customer/update', [CustomerController::class, 'update']);
        Route::get('customer/status/active/{id}', [CustomerController::class, 'updateStatusActive']);
        Route::get('customer/status/inactive/{id}', [CustomerController::class, 'updateStatusInactive']);
        Route::delete('customer/{id}', [CustomerController::class, 'delete']);


        Route::get('manufacturers', [ManufacturerController::class, 'index']);
        Route::post('manufacturer', [ManufacturerController::class, 'store']);
        Route::get('manufacturer/{id}', [ManufacturerController::class, 'edit']);
        Route::post('manufacturer/update', [ManufacturerController::class, 'update']);
        Route::get('manufacturer/status/active/{id}', [ManufacturerController::class, 'updateStatusActive']);
        Route::get('manufacturer/status/inactive/{id}', [ManufacturerController::class, 'updateStatusInactive']);
        Route::delete('manufacturer/{id}', [ManufacturerController::class, 'delete']);


        Route::get('suppliers', [SupplierController::class, 'index']);
        Route::post('supplier', [SupplierController::class, 'store']);
        Route::get('supplier/{id}', [SupplierController::class, 'edit']);
        Route::post('supplier/update', [SupplierController::class, 'update']);
        Route::get('supplier/status/active/{id}', [SupplierController::class, 'updateStatusActive']);
        Route::get('supplier/status/inactive/{id}', [SupplierController::class, 'updateStatusInactive']);
        Route::delete('supplier/{id}', [SupplierController::class, 'delete']);

        Route::get('employees', [EmployeeController::class, 'index']);
        Route::post('employee', [EmployeeController::class, 'store']);
        Route::get('employee/{id}', [EmployeeController::class, 'employeeData']);
        Route::get('employee/status/active/{id}', [EmployeeController::class, 'updateStatusActive']);
        Route::get('employee/status/inactive/{id}', [EmployeeController::class, 'updateStatusInactive']);
        Route::delete('employee/{id}', [EmployeeController::class, 'delete']);


        Route::get('transactions', [PaymentController::class, 'allTransactions']);
        Route::get('transaction/{id}', [PaymentController::class, 'Details']);

        // Account Category Sections

        Route::get('/account_categories', [AccountingController::class, 'accountCategories']);
        Route::get('/accountCategoriesNoLimit', [AccountingController::class, 'accountCategoriesNoLimit']);
        Route::post('/account_category_store', [AccountingController::class, 'categoryStore']);
        Route::get('/account_category/{id}', [AccountingController::class, 'getCategory']);
        Route::post('/account_category/update', [AccountingController::class, 'categoryUpdate']);
        Route::delete('/account_category/{id}', [AccountingController::class, 'categoryDelete']);

        // Account Head Sections
        Route::get('/account_heads', [AccountingController::class, 'accountHeads']);
        Route::get('/accountHeadsNoLimit', [AccountingController::class, 'accountHeadsNoLimit']);
        Route::post('/account_head_store', [AccountingController::class, 'headStore']);
        Route::get('/account_head/{id}', [AccountingController::class, 'getAccountHead']);
        Route::post('/account_head/update', [AccountingController::class, 'headUpdate']);
        Route::get('/account_categories_by_type', [AccountingController::class, 'accountCategoriesByType']);
        Route::delete('/account_head/{id}', [AccountingController::class, 'headDelete']);

        Route::get('/accountingHistories', [AccountingHistoryController::class, 'index']);
        Route::get('/getAccountingHistory', [AccountingHistoryController::class, 'getAccountingHistory']);
        Route::post('/saveAccountingHistory', [AccountingHistoryController::class, 'store']);
        Route::delete('/deleteAccountingHistory', [AccountingHistoryController::class, 'delete']);


        Route::get('leaves', [LeaveController::class, 'index']);
        Route::post('leave', [LeaveController::class, 'store']);
        Route::get('leave/{id}', [LeaveController::class, 'edit']);
        Route::post('leave/update', [LeaveController::class, 'update']);
        Route::delete('leave/{id}', [LeaveController::class, 'delete']);

        Route::get('/supplierInvoices', [SupplierInvoiceController::class, 'index']);
        Route::get('/getSupplierInvoice', [SupplierInvoiceController::class, 'getSupplierInvoice']);
        Route::post('/saveSupplierInvoice', [SupplierInvoiceController::class, 'store']);
        Route::delete('/deleteSupplierInvoice', [SupplierInvoiceController::class, 'delete']);


        Route::get('/customerInvoices', [CustomerInvoiceController::class, 'index']);
        Route::get('/getCustomerInvoice', [CustomerInvoiceController::class, 'getCustomerInvoice']);
        Route::post('/saveCustomerInvoice', [CustomerInvoiceController::class, 'store']);
        Route::delete('/deleteCustomerInvoice', [CustomerInvoiceController::class, 'delete']);

        Route::get('/supplierPayments', [SupplierPaymentController::class, 'index']);
        Route::get('/getSupplierPayment', [SupplierPaymentController::class, 'getSupplierPayment']);
        Route::get('/getSupplierTransactionDetails', [SupplierPaymentController::class, 'getSupplierTransactionDetails']);
        Route::post('/saveSupplierPayment', [SupplierPaymentController::class, 'store']);
        Route::delete('/deleteSupplierPayment', [SupplierPaymentController::class, 'delete']);

        Route::get('/customerPayments', [CustomerPaymentController::class, 'index']);
        Route::get('/getCustomerPayment', [CustomerPaymentController::class, 'getCustomerPayment']);
        Route::get('/getCustomerTransactionDetails', [CustomerPaymentController::class, 'getCustomerTransactionDetails']);
        Route::post('/saveCustomerPayment', [CustomerPaymentController::class, 'store']);
        Route::delete('/deleteCustomerPayment', [CustomerPaymentController::class, 'delete']);


        Route::get('pharmacies', [PharmacyController::class, 'index']);
        Route::post('pharmacy', [PharmacyController::class, 'store']);
        Route::get('pharmacy/{id}', [PharmacyController::class, 'edit']);
        Route::post('pharmacy/update', [PharmacyController::class, 'update']);
        Route::get('pharmacy/status/active/{id}', [PharmacyController::class, 'updateStatusActive']);
        Route::get('pharmacy/status/inactive/{id}', [PharmacyController::class, 'updateStatusInactive']);
        Route::delete('pharmacy/{id}', [PharmacyController::class, 'delete']);
        Route::post('pharmacy-change/password', [PharmacyController::class, 'changePassword']);

        Route::get('payrolls', [PayrollController::class, 'index']);
        Route::post('payroll/save', [PayrollController::class, 'store']);
        Route::get('payroll/{id}', [PayrollController::class, 'edit']);
        Route::post('payroll/update', [PayrollController::class, 'update']);
        Route::delete('payroll/{id}', [PayrollController::class, 'delete']);

        // Attendance

        Route::get('/attendances', [EmployeeAttendanceController::class, 'attendanceList']);
        Route::post('/attendance/store', [EmployeeAttendanceController::class, 'store']);
        Route::get('payroll/status/paid/{id}', [PayrollController::class, 'updateStatusPaid']);
        Route::get('payroll/status/unpaid/{id}', [PayrollController::class, 'updateStatusUnpaid']);

        Route::get('general/settings', [GeneralSettingController::class, 'generalSettings']);
        Route::post('general/update', [GeneralSettingController::class, 'updateGeneralSettings']);

        Route::get('/attendance/{id}', [EmployeeAttendanceController::class, 'edit']);
        Route::post('/attendance/update', [EmployeeAttendanceController::class, 'update']);
        Route::delete('/attendance/{id}', [EmployeeAttendanceController::class, 'delete']);
        Route::get('/attendance/{id}', [EmployeeAttendanceController::class, 'delete']);

        Route::get('/total_attendance', [EmployeeAttendanceController::class, 'getTotalAttendance']);
        Route::get('/total_leaves', [LeaveController::class, 'getTotalLeaves']);

        Route::get('user_roles', [UserRoleController::class, 'index']);
        Route::get('/user_roles/all', [UserRoleController::class, 'getAllUserRoles']);
        Route::get('user_role/{id}', [UserRoleController::class, 'getUserRole']);
        Route::post('user_role/save', [UserRoleController::class, 'store']);
        Route::post('user_role/delete', [UserRoleController::class, 'delete']);
        Route::post('user_role/save_permissions', [UserRoleController::class, 'saveRolePermissions']);
    });

});
