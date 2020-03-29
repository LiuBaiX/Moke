<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function getUsersByFuzzyName($fuzzyName)
    {
        $users = User::where("name", "like", "$fuzzyName%")->get();
        return $this->createResponse($users);
    }
    public function login(Request $request)
    {
        $userName = $request->input('name');
        $password = $request->input('password');
        $user = User::where([
            ['name', $userName],
            ['password', $password]
        ])->first();

        if($user->status === 1){
            return $this->createResponse(['status' => 0, 'message' => '您已被限制登录，如有疑问，请联系管理员！']);
        }

        if ($user) {
            session(['uid' => $user->uid]);
            return $this->createResponse(['status' => 1, 'uid' => $user->uid]);
        } else {
            return $this->createResponse(['status' => 0, 'message' => '用户名或密码错误']);
        }
    }

    private function isUserNameExited($name)
    {
        return User::where('name', $name)->exists();
    }

    public function register(Request $request)
    {
        $userName = $request->input('name');
        $password = $request->input('password');
        if ($this->isUserNameExited($userName)) {
            return $this->createResponse(['status' => 0, 'message' => '用户名已存在']);
        }
        $user = new User;
        $user->name = $userName;
        $user->password = $password;
        $user->save();
        session(['uid' => $user->uid]);

        $messageController = new MessageController();
        $messageController->sendMessage(
            1,
            $user->uid,
            "注册成功通知",
            "有朋自远方来，不亦乐乎~欢迎来到墨客，文学爱好者的乐土，请自觉遵守网站管理规定，珍惜网站账号，有任何问题请联系管理员，谢谢"
        );

        return $this->createResponse(['status' => 1, 'uid' => $user->uid]);
    }

    public function editUserStatus($uid, $status, Request $request)
    {
        $adminId = $request->input("admin_id");

        $user = User::where("uid", $uid)->first();
        $user->status = $status;

        $statusDisplayText = "";
        switch ($status) {
            case 0:
                $statusDisplayText = "正常";
                break;
            case 1:
                $statusDisplayText = "封禁";
                break;
        };

        $messageController = new MessageController();
        $messageController->sendMessage(
            $adminId,
            $user->uid,
            "状态变更通知",
            "您的账号已变更为：$statusDisplayText,请自觉遵守网站管理规定，珍惜网站账号，有任何问题请联系管理员，谢谢"
        );

        return $this->createResponse([
            "status" => $user->save() ? "200" : "500"
        ]);
    }

    public function getUserInformationById($uid)
    {
        $user = User::where("uid", $uid)->first();

        return $this->createResponse($user);
    }

    public function updatePassword($uid, $newPassword, Request $request)
    {
        $oldPassword = $request->input("password");

        $user = User::where("uid", $uid)->first();
        if ($user->password !== $oldPassword) {
            return $this->createResponse([
                "status" =>   "500",
                "message" => "原密码验证失败！"
            ]);
        }
        $user->password = $newPassword;

        $messageController = new MessageController();
        $messageController->sendMessage(
            1,
            $user->uid,
            "密码变更通知",
            "您的账号密码已变更，如有任何问题，请联系管理员，谢谢"
        );

        if ($user->save()) {
            return $this->createResponse([
                "status" =>   "200",
                "message" => "密码已变更！"
            ]);
        }
    }

    public function getUsers()
    {
        $users = User::all();

        return $this->createResponse($users);
    }

    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
