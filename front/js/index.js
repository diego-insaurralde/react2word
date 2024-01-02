let dataCsv = {};
    

document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('csvFile');
    fileInput.addEventListener('change', function(e) {
        handleFileCSV(e)
    });
    
});

const submitReaction = async(e) =>  {
    var reactants = document.getElementById('reactants').value;
    var products = document.getElementById('products').value;

    if (reactants.length > 0 && products.length > 0) {
        const reactionData = {
            "reactants": reactants,
            "products": products
        };
        const response = await postReaction(reactionData);
        console.log(response);
    }else if (dataCsv["dataCsv"]) {
        const response = await postReaction(dataCsv);
        const htmlString = response["reactionString"];


        document.getElementById('reaction-result').innerHTML = htmlString;
        document.getElementById('reaction-clipboard').value = htmlString;
    }
    // Atualize o resultado das reações
    
}

function copyToClipboard() {
    var copyText = document.getElementById("reaction-clipboard");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);    
}

const postReaction = async function(data){

    data = JSON.stringify(data);
    const apiLink = "/reaction";
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    };

    try{
        const response = await fetch(apiLink, request);

        if(!response.ok){
            throw new Error("Server Error");
        }

        const responseJSON = await response.json();
        let text = responseJSON["body"];
        
        return text;
    }
    catch(error){
        console.log(error);
    }
};

function handleFileCSV(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const csvContent = e.target.result;
        dataCsv["dataCsv"] = csvContent;
        }
        reader.readAsText(file);
    }else{
        dataCsv["dataCsv"] = "";
    }
}


function changeToEnglish(){

}


function fileSelected() {
    var fileInput = document.getElementById('csvFile');
    var fileInputLabel = document.getElementById('text-choosefile');

    if (fileInput.files.length > 0) {
      // Um arquivo foi selecionado
      fileInputLabel.innerText = fileInput.files[0].name;
    } else {
      // Nenhum arquivo selecionado
      fileInputLabel.innerText = 'Escolher arquivo';
    }
  }