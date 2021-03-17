<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\UAP\UAP;
use Illuminate\Http\Request;
use App\Models\AccountCategory;
use App\Models\AccountHead;
use Illuminate\Support\Facades\DB;
use \Exception;

class AccountingController extends Controller
{
    // Account Category Section
    public function accountCategories()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['ACCOUNT_CATEGORY']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $categories = Helper::setPharmacyID('AccountCategory')->get();
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

    // Account Category Section
    public function accountCategoriesNoLimit(Request $request)
    {
        $type = $request->input('type');

        if($type === 'Income' || $type === 'Expense') {
            $categories = Helper::setPharmacyID('AccountCategory')->where('type', '=', $type)->get();
        } else {
            $categories = Helper::setPharmacyID('AccountCategory')->get();
        }

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Date Get Successfully!',
            'data' => $categories
        ];
    }


    public function categoryStore(Request $request)
    {
        DB::beginTransaction();
        try {
            $category = new AccountCategory;
            $category->name = $request->name;
            $category->type = $request->type;
            $category->pharmacy_id = auth()->user()->pharmacy_id;
            $category->created_by = auth()->user()->id;
            $category->ip = UserAgentIp();
            $category->agent = UserAgentBrowser() . UserAgentOs();
            $category->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Category Saved Successfully!',

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

    public function getCategory($id)
    {
        return Helper::setPharmacyID('AccountCategory')->find($id);
    }

    public function categoryUpdate(Request $request)
    {
        DB::beginTransaction();
        try {

            $category = Helper::setPharmacyID('AccountCategory')->find($request->id);
            $category->name = $request->name;
//            $category->created_by = Auth::id();
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


    public function categoryDelete($id)
    {
        $category = AccountCategory::find($id);
        $category = Helper::setPharmacyID('AccountCategory')->find($id);
        $category->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }

    // Account Head Section

    public function accountHeads()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['ACCOUNT_HEAD']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $heads = Helper::setPharmacyID('AccountHead')->with('accountCategory')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Date Get Successfully!',
                    'data' => $heads
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

    public function accountHeadsNoLimit(Request $request)
    {
        $cat_id = (int) $request->input('cat_id');

        $heads = AccountHead::with('accountCategory');

        if($cat_id > 0) {
            $heads = $heads->where('account_category_id', '=', $cat_id);
        }

        $heads = $heads->get();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Date Get Successfully!',
            'data' => $heads
        ];
    }

    public function headStore(Request $request)
    {
        // return $request->all();
        DB::beginTransaction();
        try {
            $validated = $request->validate([
                'name' => 'required',
            ]);

            $heads = new AccountHead;
            $heads->name = $request->name;
            $heads->type = $request->type;
            $heads->account_category_id = $request->category_id;
            $heads->pharmacy_id = auth()->user()->pharmacy_id;
            $heads->created_by = auth()->user()->id;
            $heads->ip = UserAgentIp();
            $heads->agent = UserAgentBrowser() . UserAgentOs();
            $heads->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Head Save Successfully!',

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


    public function accountCategoriesByType(Request $request)
    {
        $type = $request->input('type');
        $categoryByHead = AccountCategory::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->where('type', '=', $type)->get();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Head Save Successfully!',
            'data' => $categoryByHead,

        ];
    }

    public function getAccountHead($id)
    {
        return AccountHead::find($id);
    }

    public function headUpdate(Request $request)
    {
        DB::beginTransaction();
        try {

            $heads = Helper::setPharmacyID('AccountHead')->find($request->id);
            $heads->name = $request->name;
            $heads->type = $request->type;
            $heads->pharmacy_id = auth()->user()->pharmacy_id;
            $heads->created_by = auth()->user()->id;
            $heads->ip = UserAgentIp();
            $heads->agent = UserAgentBrowser() . UserAgentOs();
            $heads->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Head Update Successfully!',

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

    public function headDelete($id)
    {
        $head = AccountHead::find($id);
        $head->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }

}
