<!-- Overlay Part with Logo and Slogan -->
<div class="hero" id="hero">
    <img src="/images/CenSync_Logo_Transparent.png" alt="CenSync Logo" class="logo_icon">
    <div class="logo_name">
        <span class="cen">Cen</span><span class="sync">Sync</span>
    </div>
    <p class="hero_msg">"Standardize your incident management processes, centralized and synced in one place."</p>
</div>
<!-- Sign up section -->
<section class="signup_section">
    <form class="signup_form">
        <div class="fullname">
            <div class="firstname">
                <label for="firstname">Firstname</label>
                <input type="text" name="firstname" id="firstname">
            </div>
            <div class="lastname">
                <label for="lastname">Lastname</label>
                <input type="text" name="lastname" id="lastname">
            </div>
        </div>
        <span>Birthdate</span>
        <div class="birthdate">
            <div class="month">
                <label for="month">Month</label>
                <input type="text" placeholder="MM" name="month" id="month" minlength="2" maxlength="2">
            </div>
            <div class="day">
                <label for="day">Day</label>
                <input type="text" placeholder="DD" name="day" id="day" minlength="2" maxlength="2">
            </div>
            <div class="year">
                <label for="year">Year</label>
                <input type="text" placeholder="YYYY" name="year" id="year" minlength="4" maxlength="4">
            </div>
        </div>
        <label for="role">Role</label>
        <div class="custom_select">
            <select name="role" id="role">
                <option value="" hidden disabled selected value></option>
                <option value="Employee">Employee</option>
                <option value="Developer">Developer</option>
                <option value="Technician">Technician</option>
            </select>
            <span class="custom_arrow">
                <img class="arrow_down" src="/icons/arrow_down.svg" alt="Custom Select Round Down Arrow">
            </span>
        </div>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="example@censync.com" id="email_up">
        <label for="password">Password</label>
        <input type="password" name="password" id="password_up">
        <button type="submit" id="sign_up">Sign Up</button>
        <span class="signin">Already having an account ? <span id="signin_btn_mob">Sign In</span><span id="signin_btn_desk">Sign In</span></span>
    </form>
</section>
<!-- Sign in section -->
<section class="signin_section">
    <form class="signin_form">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="example@censync.com" id="email_in">
        <label for="password">Password</label>
        <input type="password" name="password" id="password_in">
        <button type="submit" id="sign_in">Sign In</button>
        <span class="signup">Not having an account ? <span id="signup_btn_mob">Sign Up</span><span id="signup_btn_desk">Sign Up</span></span>
    </form>
</section>