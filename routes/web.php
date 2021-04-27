<?php

use Encore\GoodsSku\Http\StorageController;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'sku',
], function (Router $router) {
    $router->post('storage', [StorageController::class, 'index'])->name('sku_storage');
});
