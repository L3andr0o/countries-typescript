export default interface country{
    name : countryName,
    population : number,
    region : string,
    capital : string,
    flags : countryFlag,
    subregion : string,
    tld : string,
    
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