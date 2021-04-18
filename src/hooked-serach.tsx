import React, { useState, useEffect } from 'react';

const MY_GIPHY_KEY = 'nasGAvbAc9jhi08DuzUhIV1sW3M9pYDT';

function useGiphy(query: string): [any[], boolean] {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const QUERY = `https://api.giphy.com/v1/gifs/search?api_key=${MY_GIPHY_KEY}&q=${query}&limit=25&offset=0&rating=PG-13&lang=en`;
                const response = await fetch(QUERY);
                const { data } = await response.json();

                setResults(data.map((item: any) => item.images.preview.mp4));
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
    const [search, setSearch] = useState('fifth element');
    const [query, setQuery] = useState('');
    const [results, loading] = useGiphy(query);

    return (
        <div className="h-screen">

            <div className="h-16 px-4 flex items-center justify-end text-gray-100 bg-gradient-to-r from-gray-400 to-gray-800 shadow-md">
                <h1 className="text-2xl uppercase">Giffy Search</h1>
            </div>

            <div className="container max-w-md mx-auto flex flex-col">
                <form
                    className="mt-4 flex flex-col"
                    onSubmit={e => { e.preventDefault(); setQuery(search); }}
                >
                    <input className="px-4 py-2 border rounded-sm text-gray-800"
                        value={search} onChange={e => setSearch(e.target.value)} placeholder="What GIF to search for" autoComplete="search-gif" />
                    <button className="self-center mt-4 px-4 py-1 border rounded-md text-gray-300">Search</button>
                </form>

                <div className="mt-4 max-h-[500px] overflow-y-auto -ml-4 pl-4" style={{width: 'calc(100% + 32px)'}}>
                    {loading
                        ? 'Loading'
                        : <div className="" style={{columnCount: 4, columnGap: '.5rem'}}>
                            {results.map(item => {
                                return <video className="mb-2" autoPlay loop key={item} src={item} />;
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
