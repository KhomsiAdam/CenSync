<?php
if (isset($_SESSION['ACCOUNTS_ROLE'])) {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        {{head}}
    </head>

    <body class="preload">

        <nav class="navbar">
            {{navbar}}
        </nav>

        <header>
            {{header}}
        </header>

        <main class="main">
            {{modal}}
            {{content}}
        </main>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.4.1/chart.min.js" integrity="sha512-5vwN8yor2fFT9pgPS9p9R7AszYaNn0LkQElTXIsZFCL7ucT8zDCAqlQXDdaqgA1mZP47hdvztBMsIoFxq/FyyQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
   
    </body>

    </html>
<?php
} else {
    header("Location: /");
    exit();
}
?>