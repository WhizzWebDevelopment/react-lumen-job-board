<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'location'];
    
    /**
     * The table jobs is associated with the model.
     *
     * @var string
     */
    protected $table = 'jobs';
    
    /**
     * The connection name for the model same as .env.
     *
     * @var string
     */
    protected $connection = 'mysql';
}
