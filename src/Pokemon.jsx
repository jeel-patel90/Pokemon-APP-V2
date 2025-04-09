import React from 'react'
import { useEffect, useState } from 'react'
import './index.css'
import PokemonCards from './PokemonCards'

function Pokemon() {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")


    const API = "https://pokeapi.co/api/v2/pokemon?limit=300"

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json()

            const detailedPokemonData = data.results.map(async (currPokemon) => {
                const res = await fetch(currPokemon.url)
                const data = await res.json()
                return data
            })

            const detailedResponse = await Promise.all(detailedPokemonData)
            setPokemon(detailedResponse)
            setLoading(false)

            // console.log(detailedResponse)


        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    if (loading) {
        return <div>
            <h1>Loading...</h1>
        </div>
    }

    if (error) {
        return <div>
            <h1>{error.message}</h1>
        </div>
    }

    const handleSearch = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    // search functionality.

    const searchData = pokemon.filter((currPokemon) => {
        return currPokemon.name.toLowerCase().includes(search.trim().toLowerCase())
    })


    return (
        <>
            <section>
                <header>
                    <h1>Let's catch Pokemons</h1>
                </header>

                <div className='pokemon-search'>
                    <input type="text" placeholder='Enter your pokemon name : ' value={search} onChange={handleSearch} />
                </div>
                <div>
                    <ul className='cards'>
                        {/* {pokemon.map((currPokemon) => {
                            return <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                        })} */}

                        {searchData.map((currPokemon) => {
                            return <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Pokemon
