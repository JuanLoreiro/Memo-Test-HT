<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemoTest extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function images()
    {
        return $this->hasMany(MemoTestImage::class);
    }

    public function sessions()
    {
        return $this->hasMany(GameSession::class);
    }

    public function scoreMax()
    {

        return $this->hasOne(GameSession::class)->orderByDesc('score');

    }
}
