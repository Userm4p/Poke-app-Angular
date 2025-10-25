import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, PokemonListResponse } from '../../types/pokemon.types';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnInit {
  title = 'Pokédex';

  pokemonList: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  searchQuery = '';
  isLoading = false;
  currentPage = 0;
  pageSize = 20;
  totalPokemon = 0;

  loadingStates: { [key: number]: boolean } = {};

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.isLoading = true;
    this.pokemonService.getPokemonList(this.currentPage * this.pageSize, this.pageSize).subscribe({
      next: (response: PokemonListResponse) => {
        this.totalPokemon = response.count;
        this.loadPokemonDetails(response.results);
      },
      error: (error) => {
        console.error('Error loading Pokémon:', error);
        this.isLoading = false;
      },
    });
  }

  loadPokemonDetails(pokemonResults: Array<{ name: string; url: string }>) {
    const promises = pokemonResults.map((pokemon, index) => {
      const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
      this.loadingStates[parseInt(pokemonId)] = true;

      return lastValueFrom(this.pokemonService.getPokemon(pokemonId));
    });

    Promise.all(promises).then((pokemonDetails) => {
      this.pokemonList = [
        ...this.pokemonList,
        ...(pokemonDetails.filter((p) => p !== undefined) as Pokemon[]),
      ];
      this.filteredPokemon = [...this.pokemonList];
      this.isLoading = false;

      Object.keys(this.loadingStates).forEach((key) => {
        this.loadingStates[parseInt(key)] = false;
      });
    });
  }

  searchPokemon() {
    if (this.searchQuery.trim() === '') {
      this.filteredPokemon = [...this.pokemonList];
      return;
    }

    this.isLoading = true;
    this.pokemonService.searchPokemon(this.searchQuery).subscribe({
      next: (pokemonResults) => {
        const promises = pokemonResults.map((pokemon) => {
          return lastValueFrom(this.pokemonService.getPokemon(pokemon.name));
        });

        Promise.all(promises).then((pokemonDetails) => {
          this.filteredPokemon = pokemonDetails.filter((p) => p !== undefined) as Pokemon[];
          this.isLoading = false;
        });
      },
      error: (error) => {
        console.error('Error searching Pokémon:', error);
        this.isLoading = false;
      },
    });
  }

  loadMorePokemon() {
    if (this.isLoading) return;

    this.currentPage++;
    this.loadPokemon();
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[type] || '#68A090';
  }

  getStatName(statName: string): string {
    const statNames: { [key: string]: string } = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Attack',
      'special-defense': 'Sp. Defense',
      speed: 'Speed',
    };
    return statNames[statName] || statName;
  }

  formatPokemonName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  viewPokemonDetails(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
