<?php

namespace App\Http\Controllers;

use App\Helpers\DocumentCode;
use App\Helpers\Helper;
use App\Models\Customer;
use App\Models\User;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use \Exception;


class CustomerController extends Controller
{
    //

    public function index()
    {
        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['CUSTOMER']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $customers = Helper::setPharmacyID('Customer')->get();
                return [
                    "success" => true,
                    'error_code' => null,
                    "message" => "Data Get Successfully",
                    'data' => $customers
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

            $customer = new Customer();

            //generate the document code
            $module_code = UAP::$MODULES['CUSTOMER']['Code'];
            $prefix = UAP::$MODULES['CUSTOMER']['DocCodePrefix'];
            $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

            $customer->code = $generated_doc_code;
            $customer->name = $request->name;
            $customer->phone = $request->phone;
            $customer->email = $request->email;
            $customer->address = $request->address;
            $customer->status = $request->status;
            $customer->pharmacy_id = Helper::getPharmacyID();
            $customer->created_by = auth()->user()->id;
            $customer->ip = UserAgentIp();
            $customer->agent = UserAgentBrowser() . UserAgentOs();
            $customer->save();

            //update the doc code increment
            DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Customer Save Successfully!',
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

        $customer = Helper::setPharmacyID('Customer')->find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Customer Save Successfully!',
            "data" => $customer
        ];

    }

    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $customer = Helper::setPharmacyID('Customer')->find($request->id);

            $customer->name = $request->name;
            $customer->phone = $request->phone;
            $customer->email = $request->email;
            $customer->address = $request->address;
            $customer->status = $request->status;
            $customer->pharmacy_id = Helper::getPharmacyID();
            $customer->created_by = auth()->user()->id;
            $customer->ip = UserAgentIp();
            $customer->agent = UserAgentBrowser() . UserAgentOs();
            $customer->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Customer Update Successfully!',

            ];
        } catch (\Exception $e) {
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
            $customer = Helper::setPharmacyID('Customer')->find($id);
            $customer->status = "Active";
            $customer->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Active successfully',
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

    public function updateStatusInactive($id)
    {
        DB::beginTransaction();
        try {
            $customer = Helper::setPharmacyID('Customer')->find($id);
            $customer->status = "Banned";
            $customer->save();
            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Banned successfully',
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


    public function delete($id)
    {
        $customer = Customer::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->find($id);
        $customer->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }
}
