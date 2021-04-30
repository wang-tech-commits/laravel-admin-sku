<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopGoodsSkuValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_goods_sku_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goods_id');
            $table->foreignId('goods_sku_key_id');
            $table->string('name');
            $table->string('cover')->nullable();
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
        Schema::dropIfExists('shop_goods_sku_values');
    }
}
