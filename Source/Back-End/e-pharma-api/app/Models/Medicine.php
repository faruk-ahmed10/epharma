<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Medicine extends Model
{
    use HasFactory;

    public function setSlugAttribute($name)
    {
        $this->attributes['slug'] = Str::slug($name);
    }

//    public function setExpireDateAttribute($value)
//    {
//        if($value){
//            $this->attributes['expire_date'] = \Carbon\Carbon::parse($value)->format('Y-m-d');
//        }
//    }


    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function unit()
    {
        return $this->hasOne(Unit::class, 'id', 'unit_id',);
    }

    public function Manufacturer()
    {
        return $this->hasOne(Manufacturer::class, 'id', 'manufacturer_id');
    }

    public function vat()
    {
        return $this->hasOne(Tax::class, 'id', 'vat_id');
    }

    public function brand()
    {
        return $this->hasOne(Brand::class, 'id', 'brand_id');
    }
}
