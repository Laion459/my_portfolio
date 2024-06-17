<x-app-layout>
    <link rel="stylesheet" href="{{ asset('css/news.css') }}">
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight text-center mx-auto">
            {{ __('TECH NEWS') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100 text-center mx-auto">
                    <div id="news-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('scripts/news.js') }}"></script>
    <footer class="py-16 text-center text-sm text-black dark:text-white/70">
        <x-footer> </x-footer>
    </footer>
</x-app-layout>
