<?php

namespace Encore\GoodsSku;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    protected $moduleNamespace = 'Encore\GoodsSku\Http';

    public function boot()
    {
        parent::boot();
    }

    public function map()
    {
        $this->mapAdminRoutes();
    }

    protected function mapAdminRoutes()
    {
        Route::prefix(config('admin.route.prefix'))
            ->middleware(config('admin.route.middleware'))
            ->as(config('admin.route.as'))
            ->namespace($this->moduleNamespace)
            ->group(__DIR__ . '/../routes/web.php');

    }
}
