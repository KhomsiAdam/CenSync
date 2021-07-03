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

[Composer](https://getcomposer.org/) is required.

Install dependencies and other packages
```bash
composer install
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

Run PHP's Local Development Server with this custom command in your terminal:
```bash
composer serve
```
or:
```bash
php -S localhost:8000 -t public
```
or navigate to public folder then run the server:
```bash
cd public
php -S localhost:8080
```

* Backend made with: https://github.com/KhomsiAdam/PHP_MVC_API_Framework

[Back to top](#table-of-contents)

# Previews
*Frontend: Work in progress

Entry page (with both login and register) for desktop:

![censync_desktop](https://user-images.githubusercontent.com/9354045/124360207-75e5f100-dc20-11eb-9d18-a55c978caa55.gif)

mobile:

![censync_mobile](https://user-images.githubusercontent.com/9354045/124360359-45eb1d80-dc21-11eb-8d11-4499baa6548a.gif)