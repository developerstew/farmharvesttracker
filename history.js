let historyPlaceHolder = document.getElementById('historyPlaceHolder')
let historyPlaceHolder2 = document.getElementById('historyPlaceHolder2')
let fruitDataCopy = [];
let history = [];
let opsomming = [];

function saveHistory(){
    localStorage.setItem('history', JSON.stringify(history))
}
function saveOpsomming(){
 fruitDataCopy.forEach(item => {
  const found = opsomming.find(({ kultivar, blokNommer, year}) => 
    kultivar === item.kultivar && blokNommer === item.blokNommer && year === item.year)
  if(found) {
    found.bins = (Number(found.bins) + Number(item.bins)).toString();
  } else {
    opsomming.push(item);
  }
});
  localStorage.setItem('opsomming', JSON.stringify(opsomming))
}
function loadData(){
    fruitDataCopy =JSON.parse(sessionStorage.getItem('fruitData'))
    if(fruitDataCopy === null){
        fruitDataCopy = []
    }
    history = JSON.parse(localStorage.getItem('history'))
    if(history === null){
        history = []
    }
    opsomming = JSON.parse(localStorage.getItem('opsomming'))
    if(opsomming === null){
        opsomming = []
    }
    saveToHistory()
};


function saveToHistory(){
      for(data in fruitDataCopy){
        history = [...history, fruitDataCopy[data]];
      }
      saveHistory()
      saveOpsomming()
      displayHistory()
}
function displayHistory(){
    let fetch = JSON.parse(localStorage.getItem('history'))
    
    fetch.sort(function(a, b){
      return (new Date(b.datum)) - (new Date(a.datum))
    });
    let historyPlace = '';
    if(fetch.length > 0){
        fetch.map(data =>{
            let datum = data.datum;
            let kultivar = data.kultivar;
            let ha = data.ha;
            let blokNommer = data.blokNommer;
            let bins = data.bins;


     historyPlace +=
     "<div id='data'>" +
     "<p class='addedData' id='addedDatum'>"  + datum + "</p>"
     +
     "<p class='addedData' id='addedKultivar'>" + kultivar + "</p>"
     +
     "<p class='addedData' id='addedHa'>" + ha + "</p>"
     +
     "<p class='addedData' id='addedBlok'>" + blokNommer + "</p>"
     +
     "<p class='addedData' id='addedBin'>" + bins + "</p>"
     + "</div>"
     // Add elements inside html under respective headings
    historyPlaceHolder.innerHTML = historyPlace;
        })
    }
    displayOpsomming()
}
displayHistory()


function displayOpsomming(){
  let fetch = JSON.parse(localStorage.getItem('opsomming'))
  fetch.sort(function(a, b){
    return (new Date(b.datum)) - (new Date(a.datum))
  });
let output = {};
let opsommingPlace = ''
      fetch.map(data =>{
          let year = data.year;
          let kultivar = data.kultivar;
          let ha = data.ha;
          let blokNommer = data.blokNommer;
          let bins = data.bins;
        if(Object.keys(output).length === 0){
          output[year] =
          "<div class = 'opsomData'>" 
          +
          "<p class='addedOpsom' id='addedKultivar'>" + kultivar + "</p>"
          +
          "<p class='addedOpsom' id='addedHa'>" + ha + "</p>"
          +
          "<p class='addedOpsom' id='addedBlok'>" + blokNommer + "</p>"
          +
          "<p class='addedOpsom' id='addedBin'>" + bins + "</p>"
          + "</div>";
        
        }else if(year === Object.keys(output).toLocaleString()){
          output[year] += "<div class = 'opsomData'>" 
          +
          "<p class='addedOpsom' id='addedKultivar'>" + kultivar + "</p>"
          +
          "<p class='addedOpsom' id='addedHa'>" + ha + "</p>"
          +
          "<p class='addedOpsom' id='addedBlok'>" + blokNommer + "</p>"
          +
          "<p class='addedOpsom' id='addedBin'>" + bins + "</p>"
          + "</div>";
        }else{
          output[year] += 
          "<div class = 'opsomData'>" 
          +
          "<p class='addedOpsom' id='addedKultivar'>" + kultivar + "</p>"
          +
          "<p class='addedOpsom' id='addedHa'>" + ha + "</p>"
          +
          "<p class='addedOpsom' id='addedBlok'>" + blokNommer + "</p>"
          +
          "<p class='addedOpsom' id='addedBin'>" + bins + "</p>"
          + "</div>";
        }
      })
      Object.keys(output).sort()
     for(let node in output){
       if(output[node] !== undefined){
        opsommingPlace +=

       "<h1 class='opsomHeadings'>" + node + "</h1>"
       +
       '<div  id="opsomHeadings2">'
       +
       '<h2 >' + 'Kultivar' + '</h2>'
       +
      '<h2 >' + 'h/a' + '</h2>'
       +
       '<h2  >' + 'Blok Nommer' + '</h2>'
       +
       '<h2 >' +' Totale Bins' + '</h2>'
       +

      '</div>'
       +
      output[node]
       }
       
     }
     
     historyPlaceHolder2.innerHTML = opsommingPlace
}




