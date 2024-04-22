<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas para manejar las cartas del juego
Route::get('/cards', 'CardController@index');
Route::get('/cards/{id}', 'CardController@show');
Route::post('/cards', 'CardController@store');
Route::put('/cards/{id}', 'CardController@update');
Route::delete('/cards/{id}', 'CardController@destroy');

// Rutas para manejar las puntuaciones del juego
Route::get('/scores', 'ScoreController@index');
Route::post('/scores', 'ScoreController@store');
Route::get('/scores/{id}', 'ScoreController@show');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
