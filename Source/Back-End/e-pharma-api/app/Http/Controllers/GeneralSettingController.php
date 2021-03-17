<?php

namespace App\Http\Controllers;

use App\Models\GeneralSetting;
use App\Models\Pharmacy;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GeneralSettingController extends Controller
{
    //
    public function generalSettings()
    {
        $pharmacy_id = auth()->user()->pharmacy_id;
        $generalSettings = GeneralSetting::where('pharmacy_id', $pharmacy_id)->with('pharmacy')->with('vat')->first();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'General settings fetched successfully!',
            'data' => $generalSettings

        ];

    }

    public function updateGeneralSettings(Request $request)
    {
        $data = json_decode($request->input('data'), true);
        try {

            $settingsData = [
                'phone' => $data['phone'],
                'email' => $data['email'],
                'city' => $data['city'],
                'state' => $data['state'],
                'address' => $data['address'],
                'vat_id' => $data['vat_id'],
            ];

            if ($request->hasfile('logo')) {
                $file = $request->file('logo');
                $photo = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
                $photo = 'public/uploads/logo/' . $photo;
                Storage::disk('s3')->put('epharma/' . $photo, file_get_contents($file));

                $settingsData['logo'] = $photo;
            }

            if ($request->hasfile('favIcon')) {
                $file = $request->file('favIcon');
                $photo = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
                $photo = 'public/uploads/favIcon/' . $photo;
                Storage::disk('s3')->put('epharma/' . $photo, file_get_contents($file));

                $settingsData['fav_icon'] = $photo;
            }

            GeneralSetting::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->update($settingsData);


            Pharmacy::where('id', '=', auth()->user()->pharmacy_id)->update([
                'pharmacy_name' => $data['pharmacy']['pharmacy_name'],
                'email' => $data['pharmacy']['email'],
            ]);


            return [
                'success' => true,
                'error_code' => null,
                'message' => 'Saved Successfully!',

            ];

        } catch (Exception $exception) {
            return [
                'success' => false,
                'error_code' => null,
                'message' => $exception->getMessage(),

            ];
        }
    }
}
