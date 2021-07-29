<!-- Searchbar -->
<div class="search-container">
    <div class="search-bar">
        <input type="text" placeholder="Search.." class="search">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="35.997" height="36.004" viewBox="0 0 35.997 36.004">
            <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z" />
        </svg>
    </div>
</div>
<!-- Create ticket button -->
<div class="create_container">
    <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Employee') { ?>
        <button class="create_ticket" data-modal-target="#modal">Create Ticket</button>
    <?php } ?>
</div>
<!-- Bell notifications -->
<div class="bell_container">
    <svg class="bell" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 31.5 36">
        <path id="Icon_awesome-bell" data-name="Icon awesome-bell" d="M15.75,36a4.5,4.5,0,0,0,4.5-4.5h-9A4.5,4.5,0,0,0,15.75,36ZM30.895,25.474c-1.358-1.46-3.9-3.656-3.9-10.849a11.1,11.1,0,0,0-9-10.91V2.25a2.249,2.249,0,1,0-4.5,0V3.715a11.1,11.1,0,0,0-9,10.91c0,7.193-2.542,9.389-3.9,10.849A2.2,2.2,0,0,0,0,27a2.252,2.252,0,0,0,2.257,2.25H29.243A2.252,2.252,0,0,0,31.5,27a2.2,2.2,0,0,0-.605-1.526Z" transform="translate(0)" />
    </svg>
</div>
<!-- Profile image -->
<a href="/profile">
    <div class="profile_container">
        <img class="header-image" />
        <span class="username"><?php echo $_SESSION['ACCOUNTS_FIRSTNAME'] . ' ' . $_SESSION['ACCOUNTS_LASTNAME'] ?></span>
    </div>
</a>