<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subsidiary;
use App\Invitation;
use Illuminate\Support\Facades\Storage;

class SubsidiaryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getSubsidiaryByArticleId($id)
    {
        $subsidiary = Subsidiary::where([
            ["article_id", $id],
            ["subsidiaries.status", 1]
        ])
            ->join("users", "subsidiaries.author", "=", "users.uid")
            ->get();

        return $this->createResponse($subsidiary);
    }

    public function getAllBanedSubsidiary()
    {
        $subsidiary = Subsidiary::select("subsidiaries.*","users.name")
            ->where("subsidiaries.status", 0)
            ->join("users", "subsidiaries.author", "=", "users.uid")
            ->get();

        return $this->createResponse($subsidiary);
    }

    public function setSubsidiaryNormal($id, Request $request)
    {
        $admin_id = $request->input("admin_id");

        $subsidiary = Subsidiary::where("subsidiary_id", $id)->first();
        $subsidiary->status = 1;
        $subsidiary->save();

        $messageController = new MessageController();
        $messageController->sendMessage(
            $admin_id,
            $subsidiary->author,
            "衍生作品审批通知",
            "管理员审批通过了您的作品，请前往 我的作品 查看详情。"
        );

        return $this->createResponse($subsidiary);
    }

    public function addSubsidiary($article_id, $uid, $type, $invitation_id, Request $request)
    {
        $file = $request->file("file");
        $src = $request->input("src");
        $content = $request->input("content");

        $subsidiary = new Subsidiary;
        $subsidiary->article_id = $article_id;
        $subsidiary->author = $uid;
        $subsidiary->type = $type;
        $subsidiary->title = $request->input("title");

        switch ($type) {
            case 1:
                $subsidiary->src = $file
                    ? Storage::url(Storage::putFile("/images", $file))
                    : $src;
                break;
            case 2:
            case 3:
                $subsidiary->src = $file
                    ? Storage::url(Storage::putFile("/audios", $file))
                    : $src;
                break;
            case 4:
                $subsidiary->content = $content;
                break;
            case 5:
                $subsidiary->src = $file
                    ? Storage::url(Storage::putFile("/videos", $file))
                    : $src;
                break;
            default:
                break;
        }

        $subsidiary->save();

        $invitationController = new InvitationController();
        $invitationController->updateReceivedInvitations($invitation_id, 3);

        return $this->createResponse([
            "status" => "200",
            "message" => "保存成功！",
            "id" => $subsidiary->subsidiary_id
        ]);
    }

    public function deleteSubsidiary($subsidiary_id, $invitation_id)
    {
        Subsidiary::where("subsidiary_id", $subsidiary_id)->delete();

        $invitation = Invitation::where("invitation_id", $invitation_id)->get();
        if ($invitation) {
            $invitation->status = "2";
            $invitation->save();
        }

        return $this->createResponse([
            "status" => "200",
            "message" => "删除成功",
        ]);
    }

    public function getSubsidiaryByUserId($id)
    {
        $subsidiaries = Subsidiary::where("author", $id)->get();

        return $this->createResponse($subsidiaries);
    }

    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
