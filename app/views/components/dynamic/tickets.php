<section class="tickets">
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
    <div class="tbody">
    </div>
</section>
<section class="ticket-details">
    <div class="ticket-status-container">
        <div class="ticket-status">
            <span>Status:</span>
            <span class="status-text">Pending</span>
            <span class="status-icon">🕗</span>
        </div>
    </div>
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
            <div class="ticket-priority-value">High</div>
            <div class="ticket-type-value">Hardware</div>
            <div class="ticket-reported-by-value">John Doe</div>
            <div class="ticket-assigned-to-value">Technician</div>
            <div class="ticket-assigned-by-value">Admin</div>
            <div class="ticket-created-value">1111-11-11</div>
            <div class="ticket-assigned-value">"not assigned yet"</div>
            <div class="ticket-resolved-value">"not resolved yet"</div>
        </div>
    </div>
    <div class="ticket-title-container">
        <div class="ticket-title">
            Issue with printer ink. 🖨
        </div>
        <div class="tickets-return">
            <svg xmlns="http://www.w3.org/2000/svg" width="30.705" height="13.5" viewBox="0 0 30.705 13.5">
                <path id="Icon_material-undo" data-name="Icon material-undo" d="M18.75,12A15.7,15.7,0,0,0,8.4,15.9L3,10.5V24H16.5l-5.43-5.43A11.956,11.956,0,0,1,30.15,24L33.7,22.83A15.771,15.771,0,0,0,18.75,12Z" transform="translate(-3 -10.5)" />
            </svg>
        </div>
    </div>
    <div class="ticket-content-container">
        <div class="ticket-content">
            I've been trying to print a document since 8am this morning, but my laptop can't connect with factories. I restarted my computer, but it still doesn't work. It's not urgent, but would love to have this resolved by evening.
        </div>
    </div>
    <div class="ticket-buttons-container">
        <?php if ($_SESSION['ACCOUNTS_ROLE'] === 'Admin') { ?>
            <button class="assign-ticket">Assign ticket</button>
            <button class="ticket-button leave-note">Leave Note</button>
        <?php } ?>
    </div>
    <div class="ticket-note-container">

    </div>
</section>