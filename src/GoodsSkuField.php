<?php

namespace Encore\GoodsSku;

use Encore\Admin\Form\Field;

class GoodsSkuField extends Field
{
    protected static $js = [
        'vendor/laravel-admin-ext/goods_sku/sku.js'
    ];
    protected static $css = [
        'vendor/laravel-admin-ext/goods_sku/sku.css'
    ];
    public $name = 'goods-sku';
    protected $view = 'goods_sku::sku_field';

    public function render()
    {
        $uploadUrl = route('sku_storage');
        $this->script = <<< EOF
console.log('{$uploadUrl}');
window.Sku = new GoodsSKU('{$uploadUrl}');
EOF;
        return parent::render();
    }
}
