// jest matchers https://jestjs.io/docs/en/using-matchers
import { Calculator } from '../src/business';
import { GAME_TYPES, CONTRACTS, STANDARD_CONTRACTS_POINTS } from '../src/business/constants';

const contractPointValues = STANDARD_CONTRACTS_POINTS;
const players = { one: 'ludo', two: 'emilie', three: 'pm' };
const attackPlayers = ['ludo'];
const defensePlayers = ['pm', 'emilie'];
const calculator = new Calculator(contractPointValues, GAME_TYPES.threePlayers, players);

test('game scores calculation is correct if ludo wins over pm and emilie', () => {
  expect(calculator.computeGameScores(36, 3, CONTRACTS.prise, attackPlayers, defensePlayers)).toEqual({ ludo: 50, pm: -25, emilie: -25 });
  expect(calculator.computeGameScores(41, 2, CONTRACTS.garde, attackPlayers, defensePlayers)).toEqual({ ludo: 100, pm: -50, emilie: -50 });
  expect(calculator.computeGameScores(51, 1, CONTRACTS.gardeSans, attackPlayers, defensePlayers)).toEqual({ ludo: 200, pm: -100, emilie: -100 });
  expect(calculator.computeGameScores(56, 0, CONTRACTS.gardeContre, attackPlayers, defensePlayers)).toEqual({ ludo: 300, pm: -150, emilie: -150 });
});

test('game scores calculation is correct if ludo loses over pm and emilie', () => {
  expect(calculator.computeGameScores(35, 3, CONTRACTS.prise, attackPlayers, defensePlayers)).toEqual({ ludo: -52, pm: 26, emilie: 26 });
  expect(calculator.computeGameScores(40, 2, CONTRACTS.garde, attackPlayers, defensePlayers)).toEqual({ ludo: -102, pm: 51, emilie: 51 });
  expect(calculator.computeGameScores(50, 1, CONTRACTS.gardeSans, attackPlayers, defensePlayers)).toEqual({ ludo: -202, pm: 101, emilie: 101 });
  expect(calculator.computeGameScores(55, 0, CONTRACTS.gardeContre, attackPlayers, defensePlayers)).toEqual({ ludo: -302, pm: 151, emilie: 151 });
});
