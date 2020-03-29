<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ArticleSubsidiaryType;

class ArticleSubsidiaryTypeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getArticleSubTypes($parent_id)
    {
        $articleSubType = ArticleSubsidiaryType::where("tid", $parent_id)->get();

        return $this->createResponse($articleSubType);
    }

    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
