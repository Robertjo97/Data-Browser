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

const yosemite = new NationalPark('Yosemite', 'California', 1890, false, 'forest', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/1920px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg');
parks.push(yosemite);

const greatSmokyMountains = new NationalPark('Great Smoky Mountains', 'Tennessee', 1934, true, 'forest', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Foothills_Parkway%2C_November_2018--Joye_Ardyn_Durham_%2831031302587%29.jpg/1920px-Foothills_Parkway%2C_November_2018--Joye_Ardyn_Durham_%2831031302587%29.jpg');
parks.push(greatSmokyMountains);

const grandCanyon = new NationalPark('Grand Canyon', 'Arizona', 1919, false, 'desert', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/USA_09847_Grand_Canyon_Luca_Galuzzi_2007.jpg/1920px-USA_09847_Grand_Canyon_Luca_Galuzzi_2007.jpg');
parks.push(grandCanyon);

const zion = new NationalPark('Zion', 'Utah', 1919, false, 'desert', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Angels_Landing.jpg/1280px-Angels_Landing.jpg');
parks.push(zion);

const rockyMountain = new NationalPark('Rocky Mountain', 'Colorado', 1915, false, 'tundra', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Bierstadt_Lake%2C_Rocky_Mountain_National_Park%2C_USA.jpg/1280px-Bierstadt_Lake%2C_Rocky_Mountain_National_Park%2C_USA.jpg');
parks.push(rockyMountain);

let JSONPressed = false;
function getJSONString() {
    if(JSONPressed){
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

            let label = document.createElement('label');
            let name = document.createElement('input');
            label.for = 'name';
            label.innerHTML = 'Name: '
            name.type='text';
            name.readOnly = true;
            name.id = "name";
            name.value = park.name + ' National Park';
            container.append(label);
            container.appendChild(name);

            let location = document.createElement('p');
            location.id = 'location';
            location.innerHTML = 'Location: ' + park.location;
            container.appendChild(location);

            let yearEstablished = document.createElement('p');
            yearEstablished.id = 'yearEstablished';
            yearEstablished.innerHTML = 'Year Established: ' + park.yearEstablished;
            container.appendChild(yearEstablished);

            let freeEntry = document.createElement('p');
            freeEntry.id = 'freeEntry';
            freeEntry.innerHTML = 'Free Entry: ' + park.freeEntry;
            container.appendChild(freeEntry);

            let biome = document.createElement('p');
            biome.id = 'biome';
            biome.innerHTML = 'Biome: ' + park.biome;
            container.appendChild(biome);

            let img = document.createElement('img');
            img.id = 'img';
            img.src = park.img;
            container.appendChild(img);

            let br1 = document.createElement('br');
            //let br2 = document.createElement('br');
            container.appendChild(br1);
            //container.appendChild(br2);

            createPreviousButton(container);
            createNextButton(container);
            createEditButton(container);
        }
    }
    request.open('POST', './index.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('index=' + i);

}

function createNextButton(element){
    let next = document.createElement('button');
    next.innerHTML = "Next";
    next.type = 'button';
    next.id = 'next';
    next.onclick = function () {
        nextButton();
    }
    element.appendChild(next);
}

function createPreviousButton(element){
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
            document.getElementById('name').innerHTML = 'Name: ' + park.name + ' National Park';
            document.getElementById('location').innerHTML = 'Location: ' + park.location;
            document.getElementById('yearEstablished').innerHTML = 'Year Established: ' + park.yearEstablished;
            document.getElementById('freeEntry').innerHTML = 'Free Entry: ' + park.freeEntry;
            document.getElementById('biome').innerHTML = 'Biome: ' + park.biome;
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
            document.getElementById('name').innerHTML = 'Name: ' + park.name + ' National Park';
            document.getElementById('location').innerHTML = 'Location: ' + park.location;
            document.getElementById('yearEstablished').innerHTML = 'Year Established: ' + park.yearEstablished;
            document.getElementById('freeEntry').innerHTML = 'Free Entry: ' + park.freeEntry;
            document.getElementById('biome').innerHTML = 'Biome: ' + park.biome;
            document.getElementById('img').src = park.img;
        }
    }
    request.open('POST', './index.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('index=' + i);
}

function createEditButton(element){
    let br1 = document.createElement('br');
    let br2 = document.createElement('br');
    let edit = document.createElement('button');
    edit.innerHTML = 'Edit';
    edit.type = 'button';
    edit.id = 'edit';
    edit.onclick = function(){
        editButton();
    }
    element.appendChild(br1);
    element.appendChild(br2);
    element.appendChild(edit);
}

function editButton(){
    let name =document.getElementById('name');
    if(name.readOnly == true){
        name.readOnly = false;
    }
    else {
        name.readOnly = true;
    }
}