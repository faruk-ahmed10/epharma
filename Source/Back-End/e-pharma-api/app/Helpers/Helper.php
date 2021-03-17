<?php

namespace App\Helpers;

class Helper
{
    public static function getPharmacyID()
    {
        return auth()->user()->pharmacy_id;
    }


    public static function setPharmacyID($table)
    {
        $table = "App\\Models\\" . $table;
        return $table::where('pharmacy_id', auth()->user()->pharmacy_id);
    }

    public static function removeNull($string)
    {
        if($string === 'null') {
            return '';
        }

        return $string;
    }
}
