<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request) {
        return $request->user()->categories()->withCount('notes')->get();
    }

    public function update($id, Request $request) {
        $cat = Category::find($id);
        
        if ($cat->user_id != $request->user()->id) {
            abort(403);
        }

        $all = $request->all();
        $cat->props = $all['props'];
        $cat->name = $all['name'];
        $cat->save();
        return $cat;
    }
}
