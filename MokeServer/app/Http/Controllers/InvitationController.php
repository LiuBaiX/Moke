<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Invitation;
use App\User;
use Illuminate\Support\Facades\DB;

class InvitationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getInvitationsByReceiverId($id)
    {

        $invitations = Invitation::where("receiver", $id)
            ->orderBy('invitations.create_date', 'desc')
            ->get();

        return $this->createResponse($invitations);
    }

    public function getInvitationsBySenderId($id)
    {

        $invitations = Invitation::where("sender", $id)
            ->join("users", "invitations.receiver", "=", "users.uid")
            ->select("invitations.*", "users.name")
            ->orderBy('invitations.create_date', 'desc')
            ->get();

        foreach ($invitations as $invitation) {
            $invitation->receiver = $invitation->name;
        }

        return $this->createResponse($invitations);
    }

    public function updateReceivedInvitations($id, $status)
    {
        $invitation = Invitation::where("invitation_id", $id)->first();
        $invitation->status = $status;
        $invitation->save();

        $user = User::where("uid", $invitation->receiver)->first();

        $statusDisplayText = "已接受";
        switch ($status) {
            case 1:
                $statusDisplayText = "已接受";
                break;
            case 2:
                $statusDisplayText = "已拒绝";
                break;
            case 3:
                $statusDisplayText = "已完成";
                break;
            default:
                $statusDisplayText = "持续中";
                break;
        }

        $messageController = new MessageController();
        $messageController->sendMessage(
            1,
            $invitation->sender,
            "邀请函状态变更通知",
            $user->name . $statusDisplayText . "您的合作邀请，请前往我的作品查看详情"
        );

        return $this->createResponse("");
    }

    public function deleteSendedInvitations($id)
    {
        Invitation::destroy($id);

        return $this->createResponse("");
    }

    public function sendInvitation($from, $ref, Request $request)
    {
        $to = $request->input("to");
        $users = explode(";", $to);
        $atr = [];

        foreach ($users as $item) {
            if (User::where("uid", $item)->count() === 0) {
                return $this->createResponse(["status" => "500", "message" => "用户不存在！"]);
            }
            array_push($atr, [
                "sender" => $from,
                "receiver" => $item,
                "article_id" => $ref,
                "description" => $request->input("description")
            ]);
        }

        DB::table("invitations")->insert($atr);

        return $this->createResponse(["status" => "200", "message" => "邀请成功！"]);
    }

    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
