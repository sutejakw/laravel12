<?php

namespace App\Exceptions;

use Exception;

class ServiceException extends Exception
{
    public function __construct(string $message = null)
    {
        $defaultMessage = 'An error occurred in the service.';
        parent::__construct($message ?? $defaultMessage, 400);
    }
}
