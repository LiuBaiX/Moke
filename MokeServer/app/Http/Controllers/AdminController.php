<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Admin;

class AdminController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $userName = $request->input('name');
        $password = $request->input('password');
        $admin = Admin::where([
            ['admin_name', $userName],
            ['password', $password]
        ])->first();

        if ($admin) {
            session(['admin_id' => $admin->admin_id]);
            return $this->createResponse([
                'status' => "200",
                "message" => "登陆成功",
                'id' => $admin->admin_id
            ]);
        } else {
            return $this->createResponse([
                'status' => "500",
                'message' => '用户名或密码错误'
            ]);
        }
    }

    private function createResponse($content)
    {
        return response($content, 200, ["Access-Control-Allow-Origin" => "*"]);
    }
}
