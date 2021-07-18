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
</body>

</html>
<?php
} else {
    header("Location: /");
    exit();
}
?>