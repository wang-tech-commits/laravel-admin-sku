<?php

namespace Encore\GoodsSku;

use Encore\Admin\Extension;

class GoodsSku extends Extension
{
    public $name = 'goods_sku';

    public $views = __DIR__.'/../resources/views';

    public $assets = __DIR__.'/../resources/assets';

    public $migrations = __DIR__ . '/../database/migrations';
}
