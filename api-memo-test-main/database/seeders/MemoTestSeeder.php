<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MemoTest;
class MemoTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        MemoTest::create(['name' => 'Test 1']);
        MemoTest::create(['name' => 'Test 2']);
    }
}
