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
                        value={search} onChange={e => setSearch(e.target.value)} placeholder="What GIF to search for" autoComplete="search-gif"
                    />

                    <button
                        className="self-center 
                            transform active:scale-105
                            mt-4 px-4 py-2 uppercase text-sm leading-normal
                            border rounded-md text-gray-300 focus:outline-none focus:ring-4 ring-offset-1 ring-gray-800 ring-offset-gray-600"
                    >Search</button>
                </form>

                <div className="mt-4">
                    {loading
                        ? 'Loading'
                        : <div className="" style={{ columnCount: 4, columnGap: '.5rem' }}>
                            {results.map(item => {
                                return <video className="mb-2" autoPlay loop key={item} src={item} />;
                            })}
                        </div>
                    }
                </div>

                <div className="fixed flex right-2 bottom-3">
                    <a
                        className="p-1 pt-2 pb-0 border rounded-full text-gray-100 border-gray-100"
                        href="https://github.com/maxzz/giffy" target="_blank"
                        title="Open GitHub source code"
                    >
                        <div className="w-5 h-5">
                            <svg className="stroke-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    );
}
