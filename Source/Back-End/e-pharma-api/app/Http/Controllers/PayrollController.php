<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Payroll;
use App\Models\Employee;

use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class PayrollController extends Controller
{
    public function index()
    {


        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['PAYROLL']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $payrolls = Helper::setPharmacyID('Payroll')->with('employee')->get();

                foreach ($payrolls as $payroll) {
                    $payroll->payment_date = date('d/m/Y', strtotime($payroll->created_at));
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data' => $payrolls
                ];
            }

            return [
                'success' => false,
                'error_code' => 'PERMISSION_DENIED',
                'message' => 'You have no permission to do this action!',
            ];

        } catch (Exception $e) {
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $e->getMessage(),
            ];
        }

    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {

            if ($request->id) {
                $payroll = Helper::setPharmacyID('Payroll')->find($request->id);
            } else {
                $payroll = new Payroll;
            }

            $payroll->employee_id = $request->employee_id;
            $payroll->month = $request->month;
            $payroll->year = date('Y', time());
            $payroll->basic = $request->basic;
            $payroll->bonus = $request->bonus;
            $payroll->overtime = $request->overtime;
            $payroll->deduction = $request->deduction;
            $payroll->net_pay = $request->net_pay;
            $payroll->status = $request->status;
            $payroll->pharmacy_id = Helper::getPharmacyID();
            $payroll->created_by = auth()->user()->id;
            $payroll->ip = UserAgentIp();
            $payroll->agent = UserAgentBrowser() . UserAgentOs();
            $payroll->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Payroll Saved Successfully!',

            ];
        } catch (Exception $e) {
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function edit($id)
    {
        return Helper::setPharmacyID('Payroll')->with('employee')->find($id);
    }


    /*public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $payroll = Payroll::with('leaveType')->find($request->id);
            $payroll->name = $request->name;
            $payroll->pharmacy_id = 1;
            $payroll->created_by = 1;
            $payroll->ip = UserAgentIp();
            $payroll->agent = UserAgentBrowser() . UserAgentOs();
            $payroll->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Payroll update successfully',
            ];
        } catch (Exception $e) {
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $e->getMessage(),
            ];
        }
    }*/

    public function delete($id)
    {
        $payroll = Helper::setPharmacyID('Payroll')->find($id);
        $payroll->delete();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'data delete successfully',
        ];
    }


    public function updateStatusPaid($id)
    {
        DB::beginTransaction();
        try {
            $payroll = Helper::setPharmacyID('Payroll')->find($id);
            $payroll->status = "Paid";
            $payroll->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Paid successfully',
            ];
        } catch (Exception $e) {
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function updateStatusUnpaid($id)
    {
        DB::beginTransaction();
        try {
            $payroll = Helper::setPharmacyID('Payroll')->find($id);
            $payroll->status = "Unpaid";
            $payroll->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Unpaid successfully',
            ];
        } catch (Exception $e) {
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $e->getMessage(),
            ];
        }
    }
}
