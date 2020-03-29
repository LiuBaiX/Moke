<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Root
Route::get('/', function () {
    return view('welcome');
});
//User
Route::get('/user', 'UserController@getUsers');
Route::get('/user/{fuzzyName}', 'UserController@getUsersByFuzzyName');
Route::post('/user/login', 'UserController@login');
Route::post('/user/register', 'UserController@register');
Route::post('/user/{uid}/information', 'UserController@getUserInformationById');
Route::post('/user/{uid}/password/{newPassword}', 'UserController@updatePassword');
Route::post('/user/{uid}/status/{status}', 'UserController@editUserStatus');

//Message
Route::post('/message/receiver/{uid}', 'MessageController@getMessageByReceiver');
Route::post('/message/sender/{admin_id}', 'MessageController@getMessageBySender');
Route::post('/message/read/{message_id}', 'MessageController@setMessageBeenRead');
//Article
Route::get('/article/type', 'ArticleTypeController@getArticleTypes');
Route::get('/article/subtype/{parent_id}', 'ArticleSubsidiaryTypeController@getArticleSubTypes');
Route::post('/article/add', 'ArticleController@addArticle');
Route::post('/article/edit/{id}', 'ArticleController@editArticle');
Route::post('/article/public', 'ArticleController@getPublicArticles');
Route::get('/article/{id}', 'ArticleController@getDisplayArticleById');
Route::post('/article/delete/{id}', 'ArticleController@deleteArticleById');
Route::get('/article/not/display/{id}', 'ArticleController@getArticleById');
Route::post('/article/mine/{id}', 'ArticleController@getArticleByUser');
Route::get('/article/ban/all', 'ArticleController@getAllBanedPublicArticles');
Route::post('/article/accept/{id}', 'ArticleController@setArticleStatusAccept');
//Subsidiary
Route::get('/subsidiary/{id}', 'SubsidiaryController@getSubsidiaryByArticleId');
Route::get('/subsidiary/mine/{id}', 'SubsidiaryController@getSubsidiaryByUserId');
Route::post('/subsidiary/add/{article_id}/{uid}/{type_id}/{invitation_id}', 'SubsidiaryController@addSubsidiary');
Route::post('/subsidiary/delete/{subsidiary_id}', 'SubsidiaryController@deleteSubsidiary');
Route::get('/subsidiary/ban/all', 'SubsidiaryController@getAllBanedSubsidiary');
Route::post('/subsidiary/accept/{id}', 'SubsidiaryController@setSubsidiaryNormal');
//Invitation
Route::get('/invitation/receive/{id}', 'InvitationController@getInvitationsByReceiverId');
Route::get('/invitation/send/{id}', 'InvitationController@getInvitationsBySenderId');
Route::get('/invitation/send/delete/{id}', 'InvitationController@deleteSendedInvitations');
Route::get('/invitation/receive/{id}/status/{status}', 'InvitationController@updateReceivedInvitations');
Route::post('/invitation/send/{uid}/ref/{aid}', 'InvitationController@sendInvitation');
//Admin
Route::post('/admin/login', 'AdminController@login');
//Notification
Route::get('/notification/receiver/{uid}', 'MessageController@getMessageByReceiver');
Route::post('/notification/read/{id}', 'MessageController@setMessageBeenRead');
