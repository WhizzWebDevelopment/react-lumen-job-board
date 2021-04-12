<?php
declare(strict_types=1);

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
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json(Job::all());
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validate(
            $request,
            [
                'title' => 'required|string|min:1|max:255',
                'description' => 'required|string|min:1',
                'location' => 'required|string|min:1|max:255',
            ]
        );
        $job = $this->job->create($request->only(['title', 'description', 'location']));
        
        return response()->json($job, 201);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(int $id, Request $request): \Illuminate\Http\JsonResponse
    {
        $job = $this->job->find($id);
        if (!$job) {
            abort(404);
        }
        $job->update($request->only(['title', 'description', 'location']));
    
        return response()->json($job, 200);
    }
    
    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        $job = $this->job->find($id);
        if (!$job) {
            abort(404);
        }
        
        return response()->json($job);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function delete(int $id): \Illuminate\Http\Response
    {
        $job = $this->job->find($id);
        if (!$job) {
            abort(404);
        }
        $job->delete();
    
        return response('Deleted Successfully', 204);
    }
}
