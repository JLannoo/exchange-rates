const $list = document.querySelector("#list");
const $date = document.querySelector("#date");
const $selectContainer = document.querySelector("#selectContainer");
const $baseCurrencySelect = document.querySelector("#baseCurrency");
const $findCurrencySelect = document.querySelector("#findCurrency");

const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth()+1).padStart(2,0);
const d = String(now.getDate()).padStart(2,0);
const today = y+"-"+m+"-"+d;
$date.value = today;
$date.max = today;

(async function getCodes(){
    const response = await fetch(`https://api.exchangerate.host/symbols`);
    const data = await response.json();

    for(const sym in data.symbols){
        const option = document.createElement("option");

        option.value = sym;
        option.innerHTML = data.symbols[sym].code + " - " + data.symbols[sym].description;
        
        $baseCurrencySelect.appendChild(option);
    }
})().catch(e => console.log(e));


async function fillList(){
    $list.innerHTML = "Loading...";

    const selectedType = $baseCurrencySelect.value;
    const selectedDate = ($date.value).replaceAll("/","-");

    const response = await fetch(`https://api.exchangerate.host/${selectedDate}?base=${selectedType}`);
    const data = await response.json()
    
    console.log(data);

    $list.innerHTML = "";
    $findCurrencySelect.innerHTML = "";

    for(r in data.rates){
        const li = document.createElement("li");
        li.innerHTML = `<strong>${r}</strong>: <span>${data.rates[r]}</span>`
        li.classList = "list-group-item";
        li.id = r;
        
        $list.appendChild(li);

        const option = document.createElement("option");
        option.value = r;
        option.innerText = r;
        
        $findCurrencySelect.appendChild(option);

        $selectContainer.classList.remove("hidden");
    }
}

async function executeFillList(){
    fillList().catch(e => {
        console.log(e);
        $list.innerHTML = "An error has ocurred please try again later..."
    })
}

function findCoin(){
    let obj = document.querySelector(`#${$findCurrencySelect.value}`)
    obj.scrollIntoView(); 
    highlight(obj);
}

function highlight(element){
    element.classList.add("list-group-item-primary");
    setTimeout(() => {
        element.classList.remove("list-group-item-primary");
    }, 1000);
}