<?php

namespace App\Services\Log\Impl;

use App\Services\Log\ILogService;
use Illuminate\Support\Facades\Log;

class LogServiceImpl implements ILogService
{
    /**
     * Log an error message with additional context.
     *
     * @param string $contextName
     * @param \Exception $exception
     * @param array $extraContext
     */
    public function logError(string $contextName, \Exception $exception, array $extraContext = []): void
    {
        Log::error("Error in {$contextName}", array_merge([
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'user' => auth()->user()
                ? auth()->user()->id . ' - ' . auth()->user()->name
                : '',
        ], $extraContext));
    }
}
