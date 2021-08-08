<?php

namespace App\Http\Controllers;

use App\Services\ImageGenerator;
use Exception;
use Illuminate\Http\Request;

class GeneratorController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
    }

    public function livingOurValues(Request $request, ImageGenerator $generator)
    {
        try {
            if (!$request->has(['value', 'subtitle', 'to', 'from', 'challenge', 'initiative', 'impact'])) {
                throw new Exception('There are required fields that was not informed.');
            }

            $fields = $request->only(['value', 'subtitle', 'to', 'from', 'challenge', 'initiative', 'impact']);

            // send HTTP header and output image data
            return response()->json([
                "image" => $generator->generate(...$fields),
            ]);
        } catch (Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 400);
        }
    }
}
