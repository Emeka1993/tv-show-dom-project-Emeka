//You can edit ALL of the code here

function formattedEpisode(episode, nameAtStart) {
    let rootSeason = `${episode.season}`;
    let rootEpisode = `${episode.number}`;
    let paddedSeason = rootSeason.padStart(2, "0");
    let paddedEpisode = rootEpisode.padStart(2, "0");

    if (nameAtStart) {
        return `${episode.name} - S${paddedSeason}E${paddedEpisode}`;
    } else {
        return `S${paddedSeason}E${paddedEpisode} - ${episode.name}`;
    }
}


let allEpisodes = [];


function setup() {
    let headerElement = document.getElementsByTagName("header")[0];
    
    //headerElement.innerHTML = "";
    createSearchInput();

    createEpisodesSelectionList(allEpisodes);
    makePageForEpisodes(getShows);
}




function makePageForEpisodes(episodeList) {
    console.log("list",episodeList)
    let episodes = [];
    let rootElem = document.getElementById("root");

    rootElem.innerHTML = "";
    rootElem.style.backgroundColor = "#FFFFFF";

    for (let episode of episodeList) {
        let parentContainer = document.createElement("div");
        parentContainer.classList.add("parentWrapper");
        rootElem.appendChild(parentContainer);

        let nameContainer = document.createElement("div");
        nameContainer.classList.add("nameWrapper");
        parentContainer.appendChild(nameContainer);
        nameContainer.innerHTML = formattedEpisode(episode, true);

        let imageContainer = document.createElement("img");
        imageContainer.classList.add("imageWrapper");

        if (episode.image != null) {
            let usedImage = episode.image.medium;
            imageContainer.src = usedImage;
            parentContainer.appendChild(imageContainer);
            parentContainer.style.height = "480px";
        }

        if (episode.summary) {
            let textContainer = document.createElement("span");
            textContainer.classList.add("textWrapper");
            textContainer.innerHTML = `${episode.summary}`;
            parentContainer.appendChild(textContainer);
        }

        episodes.push(episode);
    }
}

function makePageForAllShows(episodeList) {
    
    let episodes = [];
    let rootElem = document.getElementById("root");

    rootElem.innerHTML = "";
    rootElem.style.backgroundColor = "#FFFFFF";

    for (let episode of episodeList) {
        let parentContainer = document.createElement("div");
        parentContainer.classList.add("parentWrapper");
        rootElem.appendChild(parentContainer);

        let nameContainer = document.createElement("div");
        nameContainer.classList.add("nameWrapper");
        parentContainer.appendChild(nameContainer);
        nameContainer.innerHTML = formattedEpisode(episode, true);

        let imageContainer = document.createElement("img");
        imageContainer.classList.add("imageWrapper");

        if (episode.image !== null) {
            let usedImage = episode.image.medium;
            imageContainer.src = usedImage;
            parentContainer.appendChild(imageContainer);
            parentContainer.style.height = "480px";
        }

        if (episode.summary) {
            let textContainer = document.createElement("span");
            textContainer.classList.add("textWrapper");
            textContainer.innerHTML = `${episode.summary}`;
            parentContainer.appendChild(textContainer);
        }

        episodes.push(episode);
    }
}


function createSearchInput() {
    let headerElement = document.getElementsByTagName("header")[0];
    let inputElement = document.createElement("input");
    inputElement.classList.add("input");
    inputElement.setAttribute("placeholder", "Search an episode");
    let displayElement = document.createElement("div");
    displayElement.classList.add("display");
    let paragraphElement = document.createElement("p");
    paragraphElement.classList.add("paragraph");
    paragraphElement.setAttribute("data-placeholder", "Full catalogue");
    headerElement.appendChild(inputElement);
    headerElement.appendChild(displayElement);
    displayElement.appendChild(paragraphElement);
    inputElement.addEventListener("input", searchEpisodes);
}

function searchEpisodes() {
    let filteredEpisodes = [];
    let episodeList = allEpisodes;

    let word = document.getElementsByTagName("input")[0].value;
    word = word.toLowerCase();

    let counter = 0;
    for (let episode of episodeList) {
        if (
            episode.name.toLowerCase().match(word) ||
            episode.summary.toLowerCase().match(word) ||
            episode.name.toLowerCase().match(parseInt(word)) ||
            episode.summary.toLowerCase().match(parseInt(word))
        ) {
            filteredEpisodes.push(episode);
            counter++;
        }
    }
    let paragraphElement = document.getElementsByClassName("paragraph")[0];
    paragraphElement.setAttribute('id', 'display-text')
    paragraphElement.innerHTML = `Displaying ${counter} / ${episodeList.length} episode(s)`;
    makePageForEpisodes(filteredEpisodes);
    let selectList = document.getElementsByClassName("select")[0];
    selectList.value = "Select an episode";
    
    
}

function createEpisodesSelectionList(listOfEpisodes) {
    let selectList = document.getElementById("select");
    selectList.classList.add("select");
    //let headerElement = document.getElementsByTagName("header")[0];
    //headerElement.appendChild(selectList);

    let option = document.createElement("option");
    option.classList.add("option");
    selectList.appendChild(option);
    

    for (let episode of listOfEpisodes) {
        let option = document.createElement("option");
        option.text = formattedEpisode(episode, false);
        option.value = episode.name 
        //console.log(episode.name)

        selectList.appendChild(option);
    }
    selectList.addEventListener("change", selectOneEpisode)
    // (event)=>{
    //     console.log(event.target.value)
    //     let sellected = listOfEpisodes.filter((e) => {
    //         e.name === event.target.value 
    //         })
    //     //let s = [] 
    //     //s.push(sellected) 
    //     console.log(sellected)
    //     makePageForEpisodes(sellected)
    // });
}













function selectOneEpisode(e) {

    let listOfEpisodes = allEpisodes;
    let inputElement = document.getElementsByClassName("input")[0];
    inputElement.value = "";

    let paragraphElement = document.getElementsByClassName("paragraph")[0];
    paragraphElement.innerHTML = `Displaying your selection`;

    let selectList = document.getElementsByClassName("select")[0];

    if (selectList.value === "Select an episode") {
        paragraphElement.innerHTML = `Full catalogue`;
        makePageForEpisodes(listOfEpisodes);

    } else {
        let selected = listOfEpisodes.filter(epi => epi.name === e.target.value)
        makePageForEpisodes(selected);
    }
}





    const getShows = getAllShows().sort((a,b) => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    }); 
    let showSelect = document.getElementById("show_select")
    function showsAll(shows){
       showSelect.classList.add("select");

        let option = document.createElement("option");
        option.classList.add("option");
        option.textContent = "shows";
        showSelect.appendChild(option);
        
   



    shows.forEach(element => {
    let option = document.createElement("option");
    option.classList.add("option");
    option.value = element.id 
    option.textContent = element.name;
    showSelect.appendChild(option);
    
        
    });
    showSelect.addEventListener("change",(event)=>{
    let showid = event.target.value
    fetchData(showid)
    })
}




showsAll(getShows)

// This is the fetch api
const fetchData = (showID) => {
    const URL = `https://api.tvmaze.com/shows/${showID}/episodes`;
    fetch(URL)
        .then(function (response) {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw `Error: ${response.statusText}`;
            }
        })

        .then(function (episodeList) {
            allEpisodes = episodeList;
            makePageForEpisodes(allEpisodes)
            createEpisodesSelectionList(allEpisodes)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

//window.onload = fetchData(82);

window.onload = setup
