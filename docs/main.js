const $list = document.querySelector("#list");
const $selectContainer = document.querySelector("#selectContainer");
const $currencySelect = document.querySelector("#currencyType");
const $coinSelect = document.querySelector("#coin");

(async function getCodes(){
    const response = await fetch(`https://v6.exchangerate-api.com/v6/8697e71e86e8d0f6023edebf/codes`);
    const codes = await response.json();

    for(code of codes["supported_codes"]){
        const option = document.createElement("option");
        option.value = code[0];
        option.innerHTML = code[0] + " - " + code[1];
        $currencySelect.appendChild(option);
    }


    console.log(codes)
})().catch(e => console.log(e));

async function fillList(){
    $list.innerHTML = "Loading...";

    let selectedType = $currencySelect.value;

    const response = await fetch(`https://v6.exchangerate-api.com/v6/8697e71e86e8d0f6023edebf/latest/${selectedType}`);
    const data = await response.json()
    
    $list.innerHTML = "";

    for(r in data.conversion_rates){
        const li = document.createElement("li");
        li.innerHTML = `<strong>${r}</strong>: <span>${data.conversion_rates[r]}</span>`
        li.classList = "list-group-item";
        li.id = r;
        
        $list.appendChild(li);

        const option = document.createElement("option");
        option.value = r;
        option.innerText = r;
        
        $coinSelect.appendChild(option);

        $selectContainer.classList.remove("hidden");
    }
}

function findCoin(){
    document.querySelector(`#${$coinSelect.value}`).scrollIntoView(); 
}