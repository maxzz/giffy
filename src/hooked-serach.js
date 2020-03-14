import React, { useState, useEffect } from 'react';

const MY_GIPHY_KEY = 'nasGAvbAc9jhi08DuzUhIV1sW3M9pYDT';

export default function HookedSearch() {
    const [search, setSearch] = useState('book');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const QUERY = `https://api.giphy.com/v1/gifs/search?api_key=${MY_GIPHY_KEY}&q=${query}&limit=25&offset=0&rating=G&lang=en`;
                const response = await fetch(QUERY);
                const { data } = await response.json();

                setResults(data.map(item => item.images.preview.mp4));

                console.log(data);
            } finally {
                console.log('query', query);
            }
        }
        if (query !== '') {
            fetchData();
        }
    }, [query]);

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    setQuery(search);
                }}
            >
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="What GIF to search for" />
                <button>Search</button>
            </form>

            {
                results.map(item => {
                    return <video autoPlay loop key={item} src={item} />
                })
            }

        </div>
    );
}
