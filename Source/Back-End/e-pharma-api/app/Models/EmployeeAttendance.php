<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeAttendance extends Model
{
    use HasFactory;
    protected $table = 'employee_attendances';
    protected $filable = ['date','employee_id','in_time','out_time','note'];

    public function employee(){
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
