let selectBox = document.querySelector('#selectBox'),
    menuBox = document.querySelectorAll('#menuBox li'),
    darkMode = document.querySelector('#darkMode'),
    darkModeIcon = document.querySelector('#darkMode i'),
    inputSearch = document.querySelector('#searchBar'),
    searchResults = document.querySelector('.search__result');

selectBox.addEventListener("click", () => {
    selectBox.classList.toggle('active');
});

darkMode.addEventListener("click", () => {
    darkMode.classList.toggle('active');
    darkModeIcon.classList.toggle('fa-moon');
    if (darkModeIcon.classList.contains('fa-moon')) {
        document.documentElement.style.setProperty("--veryLightGray", "hsl(207, 26%, 17%)");
        document.documentElement.style.setProperty("--white", "hsl(209, 23%, 22%)");
        document.documentElement.style.setProperty("--darkBlueText", "hsl(0, 0%, 100%)");
    } else {
        document.documentElement.style.setProperty("--veryLightGray", "hsl(0, 0%, 98%)");
        document.documentElement.style.setProperty("--white", "hsl(0, 0%, 100%)");
        document.documentElement.style.setProperty("--darkBlueText", "hsl(209, 23%, 22%)");
    }
});

//Clear Results
function clearResults() {
    searchResults.innerHTML = '';
}

//Select Countries from their continent
menuBox.forEach((li) => {
    li.addEventListener('click', (e) => {
        let c = (e.currentTarget.dataset.continent).toLowerCase();
        clearResults();
        fetch('js/data.json')
            .then((response) => response.json())
            .then((data) =>
                data.forEach((item) => {
                    if (item.region.toLowerCase() === c) {
                        createEl(item);
                    }
                })
            );
    });
})

//Get Result From Search
function getResults() {
    const searchValue = inputSearch.value;
    clearResults();

    if (searchValue !== "") {
        fetch('js/data.json')
            .then((response) => response.json())
            .then((data) =>
                data.forEach((item) => {
                    if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        createEl(item);
                    }
                })
            );
    } else {
        PrintAll();
    }
}

//Print All Results
function PrintAll() {
    fetch('js/data.json')
        .then((response) => response.json())
        .then((data) =>
            data.forEach((item) => {
                createEl(item);
            })
        );
}

//Create Our Elements
function createEl(el) {
    //Create Main Div
    let countryBox = document.createElement('div');
    countryBox.className = "country__box";
    //Create Image Div With img
    let countryImg = document.createElement('div');
    countryImg.className = "country__img";
    let photo = document.createElement('img');
    photo.src = el.flags.png;
    countryImg.appendChild(photo);
    //Create country details Div
    let countryDetails = document.createElement('div');
    countryDetails.className = "country__details";
    //Create Title Country Name
    let title = document.createElement('h4');
    let a = document.createElement('a');
    let titleText = document.createTextNode(el.name);
    a.appendChild(titleText);
    a.href = `country-details.html?countryName=${el.numericCode}`;
    title.appendChild(a);
    //Create Population Div
    let populationDiv = document.createElement('div');
    let populationStrong = document.createElement('strong');
    let populationStrongText = document.createTextNode('Population: ');
    let populationSpan = document.createElement('span');
    let populationSpanText = document.createTextNode(el.population);
    populationStrong.appendChild(populationStrongText);
    populationSpan.appendChild(populationSpanText);
    populationDiv.appendChild(populationStrong);
    populationDiv.appendChild(populationSpan);
    //Create Region Div
    let regionDiv = document.createElement('div');
    let regionStrong = document.createElement('strong');
    let regionStrongText = document.createTextNode('Region: ');
    let regionSpan = document.createElement('span');
    let regionSpanText = document.createTextNode(el.region);
    regionStrong.appendChild(regionStrongText);
    regionSpan.appendChild(regionSpanText);
    regionDiv.appendChild(regionStrong);
    regionDiv.appendChild(regionSpan);
    //Create Capital Div
    let capitalDiv = document.createElement('div');
    let capitalStrong = document.createElement('strong');
    let capitalStrongText = document.createTextNode('Capital: ');
    let capitalSpan = document.createElement('span');
    let capitalSpanText = document.createTextNode(el.capital);
    capitalStrong.appendChild(capitalStrongText);
    capitalSpan.appendChild(capitalSpanText);
    capitalDiv.appendChild(capitalStrong);
    capitalDiv.appendChild(capitalSpan);

    countryBox.appendChild(countryImg);
    countryBox.appendChild(countryDetails);
    countryDetails.appendChild(title);
    countryDetails.appendChild(populationDiv);
    countryDetails.appendChild(regionDiv);
    countryDetails.appendChild(capitalDiv);
    searchResults.appendChild(countryBox);
}

//Make An Event On the Search Input
inputSearch.addEventListener("keyup", getResults);

//Print All The Info
PrintAll();