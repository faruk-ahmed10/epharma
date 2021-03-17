<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LeavePurpose;

class Leave extends Model
{
    use HasFactory;
    public function leavePurpose()
    {
        return $this->belongsTo(LeavePurpose::class,'leave_purpose_id','id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class,'employee_id','id');
    }
    public function pharmacy(){
        return $this->belongsTo(Pharmacy::class,'pharmacy_id','id');
    }
}
