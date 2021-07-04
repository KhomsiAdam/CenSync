<div class="modal" id="modal">
    <div class="modal-header">
        <div class="title">Submit an incident</div>
        <button data-close-button class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
            </svg>
        </button>
    </div>
    <div class="modal-body">
        <form method="POST" class="create-ticket-form">
            <div class="all_selects_container">
                <div class="select_container">
                    <label for="category">Category</label>
                    <div class="custom_select">
                        <select name="category" id="category">
                            <option value="" hidden disabled selected value></option>
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Service">Service</option>
                        </select>
                        <span class="custom_arrow">
                            <img class="arrow_down" src="/icons/arrow_down.svg" alt="Custom Select Round Down Arrow">
                        </span>
                    </div>
                </div>
                <div class="select_container">
                    <label for="priority">Priority</label>
                    <div class="custom_select">
                        <select name="priority" id="priority">
                            <option value="" hidden disabled selected value></option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <span class="custom_arrow">
                            <img class="arrow_down" src="/icons/arrow_down.svg" alt="Custom Select Round Down Arrow">
                        </span>
                    </div>
                </div>
            </div>
            <label for="title">Title</label>
            <input type="text" name="title" id="title">
            <label for="content">Content</label>
            <textarea name="content" id="content" cols="30" rows="10"></textarea>
            <button class="submit-button">Submit</button>
        </form>
    </div>
</div>
<div id="overlay"></div>