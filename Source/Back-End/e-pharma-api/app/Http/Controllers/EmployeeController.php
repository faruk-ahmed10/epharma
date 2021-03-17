<?php

namespace App\Http\Controllers;

use App\CDN\CDN;
use App\Helpers\DocumentCode;
use App\Helpers\Helper;
use App\Models\Employee;
use App\Models\User;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use \Exception;

class EmployeeController extends Controller
{
    //
    public function index()
    {



        DB::beginTransaction();
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['EMPLOYEE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $employees = Employee::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->with('user')->get();
                return [
                    "success" => true,
                    'error_code' => null,
                    "message" => "Data Get Successfully",
                    'data' => $employees
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

    public function employeeData($id)
    {
        $employee = Employee::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->where('id', $id)->with('user')->first();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Employee fetched Successfully!',
            'data' => $employee

        ];
    }


    public function store(Request $request)
    {
        DB::beginTransaction();
        try {

            if ($request->id) {
                $employee = Helper::setPharmacyID('Employee')->find($request->id);
            } else {
                $employee = new Employee();
            }

            if ($employee->user_id) {
                $user = Helper::setPharmacyID('User')->where('id', $employee->user_id)->first();
            } else {

                //generate the document code
                $module_code = UAP::$MODULES['EMPLOYEE']['Code'];
                $prefix = UAP::$MODULES['EMPLOYEE']['DocCodePrefix'];
                $generated_doc_code = DocumentCode::GenerateNewCode($prefix, 6, DocumentCode::GetLastIncrement($module_code));

                $employee->code = $generated_doc_code;

                //update the doc code increment
                DocumentCode::UpdateCodeIncrement($module_code, $generated_doc_code);

                $user = new User();
            }
            $user->name = $request->name;
            $user->phone = $request->phone;
            $user->email = $request->email;
            $user->gender = Helper::removeNull($request->gender);
            $user->role_id = $request->role_id;
            if($request->password !== '') {
                $user->password = Hash::make($request->password);
            }

            $user->pharmacy_id = Helper::getPharmacyID();
            $user->created_by = auth()->user()->id;
            $user->ip = UserAgentIp();
            $user->agent = UserAgentBrowser() . UserAgentOs();
            $user->save();

            $employee->salary = (double)Helper::removeNull($request->salary);
            $employee->joining_date = $request->joining_date;

            if ($request->hasfile('image')) {
                $file = $request->file('image');
                $photo = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
                $photo = 'public/uploads/employees/' . $photo;
                Storage::disk('s3')->put(CDN::$PATHS['ROOT'] . $photo, file_get_contents($file));
                $user->image = $photo;
            }

            $employee->nid = Helper::removeNull($request->nid);
            $employee->address = Helper::removeNull($request->address);
            $employee->user_id = $user->id;
            $employee->role_id = $request->role_id;
            $employee->status = $request->status;
            $employee->pharmacy_id = Helper::getPharmacyID();
            $employee->created_by = auth()->user()->id;
            $employee->ip = UserAgentIp();
            $employee->agent = UserAgentBrowser() . UserAgentOs();
            $employee->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Employee Save Successfully!',
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

        $employee = Helper::setPharmacyID('Employee')->find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Employee fetched Successfully!',
            "data" => $employee
        ];

    }

    public function updateStatusActive($id)
    {
        DB::beginTransaction();
        try {
            $employee = Helper::setPharmacyID('Employee')->find($id);
            $user = Helper::setPharmacyID('User')->where('id', $employee->user_id)->first();
            $user->status = "Active";
            $user->save();

            $employee->status = "Active";
            $employee->save();
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
            $employee = Helper::setPharmacyID('Employee')->find($id);

            $user = Helper::setPharmacyID('User')->where('id', $employee->user_id)->first();
            $user->status = "Banned";
            $user->save();
            $employee->status = "Banned";
            $employee->save();
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


    public function delete($id)
    {
        $employee = Helper::setPharmacyID('Employee')->find($id);
        $user = Helper::setPharmacyID('User')->where('id', $employee->user_id)->first();
        $user->delete();
        $employee->delete();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Data Delete Successfully!'
        ];
    }
}
