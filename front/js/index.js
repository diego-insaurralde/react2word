let dataCsv = {};
let currentLanguage = {};
let fileTypes = ['csv'];
let dictValidations = {};

document.addEventListener("DOMContentLoaded", async function() {
    const fileInput = document.getElementById('csvFile');
    fileInput.addEventListener('change', function(e) {
        handleFileCSV(e)
    });

    await setLanguage("pt");
});

const submitReaction = async(e) =>  {
    displaySection("section-reactions", false);
    displaySection("section-copy", false);

    var reactants = document.getElementById('reactants').value;
    var products = document.getElementById('products').value;

    cleanValidations();

    if (!validation()){
        return false; 
    }

    if (reactants.length > 0 && products.length > 0) {
        const reactionData = {
            "reactionData": {
                "reactants": reactants,
                "products": products,   
            },
            "isSingleReaction": true
        };
        const response = await postReaction(reactionData);
        if(!response){
            return false; 
        }

        const htmlString = response["reactionString"];

        document.getElementById('reaction-result').innerHTML = htmlString;
        document.getElementById('reaction-clipboard').value = htmlString;

        displaySection("section-reactions", true);
        displaySection("section-copy", true);


    }else if (dataCsv["reactionData"]) {
        dataCsv["isSingleReaction"] = false;
        const response = await postReaction(dataCsv);
        if(!response){
            return false; 
        }
        const htmlString = response["reactionString"];


        document.getElementById('reaction-result').innerHTML = htmlString;
        document.getElementById('reaction-clipboard').value = htmlString;

        displaySection("section-reactions", true);
        displaySection("section-copy", true);
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
    const apiLink = "https://7qhw0bd6hg.execute-api.us-east-1.amazonaws.com/react2word";
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
            let idErrorMsg = "error-submit"
            if(response.status === 415){
                let msg = currentLanguage["errors"]["serverErrors"]["415"]
                errorMsg(msg, idErrorMsg, "415");
                return false;
            }else if(response.status === 400){
                let msg = currentLanguage["errors"]["serverErrors"]["400"]
                errorMsg(msg, idErrorMsg, "400");
                return false;
            }else{
                let msg = currentLanguage["errors"]["serverErrors"]["500"]
                errorMsg(msg, idErrorMsg, "500");
                return false;
            }
        }

        const responseJSON = await response.json();
        return responseJSON;
    }
    catch(error){
        console.log(error);
    }
};

function handleFileCSV(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    
    if (file) {
        let extension = file.name.split('.').pop().toLowerCase(); 
        let isSuccess = fileTypes.indexOf(extension) > -1;      
        
        if (isSuccess){
            const reader = new FileReader();
            reader.onload = function (e) {
                const csvContent = e.target.result;
                dataCsv["reactionData"] = csvContent;
                }

            reader.readAsText(file);
        }
    }else{
        dataCsv["reactionData"] = "";
    }
}

function fileSelected() {
    var fileInput = document.getElementById('csvFile');
    var fileInputLabel = document.getElementById('button-choosefile');
    displaySection("section-reactions", false);
    displaySection("section-copy", false);

    if (fileInput.files.length > 0) {
      // Um arquivo foi selecionado
      fileInputLabel.innerText = fileInput.files[0].name;
    } else {
      // Nenhum arquivo selecionado
      fileInput.files[0] = '';
      fileInputLabel.innerText = currentLanguage["textChooseFile"];
      cleanValidations();
    }
}

function displaySection(section, isVisible) {
    var sectionToDisplay = document.getElementById(section);

    if (isVisible){
        sectionToDisplay.style.display = "block";
        return;
    }
    sectionToDisplay.style.display = "none";
}

const loadLanguage = async (language)=>{
    let jsonFile; 

    if (language === "en"){
        jsonFile = "js/locales/en.json";
    }
    else if(language ==="es"){
        jsonFile = "js/locales/es.json";
    }else {
        jsonFile = "js/locales/pt.json";
    }

    const response = await fetch(jsonFile);
    const responseJson = await response.json();

    currentLanguage = responseJson;
};


const setLanguage = async (language)=>{

    await loadLanguage(language);

    document.getElementById('text-description').innerHTML = currentLanguage["textDescription"];
    document.getElementById('text-insert').innerHTML = currentLanguage["titleInsertReaction"];
    document.getElementById('text-reactants').innerHTML = currentLanguage["textReactants"];
    document.getElementById('text-products').innerHTML = currentLanguage["textProducts"];
    document.getElementById('text-csvupload').innerHTML = currentLanguage["textUploadCSV"];
    document.getElementById('button-send').innerHTML = currentLanguage["textButtonSend"];
    document.getElementById('title-result').innerHTML = currentLanguage["titleResult"];
    document.getElementById('title-copy').innerHTML = currentLanguage["titleCopyToWord"];
    document.getElementById('button-copy').innerHTML = currentLanguage["textCopyButton"];
    document.getElementById('text-footer').innerHTML = currentLanguage["footerText"];

    let fileInputField = $('#csvFile')[0];
    
    if (fileInputField.files.length === 0) {
    document.getElementById('button-choosefile').innerHTML = currentLanguage["textChooseFile"];
    }

    setLanguageError();

    let instructions = currentLanguage["instructions"];
    let tooltipInstructions = document.getElementById('tooltip-csv-content');
    tooltipInstructions.innerHTML = "";

    //let listItems = document.createElement("ul");
    //tooltipInstructions.appendChild(listItems);
    instructions.forEach(function(instruction) {
        let instructionItem = document.createElement('li');
        instructionItem.textContent = instruction;
        tooltipInstructions.appendChild(instructionItem);
    });
};


function setLanguageError(){
    if (Object.keys(dictValidations).length > 0){
        for (var validation in dictValidations){
            let element = document.getElementById(validation);
            let keyLanguage = dictValidations[validation];
            let textError = currentLanguage["errors"]["frontErrors"][keyLanguage];
            if (!textError){
                textError = currentLanguage["errors"]["serverErrors"][keyLanguage];
            }   
            element.textContent = textError;
            
        }
    }
}


function restartGif(){
    var gif = document.getElementById('tooltip-copy');
    var src = gif.src;
    gif.src = '';
    gif.src = src;
}


function errorMsg(msg, idErrorMsg, valueMsgError){
    let element = document.getElementById(idErrorMsg);
    let node = document.createElement('p');
    node.textContent = msg; 
    element.appendChild(node);

    dictValidations[idErrorMsg] = valueMsgError;
}


function removeError(idErrorMsg){
    //let node = document.getElementById(idWhereError);
    let element = document.getElementById(idErrorMsg);
    let child = element.firstChild;
    if (child){
        element.removeChild(child);
    }
}


function validation(){
    let file = document.getElementById('csvFile');
    let reactantField = document.getElementById('reactants');
    let productField = document.getElementById('products');

    if (file.value === ''){
        if (productField.value === '' && reactantField.value === ''){
            let idErrorMsg = 'error-empty-fields';
            let valueMsgError = "emptyValues";
            msg = currentLanguage["errors"]["frontErrors"]["emptyValues"];
            errorMsg(msg, idErrorMsg, valueMsgError);

            return false; 
        }
        return true; 
    }
    let fileInputField = $('#csvFile')[0];
    let fileCsv = fileInputField.files[0];
    let extension = fileCsv.name.split('.').pop().toLowerCase(); 
    let isSuccess = fileTypes.indexOf(extension) > -1;   
    if (isSuccess){
        return true;
    }

    let error = currentLanguage["errors"]["frontErrors"]["formatInvalid"];
    let idErrorMsg = "error-invalid-format";
    let valueMsgError = "formatInvalid";

    errorMsg(error, idErrorMsg, valueMsgError);  


    return false; 
}

function cleanValidations() {
    if (dictValidations){
        
        for (var validation in dictValidations){
            console.log(validation);
            removeError(validation);
        }
        dictValidations = {}
    }

}