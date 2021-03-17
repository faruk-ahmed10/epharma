<?php

namespace App\UAP;

use App\Models\RolePermission;

class UAP
{
    public static $ACTIONS = [
        'MODULE_ACCESS' => [
            'label' => 'Module Access (Access the module)',
            'Code' => 'MODULE_ACCESS',
        ],
        'ADD' => [
            'label' => 'Add (Make Entry)',
            'Code' => 'ADD',
        ],
        'EDIT' => [
            'label' => 'Edit (Edit Entry)',
            'Code' => 'EDIT',
        ],
        'DELETE' => [
            'label' => 'Delete (Delete Entry)',
            'Code' => 'DELETE',
        ],
        'VIEW' => [
            'label' => 'View (View Entry)',
            'Code' => 'VIEW',
        ],
        'PRINT' => [
            'label' => 'Print (Print Entry)',
            'Code' => 'PRINT',
        ],
    ];

    public static $MODULES = [
        'PHARMACY' => [
            'label' => 'Pharmacy',
            'Code' => 'PHARMACY',
            'DocCodePrefix' => '',
        ],

        'MEDICINE' => [
            'label' => 'Medicine',
            'Code' => 'MEDICINE',
            'DocCodePrefix' => 'MED',
        ],

        'MEDICINE_CATEGORY' => [
            'label' => 'Medicine Category',
            'Code' => 'MEDICINE_CATEGORY',
            'DocCodePrefix' => '',
        ],

        'MEDICINE_BRAND' => [
            'label' => 'Medicine Brand',
            'Code' => 'MEDICINE_BRAND',
            'DocCodePrefix' => '',
        ],

        'MEDICINE_UNIT' => [
            'label' => 'Medicine Unit',
            'Code' => 'MEDICINE_UNIT',
            'DocCodePrefix' => '',
        ],

        'MEDICINE_IMPORT' => [
            'label' => 'Medicine Import',
            'Code' => 'MEDICINE_IMPORT',
            'DocCodePrefix' => '',
        ],

        'MANUFACTURER' => [
            'label' => 'Manufacturer',
            'Code' => 'MANUFACTURER',
            'DocCodePrefix' => '',
        ],

        'ACCOUNT_CATEGORY' => [
            'label' => 'Account Category',
            'Code' => 'ACCOUNT_CATEGORY',
            'DocCodePrefix' => '',
        ],

        'ACCOUNT_HEAD' => [
            'label' => 'Account Head',
            'Code' => 'ACCOUNT_HEAD',
            'DocCodePrefix' => '',
        ],

        'INCOME' => [
            'label' => 'Income',
            'Code' => 'INCOME',
            'DocCodePrefix' => 'INC',
        ],

        'EXPENSE' => [
            'label' => 'Expense',
            'Code' => 'EXPENSE',
            'DocCodePrefix' => 'EXP',
        ],

        'EMPLOYEE' => [
            'label' => 'Employee',
            'Code' => 'EMPLOYEE',
            'DocCodePrefix' => 'EMP',
        ],

        'EMPLOYEE_ATTENDANCE' => [
            'label' => 'Employee Attendance',
            'Code' => 'EMPLOYEE_ATTENDANCE',
            'DocCodePrefix' => '',
        ],

        'USER_ROLE' => [
            'label' => 'User Role',
            'Code' => 'USER_ROLE',
            'DocCodePrefix' => '',
        ],

        'SUPPLIER' => [
            'label' => 'Supplier',
            'Code' => 'SUPPLIER',
            'DocCodePrefix' => 'SUP',
        ],

        'CUSTOMER' => [
            'label' => 'Customer',
            'Code' => 'CUSTOMER',
            'DocCodePrefix' => 'CUS',
        ],

        'PAYROLL' => [
            'label' => 'Payroll',
            'Code' => 'PAYROLL',
            'DocCodePrefix' => '',
        ],

        'LEAVE' => [
            'label' => 'Leave',
            'Code' => 'LEAVE',
            'DocCodePrefix' => '',
        ],

        'LEAVE_PURPOSE' => [
            'label' => 'Leave Purpose',
            'Code' => 'LEAVE_PURPOSE',
            'DocCodePrefix' => '',
        ],

        'SUPPLIER_INVOICE' => [
            'label' => 'Supplier Invoice',
            'Code' => 'SUPPLIER_INVOICE',
            'DocCodePrefix' => 'SI',
        ],

        'CUSTOMER_INVOICE' => [
            'label' => 'Customer Invoice',
            'Code' => 'CUSTOMER_INVOICE',
            'DocCodePrefix' => 'CI',
        ],

        'SUPPLIER_PAYMENT' => [
            'label' => 'Supplier Payment',
            'Code' => 'SUPPLIER_PAYMENT',
            'DocCodePrefix' => 'SP',
        ],

        'CUSTOMER_PAYMENT' => [
            'label' => 'Customer Payment',
            'Code' => 'CUSTOMER_PAYMENT',
            'DocCodePrefix' => 'CP',
        ],

        'SETTINGS' => [
            'label' => 'Settings',
            'Code' => 'SETTINGS',
            'DocCodePrefix' => '',
        ],
        'GENERAL_SETTINGS' => [
            'label' => 'General Settings',
            'Code' => 'GENERAL_SETTINGS',
            'DocCodePrefix' => '',
        ],
        'TAX' => [
            'label' => 'Tax List',
            'Code' => 'TAX',
            'DocCodePrefix' => 'TAX',
        ],
        'CURRENCY' => [
            'label' => 'Currency List',
            'Code' => 'CURRENCY',
            'DocCodePrefix' => 'CUR',
        ],
        'PURCHASE_ORDER' => [
            'label' => 'Purchase Order',
            'Code' => 'PURCHASE_ORDER',
            'DocCodePrefix' => 'PUR',
        ],
    ];


    public static function getRolePermissions($role_id)
    {
        $MODULES = [];

        foreach (self::$MODULES as $MODULE) {
            $MODULES[$MODULE['Code']] = $MODULE;

            $MODULES[$MODULE['Code']]['Actions'] = [];

            foreach (self::$ACTIONS as $ACTION) {
                $ACTION['Permission'] = self::getModuleActionPermission($MODULE['Code'], $ACTION['Code'], $role_id);
                $MODULES[$MODULE['Code']]['Actions'][$ACTION['Code']] = $ACTION;
            }
        }

        return $MODULES;
    }

    public static function getModuleActionPermission($module_code, $action_code, $role_id = null)
    {
        if ($role_id === null) {
            $role_id = (int) auth()->user()->role_id;
        }

        /**
         * Check if this is the master admin of the pharmacy
         * If auth users role id is 0 then he is the master admin
         * And for the master admin we skip checking the role permissions
         * @Note: Must check if the role id was inserted by any mistake from user entry module
         */
        if ($role_id === 0) {
            return true;
        }

        if($action_code !== self::$ACTIONS['MODULE_ACCESS']) {
            $__module_access_permission = RolePermission::where('role_id', '=', $role_id)->where('module_code', '=', $module_code)->where('action_code', '=', self::$ACTIONS['MODULE_ACCESS']['Code']);

            if (!$__module_access_permission->exists() || (int)$__module_access_permission->first()->permission === 0) {
                return false;
            }
        }


        $__permission = RolePermission::where('role_id', '=', $role_id)->where('module_code', '=', $module_code)->where('action_code', '=', $action_code);
        if ($__permission->exists()) {
            return (int)$__permission->first()->permission === 1;
        }

        return false;
    }
}
