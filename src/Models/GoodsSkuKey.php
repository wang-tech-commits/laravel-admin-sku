<?php

namespace Encore\GoodsSku\Models;

use App\Models\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Shop\Models\Goods;

class GoodsSkuKey extends Model
{
    protected $table = 'shop_goods_sku_keys';

    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }

    public function values(): HasMany
    {
        return $this->hasMany(GoodsSkuValue::class, 'goods_sku_key_id');
    }
}
