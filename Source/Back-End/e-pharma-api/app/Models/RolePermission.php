<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class RolePermission extends Model
{
    use HasFactory;

    protected $table   = 'role_permissions';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
