<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class AccountHead extends Model
{
    use HasFactory;
    protected $table = 'account_heads';
    protected $filable = ['account_category_id','name','type'];

    public function accountCategory(){
        return $this->belongsTo(AccountCategory::class, 'account_category_id');
    }
}
