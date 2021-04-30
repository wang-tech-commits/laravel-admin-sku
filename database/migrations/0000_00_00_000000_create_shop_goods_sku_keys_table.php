<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopGoodsSkuKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_goods_sku_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goods_id');
            $table->foreignId('goods_sku_config_id');
            $table->string('name');
            $table->boolean('is_image');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_goods_sku_keys');
    }
}
