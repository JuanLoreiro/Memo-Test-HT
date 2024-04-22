<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
    use HasFactory;

    protected $fillable = ['memo_test_id', 'retries', 'number_of_pairs', 'state','score','user_selections'];

    public function memoTest()
    {
        return $this->belongsTo(MemoTest::class);
    }
}
