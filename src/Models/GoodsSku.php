<?php

namespace Encore\GoodsSku\Models;

use App\Models\Model;
use App\Traits\HasCovers;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Shop\Models\Goods;

class GoodsSku extends Model
{
    use HasCovers,
        SoftDeletes;

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

    /**
     * 商品是否可以购买
     * @return bool
     */
    public function canBuy($qty = 1): bool
    {
        return $this->goods->status == 1 && $this->stock > $qty;
    }
}
