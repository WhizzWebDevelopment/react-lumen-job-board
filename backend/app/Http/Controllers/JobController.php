<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    private Job $job;
    
    public function __construct(Job $job)
    {
        $this->job = $job;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Job::all());
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $this->validate(
            $request,
            [
                'title' => 'required|min:1',
                'description' => 'required|min:1',
                'location' => 'required|min:1'
            ]
        );
        $job = $this->job->create($request->all());
        
        return response()->json($job, 201);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request,)
    {
        $job = $this->job->find($id);
        if(!$job) {
            abort(404);
        }
        $job->update($request->all());
    
        return response()->json($job, 200);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $job = $this->job->find($id);
        if(!$job) {
            abort(404);
        }
        
        return response()->json($job);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $job = $this->job->find($id);
        if (!$job) {
            abort(404);
        }
        $job->delete();
    
        return response('Deleted Successfully', 204);
    }
}
