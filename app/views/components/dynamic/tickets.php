<!-- Tickets section -->
<section class="tickets">
    <!-- Tickets header -->
    <div class="thead">
        <ul>
            <li>Category</li>
            <li>Priority</li>
            <li>Title</li>
            <li>Employee</li>
            <li>Created</li>
            <li>Status</li>
        </ul>
    </div>
    <!-- Tickets Body containing all tickets -->
    <div class="tbody">
    </div>
</section>
<!-- Individual Ticket details section -->
<section class="ticket-details">
    <!-- Status -->
    <div class="ticket-status-container">
        <div class="ticket-status">
            <span>Status:</span>
            <span class="status-text"></span>
            <span class="status-icon"></span>
        </div>
    </div>
    <!-- Informations -->
    <div class="ticket-info-container">
        <div class="ticket-info">
            <div class="ticket-priority">Priority</div>
            <div class="ticket-type">Incident type</div>
            <div class="ticket-reported-by">Reported by</div>
            <div class="ticket-assigned-to">Assigned to</div>
            <div class="ticket-assigned-by">Assigned by</div>
            <div class="ticket-created">Created at</div>
            <div class="ticket-assigned">Assigned at</div>
            <div class="ticket-resolved">Resolved at</div>
        </div>
        <div class="info-values">
            <div class="ticket-priority-value"></div>
            <div class="ticket-type-value"></div>
            <div class="ticket-reported-by-value"></div>
            <div class="ticket-assigned-to-value"></div>
            <div class="ticket-assigned-by-value"></div>
            <div class="ticket-created-value"></div>
            <div class="ticket-assigned-value"></div>
            <div class="ticket-resolved-value"></div>
        </div>
    </div>
    <!-- Title -->
    <div class="ticket-title-container">
        <div class="ticket-title"></div>
        <div class="tickets-return">
            <svg xmlns="http://www.w3.org/2000/svg" width="30.705" height="13.5" viewBox="0 0 30.705 13.5">
                <path id="Icon_material-undo" data-name="Icon material-undo" d="M18.75,12A15.7,15.7,0,0,0,8.4,15.9L3,10.5V24H16.5l-5.43-5.43A11.956,11.956,0,0,1,30.15,24L33.7,22.83A15.771,15.771,0,0,0,18.75,12Z" transform="translate(-3 -10.5)" />
            </svg>
        </div>
    </div>
    <!-- Content -->
    <div class="ticket-content-container">
        <div class="ticket-content"></div>
    </div>
    <!-- Buttons : depending on user role -->
    <div class="ticket-buttons-container">
        <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Admin') { ?>
            <button class="assign-ticket" data-modal-target="#assignmodal">Assign ticket</button>
            <button class="ticket-button-disabled leave-note" disabled data-modal-target="#notemodal">Leave Note</button>
            <button class="ticket-button delete-ticket" data-modal-target="#deletemodal">Delete ticket</button>
        <?php } else if (($_SESSION['ACCOUNTS_ROLE'] === 'Developer') || ($_SESSION['ACCOUNTS_ROLE'] === 'Technician')) { ?>
            <button class="ticket-button" data-modal-target="#resolvemodal">Resolve ticket</button>
        <?php } ?>
    </div>
    <!-- Note -->
    <div class="ticket-note-container">
        <div class="note-author"></div>
        <div class="note-time"></div>
        <div class="note-content"></div>
        <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Admin') { ?>
            <button class="note-edit" data-modal-target="#editnotemodal">Edit</button>
            <button class="note-delete" data-modal-target="#deletenotemodal">Delete</button>
        <?php } ?>
    </div>
    <!-- Admin Modals -->
    <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Admin') { ?>
        <!-- Assign Ticket Modal -->
        <div class="modal" id="assignmodal">
            <div class="modal-header">
                <div class="title">Assign Ticket</div>
                <button data-close-button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="assign-ticket-form">
                </form>
                <button type="submit" form="assign-ticket-form" class="assign-submit-button">Submit</button>
            </div>
        </div>
        <!-- Delete Ticket Modal -->
        <div class="modal" id="deletemodal">
            <div class="modal-header">
                <div class="title">Are you sure you wanna delete this ticket ?</div>
                <button data-close-button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="delete-ticket-form">
                    <button type="submit" class="delete-submit-button">Yes</button>
                    <button type="button" data-close-button class="delete-cancel-button">No</button>
                </form>
            </div>
        </div>
        <!-- Create Note Modal -->
        <div class="modal" id="notemodal">
            <div class="modal-header">
                <div class="title">Leave a note</div>
                <button data-close-button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="note-ticket-form">
                    <textarea name="note" id="note" cols="30" rows="10"></textarea>
                    <div class="note-buttons-container">
                        <button type="submit" class="note-submit-button">Confirm</button>
                        <button type="button" data-close-button class="note-cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Edit Note Modal -->
        <div class="modal" id="editnotemodal">
            <div class="modal-header">
                <div class="title">Edit note</div>
                <button data-close-button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="edit-note-ticket-form">
                    <textarea name="edit-note" id="edit-note" cols="30" rows="10"></textarea>
                    <div class="note-buttons-container">
                        <button type="submit" class="edit-note-submit-button">Confirm</button>
                        <button type="button" data-close-button class="edit-note-cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Delete Note Modal -->
        <div class="modal" id="deletenotemodal">
            <div class="modal-header">
                <div class="title">Are you sure you wanna delete this note ?</div>
                <button data-close-button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="delete-note-ticket-form">
                    <button type="submit" class="delete-note-submit-button">Yes</button>
                    <button type="button" data-close-button class="delete-note-cancel-button">No</button>
                </form>
            </div>
        </div>
    <?php } ?>
    <!-- Developer and Technician Modal -->
    <?php if (($_SESSION['ACCOUNTS_ROLE'] === 'Developer') || ($_SESSION['ACCOUNTS_ROLE'] === 'Technician')) { ?>
        <!-- Resolve Ticket Modal -->
        <div class="modal" id="resolvemodal">
            <div class="modal-header">
                <div class="title">Has this issue been resolved ?</div>
                <button data-close-button class="close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_material-close" data-name="Icon material-close" d="M27.5,9.514,25.486,7.5,17.5,15.486,9.514,7.5,7.5,9.514,15.486,17.5,7.5,25.486,9.514,27.5,17.5,19.514,25.486,27.5,27.5,25.486,19.514,17.5Z" transform="translate(-7.5 -7.5)" fill="#f9f9f9" />
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="resolve-ticket-form">
                    <button type="submit" class="resolve-submit-button">Yes</button>
                    <button type="button" data-close-button class="resolve-cancel-button">No</button>
                </form>
            </div>
        </div>
    <?php } ?>
</section>