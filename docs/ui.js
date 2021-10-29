import { getExchangeData } from "./exhanges.js";

export function setDate(){
    const $date = document.querySelector("#date");

    const today = (new Date()).toISOString().split("T")[0]
    $date.value = today;
    $date.max = today;
}

export async function setBaseCurrencySymbols(data){
    const $baseCurrencySelect = document.querySelector("#baseCurrency");

    for(const sym in data.symbols){
        const option = document.createElement("option");

        option.value = sym;
        option.innerHTML = data.symbols[sym].code + " - " + data.symbols[sym].description;
        
        $baseCurrencySelect.appendChild(option);
    }
}

export async function fillList(){
    showLoading();

    const data = await getExchangeData(getInputData());

    const $exchangeContainer = document.querySelector("#exchangeContainer");
    const $list = document.querySelector("#list");
    const $findCurrencySelect  = document.querySelector("#findCurrency");

    clearList();
    clearCurrenySelect();

    for(let r in data.rates){
        const li = document.createElement("li");
        li.innerHTML = `<strong>${r}</strong>: <span>${data.rates[r]}</span>`
        li.classList = "list-group-item";
        li.id = r;
        
        $list.appendChild(li);

        const option = document.createElement("option");
        option.value = r;
        option.innerText = r;
        
        $findCurrencySelect.appendChild(option);

        $exchangeContainer.classList.remove("hidden");
    }
}

function showLoading(){
    const $list = document.querySelector("#list");

    $list.innerHTML = "Loading...";
}

function getInputData(){
    const baseCurrencyType = document.querySelector("#baseCurrency").value;
    const selectedDate = formatDate(document.querySelector("#date").value);

    return {type: baseCurrencyType, date: selectedDate}
}

function clearList(){
    const $list = document.querySelector("#list");

    $list.innerHTML = "";
}

function clearCurrenySelect(){
    const $findCurrency = document.querySelector("#findCurrency");
    $findCurrency.innerHTML = "";
}

export function findCoin(){
    const $findCurrencySelect = document.querySelector("#findCurrency");

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

export function backToTop(){
    document.scrollingElement.scrollTo(0,0)
}

export function errorFetchingData(){
    const $list = document.querySelector("#list");
    $list.innerHTML = "There seems to have been an issue. Please try again later...";
}

export function setButtonOnClick(button, func){
    button.onclick = () => func();
}

function formatDate(date){
    return date.replaceAll("/","-")
}

export function addScrollEvent(){
    const $backToTop = document.querySelector("#backToTop")

    function myScrollFunc() {
        let y = window.scrollY;

        if (y >= 500) {
            $backToTop.classList.remove("hidden");
        } else {
            $backToTop.classList.add("hidden");
        }
    };

    window.addEventListener("scroll", myScrollFunc);
}