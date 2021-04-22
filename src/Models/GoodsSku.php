<?php

namespace Encore\GoodsSku\Models;

use App\Models\Model;
use App\Traits\HasCovers;
use Modules\Shop\Models\Goods;

class GoodsSku extends Model
{
    use HasCovers;

    protected $table = 'shop_goods_skus';

    protected $casts = [
        'sku' => 'json',
    ];

    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }

    public function config()
    {
        return $this->belongsTo(GoodsSkuConfig::class, 'goods_sku_config_id');
    }
}
