<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticleSubsidiaryType extends Model
{
    protected $primaryKey = 'subsidiary_tid';
    protected $table = 'article_subsidiary_types';
    public $timestamps = false;
}
