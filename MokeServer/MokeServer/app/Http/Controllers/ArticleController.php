<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Article;
use App\Invitation;
use App\Subsidiary;

class ArticleController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    private $limit = 5;

    public function addArticle(Request $request)
    {
        $uid = $request->input("uid");
        $tid = $request->input("tid");
        $subType = $request->input("subTid");
        $isPublic = $request->input("isPublic");
        $name = $request->input("name");
        $description = $request->input("description");
        $content = $request->input("content");

        $article = new Article;
        $article->author = $uid;
        $article->title = $name;
        $article->type = $tid;
        $article->sub_type = $subType;
        $article->description = $description;
        $article->content = $content;
        $article->isPublic = $isPublic;

        $article->save();

        return $this->createResponse(["aid" => $article->article_id]);
    }

    public function editArticle($id, Request $request)
    {
        $tid = $request->input("tid");
        $subType = $request->input("subTid") === -1 ? null : $request->input("subTid");
        $isPublic = $request->input("isPublic");
        $name = $request->input("name");
        $description = $request->input("description");
        $content = $request->input("content");

        $article = Article::where("article_id", $id)->first();
        $article->title = $name;
        $article->type = $tid;
        $article->sub_type = $subType;
        $article->description = $description;
        $article->content = $content;
        $article->isPublic = $isPublic;

        $article->save();

        return $this->createResponse(["aid" => $article->article_id]);
    }

    public function getPublicArticles()
    {
        $articles = DB::table('articles')
            ->where([
                ["article_status", 1],
                ["isPublic", 1]
            ])
            ->join("users", "articles.author", "=", "users.uid")
            ->join("article_types", "articles.type", "=", "article_types.tid")
            ->join("article_subsidiary_types", "articles.sub_type", "=", "article_subsidiary_types.subsidiary_tid")
            ->paginate();

        return $this->createResponse($articles);
    }

    public function getAllBanedPublicArticles()
    {
        $articles = DB::table('articles')
            ->where([
                ["article_status", 0],
                ["isPublic", 1]
            ])
            ->join("users", "articles.author", "=", "users.uid")
            ->join("article_types", "articles.type", "=", "article_types.tid")
            ->join("article_subsidiary_types", "articles.sub_type", "=", "article_subsidiary_types.subsidiary_tid")
            ->get();

        return $this->createResponse($articles);
    }

    public function setArticleStatusAccept($id, Request $request)
    {
        $admin_id = $request->input("admin_id");

        $article = Article::where("article_id", $id)->first();
        $article->article_status = 1;
        $article->save();

        $messageController = new MessageController();
        $messageController->sendMessage(
            $admin_id,
            $article->author,
            "文章审批通知",
            "管理员审批通过了您的作品，请前往 我的作品 查看详情。"
        );

        return $this->createResponse($article);
    }

    public function getDisplayArticleById($id)
    {
        $article = Article::where("article_id", $id)
            ->select("articles.*","users.name","article_types.type_name","article_subsidiary_types.display_name")
            ->join("users", "articles.author", "=", "users.uid")
            ->join("article_types", "articles.type", "=", "article_types.tid")
            ->join("article_subsidiary_types", "articles.sub_type", "=", "article_subsidiary_types.subsidiary_tid")
            ->first();

        return $this->createResponse($article);
    }

    public function getArticleById($id)
    {
        $article = Article::where("article_id", $id)->first();

        return $this->createResponse($article);
    }

    public function getArticleByUser($id)
    {
        $articles = Article::where("author", $id)
            ->join("users", "articles.author", "=", "users.uid")
            ->join("article_types", "articles.type", "=", "article_types.tid")
            ->join("article_subsidiary_types", "articles.sub_type", "=", "article_subsidiary_types.subsidiary_tid")
            ->paginate($this->limit);

        return $this->createResponse($articles);
    }

    public function deleteArticleById($id)
    {
        Article::where("article_id", $id)->delete();
        Invitation::where("article_id", $id)->delete();
        Subsidiary::where("article_id", $id)->delete();

        return $this->createResponse(["status" => "200", "message" => "删除成功！"]);
    }

    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
