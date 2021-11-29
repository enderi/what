<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;
use App\Http\Controllers\Api\ManagedNoteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [Api\AuthController::class, 'login']);
Route::post('register', [Api\RegisterController::class, 'register']);
Route::post('forgot', [Api\ForgotController::class, 'forgot']);
Route::post('reset', [Api\ForgotController::class, 'reset']);
Route::get('email/resend/{user}', [Api\VerifyController::class, 'resend'])->name('verification.resend');
Route::get('email/verify/{id}', [Api\VerifyController::class, 'verify'])->name('verification.verify');; // Make sure to keep this as your route name
    
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('user', [Api\AuthController::class, 'user']);
    Route::get('info', [Api\NoteController::class, 'index']);
    Route::get('notes', [Api\ManagedNoteController::class, 'index']);
    Route::post('notes', [Api\ManagedNoteController::class, 'create']);
    Route::post('notes/{id}/keep', [Api\ManagedNoteController::class, 'keep']);
    Route::delete('notes/{id}', [Api\ManagedNoteController::class, 'delete']);
    Route::get('notes/{id}', [Api\ManagedNoteController::class, 'find']);
    Route::get('notes/{id}/comments', [Api\ManagedNoteController::class, 'getComments']);
    Route::put('notes/{id}', [Api\ManagedNoteController::class, 'update']);
    Route::post('notes/{id}/comment', [Api\ManagedNoteController::class, 'addComment']);
    Route::get('categories', [Api\CategoryController::class, 'index']);
    Route::put('categories/{id}', [Api\CategoryController::class, 'update']);
    Route::post('comments/{id}/resolve', [Api\ManagedNoteController::class, 'resolveComment']);
});
