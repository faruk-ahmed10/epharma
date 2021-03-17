<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\GeneralSetting;
use App\Models\Pharmacy;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use \Exception;


class PharmacyController extends Controller
{
    public function index()
    {
        $pharmacies = Pharmacy::all();
        return [
            "success" => true,
            'error_code' => null,
            "message" => "Data Get Successfully",
            'data' => $pharmacies
        ];

    }

    public function store(Request $request)
    {


        DB::beginTransaction();
        try {

            if ((int)$request->id > 0) {
                $pharmacy = Pharmacy::find($request->id);
            } else {
                $pharmacy = new Pharmacy();
                $pharmacy->created_by = auth()->user()->id;
            }

            if ((int)$pharmacy->id > 0) {
                $user = User::where('pharmacy_id', $pharmacy->id)->first();
            } else {
                $user = new User();
                $user->name = 'Admin';
                $user->role_id = 0; //Master admin
                $user->password = Hash::make($request->password);
                $user->created_by = auth()->user()->id;
            }

            $pharmacy->pharmacy_name = $request->pharmacy_name;
            $pharmacy->phone = $request->phone;
            $pharmacy->email = $request->email;
            $pharmacy->domain = $request->domain;
            $pharmacy->status = "Inactive";

            if ($request->payment_status == "Paid") {
                $pharmacy->payment_status = "Paid";
                $pharmacy->status = "Active";
            } elseif ($request->payment_status == "Unpaid") {
                $pharmacy->payment_status = "Unpaid";
                $pharmacy->status = "Inactive";
            } elseif ($request->payment_status == "Partial") {
                $pharmacy->payment_status = "Partial";
                $pharmacy->status = "Active";
            }


            $pharmacy->ip = UserAgentIp();
            $pharmacy->agent = UserAgentBrowser() . UserAgentOs();
            $pharmacy->save();

            $user->pharmacy_id = $pharmacy->id;
            $user->email = $request->email;
            $user->ip = UserAgentIp();
            $user->agent = UserAgentBrowser() . UserAgentOs();
            $user->save();

            if ((int)$request->id == 0) {
                //Currency Entry
                $currency = new Currency();
                $currency->pharmacy_id = $pharmacy->id;
                $currency->name = 'Taka';
                $currency->abbr = 'TK';
                $currency->code = 'BDT';
                $currency->sign = '৳';
                $currency->save();

                //General Settings Entry
                $generalSetting = new GeneralSetting();
                $generalSetting->phone = $request->phone;
                $generalSetting->email = $request->email;
                $generalSetting->pharmacy_id = $pharmacy->id;
                $generalSetting->currency_id = $currency->id;
                $generalSetting->save();

                //TODO:: Create some accounting categories and heads for auto accounting entry also including the accounting settings
            }


            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Pharmacy Saved Successfully!',
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
        $pharmacy = Pharmacy::find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Employee Save Successfully!',
            "data" => $pharmacy
        ];

    }

    public function updateStatusActive($id)
    {
        DB::beginTransaction();
        try {
            $pharmacy = Pharmacy::find($id);
            $user = User::where('pharmacy_id', $pharmacy->id)->first();
            $user->status = "Active";
            $user->save();
            $pharmacy->status = "Active";
            $pharmacy->save();
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
            $pharmacy = Pharmacy::find($id);
            $user = User::where('pharmacy_id', $pharmacy->id)->first();
            $user->status = "Banned";
            $user->save();
            $pharmacy->status = "Banned";
            $pharmacy->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Banned successfully',
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

    public function changePassword(Request $request)
    {
        DB::beginTransaction();

        try {
            $pharmacy = Pharmacy::find($request->id);
            $user = User::where('pharmacy_id', $pharmacy->id)->first();
            $user->password = Hash::make($request->password);
            $user->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Password changed successfully',
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
        $pharmacy = Pharmacy::find($id);//TODO:: When Pharmacy Delete then all data delete pharmacy wise
        $user = User::where('pharmacy_id', $pharmacy->id)->first();
        $user->delete();
        $pharmacy->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }
}
