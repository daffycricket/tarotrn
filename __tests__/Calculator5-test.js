// jest matchers https://jestjs.io/docs/en/using-matchers
import { Calculator } from '../src/business';
import { GAME_TYPES, CONTRACTS, STANDARD_CONTRACTS_POINTS } from '../src/business/constants';

const contractPointValues = STANDARD_CONTRACTS_POINTS;
const players = { one: 'ludo', two: 'emilie', three: 'pm', four: 'nico', five: 'barbu' };
const attackPlayers = ['ludo', 'barbu'];
const defensePlayers = ['pm', 'emilie', 'nico'];
const calculator = new Calculator(contractPointValues, GAME_TYPES.fivePlayers, players);

test('game scores calculation is correct if ludo and barbu win over pm, emilie and nico', () => {
  expect(calculator.computeGameScores(36, 3, CONTRACTS.prise, attackPlayers, defensePlayers)).toEqual({ ludo: 50, barbu: 25, pm: -25, emilie: -25, nico: -25 });
  expect(calculator.computeGameScores(41, 2, CONTRACTS.garde, attackPlayers, defensePlayers)).toEqual({ ludo: 100, barbu: 50, pm: -50, emilie: -50, nico: -50 });
  expect(calculator.computeGameScores(51, 1, CONTRACTS.gardeSans, attackPlayers, defensePlayers)).toEqual({ ludo: 200, barbu: 100, pm: -100, emilie: -100, nico: -100 });
  expect(calculator.computeGameScores(56, 0, CONTRACTS.gardeContre, attackPlayers, defensePlayers)).toEqual({ ludo: 300, barbu: 150, pm: -150, emilie: -150, nico: -150 });
});

test('game scores calculation is correct if ludo and barbu lose over pm, emilie and nico', () => {
  expect(calculator.computeGameScores(35, 3, CONTRACTS.prise, attackPlayers, defensePlayers)).toEqual({ ludo: -52, barbu: -26, pm: 26, emilie: 26, nico: 26 });
  expect(calculator.computeGameScores(40, 2, CONTRACTS.garde, attackPlayers, defensePlayers)).toEqual({ ludo: -102, barbu: -51, pm: 51, emilie: 51, nico: 51 });
  expect(calculator.computeGameScores(50, 1, CONTRACTS.gardeSans, attackPlayers, defensePlayers)).toEqual({ ludo: -202, barbu: -101, pm: 101, emilie: 101, nico: 101 });
  expect(calculator.computeGameScores(55, 0, CONTRACTS.gardeContre, attackPlayers, defensePlayers)).toEqual({ ludo: -302, barbu: -151, pm: 151, emilie: 151, nico: 151 });
});
