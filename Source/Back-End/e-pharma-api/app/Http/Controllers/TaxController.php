<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Tax;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class TaxController extends Controller
{
    //

    public function  index(){

        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['TAX']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $taxes  = Helper::setPharmacyID('Tax')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data'=>$taxes
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
            // $validated = $request->validate([
            //     'name' => 'required',
            //     'rate' => 'required'
            // ]);

            $tax = new Tax;
            $tax->name = $request->name;
            $tax->rate = $request->rate;
            $tax->pharmacy_id =Helper::getPharmacyID();
            $tax->created_by = auth()->user()->id;
            $tax->ip = UserAgentIp();
            $tax->agent = UserAgentBrowser().UserAgentOs();
            $tax->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Tax Save Successfully!',

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
        $tax =  Helper::setPharmacyID('Tax')->find($id);
        return $tax;
    }

    public function update(Request $request){
        DB::beginTransaction();
        try{
            $tax = Helper::setPharmacyID('Tax')->find($request->id);
            $tax->name = $request->name;
            $tax->rate = $request->rate;
            $tax->pharmacy_id = Helper::getPharmacyID();
            $tax->created_by = auth()->user()->id;
            $tax->ip = UserAgentIp();
            $tax->agent = UserAgentBrowser().UserAgentOs();
            $tax->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Tax update successfully',
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

    // public function updateStatusActive($id) {
    //     DB::beginTransaction();
    //     try{
    //         $tax = Tax::find($id);
    //         $tax->status = "Active";
    //         $tax->save();
    //         return [
    //             'success' => true,
    //             'error_code' => null,
    //             'message' => 'Active successfully',
    //         ];

    //     }catch(Exception $e){
    //         DB::rollback();
    //         return $e->getMessage();
    //     }


    // }
    // public function updateStatusInactive($id) {


    //     try{
    //         $tax = Tax::find($id);
    //         $tax->status = "Inactive";
    //         $tax->save();
    //         DB::commit();
    //         return [
    //             'success' => true,
    //             'error_code' => null,
    //             'message' => 'Inactive successfully',
    //         ];

    //     }catch(Exception $e){
    //         DB::rollback();
    //         return $e->getMessage();
    //     }


    // }


    public function delete($id){
        $tax =  Helper::setPharmacyID('Tax')->find($id);
        $tax->delete();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'data delete successfully',
        ];
    }
}

