<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopGoodsSkusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_goods_skus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goods_id');
            $table->foreignId('goods_sku_config_id');
            $table->json('sku');
            $table->decimal('market_price', '20', '2');
            $table->decimal('price', '20', '2');
            $table->integer('stock')->unsigned();
            $table->string('cover')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teachers');
    }
}
