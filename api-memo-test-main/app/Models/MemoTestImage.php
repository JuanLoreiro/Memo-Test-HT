<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemoTestImage extends Model
{
    use HasFactory;

    protected $fillable = ['memo_test_id', 'image_url'];

    public function memoTest()
    {
        return $this->belongsTo(MemoTest::class);
    }
}
