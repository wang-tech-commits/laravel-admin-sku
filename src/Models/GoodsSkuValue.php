<?php

namespace Encore\GoodsSku\Models;

use App\Models\Model;
use App\Traits\HasCovers;
use Modules\Shop\Models\Goods;

class GoodsSkuValue extends Model
{
    use HasCovers;

    protected $table = 'shop_goods_sku_values';

    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }

    public function skuKey()
    {
        return $this->belongsTo(GoodsSkuKey::class, 'goods_sku_key_id');
    }
}
