<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subsidiary extends Model
{
    protected $primaryKey = 'subsidiary_id';
    protected $table = 'subsidiaries';
    public $timestamps = false;
}
