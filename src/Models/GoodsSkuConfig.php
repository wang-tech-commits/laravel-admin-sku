<?php

namespace Encore\GoodsSku\Models;

use App\Models\Model;
use Modules\Shop\Models\Goods;

class GoodsSkuConfig extends Model
{
    protected $table = 'shop_goods_sku_configs';

    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }
}
