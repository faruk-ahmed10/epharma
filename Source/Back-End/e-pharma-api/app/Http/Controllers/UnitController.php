<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class UnitController extends Controller
{
    //
    public function index(){

        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['MEDICINE_UNIT']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $user = auth()->user();
                $units = Unit::where('pharmacy_id',$user->pharmacy_id)->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data'=>$units
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


    public function store(Request $request ){
        DB::beginTransaction();
        $user = auth()->user();
        try{
            $validated = $request->validate([
                'name' => 'required',
            ]);

            $unit = new Unit;
            $unit->name = $request->name;
            $unit->status = 'Active';
//            $category->create_by = Auth::id();
            $unit->pharmacy_id = $user->pharmacy_id;
            $unit->created_by = $user->id;
            $unit->ip = UserAgentIp();
            $unit->agent = UserAgentBrowser().UserAgentOs();
            $unit->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Unit Save Successfully!',
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

    public function  edit($id){
        $user = auth()->user();
        $unit = Unit::where('pharmacy_id',$user->pharmacy_id)->find($id);
        return $unit;
    }
    public function  update(Request $request){
        DB::beginTransaction();
        try{
            $user = auth()->user();
            $unit = Unit::where('pharmacy_id',$user->pharmacy_id)->find($request->id);
            $unit->name = $request->name;
            $unit->status = $request->status;
//            $category->create_by = Auth::id();
            $unit->pharmacy_id =$user->pharmacy_id;
            $unit->created_by = $user->id;
            $unit->ip = UserAgentIp();
            $unit->agent = UserAgentBrowser().UserAgentOs();
            $unit->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Unit Update Successfully!',

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

    public function  delete($id){
        $user = auth()->user();
        $unit = Unit::where('pharmacy_id',$user->pharmacy_id)->find($id);
        $unit->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }


    public function updateStatusActive($id) {
        DB::beginTransaction();
        try{
            $user = auth()->user();
            $unit = Unit::where('pharmacy_id',$user->pharmacy_id)->find($id);
            $unit->status = "Active";
            $unit->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Active successfully',
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

    public function updateStatusInactive($id) {
        DB::beginTransaction();
        try{
            $user = auth()->user();
            $unit = Unit::where('pharmacy_id',$user->pharmacy_id)->find($id);
            $unit->status = "Inactive";
            $unit->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Inactive successfully',
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
}
