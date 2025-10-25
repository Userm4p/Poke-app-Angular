import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Move,
  MoveListResponse,
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
} from '../types/pokemon.types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`,
    );
  }

  getPokemon(idOrName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${idOrName}`);
  }

  getPokemonSpecies(idOrName: string | number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${idOrName}`);
  }

  getMoveList(offset: number = 0, limit: number = 20): Observable<MoveListResponse> {
    return this.http.get<MoveListResponse>(`${this.baseUrl}/move?offset=${offset}&limit=${limit}`);
  }

  getMove(idOrName: string | number): Observable<Move> {
    return this.http.get<Move>(`${this.baseUrl}/move/${idOrName}`);
  }

  searchPokemon(query: string): Observable<Array<{ name: string; url: string }>> {
    return this.getPokemonList(0, 1000).pipe(
      map((response) =>
        response.results
          .filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 20),
      ),
    );
  }
}
