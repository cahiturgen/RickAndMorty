import React from 'react'
import { useState, useEffect } from 'react';
import './Dashboard.scss';
import { Button, Card, Image } from 'semantic-ui-react';
import EntryQueryService from "./../../services/Query/EntryQueryService";
import InfiniteScroll from 'react-infinite-scroll-component';

const Dashboard = () => {
    const [characterList, setCharacterList] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        // load 20 characters first
        getCharacters();
    }, []);

    useEffect(() => {
    }, [characterList])

    const getCharacters = async (params) => {
        await EntryQueryService.GetChracterDetails(params).then((response) => {
            setCharacterList(response.results);
            setTotalPage(response.info?.pages);
        });
        setPage(page + 1);
    }

    const fetchData = () => {
        // Request to service if hasmore true
        let params = { page: page }
        EntryQueryService.GetChracterDetails(params).then((response) => {
            setCharacterList(characterList.concat(response.results));
        });
        setPage(page + 1);
        if (page == totalPage) {
            // Stop service calls and infinite scroll
            setHasMore(false);
        }
    }

    return (
        <InfiniteScroll
            dataLength={characterList?.length || 0}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Characters Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                    <b>You have seen all characters.</b>
                </p>
            }
        >
            <Card.Group className="rick-and-morty-cards">
                {characterList?.map((character) => (
                    <Card key={character.id}>
                        <Card.Content>
                            <Image
                                floated='left'
                                size='small'
                                src={character.image}
                            />
                            <Card.Header className="card-header">{character.name}</Card.Header>
                            <Card.Meta>{character.status} - {character.species}</Card.Meta>

                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <a href={`/character-details/${character.id}`} className="button">
                                    <Button basic color='green'>
                                        Karakter Detayları
                                </Button>
                                </a>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </InfiniteScroll>
    )
}

export default Dashboard