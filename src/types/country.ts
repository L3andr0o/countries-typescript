import theme from "./theme"

export default interface country{
    name : countryName,
    population : number,
    region : string,
    capital : string,
    flags : countryFlag,
    subregion : string,
    tld : string,
    borders : Array<string> | null,
    theme : theme
}

interface countryName{
    common : string,
    official : string
}

interface countryFlag{
    svg : string
}


// interface countryMoney{
//     EUR : moneyName
// }

// interface moneyName{
//     name : string
// }