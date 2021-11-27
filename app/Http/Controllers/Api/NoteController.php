<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request) {
        return [
            'notes' => $request->user()
                ->notes()
                ->with(['category', 'comments'])
                ->where('resolved', false)
                ->orderBy('created_at', 'desc')
                ->orderBy('created_at', 'desc')
                ->get(),
            'categories' => $request->user()->categories
        ];
    }
}
