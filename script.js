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

function getJSONString() { //Only used to copy and paste JSON into data.json.
    let x = JSON.stringify(parks);
    document.getElementById('jsonData').innerHTML = '<p>' + x + '</p>';
}

function getData(callback) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            callback(request);
        }
    }
    request.open("GET", "data.json", true);
    request.send();
}

let displayed = false;
function displayJSON(data) {
    let btn = document.getElementById('jsonBtn');
    if (!displayed) {
        btn.innerHTML = "Click to hide JSON data";
        document.getElementById('jsonData').innerHTML = '<p>' + data.responseText + '</p>';
        displayed = true;
    }
    else {
        btn.innerHTML = 'Click to display JSON data';
        document.getElementById('jsonData').innerHTML = '';
        displayed = false;
    }
}

let i = 0;
let previouslyPressed = false;

function displayNationalPark(data) {
    const nationalParks = JSON.parse(data.responseText);
    let park = nationalParks[i];
    const container = document.getElementById('NationalParkContainer');

    let name = document.createElement('h3');
    name.id = "name";
    name.innerHTML = 'Name: ' + park.name + ' National Park';
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

    let br = document.createElement('br');
    container.appendChild(br);
}

/*function nextButton(data) {
    const nationalParks = JSON.parse(data.responseText);
    i++;
    if (i == nationalParks.length) {
        i = 0;
    }
    let park = nationalParks[i];
    let name = document.getElementById('name');
    let location = document.getElementById('location');
    let yearEstablished = document.getElementById('yearEstablished');
    let freeEntry = document.getElementById('freeEntry');
    let biome = document.getElementById('biome');
    let img = document.getElementById('img');

    name.innerHTML = 'Name: ' + park.name + ' National Park';
    location.innerHTML = 'Location: ' + park.location;
    yearEstablished.innerHTML = 'Year Established: ' + park.yearEstablished;
    freeEntry.innerHTML = 'Free Entry: ' + park.freeEntry;
    biome.innerHTML = 'Biome: ' + park.biome;
    img.src = park.img;
}

function previousButton(data) {
    const nationalParks = JSON.parse(data.responseText);
    i--;
    if (i == -1) {
        i = nationalParks.length - 1;
    }
    let park = nationalParks[i];
    let name = document.getElementById('name');
    let location = document.getElementById('location');
    let yearEstablished = document.getElementById('yearEstablished');
    let freeEntry = document.getElementById('freeEntry');
    let biome = document.getElementById('biome');
    let img = document.getElementById('img');

    name.innerHTML = 'Name: ' + park.name + ' National Park';
    location.innerHTML = 'Location: ' + park.location;
    yearEstablished.innerHTML = 'Year Established: ' + park.yearEstablished;
    freeEntry.innerHTML = 'Free Entry: ' + park.freeEntry;
    biome.innerHTML = 'Biome: ' + park.biome;
    img.src = park.img;
}*/

function phpTest(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200){
            document.getElementById('NationalParkContainer').innerHTML = request.responseText;
        }
    }
    request.open('GET', './index.php', true);
    request.send();
}

getData(displayNationalPark);