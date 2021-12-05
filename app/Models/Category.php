<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'tag', 'user_id', 'props'];

    protected $casts = ['props' => 'array'];

    public function notes() {
        return $this->hasMany(ManagedNote::class);
    }

}
