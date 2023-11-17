/*
TODO:
convert Edit to mysql
Set free entry and Biome to drop down menus
add image uploader
enable changing images on edit
fix forms going white on insert
*/

class NationalPark {
    constructor(name, location, yearEstablished, freeEntry, biome, img) {
        const validBiomes = ['aquatic', 'grassland', 'forest', 'desert', 'tundra'];

        if (!validBiomes.includes(biome)) {
            throw new Error('Invalid biome');
        }

        this.name = name;
        this.location = location;
        this.yearEstablished = yearEstablished;
        this.freeEntry = freeEntry;
        this.biome = biome;
        this.img = img;
    }
}

let parks = new Array();
let arraySize = 0;

const yosemite = new NationalPark('Yosemite National Park', 'California', 1890, false, 'forest', './images/yosemite.jpg');
parks.push(yosemite);

const greatSmokyMountains = new NationalPark('Great Smoky Mountains National Park', 'Tennessee', 1934, true, 'forest', './images/smokymountains.jpg');
parks.push(greatSmokyMountains);

const grandCanyon = new NationalPark('Grand Canyon National Park', 'Arizona', 1919, false, 'desert', './images/grandcanyon.jpg');
parks.push(grandCanyon);

const zion = new NationalPark('Zion National Park', 'Utah', 1919, false, 'desert', './images/zion.jpg');
parks.push(zion);

const rockyMountain = new NationalPark('Rocky Mountain National Park', 'Colorado', 1915, false, 'tundra', './images/rockymountains.jpg');
parks.push(rockyMountain);

let JSONPressed = false;
function getJSONString() {
    if (JSONPressed) {
        document.getElementById('jsonData').innerHTML = '';
        document.getElementById('jsonBtn').innerHTML = 'Click to display JSON data';
        JSONPressed = false;
        return;
    }
    JSONPressed = true;
    let x = JSON.stringify(parks);
    document.getElementById('jsonData').innerHTML = '<p>' + x + '</p>';
    document.getElementById('jsonBtn').innerHTML = 'Click to hide JSON data';
}

let i = 0;
let displayPressed = false;

function displayNationalPark() {
    if (displayPressed) {
        document.getElementById('NationalParkContainer').innerHTML = '';
        document.getElementById('NationalParkButton').innerHTML = 'Click to display a National Park';
        displayPressed = false;
        return;
    }
    displayPressed = true;
    document.getElementById('NationalParkButton').innerHTML = 'Click to hide National Park';

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(request.responseText);
            park = response.park;
            arraySize = response.size;
            position = response.position;
            const container = document.getElementById('NationalParkContainer');

            let id = document.createElement('input');
            id.type = 'hidden';
            id.id = "id";
            id.value = park.id;
            container.appendChild(id);
            container.appendChild(document.createElement('br'));

            let nameLabel = document.createElement('label');
            nameLabel.innerHTML = 'Name: '
            let name = document.createElement('input');
            name.type = 'text';
            name.readOnly = true;
            name.id = "name";
            name.value = park.name;
            container.appendChild(nameLabel);
            container.appendChild(name);
            container.appendChild(document.createElement('br'));

            let locationLabel = document.createElement('label');
            locationLabel.innerHTML = 'Location: ';
            let location = document.createElement('input');
            location.type = 'text';
            location.readOnly = true;
            location.id = 'location';
            location.value = park.location;
            container.appendChild(locationLabel);
            container.appendChild(location);
            container.appendChild(document.createElement('br'));

            let yearLabel = document.createElement('label');
            yearLabel.innerHTML = 'Year Established: ';
            let yearEstablished = document.createElement('input');
            yearEstablished.type = 'text';
            yearEstablished.readOnly = true;
            yearEstablished.id = 'yearEstablished';
            yearEstablished.value = park.yearEstablished;
            container.appendChild(yearLabel);
            container.appendChild(yearEstablished);
            container.appendChild(document.createElement('br'));

            //convert this to a dropdown with true/false
            let freeLabel = document.createElement('label');
            freeLabel.innerHTML = 'Free entry: ';
            let freeEntry = document.createElement('input');
            freeEntry.type = 'text';
            freeEntry.readOnly = true;
            freeEntry.id = 'freeEntry';
            let conversion = false;
            if(park.freeEntry === 1){
                conversion = true;
            }
            freeEntry.value = conversion;
            container.appendChild(freeLabel);
            container.appendChild(freeEntry);
            container.appendChild(document.createElement('br'));

            //convert this to a dropdown with the categories
            let biomeLabel = document.createElement('label');
            biomeLabel.innerHTML = 'Biome: ';
            let biome = document.createElement('input');
            biome.type = 'text';
            biome.readOnly = true;
            biome.id = 'biome';
            biome.value = park.biome;
            container.appendChild(biomeLabel);
            container.appendChild(biome);
            container.appendChild(document.createElement('br'));

            let img = document.createElement('img');
            img.id = 'img';
            img.src = park.img;
            container.appendChild(img);
            container.appendChild(document.createElement('br'));

            let positionLabel = document.createElement('label');
            positionLabel.innerHTML = 'Position: ';
            let displayPosition = document.createElement('input');
            displayPosition.type = 'text';
            displayPosition.readOnly = true;
            displayPosition.id = 'position';
            displayPosition.value = '(' + position + '/' + arraySize + ')';
            container.appendChild(positionLabel);
            container.appendChild(displayPosition);
            container.appendChild(document.createElement('br'));


            createPreviousButton(container);
            createNextButton(container);
            createEditButton(container);
            createDeleteButton(container);
            createInsertBtn(container);
        }
    }
    request.open('POST', './index.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('index=' + i);

}

function createNextButton(element) {
    let next = document.createElement('button');
    next.innerHTML = "Next";
    next.type = 'button';
    next.id = 'next';
    next.onclick = function () {
        nextButton();
    }
    element.appendChild(next);
}

function createPreviousButton(element) {
    let previous = document.createElement('button');
    previous.innerHTML = 'Previous';
    previous.type = "button";
    previous.id = 'previous';
    previous.onclick = function () {
        previousButton();
    }
    element.appendChild(previous);
}

function nextButton() {
    i++;
    if (i >= arraySize) {
        i = 0;
    }
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(request.responseText);
            let park = response.park;
            arraySize = response.size;
            position = response.position;
            document.getElementById('id').value = park.id;
            document.getElementById('name').value = park.name;
            document.getElementById('location').value = park.location;
            document.getElementById('yearEstablished').value = park.yearEstablished;
            let conversion = false;
            if(park.freeEntry == 1){
                conversion = true;
            }
            document.getElementById('freeEntry').value = conversion;
            document.getElementById('biome').value = park.biome;
            document.getElementById('img').src = park.img;
            document.getElementById('position').value = '(' + position + '/' + arraySize + ')';
        }
    }
    request.open('POST', './index.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('index=' + i);
}

function previousButton() {
    i--;
    if (i == -1) {
        i = arraySize - 1;
    }
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(request.responseText);
            let park = response.park;
            arraySize = response.size;
            position = response.position;
            document.getElementById('id').value = park.id;
            document.getElementById('name').value = park.name;
            document.getElementById('location').value = park.location;
            document.getElementById('yearEstablished').value = park.yearEstablished;
            let conversion = false;
            if(park.freeEntry == 1){
                conversion = true;
            }
            document.getElementById('freeEntry').value = conversion;
            document.getElementById('biome').value = park.biome;
            document.getElementById('img').src = park.img;
            document.getElementById('position').value = '(' + position + '/' + arraySize + ')';
        }
    }
    request.open('POST', './index.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('index=' + i);
}

function createEditButton(element) {
    let edit = document.createElement('button');
    edit.innerHTML = 'Edit';
    edit.type = 'button';
    edit.id = 'edit';
    edit.onclick = function () {
        editButton();
    }
    element.appendChild(document.createElement('br'));
    element.appendChild(document.createElement('br'));
    element.appendChild(edit);
}

function editButton() {

    let button = document.getElementById('edit');
    let name = document.getElementById('name');
    let location = document.getElementById('location');
    let yearEstablished = document.getElementById('yearEstablished');
    let freeEntry = document.getElementById('freeEntry');
    let biome = document.getElementById('biome');
    let img = document.getElementById('img');
    if (button.innerHTML == 'Edit') {

        document.getElementById('jsonBtn').disabled = true;
        document.getElementById('NationalParkButton').disabled = true;
        document.getElementById('previous').disabled = true;
        document.getElementById('next').disabled = true;
        document.getElementById('insertButton').disabled = true;
        document.getElementById('deleteButton').disabled = true;

        let freeEntryMenu = document.createElement('select');
        freeEntryMenu.id = 'freeEntryMenu';
        let option1 = document.createElement('option');
        option1.value = 'true';
        option1.text = 'true';
        let option2 = document.createElement('option');
        option2.value = 'false';
        option2.text = 'false';
        freeEntryMenu.appendChild(option1);
        freeEntryMenu.appendChild(option2);

        name.readOnly = false;
        location.readOnly = false;
        yearEstablished.readOnly = false;
        freeEntryMenu.value = freeEntry.value;
        freeEntry.replaceWith(freeEntryMenu);
        biome.readOnly = false;
        //make function that allows you to modify img.src 
        button.innerHTML = 'Save';
    }
    else {
        let id = document.getElementById('id').value;
        let freeEntryMenu = document.getElementById('freeEntryMenu');
        let conversion = freeEntryMenu.value == 'true' ? 1 : 0;
        let request = new XMLHttpRequest();
        request.open('POST', './edit.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('id=' + id + '&name=' + name.value + '&location=' + location.value + '&yearEstablished=' + yearEstablished.value + '&freeEntry=' + conversion + '&biome=' + biome.value + '&img=' + img.src);

        let freeEntryReplace = document.createElement('input');
        freeEntryReplace.type = 'text';
        freeEntryReplace.id = 'freeEntry';
        freeEntryReplace.value = freeEntryMenu.value;
        freeEntryReplace.readOnly = true;
        freeEntryMenu.replaceWith(freeEntryReplace);

        name.readOnly = true;
        location.readOnly = true;
        yearEstablished.readOnly = true;
        biome.readOnly = true;

        document.getElementById('jsonBtn').disabled = false;
        document.getElementById('NationalParkButton').disabled = false;
        document.getElementById('previous').disabled = false;
        document.getElementById('next').disabled = false;
        document.getElementById('insertButton').disabled = false;
        document.getElementById('deleteButton').disabled = false;

        button.innerHTML = 'Edit';
    }
}

function createDeleteButton(element) {
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.type = 'button';
    deleteButton.id = 'deleteButton';
    deleteButton.onclick = function () {
        deleteBtn();
    }
    element.appendChild(document.createElement('br'));
    element.appendChild(deleteButton);
}

function deleteBtn() {
    let id = document.getElementById('id').value;
    let request = new XMLHttpRequest();
    request.open('POST', './delete.php');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('id=' + id);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let park = JSON.parse(request.responseText);
            arraySize--;
            position = 1;
            i = position - 1;
            document.getElementById('id').value = park.id;
            document.getElementById('name').value = park.name;
            document.getElementById('location').value = park.location;
            document.getElementById('yearEstablished').value = park.yearEstablished;
            let conversion = park.freeEntry == 1 ? 'true' : 'false';
            document.getElementById('freeEntry').value = conversion;
            document.getElementById('biome').value = park.biome;
            document.getElementById('img').src = park.img;
            document.getElementById('position').value = '(' + position + '/' + arraySize + ')';
        }
    }
}

function createInsertBtn(element) {
    let insertButton = document.createElement('button');
    insertButton.type = 'button';
    insertButton.innerHTML = 'Insert';
    insertButton.id = 'insertButton'
    insertButton.onclick = function () {
        insertBtn();
    }
    element.appendChild(document.createElement('br'));
    element.appendChild(insertButton);
}

function insertBtn() {
    let id = document.getElementById('id');
    let button = document.getElementById('insertButton');
    let name = document.getElementById('name');
    let location = document.getElementById('location');
    let yearEstablished = document.getElementById('yearEstablished');
    let freeEntry = document.getElementById('freeEntry');
    let biome = document.getElementById('biome');
    let img = document.getElementById('img');
    let position = document.getElementById('position');
    let label = document.createElement('label');
    label.id = 'imgLabel';
    if (button.innerHTML == 'Insert') {
        document.getElementById('jsonBtn').disabled = true;
        document.getElementById('NationalParkButton').disabled = true;
        document.getElementById('previous').disabled = true;
        document.getElementById('next').disabled = true;
        document.getElementById('edit').disabled = true;
        document.getElementById('deleteButton').disabled = true;

        let freeEntryMenu = document.createElement('select');
        freeEntryMenu.id = 'freeEntryMenu';
        let option1 = document.createElement('option');
        option1.value = 'true';
        option1.text = 'true';
        let option2 = document.createElement('option');
        option2.value = 'false';
        option2.text = 'false';
        freeEntryMenu.appendChild(option1);
        freeEntryMenu.appendChild(option2);

        i = arraySize;
        arraySize++;
        id.value = '';
        name.value = '';
        location.value = '';
        yearEstablished.value = '';
        freeEntryMenu.value = '';
        biome.value = '';
        img.src = '';
        name.readOnly = false;
        location.readOnly = false;
        yearEstablished.readOnly = false;
        freeEntry.replaceWith(freeEntryMenu);
        freeEntryMenu.readOnly = false;
        biome.readOnly = false;
        label.innerHTML = 'Image Link: <input type="text" id="img">';
        img.replaceWith(label);
        position.value = '(' + arraySize + '/' + arraySize + ')';
        button.innerHTML = 'Save';
    }
    else if (button.innerHTML == 'Save') {
        let freeEntryMenu = document.getElementById('freeEntryMenu');
        let conversion = freeEntryMenu.value == 'true' ? 1 : 0;

        let img = document.getElementById('img');

        let request = new XMLHttpRequest();
        request.open('POST', './insert.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('&name=' + name.value + '&location=' + location.value + '&yearEstablished=' + yearEstablished.value + '&freeEntry=' + conversion + '&biome=' + biome.value + '&img=' + img.value);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                let park = JSON.parse(request.responseText);

                let freeEntryReplace = document.createElement('input');
                freeEntryReplace.type = 'text';
                freeEntryReplace.id = 'freeEntry';
                freeEntryReplace.value = freeEntryMenu.value;
                freeEntryReplace.readOnly = true;
                freeEntryMenu.replaceWith(freeEntryReplace);

                let imgLabel = document.getElementById('imgLabel');
                let image = document.createElement('img');
                image.id = 'img';
                imgLabel.replaceWith(image);

                id.value = park.id;
                name.value = park.name;
                location.value = park.location;
                yearEstablished.value = park.yearEstablished;
                conversion = park.freeEntry == 1 ? 'true' : 'false';
                freeEntryReplace.value = conversion;
                biome.value = park.biome;
                image.src = park.img;
                position.value = '(' + arraySize + '/' + arraySize + ')';

                name.readOnly = true;
                location.readOnly = true;
                yearEstablished.readOnly = true;
                biome.readOnly = true;

                document.getElementById('jsonBtn').disabled = false;
                document.getElementById('NationalParkButton').disabled = false;
                document.getElementById('previous').disabled = false;
                document.getElementById('next').disabled = false;
                document.getElementById('edit').disabled = false;
                document.getElementById('deleteButton').disabled = false;

                button.innerHTML = 'Insert';

            }
        }
    }
}