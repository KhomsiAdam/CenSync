<!-- Staff list section -->
<section class="staff-container">
</section>
<!-- Individual Staff member details -->
<section class="staff-details" style="display: none;">
    <!-- Left part -->
    <div class="staff-left">
        <!-- Profile image -->
        <div class="left-picture">
            <img class="profile-image" />
            <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Admin') { ?>
                <button type="button" class="delete-profile-image" data-modal-target="#deleteimagemodal">Delete image</button>
            <?php } ?>
        </div>
        <!-- Informations -->
        <div class="staff-left-info">
            <div class="left-info">
                <div class="left-department">Department</div>
                <div class="left-jobtitle">Job title</div>
                <div class="left-age">Age</div>
                <div class="left-dob">Date of birth</div>
                <div class="left-joined">Joined</div>
            </div>
            <div class="left-values">
                <div class="left-department-value"></div>
                <div class="left-jobtitle-value"></div>
                <div class="left-age-value"></div>
                <div class="left-dob-value"></div>
                <div class="left-joined-value"></div>
            </div>
        </div>
    </div>
    <!-- Right part -->
    <div class="staff-right">
        <div class="top-right">
            <!-- Fullname -->
            <div class="name-right"></div>
            <!-- Admin buttons -->
            <div class="account-settings">
                <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Admin') { ?>
                    <button class="activate-account" data-modal-target="#activatemodal">Activate</button>
                    <button class="delete-account" data-modal-target="#deletemodal">Delete</button>
                <?php } ?>
            </div>
            <!-- Return previous page -->
            <div class="staff-return">
                <svg xmlns="http://www.w3.org/2000/svg" width="30.705" height="13.5" viewBox="0 0 30.705 13.5">
                    <path id="Icon_material-undo" data-name="Icon material-undo" d="M18.75,12A15.7,15.7,0,0,0,8.4,15.9L3,10.5V24H16.5l-5.43-5.43A11.956,11.956,0,0,1,30.15,24L33.7,22.83A15.771,15.771,0,0,0,18.75,12Z" transform="translate(-3 -10.5)" />
                </svg>
            </div>
            <!-- Email and Role -->
            <div class="email-role-right">
                <span class="email-right"></span> - <span class="role-right"></span>
            </div>
        </div>
        <!-- Bio -->
        <div class="bio-right">
            <label for="bio">Bio</label>
            <textarea name="bio" id="bio" cols="30" rows="8"></textarea>
        </div>
        <div class="bottom-right">
            <!-- Additional informations -->
            <div class="staff-right-info">
                <div class="right-info">
                    <div class="right-phone">Phone</div>
                    <div class="right-country">Country</div>
                    <div class="right-city">City</div>
                    <div class="right-gender">Gender</div>
                </div>
                <div class="right-values">
                    <div class="right-phone-value"></div>
                    <div class="right-country-value"></div>
                    <div class="right-city-value"></div>
                    <div class="right-gender-value"></div>
                </div>
            </div>
            <!-- Chart -->
            <div class="right-chart">
            </div>
        </div>
    </div>
</section>
<!-- Admin Modals -->
<?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Admin') { ?>
    <!-- Activate account modal -->
    <div class="modal" id="activatemodal">
        <div class="modal-header">
            <div class="title">Activate Account</div>
            <button data-close-button class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <form class="activate-account-form">
                <label for="title">Department</label>
                <input type="text" name="department" id="department">
                <label for="title">Job title</label>
                <input type="text" name="jobtitle" id="jobtitle">
                <button class="activate-submit-button">Submit</button>
            </form>
        </div>
    </div>
    <!-- Delete account modal -->
    <div class="modal" id="deletemodal">
        <div class="modal-header">
            <div class="title">Are you sure you wanna delete this account ?</div>
            <button data-close-button class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <form class="delete-account-form">
                <button type="submit" class="delete-submit-button">Yes</button>
                <button type="button" data-close-button class="delete-cancel-button">No</button>
            </form>
        </div>
    </div>
    <!-- Delete profile image modal -->
    <div class="modal" id="deleteimagemodal">
        <div class="modal-header">
            <div class="title">Are you sure you wanna delete this user's profile picture ?</div>
            <button data-close-button class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <form class="delete-profile-image-form" action="/deleteimg" method="POST">
                <button type="submit" class="delete-submit-button" id="delete-profile-image-submit">Yes</button>
                <button type="button" data-close-button class="delete-cancel-button">No</button>
            </form>
        </div>
    </div>
<?php } ?>