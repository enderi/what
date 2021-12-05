<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\ManagedNote;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class ManagedNoteController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->notes()->where('resolved', false)->orderBy('created_at', 'desc')->get();
    }

    public function find($id, Request $request) {
        $managedNote = ManagedNote::with(['category', 'comments'])->find($id);
        if ($managedNote->user_id != $request->user()->id) {
            abort(403);
        }
        return [
            'note' => $managedNote,
            'categories' => $request->user()->categories
        ];
    }

    public function getComments($id, Request $request) {
        $managedNote = ManagedNote::with(['comments'])->find($id);
        if ($managedNote->user_id != $request->user()->id) {
            abort(403);
        }
        return $managedNote->comments;
    }

    public function update($id, Request $request) {
        $managedNote = ManagedNote::find($id);

        if ($managedNote->user_id != $request->user()->id) {
            abort(403);
        }

        $text = $request->get('text');
        if($text != null) {
            $managedNote->text = $text;
        }
        $category_id = $request->get('category_id');
        if($category_id == null){
            $managedNote->category_id = null;
        } else {
            $managedNote->category_id = $category_id;
        }
        $managedNote->save();
        return $managedNote;
    }

    public function create(Request $request)
    {
        $user = $request->user();

        $category = $request->get('category');

        $note = new ManagedNote();
        $note->text = $request->get('text');
        $note->props = '{}';
        $note->uuid = Uuid::uuid4();
        if ($category != null && strlen($category) > 0) {
            $existingCategory = $user->categories()->firstWhere('tag', strtolower($category));
            if ($existingCategory == null) {
                $existingCategory = $user->categories()->create([
                    'name' => ucwords(strtolower($category)),
                    'tag' => strtolower($category),
                    'props' => ['todo' => false]
                ]);
            } else {
                $props = $existingCategory->props;
                
                if(key_exists('addToLatest', $props) && $props['addToLatest'] == true) {
                    $lastInCategory = ManagedNote::where('user_id', $user->id)
                    ->where('category_id', $existingCategory->id)
                    ->orderByDesc('created_at')
                    ->first();
                    if($lastInCategory != null) {
                        $note->parent_uuid = $lastInCategory->uuid;
                    }
                }
            }
            $note->category_id = $existingCategory->id;
        }
        $user->notes()->save($note);
        return $note;
    }

    public function addComment($id, Request $request) {
        $managedNote = ManagedNote::find($id);
        if ($managedNote->user_id != $request->user()->id) {
            abort(403);
        }
        $comment = new ManagedNote();
        $comment->text = $request->get('comment');
        $comment->user_id = $request->user()->id;
        $comment->parent_uuid = $managedNote->uuid;
        $comment->props = array();
        $comment->uuid = Uuid::uuid4();
        $comment->save();
        return $comment;
    }

    public function keep($id, Request $request)
    {
        $managedNote = ManagedNote::find($id);
        if ($managedNote->user_id != $request->user()->id) {
            abort(403);
        }
        $managedNote->type = 'ALIVE';
        $managedNote->save();
    }

    public function delete($id, Request $request) {
        $managedNote = ManagedNote::find($id);
        if ($managedNote->user_id != $request->user()->id) {
            abort(403);
        }
        $managedNote->resolved = true;
        $managedNote->save();
    }

    public function resolveComment($id, Request $request) {
        $comment = ManagedNote::find($id);
        if($comment->user_id != $request->user()->id) {
            abort(403);
        }
        $comment->resolved = true;
        $comment->save();
    }
}
