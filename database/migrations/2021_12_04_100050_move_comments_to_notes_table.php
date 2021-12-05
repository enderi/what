<?php

use App\Models\Comment;
use App\Models\ManagedNote;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Ramsey\Uuid\Uuid;

class MoveCommentsToNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('managed_notes', function (Blueprint $table) {
            $table->uuid('parent_uuid')->nullable();
        });
        $comments = Comment::get();
        $comments->each(function ($comment) {
            $note = new ManagedNote();
            $note->text = $comment->text;
            $note->uuid = Uuid::uuid4();
            $note->parent_uuid = $comment->comment_chain_uuid;
            $note->user_id = $comment->user_id;
            $note->resolved = $comment->resolved;
            $note->props = array();
            $note->save();
            //$comment->delete();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('managed_notes', function (Blueprint $table) {
            $table->dropColumn('parent_uuid');
        });
    }
}
