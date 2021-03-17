<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\AccountCategory;
use App\Models\EmployeeAttendance;
use App\Models\User;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class EmployeeAttendanceController extends Controller
{
    public function attendanceList()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['EMPLOYEE_ATTENDANCE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);
            if ($permission) {
                $attendanceList = Helper::setPharmacyID('EmployeeAttendance')->with('employee')->get();

                foreach ($attendanceList as $attendance) {
                    $attendance->in_time_formated = date('h:i a', strtotime($attendance->in_time));
                    $attendance->out_time_formated = date('h:i a', strtotime($attendance->out_time));
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Data Get Successfully',
                    'data' => $attendanceList,
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
            $attendance = new EmployeeAttendance;
            $attendance->employee_id = $request->employee_id;
            $attendance->date = $request->date;
            $attendance->in_time = $request->in_time;
            $attendance->out_time = $request->out_time;
            $attendance->note = $request->note;
            $attendance->pharmacy_id = Helper::getPharmacyID();
            $attendance->created_by = auth()->user()->id;
            $attendance->ip = UserAgentIp();
            $attendance->agent = UserAgentBrowser() . UserAgentOs();
            $attendance->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Attendance Submitted Successfully!',

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
        return Helper::setPharmacyID('EmployeeAttendance')->with('employee')->find($id);
    }

    public function update(Request $request)
    {
        DB::beginTransaction();
        try {

            $attendance = Helper::setPharmacyID('EmployeeAttendance')->find($request->id);
            $attendance->employee_id = $request->employee_id;
            $attendance->date = $request->date;
            $attendance->in_time = $request->in_time;
            $attendance->out_time = $request->out_time;
            $attendance->note = $request->note;
//            $attendance->created_by = Auth::id();
            $attendance->pharmacy_id = auth()->user()->pharmacy_id;
            $attendance->created_by = auth()->user()->id;
            $attendance->ip = UserAgentIp();
            $attendance->agent = UserAgentBrowser() . UserAgentOs();
            $attendance->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Attendance Update Successfully!',

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

    public function delete($id)
    {
        $attendance = Helper::setPharmacyID('EmployeeAttendance')->find($id);
        $attendance->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }

    public function getTotalAttendance(Request $request) {
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
            $total_attendance = EmployeeAttendance::where('employee_id', '=', $employee_id)->where('pharmacy_id', '=', auth()->user()->pharmacy_id)->where('date', '>=', $from_date)
                ->where('date', '<=', $to_date)->count();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Total attendance fetched successfully!',
                'data' => $total_attendance,
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
