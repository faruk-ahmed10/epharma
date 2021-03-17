<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $table   = 'categories';
    protected $filable =  ['name','slug'];

    public function setSlugAttribute($name){
        $this->attributes['slug'] = Str::slug($name);
    }


}
