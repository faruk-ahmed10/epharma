<?php

namespace App\Imports;

use App\Medicine;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;

class MedicineImport implements ToCollection
{
    public function collection(Collection $rows)
    {

        foreach ($rows as $index => $row)
        {



            DB::commit();
        }
    }
}
