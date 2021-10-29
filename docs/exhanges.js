export async function getSymbols(){
    const response = await fetch(`https://api.exchangerate.host/symbols`);
    const data = await response.json();

    return data;
}

export async function getExchangeData({type, date}){
    const response = await fetch(`https://api.exchangerate.host/${date}?base=${type}`);
    const data = await response.json()

    return data;
}
