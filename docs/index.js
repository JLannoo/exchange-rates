import {setDate, setBaseCurrencySymbols, setButtonOnClick, fillList, findCoin, errorFetchingData, addScrollEvent, backToTop} from './ui.js';
import {getSymbols} from './exhanges.js';

export async function executeFillList(){
    fillList().catch(e => {
        console.log(e);
        $list.innerHTML = "An error has ocurred please try again later..."
    })
}

async function initialize(){   
    setBaseCurrencySymbols(await getSymbols());
    setDate();

    const $search = document.querySelector("#search-button");
    setButtonOnClick($search, ()=>{
        fillList().catch(e => {
            console.log(e)
            errorFetchingData();
        });
    })

    const $findCurrencyButton = document.querySelector("#findCurrency-button");
    setButtonOnClick($findCurrencyButton, findCoin)

    const $backToTopButton = document.querySelector("#backToTop");
    setButtonOnClick($backToTopButton, backToTop)

    addScrollEvent()
}

initialize();