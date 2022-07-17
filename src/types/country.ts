export default interface country{
    name : countryName,
    population : number,
    region : string,
    capital : string,
    flags : countryFlag
}

interface countryName{
    common : string
}

interface countryFlag{
    svg : string
}