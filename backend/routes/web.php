<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/jobs/'], function () use ($router) {
    $router->get('', 'JobController@index');
    $router->post('', 'JobController@create');
    $router->get('{id}', 'JobController@show');
    $router->put('{id}', 'JobController@update');
    $router->patch('{id}', 'JobController@update');
    $router->delete('{id}', 'JobController@delete');
});
