<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralSetting extends Model
{
    use HasFactory;

    public function pharmacy(){
        return $this->belongsTo(Pharmacy::class);
    }

    public function vat(){
        return $this->belongsTo(Tax::class);
    }
}
