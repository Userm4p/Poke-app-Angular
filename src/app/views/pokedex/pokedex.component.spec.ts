import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PokedexComponent } from './pokedex.component';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, PokemonListResponse } from '../../types/pokemon.types';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let pokemonService: jest.Mocked<PokemonService>;

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
    const pokemonServiceSpy = {
      getPokemonList: jest.fn(),
      getPokemon: jest.fn(),
      searchPokemon: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PokedexComponent, HttpClientTestingModule],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jest.Mocked<PokemonService>;
    
    pokemonService.getPokemonList.mockReturnValue(of(mockPokemonListResponse));
    pokemonService.getPokemon.mockReturnValue(of(mockPokemon));
    pokemonService.searchPokemon.mockReturnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadPokemon on init', () => {
      const loadPokemonSpy = jest.spyOn(component, 'loadPokemon');
      component.ngOnInit();
      expect(loadPokemonSpy).toHaveBeenCalled();
    });
  });

  describe('loadPokemon', () => {
    it('should load pokemon list successfully', async () => {
      pokemonService.getPokemonList.mockReturnValue(of(mockPokemonListResponse));
      pokemonService.getPokemon.mockReturnValue(of(mockPokemon));

      component.loadPokemon();

      expect(component.isLoading).toBe(true);
      expect(pokemonService.getPokemonList).toHaveBeenCalledWith(0, 20);

     await fixture.whenStable();

      expect(component.totalPokemon).toBe(1000);
      expect(component.pokemonList.length).toBe(2);
      expect(component.filteredPokemon.length).toBe(2);
      expect(component.isLoading).toBe(false);
    });

    it('should handle error when loading pokemon list', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      pokemonService.getPokemonList.mockReturnValue(throwError(() => new Error('API Error')));

      component.loadPokemon();

      expect(consoleSpy).toHaveBeenCalledWith('Error cargando Pokémon:', expect.any(Object));
      expect(component.isLoading).toBe(false);
    });
  });

  describe('searchPokemon', () => {
    beforeEach(() => {
      component.pokemonList = [mockPokemon];
      component.filteredPokemon = [mockPokemon];
    });

    it('should reset filtered pokemon when search query is empty', () => {
      component.searchQuery = '';
      component.searchPokemon();
      expect(component.filteredPokemon).toEqual(component.pokemonList);
    });

    it('should search pokemon when query is provided', async () => {
      const searchResults = [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }];
      pokemonService.searchPokemon.mockReturnValue(of(searchResults));
      pokemonService.getPokemon.mockReturnValue(of(mockPokemon));

      component.searchQuery = 'bulb';
      component.searchPokemon();

      expect(component.isLoading).toBe(true);
      expect(pokemonService.searchPokemon).toHaveBeenCalledWith('bulb');

      await fixture.whenStable();

      expect(component.filteredPokemon.length).toBe(1);
      expect(component.isLoading).toBe(false);
    });

    it('should handle error when searching pokemon', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      pokemonService.searchPokemon.mockReturnValue(throwError(() => new Error('Search Error')));

      component.searchQuery = 'bulb';
      component.searchPokemon();

      expect(consoleSpy).toHaveBeenCalledWith('Error buscando Pokémon:', expect.any(Object));
      expect(component.isLoading).toBe(false);
    });
  });

  describe('loadMorePokemon', () => {
    it('should not load more pokemon when already loading', () => {
      component.isLoading = true;
      const loadPokemonSpy = jest.spyOn(component, 'loadPokemon');
      
      component.loadMorePokemon();
      
      expect(loadPokemonSpy).not.toHaveBeenCalled();
    });

    it('should load more pokemon when not loading', () => {
      component.isLoading = false;
      component.currentPage = 0;
      const loadPokemonSpy = jest.spyOn(component, 'loadPokemon');
      
      component.loadMorePokemon();
      
      expect(component.currentPage).toBe(1);
      expect(loadPokemonSpy).toHaveBeenCalled();
    });
  });

  describe('getTypeColor', () => {
    it('should return correct color for known type', () => {
      expect(component.getTypeColor('fire')).toBe('#F08030');
      expect(component.getTypeColor('water')).toBe('#6890F0');
      expect(component.getTypeColor('grass')).toBe('#78C850');
    });

    it('should return default color for unknown type', () => {
      expect(component.getTypeColor('unknown')).toBe('#68A090');
    });
  });

  describe('getStatName', () => {
    it('should return correct Spanish name for known stat', () => {
      expect(component.getStatName('hp')).toBe('HP');
      expect(component.getStatName('attack')).toBe('Ataque');
      expect(component.getStatName('defense')).toBe('Defensa');
      expect(component.getStatName('special-attack')).toBe('Ataque Esp.');
      expect(component.getStatName('special-defense')).toBe('Defensa Esp.');
      expect(component.getStatName('speed')).toBe('Velocidad');
    });

    it('should return original name for unknown stat', () => {
      expect(component.getStatName('unknown-stat')).toBe('unknown-stat');
    });
  });

  describe('formatPokemonName', () => {
    it('should capitalize first letter of pokemon name', () => {
      expect(component.formatPokemonName('bulbasaur')).toBe('Bulbasaur');
      expect(component.formatPokemonName('ivysaur')).toBe('Ivysaur');
    });
  });
});
