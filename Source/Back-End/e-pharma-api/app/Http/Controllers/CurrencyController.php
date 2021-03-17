<?php

namespace App\Http\Controllers;


use App\Helpers\Helper;
use App\Models\Currency;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class CurrencyController extends Controller
{
    //
    public function  index(){

        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['CURRENCY']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);
            if ($permission) {
                $currencies  = Helper::setPharmacyID('Currency')->get();
                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Data Get Successfully!',
                    'data'=>$currencies
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
            $validated = $request->validate([
                'name' => 'required',
            ]);
            $currency = new Currency;
            $currency->name = $request->name;
            $currency->abbr = $request->abbr;
            $currency->code = $request->code;
            $currency->sign = $request->sign;
            $currency->pharmacy_id = Helper::getPharmacyID();
            $currency->created_by = auth()->user()->id;
            $currency->ip = UserAgentIp();
            $currency->agent = UserAgentBrowser().UserAgentOs();
            $currency->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Brand Save Successfully!',

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
        $currency =  Helper::setPharmacyID('Currency')->find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Brand Save Successfully!',
            "data" => $currency

        ];

    }


    public function update(Request $request){
        DB::beginTransaction();
        try{
            $validated = $request->validate([
                'name' => 'required',
            ]);
            $currency = Helper::setPharmacyID('Currency')->find($request->id);
            $currency->name = $request->name;
            $currency->abbr = $request->abbr;
            $currency->code = $request->code;
            $currency->sign = $request->sign;
            $currency->pharmacy_id = Helper::getPharmacyID();
            $currency->created_by = auth()->user()->id;
            $currency->ip = UserAgentIp();
            $currency->agent = UserAgentBrowser().UserAgentOs();
            $currency->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Currency Update Successfully!',

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
        $currency = Helper::setPharmacyID('Currency')->find($id);
        $currency->delete();

        return [
            'success' => true,
            'error_code' => null,
            'message' => 'data delete successfully',
        ];
    }
}
