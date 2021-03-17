<?php

namespace App\Http\Controllers;

use App\Helpers\DocumentCode;
use App\Helpers\Helper;
use App\Models\Supplier;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use \Exception;

class SupplierController extends Controller
{
    public function index()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['SUPPLIER']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $suppliers = Helper::setPharmacyID('Supplier')->with('manufacturer')->get();
                return [
                    "success" => true,
                    'error_code' => null,
                    "message" => "Data Get Successfully",
                    'data' => $suppliers
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

            $supplier = new Supplier();
            //generate the document code
            $module_code = UAP::$MODULES['SUPPLIER']['Code'];
            $prefix = UAP::$MODULES['SUPPLIER']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

            $supplier->code = $generated_doc_code;
            $supplier->name = $request->name;
            $supplier->phone = $request->phone;
            $supplier->email = $request->email;
            $supplier->address = $request->address;
            $supplier->status = $request->status;
            $supplier->pharmacy_id = Helper::getPharmacyID();
            $supplier->created_by = auth()->user()->id;
            $supplier->ip = UserAgentIp();
            $supplier->agent = UserAgentBrowser() . UserAgentOs();
            $supplier->save();

            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Supplier Save Successfully!',
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

        $supplier = Helper::setPharmacyID('Supplier')->with('manufacturer')->find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Supplier Save Successfully!',
            "data" => $supplier
        ];

    }

    public function update(Request $request)
    {
        DB::beginTransaction();
        try {

            $supplier = Helper::setPharmacyID('Supplier')->with('manufacturer')->find($request->id);
            $supplier->name = $request->name;
            $supplier->phone = $request->phone;
            $supplier->email = $request->email;
            $supplier->address = $request->address;
            $supplier->status = $request->status;
            $supplier->pharmacy_id = Helper::getPharmacyID();
            $supplier->created_by = auth()->user()->id;
            $supplier->ip = UserAgentIp();
            $supplier->agent = UserAgentBrowser() . UserAgentOs();
            $supplier->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Supplier Update Successfully!',

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
            $supplier = Helper::setPharmacyID('Supplier')->find($id);
            $supplier->status = "Active";
            $supplier->save();
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
        DB::beginTransaction();
        try {
            $supplier = Helper::setPharmacyID('Supplier')->find($id);
            $supplier->status = "Banned";
            $supplier->save();
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
        $supplier = Helper::setPharmacyID('Supplier')->find($id);
        $supplier->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Deleted Successfully!'
        ];
    }
}
