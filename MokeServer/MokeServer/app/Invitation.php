<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $primaryKey = 'invitation_id';
    protected $guarded = [];
    public $timestamps = false;
}
