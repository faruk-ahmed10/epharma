<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Supplier extends Model
{
    use HasFactory;

    public function getCreatedAtAttribute($value)
    {
        return (new Carbon($value))->format('d-m-Y');
    }

    public function manufacturer()
    {
        return $this->hasOne(Manufacturer::class, "id", "company_id");
    }
}
