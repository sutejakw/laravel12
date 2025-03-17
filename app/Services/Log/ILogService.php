<?php

namespace App\Services\Log;

interface ILogService
{
    /**
     * Log an error message with additional context.
     *
     * @param string $contextName
     * @param \Exception $exception
     * @param array $extraContext
     */
    public function logError(string $contextName, \Exception $exception, array $extraContext = []): void;
}
