<?php
if (!isset($_SESSION['ACCOUNTS_ROLE'])) {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        {{head}}
    </head>

    <body class="preload">
        <main class="entry_forms">
            {{content}}
        </main>
    </body>

    </html>
<?php
} else {
    header("Location: /dashboard");
    exit();
}
?>