

export const ApiBasePath = {
    EntryQuery: 'https://rickandmortyapi.com/api',
}

class ApiURL {
    static Query = {
        GetChracterDetails: ApiBasePath.EntryQuery + '/character',
        GetCharacterInfo: ApiBasePath.EntryQuery + '/character/{characterId}',
    }

}

export { ApiURL }