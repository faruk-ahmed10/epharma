<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Leave;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class LeaveController extends Controller
{
    public function index()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['LEAVE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $leaves = Helper::setPharmacyID('Leave')->with('leavePurpose')->with('employee')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data' => $leaves
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
                $leave = Helper::setPharmacyID('Leave')->find($request->id);
            } else {
                $leave = new Leave;
            }

            $leave->employee_id = $request->employee_id;
            $leave->leave_purpose_id = $request->leave_purpose_id;
            $leave->start_date = $request->start_date;
            $leave->end_date = $request->end_date;
            $leave->note = $request->note;
            $leave->pharmacy_id = Helper::getPharmacyID();
            $leave->created_by = auth()->user()->id;
            $leave->ip = UserAgentIp();
            $leave->agent = UserAgentBrowser() . UserAgentOs();
            $leave->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Leave Saved Successfully!',

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
        return Helper::setPharmacyID('Leave')->with('leaveType')->find($id);
    }

    public function delete($id)
    {
        $leave = Helper::setPharmacyID('Leave')->find($id);
        $leave->delete();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Deleted successfully',
        ];
    }

    public function getTotalLeaves(Request $request) {
        $employee_id = $request->input('employee_id');
        $month = $request->input('month');
        $year =  $request->input('year');

        if($month == '') {
            $month = date('m', time());
        }

        if($year == '') {
            $year = date('Y', time());
        }

        $from_date = $year . "-" . date('m', strtotime($month)) . "-01";
        $to_date = $year . "-" . date('m', strtotime($month)) . "-31";

        try {
            $total_leaves = Leave::where('employee_id', '=', $employee_id)->where('pharmacy_id', '=', auth()->user()->pharmacy_id)->where('start_date', '>=', $from_date)
                ->where('start_date', '<=', $to_date)->count();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Total leaves fetched successfully!',
                'data' => $total_leaves,
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => 'UNKNOWN',
                'message' => $exception->getMessage(),
            ];
        }
    }
}
