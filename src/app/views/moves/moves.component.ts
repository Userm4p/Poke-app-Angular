import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moves',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moves.component.html',
  styleUrl: './moves.component.css',
})
export class MovesComponent {
  title = 'Movimientos';

  moves = [
    {
      name: 'Llamarada',
      type: 'Fuego',
      category: 'Especial',
      power: 95,
      accuracy: 100,
      pp: 15,
      description: 'Un poderoso ataque de fuego que puede causar quemaduras.',
      emoji: '🔥',
    },
    {
      name: 'Rayo',
      type: 'Eléctrico',
      category: 'Especial',
      power: 90,
      accuracy: 100,
      pp: 15,
      description: 'Un ataque eléctrico que puede paralizar al oponente.',
      emoji: '⚡',
    },
    {
      name: 'Hidrobomba',
      type: 'Agua',
      category: 'Especial',
      power: 110,
      accuracy: 80,
      pp: 5,
      description: 'Un potente chorro de agua que puede causar mucho daño.',
      emoji: '💧',
    },
    {
      name: 'Terremoto',
      type: 'Tierra',
      category: 'Físico',
      power: 100,
      accuracy: 100,
      pp: 10,
      description: 'Sacude el suelo con gran fuerza, afectando a todos los Pokémon.',
      emoji: '🌍',
    },
    {
      name: 'Psíquico',
      type: 'Psíquico',
      category: 'Especial',
      power: 90,
      accuracy: 100,
      pp: 10,
      description: 'Un ataque psíquico que puede reducir la defensa especial.',
      emoji: '🧠',
    },
    {
      name: 'Vuelo',
      type: 'Volador',
      category: 'Físico',
      power: 90,
      accuracy: 95,
      pp: 15,
      description: 'El usuario vuela alto y ataca en el siguiente turno.',
      emoji: '🕊️',
    },
    {
      name: 'Golpe Karate',
      type: 'Lucha',
      category: 'Físico',
      power: 50,
      accuracy: 100,
      pp: 25,
      description: 'Un golpe rápido que siempre golpea primero.',
      emoji: '👊',
    },
    {
      name: 'Látigo Cepa',
      type: 'Planta',
      category: 'Físico',
      power: 45,
      accuracy: 100,
      pp: 25,
      description: 'Golpea al oponente con lianas, ramas o raíces.',
      emoji: '🌱',
    },
    {
      name: 'Roca Afilada',
      type: 'Roca',
      category: 'Físico',
      power: 100,
      accuracy: 80,
      pp: 5,
      description: 'Lanza rocas afiladas que pueden causar daño crítico.',
      emoji: '🪨',
    },
    {
      name: 'Rayo Hielo',
      type: 'Hielo',
      category: 'Especial',
      power: 90,
      accuracy: 100,
      pp: 10,
      description: 'Un rayo de hielo que puede congelar al oponente.',
      emoji: '❄️',
    },
    {
      name: 'Puño Trueno',
      type: 'Eléctrico',
      category: 'Físico',
      power: 75,
      accuracy: 100,
      pp: 15,
      description: 'Un puñetazo eléctrico que puede paralizar.',
      emoji: '⚡',
    },
    {
      name: 'Golpe Fantasma',
      type: 'Fantasma',
      category: 'Físico',
      power: 30,
      accuracy: 100,
      pp: 15,
      description: 'Un ataque fantasma que siempre golpea primero.',
      emoji: '👻',
    },
  ];

  selectedType = 'Todos';
  selectedCategory = 'Todas';

  types = [
    'Todos',
    'Fuego',
    'Agua',
    'Planta',
    'Eléctrico',
    'Psíquico',
    'Hielo',
    'Lucha',
    'Veneno',
    'Tierra',
    'Volador',
    'Bicho',
    'Roca',
    'Fantasma',
    'Dragón',
    'Siniestro',
    'Acero',
    'Hada',
  ];
  categories = ['Todas', 'Físico', 'Especial', 'Estado'];

  get filteredMoves() {
    return this.moves.filter((move) => {
      const typeMatch = this.selectedType === 'Todos' || move.type === this.selectedType;
      const categoryMatch =
        this.selectedCategory === 'Todas' || move.category === this.selectedCategory;
      return typeMatch && categoryMatch;
    });
  }

  constructor() {}
}
