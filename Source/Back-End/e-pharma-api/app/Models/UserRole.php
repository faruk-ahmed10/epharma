<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserRole extends Model
{
    use HasFactory;

    protected $table   = 'user_roles';
    protected $filable =  ['name'];
}
