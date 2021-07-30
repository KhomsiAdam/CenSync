<ul class="nav_menu">
    <!-- Logo -->
    <li class="logo">
        <a href="/dashboard" class="nav_link">
            <div class="logo_link">
                <img src="/images/CenSync_Logo_Transparent.png" alt="CenSync Logo">
            </div>
            <p class="text_link">
                <span class="cen">Cen</span><span class="sync">Sync</span>
            </p>
        </a>
    </li>
    <!-- Navigation links -->
    <li class="nav_item">
        <a href="/dashboard" class="nav_link <?php if ($_SERVER['REQUEST_URI'] === "/dashboard") { ?> active_link <?php } ?>">
            <svg class="dashboard-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                <path id="Icon_material-dashboard" data-name="Icon material-dashboard" d="M4.5,32.278H26.722V4.5H4.5ZM4.5,54.5H26.722V37.833H4.5Zm27.778,0H54.5V26.722H32.278Zm0-50V21.167H54.5V4.5Z" transform="translate(-4.5 -4.5)" />
            </svg>
            <span class="text_link">Dashboard</span>
        </a>
    </li>
    <li class="nav_item">
        <a href="/tickets" class="nav_link <?php if ($_SERVER['REQUEST_URI'] === "/tickets") { ?> active_link <?php } ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="70.833" height="58.333" viewBox="0 0 70.833 58.333">
                <path id="Icon_material-view-list" data-name="Icon material-view-list" d="M16.667,58.333H33.333V41.667H16.667V58.333Zm0,20.833H33.333V62.5H16.667Zm0-41.667H33.333V20.833H16.667ZM37.5,58.333h50V41.667h-50Zm0,20.833h50V62.5h-50Zm0-58.333V37.5h50V20.833Z" transform="translate(-16.667 -20.833)" />
            </svg>
            <span class="text_link">Tickets</span>
        </a>
    </li>
    <!-- Mobile Create ticket button and other links -->
    <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Employee') { ?>
        <li class="nav_item">
            <div class="create_container_mobile">
                <button class="create_ticket_mobile" data-modal-target="#modal">+</button>
            </div>
        </li>
    <?php } ?>
    <li class="nav_item">
        <a href="/staff" class="nav_link <?php if ($_SERVER['REQUEST_URI'] === "/staff") { ?> active_link <?php } ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="125" height="87.5" viewBox="0 0 125 87.5">
                <path id="Icon_awesome-users" data-name="Icon awesome-users" d="M18.75,43.75a12.5,12.5,0,1,0-12.5-12.5A12.512,12.512,0,0,0,18.75,43.75Zm87.5,0a12.5,12.5,0,1,0-12.5-12.5A12.512,12.512,0,0,0,106.25,43.75ZM112.5,50H100a12.463,12.463,0,0,0-8.809,3.633A28.569,28.569,0,0,1,105.859,75H118.75A6.243,6.243,0,0,0,125,68.75V62.5A12.512,12.512,0,0,0,112.5,50Zm-50,0A21.875,21.875,0,1,0,40.625,28.125,21.864,21.864,0,0,0,62.5,50Zm15,6.25H75.879a30.2,30.2,0,0,1-26.758,0H47.5A22.506,22.506,0,0,0,25,78.75v5.625a9.377,9.377,0,0,0,9.375,9.375h56.25A9.377,9.377,0,0,0,100,84.375V78.75A22.506,22.506,0,0,0,77.5,56.25ZM33.809,53.633A12.463,12.463,0,0,0,25,50H12.5A12.512,12.512,0,0,0,0,62.5v6.25A6.243,6.243,0,0,0,6.25,75H19.121A28.641,28.641,0,0,1,33.809,53.633Z" transform="translate(0 -6.25)" />
            </svg>
            <span class="text_link">Staff</span>
        </a>
    </li>
    <!-- <li class="nav_item">
        <div class="bell_container_mobile">
            <svg class="bell" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 31.5 36">
                <path id="Icon_awesome-bell" data-name="Icon awesome-bell" d="M15.75,36a4.5,4.5,0,0,0,4.5-4.5h-9A4.5,4.5,0,0,0,15.75,36ZM30.895,25.474c-1.358-1.46-3.9-3.656-3.9-10.849a11.1,11.1,0,0,0-9-10.91V2.25a2.249,2.249,0,1,0-4.5,0V3.715a11.1,11.1,0,0,0-9,10.91c0,7.193-2.542,9.389-3.9,10.849A2.2,2.2,0,0,0,0,27a2.252,2.252,0,0,0,2.257,2.25H29.243A2.252,2.252,0,0,0,31.5,27a2.2,2.2,0,0,0-.605-1.526Z" transform="translate(0)" />
            </svg>
        </div>
    </li> -->
    <li class="nav_item">
        <a href="/profile">
            <div class="profile_container_mobile <?php if ($_SERVER['REQUEST_URI'] === "/profile") { ?> active_image_link <?php } ?>">
                <img class="nav-image">
            </div>
        </a>
    </li>
    <li class="nav_item logout-icon">
        <a href="/logout" class="nav_link" id="logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="35.436" height="27.004" viewBox="0 0 35.436 27.004">
                <path id="Icon_awesome-sign-out-alt" data-name="Icon awesome-sign-out-alt" d="M34.945,19.2,23.133,31.008a1.69,1.69,0,0,1-2.883-1.2v-6.75H10.688A1.683,1.683,0,0,1,9,21.375v-6.75a1.683,1.683,0,0,1,1.688-1.687H20.25V6.188a1.691,1.691,0,0,1,2.883-1.2L34.945,16.8A1.7,1.7,0,0,1,34.945,19.2ZM13.5,30.656V27.844A.846.846,0,0,0,12.656,27H6.75A2.248,2.248,0,0,1,4.5,24.75V11.25A2.248,2.248,0,0,1,6.75,9h5.906a.846.846,0,0,0,.844-.844V5.344a.846.846,0,0,0-.844-.844H6.75A6.752,6.752,0,0,0,0,11.25v13.5A6.752,6.752,0,0,0,6.75,31.5h5.906A.846.846,0,0,0,13.5,30.656Z" transform="translate(0 -4.499)" />
            </svg>
            <span class="text_link">Sign Out</span>
        </a>
    </li>
</ul>