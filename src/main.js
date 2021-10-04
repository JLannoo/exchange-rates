const $list = document.querySelector("#list");
const $date = document.querySelector("#date");
const $selectContainer = document.querySelector("#selectContainer");
const $coinSelect = document.querySelector("#coin");

const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth()+1).padStart(2,0);
const d = String(now.getDate()).padStart(2,0);
const today = y+"-"+m+"-"+d;
$date.value = today;
$date.max = today;

var data;

async function fillList(){
    $list.innerHTML = "Loading...";
    let date = $date.value

    const response = await fetch(`http://api.exchangeratesapi.io/v1/${date}?access_key=7df392088364be6fa6407bcc46371554`);
    data = await response.json()
    
    $list.innerHTML = "";

    for(r in data.rates){
        const li = document.createElement("li");
        li.innerHTML = `<strong>${r}</strong>: <span>${data.rates[r]}</span>`
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