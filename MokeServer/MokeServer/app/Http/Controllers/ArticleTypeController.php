<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ArticleType;

class ArticleTypeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getArticleTypes()
    {
        return $this->createResponse(
            ArticleType::all()
        );
    }

    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
