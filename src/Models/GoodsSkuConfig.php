<?php

namespace Encore\GoodsSku\Models;

use App\Models\Model;
use Modules\Shop\Models\Goods;

class GoodsSkuConfig extends Model
{
    protected $table = 'shop_goods_sku_configs';

    protected $casts = [
        'sku_config' => 'json',
        'sku_attr_config' => 'json',
    ];

    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }
}
