<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\LeavePurpose;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class LeavePurposeController extends Controller
{
    public function  index(){


        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['LEAVE_PURPOSE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $leave_purposes  =  Helper::setPharmacyID('LeavePurpose')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data'=>$leave_purposes
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

    public function store(Request $request) {

        DB::beginTransaction();
        try{
            $leave_purpose = new LeavePurpose;
            $leave_purpose->name = $request->name;
            $leave_purpose->pharmacy_id = Helper::getPharmacyID();
            $leave_purpose->created_by = auth()->user()->id;
            $leave_purpose->ip = UserAgentIp();
            $leave_purpose->agent = UserAgentBrowser().UserAgentOs();
            $leave_purpose->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Leave Purpose Save Successfully!',

            ];
        }catch(Exception $e){
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function edit($id){
        $leave_purpose = Helper::setPharmacyID('LeavePurpose')->find($id);
        return $leave_purpose;
    }


    public function update(Request $request){
        DB::beginTransaction();
        try{
            $leave_purpose =Helper::setPharmacyID('LeavePurpose')->find($request->id);
            $leave_purpose->name = $request->name;
            $leave_purpose->pharmacy_id = Helper::getPharmacyID();
            $leave_purpose->created_by = auth()->user()->id;
            $leave_purpose->ip = UserAgentIp();
            $leave_purpose->agent = UserAgentBrowser().UserAgentOs();
            $leave_purpose->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Leave Purpose update successfully',
            ];
        }catch(Exception $e){
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function delete($id){
        $leave_purpose =  Helper::setPharmacyID('LeavePurpose')->find($id);
        $leave_purpose->delete();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'data delete successfully',
        ];
    }
}
