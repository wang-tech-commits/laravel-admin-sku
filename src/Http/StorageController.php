<?php

namespace Encore\GoodsSku\Http;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    public function index(Request $request)
    {
        $File = $request->file('file');

        $hash = File::hash($File->path());
        $size = File::size($File->path());

        if ($size > (5 * 1024 * 1024)) {
            return ['code' => 0, 'msg' => '文件不能超过5M'];
        }

        $pathUrl = 'uploads/' . date('Y/m/d');
        $fileName = $hash . '.' . $File->getClientOriginalExtension();
        $path = Storage::putFileAs(
            $pathUrl, $File, $fileName
        );
        $data = [
            'path' => $path,
            'showpath' => Storage::url($path),
        ];

        if (!$path) {
            return ['code' => 0, 'msg' => '文件上传失败'];
        }

        return ['code' => 1, 'data' => $data];
    }
}
