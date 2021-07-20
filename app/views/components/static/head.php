<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="icon" href="/icons/favicon/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/favicon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon/favicon-16x16.png">
<link rel="manifest" href="/icons/favicon/site.webmanifest">

<title>CenSync</title>
<?php
    switch($_SERVER['REQUEST_URI']) {
        case '/':?>
            <meta name="description" content="Entry page for either signing in or signin up to the platform">
            <link rel="stylesheet" href="/css/entry.css">
            <script src="/js/entry.js" defer></script>
        <?php break;

        case '/dashboard':?>
            <meta name="description" content="Dashboard for looking at general informations and stats about the staff and tickets">
            <link rel="stylesheet" href="/css/layout.css">
            <link rel="stylesheet" href="/css/dashboard.css">
            <script src="/js/layout.js" defer></script>
            <script src="/js/dashboard.js" defer></script>
        <?php break;

        case '/tickets':?>
            <meta name="description" content="Dashboard section for ticket handling">
            <link rel="stylesheet" href="/css/layout.css">
            <link rel="stylesheet" href="/css/tickets.css">
            <script src="/js/layout.js" defer></script>
            <script src="/js/tickets.js" defer></script>
        <?php break;

        case '/staff':?>
            <meta name="description" content="Dashboard section for staff management">
            <link rel="stylesheet" href="/css/layout.css">
            <link rel="stylesheet" href="/css/staff.css">
            <script src="/js/layout.js" defer></script>
            <script src="/js/staff.js" defer></script>
        <?php break;

        case '/profile':?>
            <meta name="description" content="Profile page">
            <link rel="stylesheet" href="/css/layout.css">
            <link rel="stylesheet" href="/css/profile.css">
            <script src="/js/layout.js" defer></script>
            <script src="/js/profile.js" defer></script>
        <?php break;

    }
?>

<link rel="stylesheet" href="/css/global.css">
<script src="/js/global.js" defer></script>