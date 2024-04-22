<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemoTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memo_tests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('memo_test_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('memo_test_id');
            $table->string('image_url');
            $table->timestamps();

            $table->foreign('memo_test_id')->references('id')->on('memo_tests')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('memo_test_images');
        Schema::dropIfExists('memo_tests');
    }
}
