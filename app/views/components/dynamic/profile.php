<section class="staff-details">
    <div class="staff-left">
        <!-- Profile image -->
        <div class="left-picture">
            <form class="profile-image-form">
                <label for="profile_image_input">
                    <input type="file" name="profile_image" id="profile_image_input" />
                    <!-- <img id="source_image"/> -->
                    <img class="profile-image" />
                    <span class="change-profile-image">Select image</span>
                </label>
                <button type="submit" name="profile_image_submit" id="profile_image_submit" disabled class="disabled-image-submit">Upload image</button>
                <button type="button" class="delete-profile-image" data-modal-target="#deleteimagemodal">Delete image</button>
            </form>
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
            <!-- Mobile Logout -->
            <div class="logout-right">
                <a href="/logout">
                    <button class="logout-button">Sign Out</button>
                </a>
            </div>
            <!-- Return previous page -->
            <div class="profile-return">
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
            <svg class="edit-bio" xmlns="http://www.w3.org/2000/svg" width="33.182" height="33.182" viewBox="0 0 33.182 33.182">
                <g class="Icon_feather-edit" data-name="Icon feather-edit" transform="translate(-1.5 -1.318)">
                    <path class="Path_1" data-name="Path 1" d="M16.5,6H6A3,3,0,0,0,3,9V30a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V19.5" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                    <path class="Path_2" data-name="Path 2" d="M27.75,3.75a3.182,3.182,0,0,1,4.5,4.5L18,22.5,12,24l1.5-6Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                </g>
            </svg>
            <form class="bio-form">
                <textarea name="bio" id="bio"></textarea>
            </form>
            <div class="bio"></div>
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

                    <div class="right-phone">
                        <div class="right-phone-value"></div>
                        <form class="phone-form">
                            <input type="text" name="phone-value" id="phone-input" class="hidden-input">
                        </form>
                        <svg class="edit-info" xmlns="http://www.w3.org/2000/svg" width="33.182" height="33.182" viewBox="0 0 33.182 33.182">
                            <g class="Icon_feather-edit" data-name="Icon feather-edit" transform="translate(-1.5 -1.318)">
                                <path class="Path_1" data-name="Path 1" d="M16.5,6H6A3,3,0,0,0,3,9V30a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V19.5" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                <path class="Path_2" data-name="Path 2" d="M27.75,3.75a3.182,3.182,0,0,1,4.5,4.5L18,22.5,12,24l1.5-6Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                            </g>
                        </svg>
                    </div>

                    <div class="right-country">
                        <div class="right-country-value"></div>
                        <form class="country-form">
                            <input type="text" name="country-value" id="country-input" class="hidden-input">
                        </form>
                        <svg class="edit-info" xmlns="http://www.w3.org/2000/svg" width="33.182" height="33.182" viewBox="0 0 33.182 33.182">
                            <g class="Icon_feather-edit" data-name="Icon feather-edit" transform="translate(-1.5 -1.318)">
                                <path class="Path_1" data-name="Path 1" d="M16.5,6H6A3,3,0,0,0,3,9V30a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V19.5" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                <path class="Path_2" data-name="Path 2" d="M27.75,3.75a3.182,3.182,0,0,1,4.5,4.5L18,22.5,12,24l1.5-6Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                            </g>
                        </svg>
                    </div>

                    <div class="right-city">
                        <div class="right-city-value"></div>
                        <form class="city-form">
                            <input type="text" name="city-value" id="city-input" class="hidden-input">
                        </form>
                        <svg class="edit-info" xmlns="http://www.w3.org/2000/svg" width="33.182" height="33.182" viewBox="0 0 33.182 33.182">
                            <g class="Icon_feather-edit" data-name="Icon feather-edit" transform="translate(-1.5 -1.318)">
                                <path class="Path_1" data-name="Path 1" d="M16.5,6H6A3,3,0,0,0,3,9V30a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V19.5" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                <path class="Path_2" data-name="Path 2" d="M27.75,3.75a3.182,3.182,0,0,1,4.5,4.5L18,22.5,12,24l1.5-6Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                            </g>
                        </svg>
                    </div>

                    <div class="right-gender">
                        <div class="right-gender-value"></div>
                        <form class="gender-form">
                            <input type="text" name="gender-value" id="gender-input" class="hidden-input">
                        </form>
                        <svg class="edit-info" xmlns="http://www.w3.org/2000/svg" width="33.182" height="33.182" viewBox="0 0 33.182 33.182">
                            <g class="Icon_feather-edit" data-name="Icon feather-edit" transform="translate(-1.5 -1.318)">
                                <path class="Path_1" data-name="Path 1" d="M16.5,6H6A3,3,0,0,0,3,9V30a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V19.5" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                <path class="Path_2" data-name="Path 2" d="M27.75,3.75a3.182,3.182,0,0,1,4.5,4.5L18,22.5,12,24l1.5-6Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <!-- Chart -->
            <div class="right-chart"></div>
        </div>
    </div>
</section>
<!-- Delete profile image modal -->
<div class="modal" id="deleteimagemodal">
    <div class="modal-header">
        <div class="title">Are you sure you wanna delete your profile picture ?</div>
        <button data-close-button class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
            </svg>
        </button>
    </div>
    <div class="modal-body">
        <form class="delete-profile-image-form">
            <button type="submit" class="delete-submit-button" id="delete-profile-image-submit">Yes</button>
            <button type="button" data-close-button class="delete-cancel-button">No</button>
        </form>
    </div>
</div>