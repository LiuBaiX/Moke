<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function getMessageByReceiver($receiver)
    {
        $messages = Message::select("messages.*", "users.name", "admins.admin_name")
            ->join("users", "users.uid", "=", "messages.receiver")
            ->join("admins", "admins.admin_id", "=", "messages.sender")
            ->where("receiver", $receiver)
            ->orderBy('sended_date', 'desc')
            ->limit(6)
            ->get();

        return $this->createResponse($messages);
    }

    public function getMessageBySender($sender)
    {
        $messages = Message::where("sender", $sender)
            ->orderBy('sended_date', 'desc')
            ->get();
        return $this->createResponse($messages);
    }

    public function editMessage($messageId, Request $request)
    {
        $title = $request->input("title");
        $content = $request->input("content");

        $message = Message::where([
            ["message_id", $messageId],
        ])->get();

        if ($message) {
            $message->title = $title;
            $message->content = $content;
            $message->save();
        } else {
            return $this->createResponse([
                "status" => "500",
                "message" => "该消息不存在"
            ]);
        }

        return $this->createResponse([
            "status" => "200",
            "message" => "操作成功"
        ]);
    }

    public function setMessageBeenRead($messageId)
    {
        $message = Message::where([
            ["message_id", $messageId],
        ])->first();

        if ($message) {
            $message->has_been_read = 1;
            $message->save();
        } else {
            return $this->createResponse([
                "status" => "500",
                "message" => "该消息不存在"
            ]);
        }

        return $this->createResponse([
            "status" => "200",
            "message" => "操作成功"
        ]);
    }

    public function sendMessage($sender, $receiver, $title, $content)
    {
        $message = new Message;
        $message->title = $title;
        $message->message = $content;
        $message->sender = $sender;
        $message->receiver = $receiver;

        if ($message->save()) {
            return $this->createResponse([
                "status" => "200",
                "message" => "操作成功",
                "id" => $message->message_id
            ]);
        }

        return $this->createResponse([
            "status" => "500",
            "message" => "操作失败",
        ]);
    }



    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
