import { getScore } from './game.js';
let records = getRecord() || [];

export function setRecord() {
  let score = getScore();
  records.push(score);
  localStorage.setItem('snake-record', JSON.stringify(records));
}

export function getRecord() {
  return JSON.parse(localStorage.getItem('snake-record')) ;
}

export function getBestRecord() {
  let records = getRecord();
  return Math.max(...records);
}