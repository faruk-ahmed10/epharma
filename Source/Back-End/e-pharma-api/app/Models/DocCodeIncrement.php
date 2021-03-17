<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocCodeIncrement extends Model
{
    use HasFactory;
    protected $table = 'doc_code_increments';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
