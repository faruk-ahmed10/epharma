<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    //

    public function allTransactions(){
        $transactions = Payment::all();
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Date Get Successfully!',
            'data'=>$transactions
        ];
    }

    public function Details($id){
        $transaction = Payment::find($id);
        return [
            'success' => true,
            'error_code' => null,
            'message' => 'Date Get Successfully!',
            'data'=>$transaction
        ];
    }
}
