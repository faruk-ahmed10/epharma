<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GeneralSetting;
use App\Models\Pharmacy;
use App\UAP\UAP;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use \Exception;

class AuthController extends Controller
{
    public function attempt(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        try {
            if (!$token = auth()->attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'error_code' => 'CREDENTIALS_ERROR',
                    'message' => 'Your email or password was incorrect!',
                    'token' => null,
                ]);

            }

            return response()->json([
                'success' => true,
                'error_code' => null,
                'message' => 'Authentication successful!',
                'token' => $token,
            ]);
        } catch (Exception $exception) {

            return response()->json([
                'success' => false,
                'error_code' => 'UNKNOWN_ERROR',
                'message' => 'Error occurred! !' . $exception->getMessage(),
            ]);

        }
    }

    public function logout(Request $request)
    {
        $token = $request->header('Authorization');

        try {
            if (JWTAuth::parseToken()->invalidate($token)) {
                return response()->json([
                    'success' => true,
                    'error_code' => null,
                    'message' => 'Logout successful!',
                ]);
            }
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'error_code' => 'UNKNOWN_ERROR',
                'message' => 'Failed to logout! ' . $exception->getMessage(),
            ]);
        }

        return response()->json([
            'success' => false,
            'error_code' => 'UNKNOWN_ERROR',
            'message' => 'Failed to logout!',
        ]);
    }

    public function authUser() {
        try {

            $authUser = auth()->user();
            $authUser->pharmacy = Pharmacy::where('id', '=', $authUser->pharmacy_id)->first();
            $authUser->general_settings = GeneralSetting::where('pharmacy_id', '=', $authUser->pharmacy_id)->first();
            $authUser->modules = UAP::getRolePermissions($authUser->role_id);

            return response()->json([
                'success' => true,
                'error_code' => null,
                'message' => 'Auth user fetched successfully!',
                'data' => $authUser,
            ]);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'error_code' => 'UNKNOWN_ERROR',
                'message' => 'Failed to get the auth user! ' . $exception->getMessage(),
            ]);
        }
    }
}
