<?php

namespace App\Http\Controllers;


use App\Helpers\Helper;
use App\Models\RolePermission;
use App\Models\UserRole;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Exception;

class UserRoleController extends Controller
{
    public function index()
    {
        try {
            $permission = UAP::getModuleActionPermission(UAP::$MODULES['USER_ROLE']['Code'], UAP::$ACTIONS['MODULE_ACCESS']['Code']);

            if ($permission) {
                $user_Roles = UserRole::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->get();

                foreach ($user_Roles as $user_Role) {
                    $user_Role->modules = UAP::getRolePermissions($user_Role->id);
                }

                return [
                    'success' => true,
                    'error_code' => null,
                    'message' => 'User roles fetched successfully!',
                    'data' => $user_Roles
                ];
            }

            return [
                'success' => false,
                'error_code' => 'PERMISSION_DENIED',
                'message' => 'You have no permission to do this action!',
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => null,
                'message' => $exception->getMessage(),
            ];
        }
    }

    public function getAllUserRoles()
    {
        try {
            $user_Roles = UserRole::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->get();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'User roles fetched successfully!',
                'data' => $user_Roles
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => null,
                'message' => $exception->getMessage(),
            ];
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {

            if ((int)$request->input('id') > 0) {
                $user_role = UserRole::find($request->input('id'));
            } else {
                $user_role = new UserRole;
            }

            $user_role->name = $request->name;
            $user_role->pharmacy_id = Helper::getPharmacyID();
            $user_role->created_by = auth()->user()->id;
            $user_role->ip = UserAgentIp();
            $user_role->agent = UserAgentBrowser() . UserAgentOs();
            $user_role->save();

            DB::commit();
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Saved Successfully!',
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

    public function getUserRole($id)
    {
        try {
            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Saved Successfully!',
                'data' => Helper::setPharmacyID('UserRole')->find($id),
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

    public function delete(Request $request)
    {
        try {
            $role_id = $request->input('id');
            $user_role = Helper::setPharmacyID('UserRole')->find($role_id);
            $user_role->delete();
            RolePermission::where('role_id', '=', $role_id)->delete();

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Deleted Successfully!'
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => null,
                'message' => $exception->getMessage()
            ];
        }
    }

    public function saveRolePermissions(Request $request)
    {
        try {

            $role_id = $request->input('role_id');
            $modules = $request->input('modules');

            foreach ($modules as $module) {
                $actions = $module['Actions'];

                foreach ($actions as $action) {
                    $module_permission = RolePermission::where('role_id', '=', $role_id)->where('module_code', '=', $module['Code'])->where('action_code', '=', $action['Code']);

                    if ($module_permission->exists()) {
                        $module_permission->update(['permission' => $action['Permission']]);
                    } else {
                        RolePermission::Insert([
                            'role_id' => $role_id,
                            'module_code' => $module['Code'],
                            'action_code' => $action['Code'],
                            'permission' => $action['Permission'],
                        ]);
                    }
                }
            }

            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Saved Successfully!',
            ];
        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => null,
                'message' => $exception->getMessage()
            ];
        }
    }
}
