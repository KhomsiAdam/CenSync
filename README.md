# CenSync
"Standardize your incident management processes, centralized and synced in one place."

# Table Of Contents
<!--ts-->
* [Project Description](#project-description)
* [Flow of the Platform](#flow-of-the-platform)
* [UML Diagrams](#uml-diagrams)
* [Design](#design)
* [Installation](#installation)
* [Database Setup](#database-setup)
* [Usage](#usage)
* [Previews](#previews)
  * [Desktop](#desktop)
  * [Mobile](#mobile)
<!--te-->

# Project Description

An IT incident (be it of software or hardware origin) is defined as any event that is not part of the standard operation of an organization and that causes, or may cause, an interruption, reduction, loss or disruption in the quality of this organization's operations, services or functions.

This is a platform/app designed for in-house use by staff, administrators, employees, managers... to manage said incidents in any type of organization or establishment, using a simple ticketing system.

Incidents are classified by type (software, hardware, *service) and priority (high, medium, low). The tickets must be resolved by order of importance.

*services are always of low priorities since they are considered as demands instead of incidents.

The purpose of such a system is to waste less time in dealing with issues therefore reducing costs and having better communication and traceability.

[Back to top](#table-of-contents)

# Flow of the Platform

It begins by either signing in or signing up for an account (which will require validation from an administrator before being activated).

The targeted audience then can choose to create a ticket, with all the required informations and is in a pending status. The administrator then evaluates the ticket, opens it then assign the issue to the respective actor fit to deal with said issue (in this project as example: a developer for a software issue, a technician for a hardware issue).

After the issue has been dealed with the ticket is marked as resolved.

[Back to top](#table-of-contents)

# UML Diagrams
(Activity, Class, Sequence, Use Case)

<img src="https://user-images.githubusercontent.com/9354045/124355809-0580a500-dc0b-11eb-9c2a-b54ffe588572.png" width="13.4%"></img>
<img src="https://user-images.githubusercontent.com/9354045/124355811-06b1d200-dc0b-11eb-9acf-83e0dd3a4608.png" width="39%"></img>
<img src="https://user-images.githubusercontent.com/9354045/124355813-087b9580-dc0b-11eb-87f6-ec305133b730.png" width="18%"></img>
<img src="https://user-images.githubusercontent.com/9354045/124355814-0a455900-dc0b-11eb-9b6d-6c0ff50b6962.png" width="21.5%"></img>

[Back to top](#table-of-contents)

# Design
Made with adobe XD (file in design folder).

Quick overview : Desktop

![censync_xd_desktop](https://user-images.githubusercontent.com/9354045/124357105-a70af500-dc11-11eb-928c-85a707289946.gif)

Quick overview : Mobile

![censync_xd_mobile](https://user-images.githubusercontent.com/9354045/124357019-3a8ff600-dc11-11eb-898d-ad9dac8944b9.gif)

[Back to top](#table-of-contents)

# Installation

[Composer](https://getcomposer.org/) and [Node](https://nodejs.org/en/) are required.

Install dependencies:

```bash
composer install
```

```bash
npm install
```

[Back to top](#table-of-contents)

# Database Setup

Import tables from the sql file in the SQL folder `SQL/censync_db.sql`.

Rename/copy .env.example file into .env (or create a new file), then copy the informations below and paste into your file:
```
# Database Credentials: *fill with your proper database information
HOST=
DB_NAME=
USERNAME=
PASSWORD=

# Developer mode for error handling: *change to OFF when deploying
DEV_MODE=ON

# Database Account Table:
ACCOUNTS_TABLE=user

# Database Account Columns:
ACCOUNTS_ID=user_id
ACCOUNTS_ROLE=role
ACCOUNTS_EMAIL=email
ACCOUNTS_FIRSTNAME=firstname
ACCOUNTS_LASTNAME=lastname
ACCOUNTS_PASSWORD=password
ACCOUNTS_STATUS=status

# Database Audience Table: *The recipient table for account for 'aud' in JWT token payload
AUDIENCE_TABLE=ticket
# Database Other Tables: *Other tables you may need, as argument for your CRUD operations in controller methods
NOTES_TABLE=note

# Data Source Name: *do not modify! $_ENV['DSN'] is used as first argument for your PDO connection
DSN=mysql:host=${HOST};dbname=${DB_NAME}

# API Token Authentication Secret Keys: *fill with your own key or add new keys as needed
SECRET_KEY=
```
- HOST, DB_NAME, USERNAME, PASSWORD: fill with your database credentials.
- DEV_MODE: for error handling when testing the API, delete it's value or replace to deactivate it when going into production or deploying.
- SECRET_KEY: fill with your own secret key.

[Back to top](#table-of-contents)

# Usage

Run PHP's Local Development Server with this custom command in your terminal (localhost:8080):
```bash
composer serve:local
```

If you want to run the server on your local network for testing (your local IP address, ex: 192.168.1.2:8080):
```bash
composer serve:remote
```

* Backend made with: https://github.com/KhomsiAdam/PHP_MVC_API_Framework

[Back to top](#table-of-contents)

# Previews

## Desktop:

Account creation:

![censync_create_account_desktop](https://user-images.githubusercontent.com/9354045/126696279-c9ddc85d-d962-43f1-8794-6bf14c222dd5.gif)

Dashboard preview:

![censync_login_dashboard_desktop](https://user-images.githubusercontent.com/9354045/126696487-482570eb-9316-444e-9404-07fdaec70c43.gif)

Account activation by Admin:

![censync_activate_account_desktop](https://user-images.githubusercontent.com/9354045/126696562-ed9c334f-52a5-43f1-84de-939b21cd9062.gif)

Ticket creation by Employee:

![censync_create_ticket_desktop](https://user-images.githubusercontent.com/9354045/126696633-5c9497a1-f6f5-48b4-84a5-d5021a8d389a.gif)

Ticket assignement and Note by Admin:

![censync_assign_ticket_desktop](https://user-images.githubusercontent.com/9354045/126696688-94f54f21-33d3-4a60-b3d1-331b769380ac.gif)

Ticket resolution by Developer or Technician:

![censync_resolve_ticket_desktop](https://user-images.githubusercontent.com/9354045/126696765-998066a7-9ade-4d42-aa24-39fb684952f5.gif)

Note update and deletion, Ticket deletion (by Admin):

![censync_delete_ticket_desktop](https://user-images.githubusercontent.com/9354045/126696819-218d04a3-cae3-44b8-b64f-0e6eb5a689ba.gif)

Account deletion by Admin:

![censync_delete_account_desktop](https://user-images.githubusercontent.com/9354045/126696896-3d8471cf-c813-4032-a124-e53df5144069.gif)

User profile image upload and delete:

![censync_upload_image_desktop](https://user-images.githubusercontent.com/9354045/127658303-a9bc9823-dc60-416f-b46c-02f648f88f0a.gif)

Admin deleting user profile image:

![censync_delete_image_desktop](https://user-images.githubusercontent.com/9354045/127658344-6380ab80-20fd-4674-ac7e-a15f91f0dd0e.gif)

[Back to top](#table-of-contents)

## Mobile:

Account creation:

![censync_create_account_mobile](https://user-images.githubusercontent.com/9354045/126840066-115ae5c7-1dfc-428b-ae05-1eb42f39fcba.gif)

Dashboard preview:

![censync_login_dashboard_mobile](https://user-images.githubusercontent.com/9354045/126840076-89b10ab5-9570-4bfa-b77f-09fb2bad1033.gif)

Account activation by Admin:

![censync_activate_account_mobile](https://user-images.githubusercontent.com/9354045/126840092-46fb29ec-b99d-4626-bda6-db4f79f75937.gif)

Ticket creation by Employee:

![censync_create_ticket_mobile](https://user-images.githubusercontent.com/9354045/126840107-d48a797d-58ed-4623-9710-1deebf3d8a33.gif)

Ticket assignement and Note by Admin:

![censync_assign_ticket_mobile](https://user-images.githubusercontent.com/9354045/126840120-1b3c49f0-ea7f-4451-869e-294b6f836a8f.gif)

Ticket resolution by Developer or Technician:

![censync_resolve_ticket_mobile](https://user-images.githubusercontent.com/9354045/126840128-66c40f5c-903e-4b8d-936a-22bf2ca46277.gif)

Note update and deletion, Ticket deletion (by Admin):

![censync_delete_ticket_mobile](https://user-images.githubusercontent.com/9354045/126840133-27f09f63-5c80-428b-8f8a-81c33e359f8f.gif)

Account deletion by Admin:

![censync_delete_account_mobile](https://user-images.githubusercontent.com/9354045/126840148-c79661b7-c4a7-4cad-a8b5-0e18eb61407b.gif)

User profile image upload and delete:

![censync_upload_image_mobile](https://user-images.githubusercontent.com/9354045/127658325-15fc050d-c9ec-4fea-beea-57ed381c310c.gif)

Admin deleting user profile image:

![censync_delete_image_mobile](https://user-images.githubusercontent.com/9354045/127658378-b1a8eee2-2113-4561-9d1a-b3c7dbf6c152.gif)

[Back to top](#table-of-contents)