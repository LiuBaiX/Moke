<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticleType extends Model
{
    protected $primaryKey = 'tid';
    protected $table = 'article_types';
    public $timestamps = false;
}
