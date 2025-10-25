import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './types.component.html',
  styleUrl: './types.component.css',
})
export class TypesComponent {
  title = 'Tipos y Fortalezas';

  pokemonTypes = [
    {
      name: 'Fuego',
      emoji: '🔥',
      strongAgainst: ['Planta', 'Bicho', 'Acero'],
      weakAgainst: ['Agua', 'Roca', 'Tierra'],
    },
    {
      name: 'Agua',
      emoji: '💧',
      strongAgainst: ['Fuego', 'Tierra', 'Roca'],
      weakAgainst: ['Planta', 'Eléctrico'],
    },
    {
      name: 'Planta',
      emoji: '🌱',
      strongAgainst: ['Agua', 'Tierra', 'Roca'],
      weakAgainst: ['Fuego', 'Hielo', 'Volador'],
    },
    { name: 'Eléctrico', emoji: '⚡', strongAgainst: ['Agua', 'Volador'], weakAgainst: ['Tierra'] },
    {
      name: 'Psíquico',
      emoji: '🧠',
      strongAgainst: ['Lucha', 'Veneno'],
      weakAgainst: ['Siniestro', 'Acero'],
    },
    {
      name: 'Hielo',
      emoji: '❄️',
      strongAgainst: ['Planta', 'Tierra', 'Volador'],
      weakAgainst: ['Fuego', 'Lucha', 'Roca'],
    },
    {
      name: 'Lucha',
      emoji: '👊',
      strongAgainst: ['Normal', 'Hielo', 'Roca'],
      weakAgainst: ['Volador', 'Psíquico'],
    },
    { name: 'Veneno', emoji: '☠️', strongAgainst: ['Planta'], weakAgainst: ['Tierra', 'Psíquico'] },
    {
      name: 'Tierra',
      emoji: '🏔️',
      strongAgainst: ['Fuego', 'Eléctrico', 'Veneno'],
      weakAgainst: ['Agua', 'Planta', 'Hielo'],
    },
    {
      name: 'Volador',
      emoji: '🕊️',
      strongAgainst: ['Planta', 'Lucha'],
      weakAgainst: ['Eléctrico', 'Hielo', 'Roca'],
    },
    {
      name: 'Psíquico',
      emoji: '🧠',
      strongAgainst: ['Lucha', 'Veneno'],
      weakAgainst: ['Siniestro', 'Acero'],
    },
    {
      name: 'Bicho',
      emoji: '🐛',
      strongAgainst: ['Planta', 'Psíquico'],
      weakAgainst: ['Fuego', 'Volador', 'Roca'],
    },
    {
      name: 'Roca',
      emoji: '🪨',
      strongAgainst: ['Fuego', 'Hielo', 'Volador'],
      weakAgainst: ['Agua', 'Planta', 'Lucha'],
    },
    {
      name: 'Fantasma',
      emoji: '👻',
      strongAgainst: ['Psíquico', 'Fantasma'],
      weakAgainst: ['Siniestro'],
    },
    { name: 'Dragón', emoji: '🐉', strongAgainst: ['Dragón'], weakAgainst: ['Hielo', 'Dragón'] },
    {
      name: 'Siniestro',
      emoji: '🌑',
      strongAgainst: ['Psíquico', 'Fantasma'],
      weakAgainst: ['Lucha', 'Bicho'],
    },
    {
      name: 'Acero',
      emoji: '⚙️',
      strongAgainst: ['Hielo', 'Roca'],
      weakAgainst: ['Fuego', 'Lucha', 'Tierra'],
    },
    {
      name: 'Hada',
      emoji: '🧚',
      strongAgainst: ['Lucha', 'Dragón', 'Siniestro'],
      weakAgainst: ['Veneno', 'Acero'],
    },
  ];

  constructor() {}
}
