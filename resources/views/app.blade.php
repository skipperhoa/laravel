<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @viteReactRefresh

        @vite(['resources/js/app.jsx', 'resources/css/app.css'])
        <x-inertia::head />
    </head>
    <body class="bg-gray-100 font-sans">

        <x-inertia::app />
    </body>
</html>
