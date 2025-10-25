import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonListResponse, Move, MoveListResponse } from '../types/pokemon.types';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemonList', () => {
    it('should return pokemon list with default parameters', () => {
      const mockResponse: PokemonListResponse = {
        count: 1000,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      service.getPokemonList().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return pokemon list with custom parameters', () => {
      const mockResponse: PokemonListResponse = {
        count: 1000,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20',
        previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
        results: [
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        ],
      };

      service.getPokemonList(20, 20).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getPokemon', () => {
    it('should return pokemon by id', () => {
      const mockPokemon: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
          front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
          back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
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

      service.getPokemon(1).subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);
    });

    it('should return pokemon by name', () => {
      const mockPokemon: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
          front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
          back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
        },
        types: [],
        stats: [],
        abilities: [],
      };

      service.getPokemon('bulbasaur').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);
    });
  });

  describe('getPokemonSpecies', () => {
    it('should return pokemon species', () => {
      const mockSpecies = {
        id: 1,
        name: 'bulbasaur',
        names: [
          {
            language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
            name: 'Bulbasaur',
          },
        ],
        flavor_text_entries: [
          {
            flavor_text: 'A strange seed was planted on its back at birth.',
            language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
            version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
          },
        ],
      };

      service.getPokemonSpecies(1).subscribe((species) => {
        expect(species).toEqual(mockSpecies);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon-species/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockSpecies);
    });
  });

  describe('getMoveList', () => {
    it('should return move list with default parameters', () => {
      const mockResponse: MoveListResponse = {
        count: 1000,
        next: 'https://pokeapi.co/api/v2/move?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/' },
          { name: 'karate-chop', url: 'https://pokeapi.co/api/v2/move/2/' },
        ],
      };

      service.getMoveList().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/move?offset=0&limit=20');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getMove', () => {
    it('should return move by id', () => {
      const mockMove: Move = {
        id: 1,
        name: 'pound',
        accuracy: 100,
        effect_chance: 0,
        pp: 35,
        priority: 0,
        power: 40,
        damage_class: { name: 'physical', url: 'https://pokeapi.co/api/v2/move-damage-class/2/' },
        type: { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
        effect_entries: [
          {
            effect: 'Inflicts regular damage.',
            language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
          },
        ],
      };

      service.getMove(1).subscribe((move) => {
        expect(move).toEqual(mockMove);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/move/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockMove);
    });
  });

  describe('searchPokemon', () => {
    it('should search pokemon by query', () => {
      const mockListResponse: PokemonListResponse = {
        count: 1000,
        next: null,
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
      };

      service.searchPokemon('saur').subscribe((results) => {
        expect(results).toEqual([
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        ]);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
      expect(req.request.method).toBe('GET');
      req.flush(mockListResponse);
    });

    it('should be case insensitive', () => {
      const mockListResponse: PokemonListResponse = {
        count: 1000,
        next: null,
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
      };

      service.searchPokemon('BULB').subscribe((results) => {
        expect(results).toEqual([
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ]);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
      req.flush(mockListResponse);
    });

    it('should limit results to 20', () => {
      const mockResults = Array.from({ length: 30 }, (_, i) => ({
        name: `pokemon${i}`,
        url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
      }));

      const mockListResponse: PokemonListResponse = {
        count: 1000,
        next: null,
        previous: null,
        results: mockResults,
      };

      service.searchPokemon('pokemon').subscribe((results) => {
        expect(results.length).toBe(20);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
      req.flush(mockListResponse);
    });
  });
});
