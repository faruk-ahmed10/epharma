<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Customer extends Model
{
    use HasFactory;
    public function getCreatedAtAttribute($value)
    {
        return (new Carbon($value))->format('d-m-Y');
    }


//    public function getUpdatedAtAttribute($value)
//    {
//        return Carbon::createFromFormat('Y-m-d H:i:s', $value)->format('Y-m-d');
//    }
}
