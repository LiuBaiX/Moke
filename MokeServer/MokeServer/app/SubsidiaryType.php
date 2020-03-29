<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubsidiaryType extends Model
{
    protected $primaryKey = 'tid';
    protected $table = 'subsidiary_types';
    public $timestamps = false;
}
