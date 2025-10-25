import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService, Move, MoveListResponse } from '../../services/pokemon.service';

@Component({
  selector: 'app-moves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moves.component.html',
  styleUrl: './moves.component.css',
})
export class MovesComponent implements OnInit, OnDestroy {
  title = 'Movimientos';

  allMoves: Move[] = [];
  searchResults: Move[] = [];
  filteredMoves: Move[] = [];
  isLoading = false;
  currentPage = 0;
  pageSize = 20;
  totalMoves = 0;

  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadMoves();
  }

  ngOnDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  loadMoves() {
    this.isLoading = true;
    this.pokemonService.getMoveList(this.currentPage * this.pageSize, this.pageSize).subscribe({
      next: (response: MoveListResponse) => {
        this.totalMoves = response.count;
        this.loadMoveDetails(response.results);
      },
      error: (error) => {
        console.error('Error cargando movimientos:', error);
        this.isLoading = false;
      },
    });
  }

  loadMoveDetails(moveResults: Array<{ name: string; url: string }>) {
    const promises = moveResults.map((move) => {
      const moveId = move.url.split('/').slice(-2, -1)[0];
      return this.pokemonService.getMove(moveId).toPromise();
    });

    Promise.all(promises).then((moveDetails) => {
      this.allMoves = [...this.allMoves, ...(moveDetails.filter((m) => m !== undefined) as Move[])];
      this.filteredMoves = [...this.allMoves];
      this.isLoading = false;
    });
  }

  loadMoreMoves() {
    if (this.isLoading) return;

    this.currentPage++;
    this.loadMoves();
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

  getCategoryName(category: string): string {
    const categoryNames: { [key: string]: string } = {
      physical: 'Físico',
      special: 'Especial',
      status: 'Estado',
    };
    return categoryNames[category] || category;
  }

  formatMoveName(name: string): string {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getMoveEffect(move: Move): string {
    const spanishEffect = move.effect_entries.find((effect) => effect.language.name === 'es');

    if (spanishEffect) {
      return spanishEffect.effect.replace(
        /\$effect_chance/g,
        move.effect_chance?.toString() || '0',
      );
    }

    const englishEffect = move.effect_entries.find((effect) => effect.language.name === 'en');

    if (englishEffect) {
      return englishEffect.effect.replace(
        /\$effect_chance/g,
        move.effect_chance?.toString() || '0',
      );
    }

    return 'Sin descripción disponible';
  }

  getMoveEmoji(type: string): string {
    const typeEmojis: { [key: string]: string } = {
      normal: '⚪',
      fire: '🔥',
      water: '💧',
      electric: '⚡',
      grass: '🌱',
      ice: '❄️',
      fighting: '👊',
      poison: '☠️',
      ground: '🌍',
      flying: '🕊️',
      psychic: '🧠',
      bug: '🐛',
      rock: '🪨',
      ghost: '👻',
      dragon: '🐉',
      dark: '🌑',
      steel: '⚙️',
      fairy: '✨',
    };
    return typeEmojis[type] || '⚪';
  }
}
