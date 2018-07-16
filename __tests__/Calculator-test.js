// jest matchers https://jestjs.io/docs/en/using-matchers
import { Calculator } from '../src/business';
import { GAME_STYLES, CONTRACTS, STANDARD_CONTRACTS_POINTS } from '../src/business/constants';

const contractPointValues = STANDARD_CONTRACTS_POINTS;
const calculator = new Calculator(contractPointValues);

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
  expect(calculator.computeIndividualGamePoints(36, 3, CONTRACTS.prise)).toBe(contractPointValues.prise);
  expect(calculator.computeIndividualGamePoints(41, 2, CONTRACTS.prise)).toBe(contractPointValues.prise);
  expect(calculator.computeIndividualGamePoints(51, 1, CONTRACTS.prise)).toBe(contractPointValues.prise);
  expect(calculator.computeIndividualGamePoints(56, 0, CONTRACTS.prise)).toBe(contractPointValues.prise);
});

test('attack point calculation is correct if attack loses a prise', () => {
  expect(calculator.computeIndividualGamePoints(35, 3, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 1));
  expect(calculator.computeIndividualGamePoints(39, 2, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 2));
  expect(calculator.computeIndividualGamePoints(45, 1, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 6));
  expect(calculator.computeIndividualGamePoints(45, 0, CONTRACTS.prise)).toBe(-(contractPointValues.prise + 11));
});

test('attack point calculation is correct if attack wins a garde', () => {
  expect(calculator.computeIndividualGamePoints(36, 3, CONTRACTS.garde)).toBe(contractPointValues.garde);
  expect(calculator.computeIndividualGamePoints(41, 2, CONTRACTS.garde)).toBe(contractPointValues.garde);
  expect(calculator.computeIndividualGamePoints(51, 1, CONTRACTS.garde)).toBe(contractPointValues.garde);
  expect(calculator.computeIndividualGamePoints(56, 0, CONTRACTS.garde)).toBe(contractPointValues.garde);
});

test('attack point calculation is correct if attack loses a garde', () => {
  expect(calculator.computeIndividualGamePoints(35, 3, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 1));
  expect(calculator.computeIndividualGamePoints(39, 2, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 2));
  expect(calculator.computeIndividualGamePoints(45, 1, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 6));
  expect(calculator.computeIndividualGamePoints(45, 0, CONTRACTS.garde)).toBe(-(contractPointValues.garde + 11));
});

test('attack point calculation is correct if attack wins a garde sans', () => {
  expect(calculator.computeIndividualGamePoints(36, 3, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
  expect(calculator.computeIndividualGamePoints(41, 2, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
  expect(calculator.computeIndividualGamePoints(51, 1, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
  expect(calculator.computeIndividualGamePoints(56, 0, CONTRACTS.gardeSans)).toBe(contractPointValues.gardeSans);
});

test('attack point calculation is correct if attack loses a garde sans', () => {
  expect(calculator.computeIndividualGamePoints(35, 3, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 1));
  expect(calculator.computeIndividualGamePoints(39, 2, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 2));
  expect(calculator.computeIndividualGamePoints(45, 1, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 6));
  expect(calculator.computeIndividualGamePoints(45, 0, CONTRACTS.gardeSans)).toBe(-(contractPointValues.gardeSans + 11));
});

test('attack point calculation is correct if attack wins a garde contre', () => {
  expect(calculator.computeIndividualGamePoints(36, 3, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
  expect(calculator.computeIndividualGamePoints(41, 2, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
  expect(calculator.computeIndividualGamePoints(51, 1, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
  expect(calculator.computeIndividualGamePoints(56, 0, CONTRACTS.gardeContre)).toBe(contractPointValues.gardeContre);
});

test('attack point calculation is correct if attack loses a garde contre', () => {
  expect(calculator.computeIndividualGamePoints(35, 3, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 1));
  expect(calculator.computeIndividualGamePoints(39, 2, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 2));
  expect(calculator.computeIndividualGamePoints(45, 1, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 6));
  expect(calculator.computeIndividualGamePoints(45, 0, CONTRACTS.gardeContre)).toBe(-(contractPointValues.gardeContre + 11));
});
