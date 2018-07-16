// jest matchers https://jestjs.io/docs/en/using-matchers
import { Calculator } from '../src/business';
import { GAME_TYPES, CONTRACTS, STANDARD_CONTRACTS_POINTS } from '../src/business/constants';

const contractPointValues = STANDARD_CONTRACTS_POINTS;
const calculator = new Calculator(contractPointValues, GAME_TYPES.threePlayerType);

test('delta with zero oudler calculation is correct', () => {
  deltaScore = calculator.computeAttackDeltaPoints(40, 0);
  expect(deltaScore).toBe(-16)
});

test('delta with one oudler calculation is correct', () => {
  deltaScore = calculator.computeAttackDeltaPoints(40, 1);
  expect(deltaScore).toBe(-11)
});

test('delta with two oudlers calculation is correct', () => {
  deltaScore = calculator.computeAttackDeltaPoints(40, 2);
  expect(deltaScore).toBe(-1)
});

test('delta with three oudlers calculation is correct', () => {
  deltaScore = calculator.computeAttackDeltaPoints(40, 3);
  expect(deltaScore).toBe(4)
});

test('delta with incorrect oudlers calculation throws exception', () => {
  expect(() => {
    calculator.computeAttackDeltaPoints(40, 5)
  }).toThrow('incorrect oudler count, should be 0, 1, 2 or 3')
});

test('attack loses', () => {
  expect(calculator.attackWins(55, 0)).toBeFalsy();
  expect(calculator.attackWins(50, 1)).toBeFalsy();
  expect(calculator.attackWins(40, 2)).toBeFalsy();
  expect(calculator.attackWins(35, 3)).toBeFalsy();
});

test('attack wins with attack score striclty higher than oudler count points', () => {
  expect(calculator.attackWins(58, 0)).toBeTruthy();
  expect(calculator.attackWins(53, 1)).toBeTruthy();
  expect(calculator.attackWins(45, 2)).toBeTruthy();
  expect(calculator.attackWins(40, 3)).toBeTruthy();
});

test('attack wins with attack score equals to oudler count points', () => {
  expect(calculator.attackWins(56, 0)).toBeTruthy();
  expect(calculator.attackWins(51, 1)).toBeTruthy();
  expect(calculator.attackWins(41, 2)).toBeTruthy();
  expect(calculator.attackWins(36, 3)).toBeTruthy();
});

test('attack point calculation is correct if attack wins a prise', () => {
  expect(calculator.computeIndividualAttackGamePoints(36, 3, CONTRACTS.prise)).toBe(contractPointValues.prise);
  expect(calculator.computeIndividualAttackGamePoints(41, 2, CONTRACTS.prise)).toBe(contractPointValues.prise);
  expect(calculator.computeIndividualAttackGamePoints(51, 1, CONTRACTS.prise)).toBe(contractPointValues.prise);
  expect(calculator.computeIndividualAttackGamePoints(56, 0, CONTRACTS.prise)).toBe(contractPointValues.prise);
});

test('attack point calculation is correct if attack loses a prise', () => {
  expect(calculator.computeIndividualAttackGamePoints(35, 3, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 1));
  expect(calculator.computeIndividualAttackGamePoints(39, 2, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 2));
  expect(calculator.computeIndividualAttackGamePoints(45, 1, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 6));
  expect(calculator.computeIndividualAttackGamePoints(45, 0, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 11));
});

test('attack point calculation is correct if attack wins a garde', () => {
  expect(calculator.computeIndividualAttackGamePoints(36, 3, CONTRACTS.garde)).toBe(contractPointValues.garde);
  expect(calculator.computeIndividualAttackGamePoints(41, 2, CONTRACTS.garde)).toBe(contractPointValues.garde);
  expect(calculator.computeIndividualAttackGamePoints(51, 1, CONTRACTS.garde)).toBe(contractPointValues.garde);
  expect(calculator.computeIndividualAttackGamePoints(56, 0, CONTRACTS.garde)).toBe(contractPointValues.garde);
});

test('attack point calculation is correct if attack loses a garde', () => {
  expect(calculator.computeIndividualAttackGamePoints(35, 3, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 1));
  expect(calculator.computeIndividualAttackGamePoints(39, 2, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 2));
  expect(calculator.computeIndividualAttackGamePoints(45, 1, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 6));
  expect(calculator.computeIndividualAttackGamePoints(45, 0, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 11));
});

test('attack point calculation is correct if attack wins a garde sans', () => {
  expect(calculator.computeIndividualAttackGamePoints(36, 3, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
  expect(calculator.computeIndividualAttackGamePoints(41, 2, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
  expect(calculator.computeIndividualAttackGamePoints(51, 1, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
  expect(calculator.computeIndividualAttackGamePoints(56, 0, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
});

test('attack point calculation is correct if attack loses a garde sans', () => {
  expect(calculator.computeIndividualAttackGamePoints(35, 3, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 1));
  expect(calculator.computeIndividualAttackGamePoints(39, 2, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 2));
  expect(calculator.computeIndividualAttackGamePoints(45, 1, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 6));
  expect(calculator.computeIndividualAttackGamePoints(45, 0, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 11));
});

test('attack point calculation is correct if attack wins a garde contre', () => {
  expect(calculator.computeIndividualAttackGamePoints(36, 3, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
  expect(calculator.computeIndividualAttackGamePoints(41, 2, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
  expect(calculator.computeIndividualAttackGamePoints(51, 1, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
  expect(calculator.computeIndividualAttackGamePoints(56, 0, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
});

test('attack point calculation is correct if attack loses a garde contre', () => {
  expect(calculator.computeIndividualAttackGamePoints(35, 3, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 1));
  expect(calculator.computeIndividualAttackGamePoints(39, 2, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 2));
  expect(calculator.computeIndividualAttackGamePoints(45, 1, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 6));
  expect(calculator.computeIndividualAttackGamePoints(45, 0, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 11));
});

test('game point calculation is correct if attack wins a prise', () => {
  // TODO check syntax, commented line doesnt work
  // expect(calculator.computeGameBasePoints(36, 3, CONTRACTS.prise)).toEqual({ attackPoints: CONTRACTS.garde, defensePoints: -CONTRACTS.garde });
  expect(calculator.computeGameBasePoints(36, 3, CONTRACTS.prise)).toEqual({ attackPoints: 25, defensePoints: -25 });
  expect(calculator.computeGameBasePoints(41, 2, CONTRACTS.prise)).toEqual({ attackPoints: 25, defensePoints: -25 });
  expect(calculator.computeGameBasePoints(51, 1, CONTRACTS.prise)).toEqual({ attackPoints: 25, defensePoints: -25 });
  expect(calculator.computeGameBasePoints(56, 0, CONTRACTS.prise)).toEqual({ attackPoints: 25, defensePoints: -25 });
});

test('game point calculation is correct if attack loses a prise', () => {
  expect(calculator.computeGameBasePoints(35, 3, CONTRACTS.prise)).toEqual({ attackPoints: -26, defensePoints: 26 });
  expect(calculator.computeGameBasePoints(40, 2, CONTRACTS.prise)).toEqual({ attackPoints: -26, defensePoints: 26 });
  expect(calculator.computeGameBasePoints(50, 1, CONTRACTS.prise)).toEqual({ attackPoints: -26, defensePoints: 26 });
  expect(calculator.computeGameBasePoints(55, 0, CONTRACTS.prise)).toEqual({ attackPoints: -26, defensePoints: 26 });
});

test('game point calculation is correct if attack wins a garde', () => {
  expect(calculator.computeGameBasePoints(36, 3, CONTRACTS.garde)).toEqual({ attackPoints: 50, defensePoints: -50 });
  expect(calculator.computeGameBasePoints(41, 2, CONTRACTS.garde)).toEqual({ attackPoints: 50, defensePoints: -50 });
  expect(calculator.computeGameBasePoints(51, 1, CONTRACTS.garde)).toEqual({ attackPoints: 50, defensePoints: -50 });
  expect(calculator.computeGameBasePoints(56, 0, CONTRACTS.garde)).toEqual({ attackPoints: 50, defensePoints: -50 });
});

test('game point calculation is correct if attack loses a garde', () => {
  expect(calculator.computeGameBasePoints(35, 3, CONTRACTS.garde)).toEqual({ attackPoints: -51, defensePoints: 51 });
  expect(calculator.computeGameBasePoints(40, 2, CONTRACTS.garde)).toEqual({ attackPoints: -51, defensePoints: 51 });
  expect(calculator.computeGameBasePoints(50, 1, CONTRACTS.garde)).toEqual({ attackPoints: -51, defensePoints: 51 });
  expect(calculator.computeGameBasePoints(55, 0, CONTRACTS.garde)).toEqual({ attackPoints: -51, defensePoints: 51 });
});

test('game point calculation is correct if attack wins a garde sans', () => {
  expect(calculator.computeGameBasePoints(36, 3, CONTRACTS.gardeSans)).toEqual({ attackPoints: 100, defensePoints: -100 });
  expect(calculator.computeGameBasePoints(41, 2, CONTRACTS.gardeSans)).toEqual({ attackPoints: 100, defensePoints: -100 });
  expect(calculator.computeGameBasePoints(51, 1, CONTRACTS.gardeSans)).toEqual({ attackPoints: 100, defensePoints: -100 });
  expect(calculator.computeGameBasePoints(56, 0, CONTRACTS.gardeSans)).toEqual({ attackPoints: 100, defensePoints: -100 });
});

test('game point calculation is correct if attack loses a garde sans', () => {
  expect(calculator.computeGameBasePoints(35, 3, CONTRACTS.gardeSans)).toEqual({ attackPoints: -101, defensePoints: 101 });
  expect(calculator.computeGameBasePoints(40, 2, CONTRACTS.gardeSans)).toEqual({ attackPoints: -101, defensePoints: 101 });
  expect(calculator.computeGameBasePoints(50, 1, CONTRACTS.gardeSans)).toEqual({ attackPoints: -101, defensePoints: 101 });
  expect(calculator.computeGameBasePoints(55, 0, CONTRACTS.gardeSans)).toEqual({ attackPoints: -101, defensePoints: 101 });
});

test('game point calculation is correct if attack wins a garde contre', () => {
  expect(calculator.computeGameBasePoints(36, 3, CONTRACTS.gardeContre)).toEqual({ attackPoints: 150, defensePoints: -150 });
  expect(calculator.computeGameBasePoints(41, 2, CONTRACTS.gardeContre)).toEqual({ attackPoints: 150, defensePoints: -150 });
  expect(calculator.computeGameBasePoints(51, 1, CONTRACTS.gardeContre)).toEqual({ attackPoints: 150, defensePoints: -150 });
  expect(calculator.computeGameBasePoints(56, 0, CONTRACTS.gardeContre)).toEqual({ attackPoints: 150, defensePoints: -150 });
});

test('game point calculation is correct if attack loses a garde contre', () => {
  expect(calculator.computeGameBasePoints(35, 3, CONTRACTS.gardeContre)).toEqual({ attackPoints: -151, defensePoints: 151 });
  expect(calculator.computeGameBasePoints(40, 2, CONTRACTS.gardeContre)).toEqual({ attackPoints: -151, defensePoints: 151 });
  expect(calculator.computeGameBasePoints(50, 1, CONTRACTS.gardeContre)).toEqual({ attackPoints: -151, defensePoints: 151 });
  expect(calculator.computeGameBasePoints(55, 0, CONTRACTS.gardeContre)).toEqual({ attackPoints: -151, defensePoints: 151 });
});
