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

    
    let htmlString = `<math xmlns="http://www.w3.org/1998/Math/MathML">         <mtable columnalign="left">          <mtr> <mtd>  <msub><mi>C</mi><mn>30</mn></msub><msub><mi>H</mi><mn>52</mn></msub><msub><mi>O</mi><mn>26</mn></msub><mn>+</mn><mn>4</mn> <msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> <mo>&#x2192;</mo> <mn>5</mn><msub><mi>C</mi><mn>6</mn></msub><msub><mi>H</mi><mn>12</mn></msub><msub><mi>O</mi><mn>6</mn></msub> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>30</mn></msub><msub><mi>H</mi><mn>52</mn></msub><msub><mi>O</mi><mn>26</mn></msub><mn>+</mn><mn>4</mn> <msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> <mo>&#x2192;</mo> <mn>5</mn><msub><mi>C</mi><mn>6</mn></msub><msub><mi>H</mi><mn>12</mn></msub><msub><mi>O</mi><mn>6</mn></msub> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>13</mn></msub><msub><mi>H</mi><mn>25</mn></msub><msub><mi>O</mi><mn>7</mn></msub><msub><mi>N</mi><mn>3</mn></msub><msub><mi>S</mi><mn>1</mn></msub><mn>+</mn><mn>6</mn> <msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> <mo>&#x2192;</mo> <mn>6,5000</mn><mi>C</mi><msub><mi>H</mi><mn>4</mn></msub><mn>+</mn><mn>6,5000</mn><mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>3</mn><msub><mi>H</mi><mn>3</mn></msub><mi>N</mi><mn>+</mn><msub><mi>H</mi><mn>2</mn></msub><mi>S</mi> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>57</mn></msub><msub><mi>H</mi><mn>104</mn></msub><msub><mi>O</mi><mn>6</mn></msub><mn>+</mn><mn>3</mn> <msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> <mo>&#x2192;</mo> <msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>8</mn></msub><msub><mi>O</mi><mn>3</mn></msub><mn>+</mn><mn>3</mn><msub><mi>C</mi><mn>18</mn></msub><msub><mi>H</mi><mn>34</mn></msub><msub><mi>O</mi><mn>2</mn></msub> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>6</mn></msub><msub><mi>H</mi><mn>12</mn></msub><msub><mi>O</mi><mn>6</mn></msub><mn>+</mn><mn>0,1115</mn> <msub><mi>H</mi><mn>3</mn></msub><mi>N</mi> <mo>&#x2192;</mo> <mn>0,1115</mn><msub><mi>C</mi><mn>5</mn></msub><msub><mi>H</mi><mn>7</mn></msub><msub><mi>O</mi><mn>2</mn></msub><msub><mi>N</mi><mn>1</mn></msub><mn>+</mn><mn>0,7440</mn><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>4</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,5000</mn><msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>6</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,4409</mn><msub><mi>C</mi><mn>4</mn></msub><msub><mi>H</mi><mn>8</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,6909</mn><mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>1,0254</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>6</mn></msub><msub><mi>H</mi><mn>12</mn></msub><msub><mi>O</mi><mn>6</mn></msub> <mo>&#x2192;</mo> <mn>2</mn><msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>6</mn></msub><msub><mi>O</mi><mn>3</mn></msub> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>6</mn></msub><msub><mi>H</mi><mn>12</mn></msub><msub><mi>O</mi><mn>6</mn></msub> <mo>&#x2192;</mo> <mn>2</mn><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>6</mn></msub><mi>O</mi><mn>+</mn><mn>2</mn><mi>C</mi><msub><mi>O</mi><mn>2</mn></msub> </mtd> </mtr> <mtr> <mtd> <mn>3</mn> <msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>6</mn></msub><msub><mi>O</mi><mn>3</mn></msub> <mo>&#x2192;</mo> <mn>2</mn><msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>6</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>4</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>18</mn></msub><msub><mi>H</mi><mn>34</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,1701</mn> <msub><mi>H</mi><mn>3</mn></msub><mi>N</mi><mn>+</mn><mn>0,2501</mn> <mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>15,2396</mn> <msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> <mo>&#x2192;</mo> <mn>0,1701</mn><msub><mi>C</mi><mn>5</mn></msub><msub><mi>H</mi><mn>7</mn></msub><msub><mi>O</mi><mn>2</mn></msub><msub><mi>N</mi><mn>1</mn></msub><mn>+</mn><mn>8,6998</mn><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>4</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>14,4978</mn><msub><mi>H</mi><mn>2</mn></msub> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>4</mn></msub><msub><mi>H</mi><mn>8</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,0653</mn> <msub><mi>H</mi><mn>3</mn></msub><mi>N</mi><mn>+</mn><mn>0,8038</mn> <msub><mi>H</mi><mn>2</mn></msub><mi>O</mi><mn>+</mn><mn>0,0006</mn> <msub><mi>H</mi><mn>2</mn></msub><mn>+</mn><mn>0,5543</mn> <mi>C</mi><msub><mi>O</mi><mn>2</mn></msub> <mo>&#x2192;</mo> <mn>0,0653</mn><msub><mi>C</mi><mn>5</mn></msub><msub><mi>H</mi><mn>7</mn></msub><msub><mi>O</mi><mn>2</mn></msub><msub><mi>N</mi><mn>1</mn></msub><mn>+</mn><mn>1,8909</mn><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>4</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,4460</mn><mi>C</mi><msub><mi>H</mi><mn>4</mn></msub> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>8</mn></msub><msub><mi>O</mi><mn>3</mn></msub><mn>+</mn><mn>0,0407</mn> <msub><mi>H</mi><mn>3</mn></msub><mi>N</mi><mn>+</mn><mn>0,0291</mn> <mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,0005</mn> <msub><mi>H</mi><mn>2</mn></msub> <mo>&#x2192;</mo> <mn>0,0407</mn><msub><mi>C</mi><mn>5</mn></msub><msub><mi>H</mi><mn>7</mn></msub><msub><mi>O</mi><mn>2</mn></msub><msub><mi>N</mi><mn>1</mn></msub><mn>+</mn><mn>0,9418</mn><msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>6</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>1,0931</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>3</mn></msub><msub><mi>H</mi><mn>6</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,0620</mn> <msub><mi>H</mi><mn>3</mn></msub><mi>N</mi><mn>+</mn><mn>0,3143</mn> <msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> <mo>&#x2192;</mo> <mn>0,0620</mn><msub><mi>C</mi><mn>5</mn></msub><msub><mi>H</mi><mn>7</mn></msub><msub><mi>O</mi><mn>2</mn></msub><msub><mi>N</mi><mn>1</mn></msub><mn>+</mn><mn>0,9345</mn><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>4</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,6604</mn><mi>C</mi><msub><mi>H</mi><mn>4</mn></msub><mn>+</mn><mn>0,1607</mn><mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,0006</mn><msub><mi>H</mi><mn>2</mn></msub> </mtd> </mtr> <mtr> <mtd> <mn>2</mn> <msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>6</mn></msub><mi>O</mi><mn>+</mn> <mi>C</mi><msub><mi>O</mi><mn>2</mn></msub> <mo>&#x2192;</mo> <mn>2</mn><msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>4</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mi>C</mi><msub><mi>H</mi><mn>4</mn></msub> </mtd> </mtr> <mtr> <mtd>  <msub><mi>C</mi><mn>2</mn></msub><msub><mi>H</mi><mn>4</mn></msub><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,0220</mn> <msub><mi>H</mi><mn>3</mn></msub><mi>N</mi> <mo>&#x2192;</mo> <mn>0,0220</mn><msub><mi>C</mi><mn>5</mn></msub><msub><mi>H</mi><mn>7</mn></msub><msub><mi>O</mi><mn>2</mn></msub><msub><mi>N</mi><mn>1</mn></msub><mn>+</mn><mn>0,9450</mn><mi>C</mi><msub><mi>H</mi><mn>4</mn></msub><mn>+</mn><mn>0,9450</mn><mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,0660</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> </mtd> </mtr> <mtr> <mtd> <mn>14,4976</mn> <msub><mi>H</mi><mn>2</mn></msub><mn>+</mn><mn>3,8334</mn> <mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mn>+</mn><mn>0,0836</mn> <msub><mi>H</mi><mn>3</mn></msub><mi>N</mi> <mo>&#x2192;</mo> <mn>0,0836</mn><msub><mi>C</mi><mn>5</mn></msub><msub><mi>H</mi><mn>7</mn></msub><msub><mi>O</mi><mn>2</mn></msub><msub><mi>N</mi><mn>1</mn></msub><mn>+</mn><mn>3,4154</mn><mi>C</mi><msub><mi>H</mi><mn>4</mn></msub><mn>+</mn><mn>7,4996</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi> </mtd> </mtr>          </mtable>         </math>` 


    document.getElementById('reaction-result').innerHTML = htmlString;
    document.getElementById('reaction-clipboard').value = htmlString;
    
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