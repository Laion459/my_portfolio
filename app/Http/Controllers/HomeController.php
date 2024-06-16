<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function about()
    {
        return view('about');
    }

    public function projects()
    {
        return view('projects');
    }

    public function blog()
    {
        return view('blog');
    }

    public function curriculum()
    {
        return view('curriculum');
    }

    public function news()
    {
        return view('news');
    }

    public function welcome()
    {
        return view('welcome');
    }


}
