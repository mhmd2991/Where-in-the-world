let darkMode = document.querySelector('#darkMode'),
    darkModeIcon = document.querySelector('#darkMode i'),
    backBtn = document.querySelector('.btn__container'),
    row = document.querySelector('#row');

backBtn.addEventListener('click', () => {
    window.history.go(-1);
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

//Create Our Elements
let parms = new URLSearchParams(document.location.search);
let id = parms.get("countryName").toLowerCase();

fetch('js/data.json')
    .then((response) => response.json())
    .then((data) =>
        data.forEach((item) => {
            if (item.name.toLowerCase() === id) {
                row.innerHTML = `
                <div class="image__container">
                <img src="${item.flags.png}" alt="">
            </div>
            <div class="country__details">
                <h4><a href="country-details.html?countryName=${item.name}">${item.name}<a/></h4>
                <div class="details">
                    <div class="list__content">
                        <ul>
                            <li><strong>native name: </strong><span>${item.name}</span></li>
                            <li><strong>population: </strong><span>${item.population}</span></li>
                            <li><strong>region: </strong><span>${item.region}</span></li>
                            <li><strong>sub region: </strong><span>${item.subregion}</span></li>
                            <li><strong>capital: </strong><span>${item.capital}</span></li>
                        </ul>
                        <ul>
                            <li><strong>top level domain: </strong><span>${item.topLevelDomain}</span></li>
                            <li><strong>currencies: </strong><span>${item.currencies.map((currencie)=>{
                                return currencie.name;
                            })}</span></li>
                            <li><strong>languages: </strong><span>${item.languages.map((language) => {
                                return language.nativeName;
                            })}</span></li>
                        </ul>
                    </div>
                    <div class="border__countries">
                        <h5>border countries:</h5>
                        <div class="border__content">
                            ${item.borders.map((el) => {
                                return `<span>${el}</span>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
                `;
            }
        })
    );
