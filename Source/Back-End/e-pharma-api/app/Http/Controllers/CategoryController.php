<?php

namespace App\Http\Controllers;


use App\Helpers\Helper;
use App\Models\Category;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class CategoryController extends Controller
{

    public function index()
    {
        DB::beginTransaction();
        try {

            $permission = UAP::getModuleActionPermission(UAP::$MODULES['MEDICINE_CATEGORY']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $categories = Helper::setPharmacyID('Category')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data' => $categories
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
            $category = new Category;
            $category->name = $request->name;
            $category->status = 'Active';
            $category->pharmacy_id = Helper::getPharmacyID();
            $category->created_by = auth()->user()->id;
            $category->ip = UserAgentIp();
            $category->agent = UserAgentBrowser() . UserAgentOs();
            $category->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Category Save Successfully!',

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
        $category = Helper::setPharmacyID('Category')->find($id);
        return $category;
    }

    public function update(Request $request)
    {
        DB::beginTransaction();
        try {

            $category = Category::find($request->id);
            $category->name = $request->name;
            $category->status = $request->status;
            $category->pharmacy_id = Helper::getPharmacyID();
            $category->created_by = auth()->user()->id;
            $category->ip = UserAgentIp();
            $category->agent = UserAgentBrowser() . UserAgentOs();
            $category->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Category Update Successfully!',

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
            $category = Helper::setPharmacyID('Category')->find($id);
            $category->status = "Active";
            $category->save();
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
            $category = Helper::setPharmacyID('Category')->find($id);
            $category->status = "Inactive";
            $category->save();
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
        $category = Helper::setPharmacyID('Category')->find($id);
        $category->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }

}
