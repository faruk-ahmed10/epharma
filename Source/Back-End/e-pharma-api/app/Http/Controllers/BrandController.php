<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Brand;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class BrandController extends Controller
{
    //
    public function index()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['MEDICINE_BRAND']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $brands = Helper::setPharmacyID('Brand')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data' => $brands
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
            $validated = $request->validate([
                'name' => 'required',
            ]);
            $brand = new Brand;
            $brand->name = $request->name;
            $brand->pharmacy_id = Helper::getPharmacyID();
            $brand->status = "Active";
            $brand->created_by = auth()->user()->id;
            $brand->ip = UserAgentIp();
            $brand->agent = UserAgentBrowser() . UserAgentOs();
            $brand->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Brand Save Successfully!',

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
        $brand = Helper::setPharmacyID('Brand')->find($id);
        return $brand;
    }


    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $brand = Helper::setPharmacyID('Brand')->find($request->id);
            $brand->name = $request->name;
            $brand->pharmacy_id = Helper::getPharmacyID();
            $brand->status = $request->status;;
            $brand->created_by = auth()->user()->id;
            $brand->ip = UserAgentIp();
            $brand->agent = UserAgentBrowser() . UserAgentOs();
            $brand->save();

            DB::commit();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Brand update successfully',
            ];
        } catch (Exception $exception) {
            DB::rollback();
            return [
                'success' => false,
                'error_code' => null,
                'message' => $exception->getMessage(),
            ];
        }

    }

    public function updateStatusActive($id)
    {
        DB::beginTransaction();
        try {
            $brand = Helper::setPharmacyID('Brand')->find($id);
            $brand->status = "Active";
            $brand->save();
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
            $brand = Helper::setPharmacyID('Brand')->find($id);
            $brand->status = "Inactive";
            $brand->save();
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
        $brand = Helper::setPharmacyID('Brand')->find($id);
        $brand->delete();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'data delete successfully',
        ];
    }
}
