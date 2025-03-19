<?php

namespace App\Enums;

enum RolesEnum: string
{
    case SUPERADMIN = 'superadmin';
    case CASHIER = 'cashier';
    case SALES = 'sales';
    case OWNER = 'owner';

    // extra helper to allow for greater customization of displayed values, without disclosing the name/value data directly
    public function label(): string
    {
        return match ($this) {
            static::SUPERADMIN => 'Super Admin',
            static::CASHIER => 'Cashiers',
            static::SALES => 'Sales Marketing',
            static::OWNER => 'Owner',
        };
    }
}
