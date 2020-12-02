import React, { useState, useEffect } from 'react';
import './CharacterDetails.scss';
import { Card, Button, Image, List } from 'semantic-ui-react';
import EntryQueryService from "./../../services/Query/EntryQueryService";

function CharacterDetails({ match }) {
    const [characterDetail, setCharacterDetail] = useState([]);
    const [characterLocation, setCharacterLocation] = useState([]);
    const [characterEpisodeNames, setCharacterEpisodeNames] = useState([]);

    useEffect(() => {
        getCharacterInfo();
    }, []);

    useEffect(() => {
        // When characterDetail state initiliaze, get location and episode urls in response and call these services.
        if (characterDetail.location?.url !== undefined)
            getCharacterLocation(characterDetail.location.url);
        if (characterDetail.episode !== undefined)
            getCharacterEpisodes(characterDetail.episode);
    }, [characterDetail])

    const getCharacterInfo = async () => {
        // Getting character infos.
        EntryQueryService.GetCharacterInfo(match.params.id).then((response) => {
            setCharacterDetail(response);
        });
    }

    const getCharacterLocation = async (locationURL) => {
        // Getting location URL and service call for location name
        EntryQueryService.GetCharacterLocation(locationURL).then((response) => {
            setCharacterLocation(response);
        });
    }

    const getCharacterEpisodes = async (episodeURLs) => {
        // Getting last five episode urls for service calls and listing episode names
        let getLastFiveEpisodesURLs = episodeURLs.slice(Math.max(episodeURLs.length - 5, 0));
        for (var i = 0; i < getLastFiveEpisodesURLs.length; i++) {
            await EntryQueryService.GetCharacterEpisodes(getLastFiveEpisodesURLs[i]).then((response) => {
                setCharacterEpisodeNames(state => [...state, response.name]);
            });
        }
    }

    return (
        <div className="character-details">
            {characterEpisodeNames.length == 0 ?
                <div className="ui active inline loader"></div> :
                <Card>
                    <Image src={characterDetail.image} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{characterDetail.name}</Card.Header>
                        <Card.Meta>
                            <span>{characterLocation.name} - {characterLocation.type}</span>
                        </Card.Meta>
                        <Card.Description>
                            <List bulleted horizontal>
                                {characterEpisodeNames.map((episode) => (
                                    <List.Item key={episode}>{episode}</List.Item>
                                ))}
                            </List>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a href={`/`} className="button">
                            <Button basic color='red'>
                                Geri Dön
                        </Button>
                        </a>
                    </Card.Content>
                </Card>
            }
        </div>
    )
}

export default CharacterDetails