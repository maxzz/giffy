import React, { useState, useEffect } from 'react';

const MY_GIPHY_KEY = 'nasGAvbAc9jhi08DuzUhIV1sW3M9pYDT';

function useGiphy(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const QUERY = `https://api.giphy.com/v1/gifs/search?api_key=${MY_GIPHY_KEY}&q=${query}&limit=25&offset=0&rating=PG-13&lang=en`;
                const response = await fetch(QUERY);
                const { data } = await response.json();

                setResults(data.map(item => item.images.preview.mp4));
            } finally {
                setLoading(false);
            }
        }
        if (query !== '') {
            fetchData();
        }
    }, [query]);

    return [results, loading];
}

export default function HookedSearch() {
    const [search, setSearch] = useState('book');
    const [query, setQuery] = useState('');
    const [results, loading] = useGiphy(query);

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

            {loading
                ? 'Loading'
                : results.map(item => {
                      return <video autoPlay loop key={item} src={item} />;
                  })}
        </div>
    );
}
