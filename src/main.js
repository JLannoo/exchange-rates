const $list = document.querySelector("#list");
var data;

async function fillList(){
    $list.innerHTML = "Loading...";

    const response = await fetch("http://api.exchangeratesapi.io/v1/latest?access_key=7df392088364be6fa6407bcc46371554");
    data = await response.json()
    
    $list.innerHTML = "";

    for(r in data.rates){
        const li = document.createElement("li");
        li.textContent = `${r}: ${data.rates[r]}`

        $list.appendChild(li);
    }
}

fillList();
