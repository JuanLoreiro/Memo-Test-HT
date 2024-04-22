<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MemoTestImage;

class MemoTestImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $memoTestIds_1 = \App\Models\MemoTest::find(1);
        $memoTestIds_2 = \App\Models\MemoTest::find(2);

        // Asigna imágenes a MemoTests existentes
        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_1->id,
            'image_url' => 'https://www.cinconoticias.com/wp-content/uploads/tradiciones-argentinas.jpg',
        ]);
        
        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_1->id,
            'image_url' => 'https://www.infobae.com/new-resizer/fpRP2jo0qfWqZQMcIUCKSlsZ5mU=/1200x1600/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/MXD2UAV6PBEHHF6XPQNUL3QQVY.jpg',
        ]);

        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_1->id,
            'image_url' => 'https://play-lh.googleusercontent.com/rX_nOuUDijsV_NnWZP9JgYTsFpxn5y7qCqDxFIpZ-BqiJu8un7UbdSgVTZSrJuzAlQ',
        ]);

        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_1->id,
            'image_url' => 'https://hablemosdeculturas.com/wp-content/uploads/2017/11/tradiciones-argentinas-1.jpg',
        ]);


        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_2->id,
            'image_url' => 'https://agroverdad.com.ar/wp-content/uploads/2021/05/locro-25demayo-campo-ingredientes-650x404.jpg',
        ]);
        
        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_2->id,
            'image_url' => 'https://www.welcomeargentina.com/blog/wp-content/uploads/2015/05/churros-2.jpg',
        ]);

        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_2->id,
            'image_url' => 'https://www.biodiversidadvirtual.org/etno/data/media/627/Bandera-argentina-Rosario-Argentina-39555.jpg',
        ]);

        MemoTestImage::create([
            'memo_test_id' => $memoTestIds_2->id,
            'image_url' => 'https://viajesdeunchapin.com/wp-content/uploads/2022/01/Alfajores.jpg',
        ]);
        
    }
}
