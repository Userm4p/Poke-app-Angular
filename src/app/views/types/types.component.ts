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
  title = 'Types & Strengths';

  pokemonTypes = [
    {
      name: 'Fire',
      emoji: '🔥',
      strongAgainst: ['Grass', 'Bug', 'Steel'],
      weakAgainst: ['Water', 'Rock', 'Ground'],
    },
    {
      name: 'Water',
      emoji: '💧',
      strongAgainst: ['Fire', 'Ground', 'Rock'],
      weakAgainst: ['Grass', 'Electric'],
    },
    {
      name: 'Grass',
      emoji: '🌱',
      strongAgainst: ['Water', 'Ground', 'Rock'],
      weakAgainst: ['Fire', 'Ice', 'Flying'],
    },
    { name: 'Electric', emoji: '⚡', strongAgainst: ['Water', 'Flying'], weakAgainst: ['Ground'] },
    {
      name: 'Psychic',
      emoji: '🧠',
      strongAgainst: ['Fighting', 'Poison'],
      weakAgainst: ['Dark', 'Steel'],
    },
    {
      name: 'Ice',
      emoji: '❄️',
      strongAgainst: ['Grass', 'Ground', 'Flying'],
      weakAgainst: ['Fire', 'Fighting', 'Rock'],
    },
    {
      name: 'Fighting',
      emoji: '👊',
      strongAgainst: ['Normal', 'Ice', 'Rock'],
      weakAgainst: ['Flying', 'Psychic'],
    },
    { name: 'Poison', emoji: '☠️', strongAgainst: ['Grass'], weakAgainst: ['Ground', 'Psychic'] },
    {
      name: 'Ground',
      emoji: '🏔️',
      strongAgainst: ['Fire', 'Electric', 'Poison'],
      weakAgainst: ['Water', 'Grass', 'Ice'],
    },
    {
      name: 'Flying',
      emoji: '🕊️',
      strongAgainst: ['Grass', 'Fighting'],
      weakAgainst: ['Electric', 'Ice', 'Rock'],
    },
    {
      name: 'Bug',
      emoji: '🐛',
      strongAgainst: ['Grass', 'Psychic'],
      weakAgainst: ['Fire', 'Flying', 'Rock'],
    },
    {
      name: 'Rock',
      emoji: '🪨',
      strongAgainst: ['Fire', 'Ice', 'Flying'],
      weakAgainst: ['Water', 'Grass', 'Fighting'],
    },
    {
      name: 'Ghost',
      emoji: '👻',
      strongAgainst: ['Psychic', 'Ghost'],
      weakAgainst: ['Dark'],
    },
    { name: 'Dragon', emoji: '🐉', strongAgainst: ['Dragon'], weakAgainst: ['Ice', 'Dragon'] },
    {
      name: 'Dark',
      emoji: '🌑',
      strongAgainst: ['Psychic', 'Ghost'],
      weakAgainst: ['Fighting', 'Bug'],
    },
    {
      name: 'Steel',
      emoji: '⚙️',
      strongAgainst: ['Ice', 'Rock'],
      weakAgainst: ['Fire', 'Fighting', 'Ground'],
    },
    {
      name: 'Fairy',
      emoji: '🧚',
      strongAgainst: ['Fighting', 'Dragon', 'Dark'],
      weakAgainst: ['Poison', 'Steel'],
    },
  ];

  constructor() {}
}
