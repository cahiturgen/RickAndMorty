import request from "../../global/axios-wrapper";
import RequestType from "../../model/RequestType";
import { ApiURL } from "../../constants/ApiURL";

const GetChracterDetails = (params) =>
    request({
        url: ApiURL.Query.GetChracterDetails,
        method: RequestType.GET,
        params: params || null
    });

const GetCharacterInfo = (id) =>
    request({
        url: ApiURL.Query.GetCharacterInfo.replace("{characterId}", id),
        method: RequestType.GET
    });


const GetCharacterLocation = (url) =>
    request({
        url: url,
        method: RequestType.GET
    });

    const GetCharacterEpisodes = (url) =>
    request({
        url: url,
        method: RequestType.GET
    });

const EntryQueryService = {
    GetChracterDetails,
    GetCharacterInfo,
    GetCharacterLocation,
    GetCharacterEpisodes
};

export default EntryQueryService;