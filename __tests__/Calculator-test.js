// jest matchers https://jestjs.io/docs/en/using-matchers
import { computeAttackDeltaPoints, attackWins, individualGamePoints } from '../src/business';
import { GAME_STYLES, CONTRACTS, STANDARD_CONTRACTS_POINTS } from '../src/business/constants';


test('delta with zero oudler calculation is correct', () => {
  deltaScore = computeAttackDeltaPoints(40, 0);
  expect(deltaScore).toBe(-16)
});

test('delta with one oudler calculation is correct', () => {
  deltaScore = computeAttackDeltaPoints(40, 1);
  expect(deltaScore).toBe(-11)
});

test('delta with two oudlers calculation is correct', () => {
  deltaScore = computeAttackDeltaPoints(40, 2);
  expect(deltaScore).toBe(-1)
});

test('delta with three oudlers calculation is correct', () => {
  deltaScore = computeAttackDeltaPoints(40, 3);
  expect(deltaScore).toBe(4)
});

test('delta with incorrect oudlers calculation throws exception', () => {
  expect(() => {
    computeAttackDeltaPoints(40, 5)
  }).toThrow('incorrect oudler count, should be 0, 1, 2 or 3')
});

test('attack loses', () => {
  expect(attackWins(55, 0)).toBeFalsy();
  expect(attackWins(50, 1)).toBeFalsy();
  expect(attackWins(40, 2)).toBeFalsy();
  expect(attackWins(35, 3)).toBeFalsy();
});

test('attack wins with attack score striclty higher than oudler count points', () => {
  expect(attackWins(58, 0)).toBeTruthy();
  expect(attackWins(53, 1)).toBeTruthy();
  expect(attackWins(45, 2)).toBeTruthy();
  expect(attackWins(40, 3)).toBeTruthy();
});

test('attack wins with attack score equals to oudler count points', () => {
  expect(attackWins(56, 0)).toBeTruthy();
  expect(attackWins(51, 1)).toBeTruthy();
  expect(attackWins(41, 2)).toBeTruthy();
  expect(attackWins(36, 3)).toBeTruthy();
});

test('attack point calculation is correct for 3 game style if attack wins a prise', () => {
  const contractPointValues = STANDARD_CONTRACTS_POINTS;
  expect(individualGamePoints(36, 3, CONTRACTS.prise, contractPointValues)).toBe(contractPointValues.prise);
  expect(individualGamePoints(41, 2, CONTRACTS.prise, contractPointValues)).toBe(contractPointValues.prise);
  expect(individualGamePoints(51, 1, CONTRACTS.prise, contractPointValues)).toBe(contractPointValues.prise);
  expect(individualGamePoints(56, 0, CONTRACTS.prise, contractPointValues)).toBe(contractPointValues.prise);
});

test('attack point calculation is correct for 3 game style if attack wins a garde', () => {
  const contractPointValues = STANDARD_CONTRACTS_POINTS;
  expect(individualGamePoints(36, 3, CONTRACTS.garde, contractPointValues)).toBe(contractPointValues.garde);
  expect(individualGamePoints(41, 2, CONTRACTS.garde, contractPointValues)).toBe(contractPointValues.garde);
  expect(individualGamePoints(51, 1, CONTRACTS.garde, contractPointValues)).toBe(contractPointValues.garde);
  expect(individualGamePoints(56, 0, CONTRACTS.garde, contractPointValues)).toBe(contractPointValues.garde);
});

test('attack point calculation is correct for 3 game style if attack wins a garde sans', () => {
  const contractPointValues = STANDARD_CONTRACTS_POINTS;
  expect(individualGamePoints(36, 3, CONTRACTS.gardeSans, contractPointValues)).toBe(contractPointValues.gardeSans);
  expect(individualGamePoints(41, 2, CONTRACTS.gardeSans, contractPointValues)).toBe(contractPointValues.gardeSans);
  expect(individualGamePoints(51, 1, CONTRACTS.gardeSans, contractPointValues)).toBe(contractPointValues.gardeSans);
  expect(individualGamePoints(56, 0, CONTRACTS.gardeSans, contractPointValues)).toBe(contractPointValues.gardeSans);
});

test('attack point calculation is correct for 3 game style if attack wins a garde contre', () => {
  const contractPointValues = STANDARD_CONTRACTS_POINTS;
  expect(individualGamePoints(36, 3, CONTRACTS.gardeContre, contractPointValues)).toBe(contractPointValues.gardeContre);
  expect(individualGamePoints(41, 2, CONTRACTS.gardeContre, contractPointValues)).toBe(contractPointValues.gardeContre);
  expect(individualGamePoints(51, 1, CONTRACTS.gardeContre, contractPointValues)).toBe(contractPointValues.gardeContre);
  expect(individualGamePoints(56, 0, CONTRACTS.gardeContre, contractPointValues)).toBe(contractPointValues.gardeContre);
});
