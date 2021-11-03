import {setDate, setBaseCurrencySymbols, setButtonOnClick, setFieldOnChange, fillList, findCoin, errorFetchingData, addScrollEvent, backToTop} from './ui.js';
import {getSymbols} from './exhanges.js';

export function executeFillList(){
    const $amount = document.querySelector("#exchangeAmount");
    fillList($amount.value).catch(e => {
        console.log(e);
        errorFetchingData();
    })
}

async function initialize(){   
    setBaseCurrencySymbols(await getSymbols());
    setDate();

    const $search = document.querySelector("#search-button");
    setButtonOnClick($search, executeFillList)

    const $findCurrencyButton = document.querySelector("#findCurrency-button");
    setButtonOnClick($findCurrencyButton, findCoin)

    const $backToTopButton = document.querySelector("#backToTop");
    setButtonOnClick($backToTopButton, backToTop)

    const $amount = document.querySelector("#exchangeAmount");
    setFieldOnChange($amount, executeFillList)

    addScrollEvent()
}

initialize();