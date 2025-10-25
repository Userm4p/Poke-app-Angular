import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, PokemonSpecies } from '../../types/pokemon.types';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail implements OnInit {
  pokemon: Pokemon | null = null;
  pokemonSpecies: PokemonSpecies | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadPokemonDetails(id);
      }
    });
  }

  loadPokemonDetails(id: string) {
    this.loading = true;
    this.error = null;

    this.pokemonService.getPokemon(id).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.loadPokemonSpecies(id);
      },
      error: (error) => {
        this.error = 'Error loading Pokémon details';
        this.loading = false;
        console.error('Error loading Pokémon:', error);
      },
    });
  }

  loadPokemonSpecies(id: string) {
    this.pokemonService.getPokemonSpecies(id).subscribe({
      next: (species) => {
        this.pokemonSpecies = species;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading Pokémon species:', error);
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/pokedex']);
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

  getEnglishFlavorText(): string {
    if (!this.pokemonSpecies) return '';

    const englishEntry = this.pokemonSpecies.flavor_text_entries.find(
      (entry) => entry.language.name === 'en',
    );

    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : '';
  }
}
