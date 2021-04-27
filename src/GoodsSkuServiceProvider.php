<?php

namespace Encore\GoodsSku;

use Encore\Admin\Admin;
use Encore\Admin\Form;
use Illuminate\Support\ServiceProvider;

class GoodsSkuServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function boot(GoodsSku $extension)
    {
        if (! GoodsSku::boot()) {
            return ;
        }

        if ($views = $extension->views()) {
            $this->loadViewsFrom($views, 'goods_sku');
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [$assets => public_path('vendor/laravel-admin-ext/goods_sku')],
                'goods_sku'
            );
        }
        if ($migrations = $extension->migrations()) {
            $this->loadMigrationsFrom($migrations);
        }

        Admin::booting(function () {
            Form::extend('sku', GoodsSkuField::class);
        });

        $this->app->booted(function () {
            GoodsSku::routes(__DIR__ . '/../routes/web.php');
        });
    }
}
