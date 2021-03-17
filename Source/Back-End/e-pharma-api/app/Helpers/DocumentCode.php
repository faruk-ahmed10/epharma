<?php


namespace App\Helpers;


use App\Models\DocCodeIncrement;
use Exception;

class DocumentCode
{
    private static function __generateZeroes($Length)
    {
        $Length = intval($Length);
        $Zeroes = '';
        for ($i = 1; $i <= $Length; $i++) {
            $Zeroes .= '0';
        }
        return $Zeroes;
    }

    public static function GenerateNewCode($Prefix, $ZeroesLength, $LastIncrement = 0)
    {
        $NewIncrement = (int)$LastIncrement + 1;
        $N_I_LENGTH = strlen($NewIncrement);
        return $Prefix . '' . self::__generateZeroes((int)$ZeroesLength - (int)$N_I_LENGTH) . '' . $NewIncrement;
    }

    public static function UpdateCodeIncrement($module_code, $last_increment_code, $increment = 1)
    {
        try {
            $doc_code_increment_data = DocCodeIncrement::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->where('module_code', '=', $module_code);

            if ($doc_code_increment_data->exists()) {
                $increment = (int)$doc_code_increment_data->first()->last_increment + $increment;

                $doc_code_increment_data->update([
                    'last_increment' => $increment,
                    'last_increment_code' => $last_increment_code,
                ]);

                return true;
            }

            DocCodeIncrement::Insert([
                'pharmacy_id' => auth()->user()->pharmacy_id,
                'module_code' => $module_code,
                'last_increment' => $increment,
                'last_increment_code' => $last_increment_code,
            ]);

            return true;
        } catch (Exception $exception) {
            return false;
        }
    }

    public static function GetLastIncrement($module_code)
    {
        $last_increment = 0;
        $doc_code_increment_data = DocCodeIncrement::where('pharmacy_id', '=', auth()->user()->pharmacy_id)->where('module_code', '=', $module_code);
        if ($doc_code_increment_data->exists()) {
            $last_increment = (int)$doc_code_increment_data->first()->last_increment;
        }

        return $last_increment;
    }
}
