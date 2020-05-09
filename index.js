let inputButton = document.getElementById('inputButton');
let kultivarOptions = document.getElementById('kultivarOptions')
let fruitDetails = document.getElementsByClassName('fruitInput');
let blokInput = document.getElementById('blokInput');
let fruitPlaceholder =document.getElementById('fruitPlaceholder');
// Data to appear after event
let fruitDataDisplay = document.getElementById('fruitData')
let historyButton = document.getElementById('addToHistory')
let nuweKultivarButton = document.getElementById('nuweKultivarButton');
let fruitData = [];
let kultivars = [];

function FruitTotal(datum,kultivar,ha,blokNommer,bins, year){
    this.datum = datum;
    this.kultivar = kultivar;
    this.ha = ha;
    this.blokNommer = blokNommer;
    this.bins = Number(bins);
    this.year = year;
}
function loadKultivars(){
    let kultivars = JSON.parse(localStorage.getItem('kultivars'))
    if(kultivars === null){
        kultivars = []
    }
    if(kultivars.length > 0){
        for(let data in kultivars){
            let element = document.createElement('option');
            let newKultivar =document.createTextNode(kultivars[data]) 
            element.appendChild(newKultivar)
            kultivarOptions.appendChild(element)
        }
    }
}
loadKultivars()

//Runs data through constructor and saves in array as well as localstorage
function addData(datum,kultivar,ha,blokNommer,bins, year){
    let fruit = new FruitTotal(datum,kultivar,ha,blokNommer,bins, year);
    fruitData.push(fruit)
}
function displayData(){
    let fruitPlace = '';
    if(fruitData.length > 0){
        fruitData.map(data =>{
            let datum = data.datum;
            let kultivar = data.kultivar;
            let ha = data.ha;
            let blokNommer = data.blokNommer;
            let bins = data.bins;
     fruitPlace +=
     "<div id='data'>" +
     "<p class='addedData' id='addedDatum'>"  + datum + "</p>"
     +
     "<p class='addedData' id='addedKultivar'>" + kultivar + "</p>"
     +
     "<p class='addedData' id='addedHa'>" + ha + "</p>"
     +
     "<p class='addedData' id='addedBlok'>" + blokNommer + "</p>"
     +
     "<p class='addedData' id='addedBin'>" + bins + "<button id='removeButton' onclick= 'removeFromArray(this)' >" + "X" + "</button>" + "</p>"
     + "</div>"
     // Add elements inside html under respective headings
     fruitPlaceholder.innerHTML = fruitPlace;
        })
    }else{
        fruitPlaceholder.innerHTML = null;
        toggleOnEvents()
    }
 
}


nuweKultivarButton.addEventListener('click', (event) =>{
    kultivars = [...kultivars, nuweKultivarButton.previousElementSibling.value.toLowerCase()]
    console.log(kultivars)
    localStorage.setItem('kultivars',JSON.stringify(kultivars))
    loadKultivars()
    alert('Gevoeg by kultivars')
    event.preventDefault()
})
// Get input values and send to addData function
inputButton.addEventListener('click', (event) =>{
    event.preventDefault()
  const patterns = {
      blok: /^[c,C]?[0-9]+$/
  }
    for(let info in fruitDetails){
        if((fruitDetails)[info].value.length === 0){
            alert("Vul asb alles in!");
            break
        }
        // Checks the regex so block number is entered correctly
        else if(!blokInput.value.match(patterns.blok)){
            alert("Tik blok nommer reg in. Moet met 'n C begin of slegs 'n nommer wees! (c1, c2,c3) of (1,2,3)")
            break
        }
        else{
            let datum = fruitDetails[0].value;
            let kultivar = fruitDetails[1].value;
            let ha = fruitDetails[2].value;
            let blokNommer = fruitDetails[3].value;
            let bins = fruitDetails[4].value;
            let year = datum.slice(0,4);
            addData(datum,kultivar,ha,blokNommer,bins, year)
            displayData()
            break
        }
    }
    toggleOnEvents()
    loadKultivars()
})
    // Added after voeg by
// Remove value from table
removeField = (e) => {
let toErase = e.parentElement.parentElement;
toErase.remove();
toggleOnEvents()
displayData()
}
removeFromArray = (e) => {
    var index = Array.from(fruitPlaceholder.children).indexOf(e.parentElement.parentElement)
    let sliced = fruitData.splice(index, 1)
    fruitData = sliced;
    removeField(e)
}
function toggleOnEvents(){
    if(fruitPlaceholder.children.length !== 0){
        historyButton.className = 'addToHistoryToggle';
        fruitDataDisplay.className = 'fruitDataDisplay';
    }else{
        historyButton.className = 'addButton'
        fruitDataDisplay.className = 'fruitData'
        fruitData = [];
    }
}

historyButton.addEventListener('click', () =>{
    alert('Gevoeg by geskiedenis');
    sessionStorage.setItem('fruitData', JSON.stringify(fruitData))
    fruitData = [];
    displayData();
    loadData();
})

    
