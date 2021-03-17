<?php

namespace App\Http\Controllers;

use App\CDN\CDN;
use App\Helpers\DocumentCode;
use App\Models\Medicine;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use \Exception;


class MedicineController extends Controller
{
    //

    //
    public function index()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['MEDICINE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $pharmacy_id = auth()->user()->pharmacy_id;
                $medicines = Medicine::where('pharmacy_id', $pharmacy_id)->with('category')->with('unit')->with('Manufacturer')->with('vat')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data' => $medicines
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
            $user = auth()->user();
            $medicine = new Medicine();

            //generate the document code
            $module_code = UAP::$MODULES['MEDICINE']['Code'];
            $prefix = UAP::$MODULES['MEDICINE']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

            $medicine->code = $generated_doc_code;
            $medicine->medicine_name = $request->medicine_name;
            $medicine->generic_name = $request->generic_name;
            $medicine->slug = $request->medicine_name;
            $medicine->strength = $request->strength;
            $medicine->brand_id = $request->brand_id;
            $medicine->category_id = $request->category_id;
            $medicine->unit_id = $request->unit_id;
            $medicine->purchase_price = $request->purchase_price;
            $medicine->sales_price = $request->sales_price;
            $medicine->box_size = $request->box_size;
            $medicine->total_box = $request->total_box;
            $medicine->quantity = $request->box_size * $request->total_box;
            $medicine->expire_date = $request->expire_date;
            $medicine->shelf_number = $request->shelf_number;
            $medicine->medicine_details = $request->medicine_details;

            if ($request->hasfile('image')) {
                $file = $request->file('image');
                $photo = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
                $photo = 'public/uploads/medicine/' . $photo;
                Storage::disk('s3')->put(CDN::$PATHS['ROOT'] . $photo, file_get_contents($file));
                $medicine->image = $photo;
            }

            $medicine->vat_id = $request->vat_id ? $request->vat_id : 0;
            $medicine->status = 'Active';
            $medicine->pharmacy_id = $user->pharmacy_id;
            $medicine->created_by = $user->id;
            $medicine->ip = UserAgentIp();
            $medicine->agent = UserAgentBrowser() . UserAgentOs();
            $medicine->save();

            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Medicine Save Successfully!',

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
        $pharmacy_id = auth()->user()->pharmacy_id;
        $medicine = Medicine::where('pharmacy_id', $pharmacy_id)->with('category')->with('brand')->with('unit')->with('Manufacturer')->with('vat')->find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Medicine Updated Successfully!',
            'data' => $medicine
        ];;
    }


    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();
            $medicine = Medicine::where('pharmacy_id', $user->pharmacy_id)->find($request->id);
            $medicine->medicine_name = $request->medicine_name;
            $medicine->generic_name = $request->generic_name;
            $medicine->slug = $request->medicine_name;
            $medicine->strength = $request->strength;
            $medicine->brand_id = $request->brand_id;
            $medicine->category_id = $request->category_id;
            $medicine->unit_id = $request->unit_id;
            $medicine->purchase_price = $request->purchase_price;
            $medicine->sales_price = $request->sales_price;
            $medicine->box_size = $request->box_size;
            $medicine->total_box = $request->total_box;
            $medicine->quantity = $request->box_size * $request->total_box;
            $medicine->expire_date = $request->expire_date;
            $medicine->shelf_number = $request->shelf_number;
            $medicine->medicine_details = $request->medicine_details;
            if ($request->hasfile('image')) {
                $file = $request->file('image');
                $photo = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
                $photo = 'public/uploads/medicine/' . $photo;
                Storage::disk('s3')->put('eims/' . $photo, file_get_contents($file));
                $medicine->image = $photo;

            }
            $medicine->vat_id = $request->vat_id ? $request->vat_id : 0;
            $medicine->status = $request->status;
            $medicine->pharmacy_id = $user->pharmacy_id;
            $medicine->created_by = $user->id;
            $medicine->ip = UserAgentIp();
            $medicine->agent = UserAgentBrowser() . UserAgentOs();
            $medicine->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Active successfully',
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


    public function updateStatusActive($id)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();
            $medicine = Medicine::where('pharmacy_id', $user->pharmacy_id)->find($id);
            $medicine->status = "Active";
            $medicine->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Active successfully',
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


    public function updateStatusInactive($id)
    {

        try {
            $user = auth()->user();
            $medicine = Medicine::where('pharmacy_id', $user->pharmacy_id)->find($id);
            $medicine->status = "Inactive";
            $medicine->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Inactive successfully',
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
        $user = auth()->user();
        $medicine = Medicine::where('pharmacy_id', $user->pharmacy_id)->find($id);
        $medicine->delete();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'data delete successfully',
        ];
    }
}
