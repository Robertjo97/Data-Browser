# National Park Display and Management System

## Project Overview

This project is a web-based application designed to display and manage information about various national parks. It allows users to view details of different parks, sort them, and perform CRUD (Create, Read, Update, Delete) operations.

### Features

- **Display National Parks:** View details of national parks including name, location, year established, free entry status, biome, and an image.
- **Sort Parks:** Ability to sort parks in alphabetical order.
- **Edit Park Details:** Modify the details of existing parks.
- **Add New Parks:** Insert new park entries into the system.
- **Delete Parks:** Remove existing park entries.
- **Upload Images:** Upload images for park entries.

## Technical Details

### Classes and Methods

- `NationalPark`: A class representing a national park with properties like name, location, year established, free entry status, biome, and an image URL.
- `displayNationalPark()`: Function to display park details.
- `createUploadBtn()`, `createSortButton()`, `createNextButton()`, `createPreviousButton()`, `createEditButton()`, `createDeleteButton()`, `createInsertBtn()`: Functions to create various interactive buttons.
- `getJSONString()`: Function to display parks data in JSON format.

### Technologies Used

- JavaScript
- HTML/CSS for frontend
- AJAX for asynchronous requests
- PHP for backend operations 

### Installation and Setup

1. Clone the repository to your local machine.
2. Ensure you have a web server (like Apache) and PHP installed.
3. Place the project in your web server's root directory.
4. Open the `index.html` file in a web browser to start using the application.

### Usage

- **Viewing Parks:** Click on the 'Display a National Park' button to view park details.
- **Editing Parks:** Select a park and use the 'Edit' button to modify details. Save changes with the 'Save' button.
- **Adding Parks:** Use the 'Insert' button to add a new park. Fill in the details and save.
- **Deleting Parks:** Select a park and use the 'Delete' button to remove it.
- **Uploading Images:** Use the 'Upload an image' button to upload new images for parks.
