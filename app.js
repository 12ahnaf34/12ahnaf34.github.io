const dataArea = document.getElementById("hero");
var homeworld;

//get info on Tatooine
fetch("https://swapi.dev/api/planets/1", {
    "method": "GET"
})
    .then(res => res.json())
    .then(data => {
        homeworld = "Homeworld - " + data.name;
    });

//load homepage
function home() {
    fetch("https://swapi.dev/api/people/", {
    "method": "GET"
    })
        .then(res => res.json())
        .then(data => {
            heroRoster = data;
            console.log(data.results[0]);
            createText(data.results[0]);
            
        })
}

//Display data on luke
function createText(data){
    const textDiv = document.createElement("div");
    const heroName = document.createElement("h1");
    const buffer = document.createElement("p");
    const a1 = document.createElement("a");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    var name = document.createTextNode(data.name);
    
    //heading
    heroName.appendChild(name);
    heroName.style.marginLeft = "0.5rem";
    heroName.style.fontSize = "3rem";
    textDiv.append(heroName);
    dataArea.append(textDiv);

    textDiv.append(buffer);
    buffer.classList.add("buffer");
    
    //link to Tatooine
    a1.append(homeworld);
    a1.href = "bio.html";
    a1.style.fontSize = "2rem";
    textDiv.append(a1);


    p2.append("Mass - " + data.mass);
    p3.append("Height - " + data.height);
    p4.append("Hair Color - " + data.hair_color);
    textDiv.append(p2);
    textDiv.append(p3);
    textDiv.append(p4);
}

//list all planets
function planets() {
    fetch("https://swapi.dev/api/planets/", {
        "method": "GET"
    })
        .then(res => res.json())
        .then(data => {
            var element = 1;
            const button= document.getElementById("back__button");
            button.style.display = "none";
            for (element in data.results) {
                const p = document.createElement("p");
                const planetList = document.getElementById("planet_list");
                const planetName = data.results[element].name;

                p.innerText = planetName;
                p.id = element;
                p.className = "all__planets"
                p.addEventListener("click", function(){
                    planetBio(p.id);
                    button.style.display = "block";
                })
                planetList.append(p);
            }

        })   
    }

//Generate data of a planet
function planetBio(id) {
    id++;
    fetch(`https://swapi.dev/api/planets/${id}`, {
        "method": "GET"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const planetList = document.getElementById("planet_list");

        while(planetList.firstChild) {
            planetList.removeChild(planetList.firstChild);
        }
        
        for (const [key, value] of Object.entries(data)) {
            var p = document.createElement("p");
            var key_0 = key.toUpperCase();
            var value_0 = value.toUpperCase();

            if(key_0.indexOf("_") > 0){
                key_0 = key_0.replace("_", " ");
            }

            p.innerText = `${key_0}: ${value_0}`;               
            planetList.append(p);
            
            if(key === "population")
            {
                return;
            }
        }
    })
}

//Generate full data of Tatooine
function tatooine() {
    fetch("https://swapi.dev/api/planets/1", {
        "method": "GET"
    })
        .then(res => res.json())
        .then(data => {
            for (const[key, value] of Object.entries(data)) {
                var p = document.createElement("p");
                var planetBio = document.getElementById("planet_bio");
                
                //sets all text to uppercase
                if(key === "residents" || key === "films" ) {
                    var key_0 = key;
                    var value_0 = value;
                }
                else{
                    var key_0 = key.toUpperCase();
                    var value_0 = value.toUpperCase();
                    
                    p.innerText = key_0 + ": " + value_0;
                    planetBio.append(p);
                }
                

                if(key_0.indexOf("_") > 0){
                    key_0 = key_0.replace("_", " ");
                }
                
                //Gets names of residents
                let residentList = [];
                if(key === "residents"){
                    const residents = value;
                    const length = residents.length;
                    const resP = document.createElement("p");
                    
                    for(let a = 0; a<length; a++) {
                        //console.log(residents[a]);
                        fetch(residents[a], {
                            "method": "GET"
                        })
                        .then(res => res.json())
                        .then(data => {
                            residentList.push(data.name.toUpperCase());
                            resP.innerText = "RESIDENTS: " + residentList;
                            planetBio.append(resP);
                        })
                    }
                }
                
                //Gets names of films that are related to Tatooine
                if(key === "films"){
                    let titles = []
                    const films = value;
                    const length = films.length;
                    const filmP = document.createElement("p");

                    for(let a = 0; a<length; a++) {
                        fetch(films[a], {
                            "method": "GET"
                        })
                            .then(res => res.json())
                            .then(data => {
                                titles.push(data.title.toUpperCase())
                                filmP.innerHTML = "FILMS: " + titles;
                                planetBio.append(filmP);
                            })
                        }
                        return;
                }

            }
        })
}