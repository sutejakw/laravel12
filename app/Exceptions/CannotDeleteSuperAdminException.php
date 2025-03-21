<?php

namespace App\Exceptions;

use Exception;

class CannotDeleteSuperAdminException extends Exception
{
    protected $message = 'Superadmin role cannot be deleted.';
}
