<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagedNote extends Model
{
    use HasFactory;
    protected $casts = ['props' => 'array'];

    public function category() {
        return $this->belongsTo('App\Models\Category');
    }
    
    public function comments() {
        return $this->hasMany('App\Models\ManagedNote', 'parent_uuid', 'uuid');
    }
}
