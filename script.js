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

const yosemite = new NationalPark('Yosemite National Park', 'California', 1890, false, 'forest', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/1920px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg');
parks.push(yosemite);

const greatSmokyMountains = new NationalPark('Great Smoky Mountains National Park', 'Tennessee', 1934, true, 'forest', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Foothills_Parkway%2C_November_2018--Joye_Ardyn_Durham_%2831031302587%29.jpg/1920px-Foothills_Parkway%2C_November_2018--Joye_Ardyn_Durham_%2831031302587%29.jpg');
parks.push(greatSmokyMountains);

const grandCanyon = new NationalPark('Grand Canyon National Park', 'Arizona', 1919, false, 'desert', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/USA_09847_Grand_Canyon_Luca_Galuzzi_2007.jpg/1920px-USA_09847_Grand_Canyon_Luca_Galuzzi_2007.jpg');
parks.push(grandCanyon);

const zion = new NationalPark('Zion National Park', 'Utah', 1919, false, 'desert', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Angels_Landing.jpg/1280px-Angels_Landing.jpg');
parks.push(zion);

const rockyMountain = new NationalPark('Rocky Mountain National Park', 'Colorado', 1915, false, 'tundra', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Bierstadt_Lake%2C_Rocky_Mountain_National_Park%2C_USA.jpg/1280px-Bierstadt_Lake%2C_Rocky_Mountain_National_Park%2C_USA.jpg');
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
            const container = document.getElementById('NationalParkContainer');

            let nameLabel = document.createElement('label');
            nameLabel.innerHTML = 'Name: '
            let name = document.createElement('input');
            name.type = 'text';
            name.readOnly = true;
            name.id = "name";
            name.value = park.name;
            container.append(nameLabel);
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
            yearEstablished.type ='text';
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
            freeEntry.value = park.freeEntry;
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

            createPreviousButton(container);
            createNextButton(container);
            createEditButton(container);
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
            document.getElementById('name').value = park.name;
            document.getElementById('location').value = park.location;
            document.getElementById('yearEstablished').value = park.yearEstablished;
            document.getElementById('freeEntry').value = park.freeEntry;
            document.getElementById('biome').value = park.biome;
            document.getElementById('img').src = park.img;
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
            document.getElementById('name').value = park.name;
            document.getElementById('location').value = park.location;
            document.getElementById('yearEstablished').value = park.yearEstablished;
            document.getElementById('freeEntry').value = park.freeEntry;
            document.getElementById('biome').value = park.biome;
            document.getElementById('img').src = park.img;
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
        name.readOnly = false;
        location.readOnly = false;
        yearEstablished.readOnly = false;
        freeEntry.readOnly = false;
        biome.readOnly = false;
        //make function that allows you to modify img.src 
        button.innerHTML = 'Save';
    }
    else {
        let request = new XMLHttpRequest();
        request.open('POST', './edit.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('index=' + i + '&name=' + name.value + '&location=' + location.value + '&yearEstablished=' + yearEstablished.value + '&freeEntry=' + freeEntry.value + '&biome=' + biome.value + '&img=' + img.src);
        name.readOnly = true;
        location.readOnly = true;
        yearEstablished.readOnly = true;
        freeEntry.readOnly = true;
        biome.readOnly = true;
        button.innerHTML = 'Edit';
    }
}