import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokedexComponent } from '../views/pokedex/pokedex.component';
import { Pokemon, PokemonListResponse } from '../types/pokemon.types';

@Component({ template: '<div>Pokemon App</div>' })
class PokemonAppComponent {}

describe('Pokemon Flow Integration', () => {
  let pokemonService: PokemonService;
  let httpMock: HttpTestingController;
  let component: PokedexComponent;
  let fixture: any;

  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      back_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
    },
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      },
    ],
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
      },
    ],
    abilities: [
      {
        ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
        is_hidden: false,
        slot: 1,
      },
    ],
  };

  const mockPokemonListResponse: PokemonListResponse = {
    count: 1000,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexComponent, HttpClientTestingModule, PokemonAppComponent],
      providers: [PokemonService],
    }).compileComponents();

    pokemonService = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  describe('Complete Pokemon Loading Flow', () => {
    it('should load pokemon list and details successfully', async () => {
      component.ngOnInit();

      const listReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      expect(listReq.request.method).toBe('GET');
      listReq.flush(mockPokemonListResponse);

      const pokemon1Req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
      expect(pokemon1Req.request.method).toBe('GET');
      pokemon1Req.flush(mockPokemon);

      const pokemon2Req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/2');
      expect(pokemon2Req.request.method).toBe('GET');
      pokemon2Req.flush({ ...mockPokemon, id: 2, name: 'ivysaur' });

      await fixture.whenStable();

      expect(component.totalPokemon).toBe(1000);
      expect(component.pokemonList).toHaveLength(2);
      expect(component.filteredPokemon).toHaveLength(2);
      expect(component.isLoading).toBe(false);
    });

    it('should handle API errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      component.ngOnInit();

      const listReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      listReq.flush(null, { status: 500, statusText: 'Internal Server Error' });

      await fixture.whenStable();

      expect(consoleSpy).toHaveBeenCalledWith('Error cargando Pokémon:', expect.any(Object));
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Pokemon Search Flow', () => {
    beforeEach(async () => {
      component.pokemonList = [mockPokemon];
      component.filteredPokemon = [mockPokemon];
    });

    it('should search pokemon successfully', async () => {
      const searchResults = [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }];

      component.searchQuery = 'bulb';
      component.searchPokemon();

      const searchReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
      expect(searchReq.request.method).toBe('GET');
      searchReq.flush({
        count: 1000,
        next: null,
        previous: null,
        results: searchResults,
      });

      const pokemonReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      expect(pokemonReq.request.method).toBe('GET');
      pokemonReq.flush(mockPokemon);

      await fixture.whenStable();

      expect(component.filteredPokemon).toHaveLength(1);
      expect(component.isLoading).toBe(false);
    });

    it('should handle search errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      component.searchQuery = 'bulb';
      component.searchPokemon();

      const searchReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
      searchReq.flush(null, { status: 500, statusText: 'Internal Server Error' });

      await fixture.whenStable();

      expect(consoleSpy).toHaveBeenCalledWith('Error buscando Pokémon:', expect.any(Object));
      expect(component.isLoading).toBe(false);
    });

    it('should reset search when query is empty', () => {
      component.searchQuery = '';
      component.searchPokemon();

      expect(component.filteredPokemon).toEqual(component.pokemonList);
    });
  });

  describe('Pagination Flow', () => {
    it('should load more pokemon successfully', async () => {
      component.pokemonList = [mockPokemon];
      component.currentPage = 0;
      component.isLoading = false;

      component.loadMorePokemon();

      expect(component.currentPage).toBe(1);
      expect(component.isLoading).toBe(true);

      const listReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
      expect(listReq.request.method).toBe('GET');
      listReq.flush(mockPokemonListResponse);

      const pokemon1Req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
      pokemon1Req.flush(mockPokemon);

      const pokemon2Req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/2');
      pokemon2Req.flush({ ...mockPokemon, id: 2, name: 'ivysaur' });

      await fixture.whenStable();

      expect(component.pokemonList).toHaveLength(3);
    });

    it('should not load more pokemon when already loading', () => {
      component.isLoading = true;
      const initialPage = component.currentPage;

      component.loadMorePokemon();

      expect(component.currentPage).toBe(initialPage);
    });
  });

  describe('Service Integration', () => {
    it('should integrate all PokemonService methods', () => {
      pokemonService.getPokemonList(0, 20).subscribe();
      const listReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      listReq.flush(mockPokemonListResponse);

      pokemonService.getPokemon(1).subscribe();
      const pokemonReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
      pokemonReq.flush(mockPokemon);

      pokemonService.searchPokemon('bulb').subscribe();
      const searchReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
      searchReq.flush({
        count: 1000,
        next: null,
        previous: null,
        results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      });
    });
  });
});
