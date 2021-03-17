<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Customer;
use App\Models\Manufacturer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ManufacturerController extends Controller
{
    public function index(){
        $manufacturers =  Helper::setPharmacyID('Manufacturer')->get();
        return [
            "success" => true,
            'error_code' => null,
            "message" =>"Data Get Successfully",
            'data' => $manufacturers
        ];
    }
    public function store(Request $request){
        DB::beginTransaction();
        try{
//            $validated = $request->validate([
//                'name' => 'required',
//            ]);
            $manufacturer = new Manufacturer();
            $manufacturer->name = $request->name;
            $manufacturer->phone = $request->phone;
            $manufacturer->email = $request->email;
//            if ($request->hasfile('logo')) {
//                $file = $request->file('logo');
//                $photo = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
//                $photo =  'public/uploads/company/' . $photo;
//                Storage::disk('s3')->put('eims/'.$photo, file_get_contents($file));
//                $manufacturer->image = $photo;
//            }
            $manufacturer->address = $request->address;
            $manufacturer->details = $request->details;
            $manufacturer->status = "Active";
            $manufacturer->pharmacy_id = Helper::getPharmacyID();
            $manufacturer->created_by = auth()->user()->id;
            $manufacturer->ip = UserAgentIp();
            $manufacturer->agent = UserAgentBrowser().UserAgentOs();
            $manufacturer->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Manufacturer Save Successfully!',
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

        $manufacturer = Helper::setPharmacyID('Manufacturer')->find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Manufacturer Save Successfully!',
            "data" => $manufacturer
        ];

    }
    public function update(Request $request){

        DB::beginTransaction();
        try{
//            $validated = $request->validate([
//                'name' => 'required',
//            ]);
            $manufacturer =  Helper::setPharmacyID('Manufacturer')->find($request->id);
            $manufacturer->name = $request->name;
            $manufacturer->phone = $request->phone;
            $manufacturer->email = $request->email;
            // if ($request->hasfile('logo')) {
            //     $file = $request->file('logo');
            //     $photo = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
            //     $photo =  'public/uploads/company/' . $photo;
            //     Storage::disk('s3')->put('eims/'.$photo, file_get_contents($file));
            //     $manufacturer->image = $photo;
            // }
            $manufacturer->address = $request->address;
            $manufacturer->details = $request->details;
            $manufacturer->status =  $request->status;
            $manufacturer->pharmacy_id = Helper::getPharmacyID();
            $manufacturer->created_by = auth()->user()->id;
            $manufacturer->ip = UserAgentIp();
            $manufacturer->agent = UserAgentBrowser().UserAgentOs();
            $manufacturer->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => ' Update Successfully!',
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

    public function updateStatusActive($id) {
        DB::beginTransaction();
        try{
            $manufacturer =  Helper::setPharmacyID('Manufacturer')->find($id);
            $manufacturer->status = "Active";
            $manufacturer->save();
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
            $manufacturer =  Helper::setPharmacyID('Manufacturer')->find($id);
            $manufacturer->status = "Inactive";
            $manufacturer->save();
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




    public function  delete($id){
        $manufacturer = Helper::setPharmacyID('Manufacturer')->find($id);
        $manufacturer->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }
}
