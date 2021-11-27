<?php

use App\Models\ManagedNote;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Ramsey\Uuid\Uuid;

class AddUuidColumnToTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('managed_notes', function (Blueprint $table) {
            $table->uuid('uuid');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->uuid('comment_chain_uuid');
        });
        $notes = ManagedNote::with('comments')->get();
        try{
            DB::beginTransaction();
            foreach($notes as $note){
                $uuid = Uuid::uuid4();
                 $note->uuid = $uuid;
                 foreach($note->comments as $comment) {
                     $comment->comment_chain_uuid = $uuid;
                     $comment->save();
                 }
                 $note->save();
            }
            DB::commit();
        }catch(Exception $e) {
            DB::rollBack();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('managed_notes', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn('comment_chain_uuid');
        });
    }
}
