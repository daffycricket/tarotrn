
import { IllegalArgumentError } from './IllegalArgumentError';
import { OUDLER_COUNT_POINTS, CONTRACTS } from './constants';

export const computeAttackDeltaPoints = (attackScore, attackOudlerCount) => {
  let targetScore = 0;
  switch (attackOudlerCount) {
    case 0:
      targetScore = OUDLER_COUNT_POINTS.zeroOudler;
      break;
    case 1:
      targetScore = OUDLER_COUNT_POINTS.oneOudler;
      break;
    case 2:
      targetScore = OUDLER_COUNT_POINTS.twoOudlers;
      break;
    case 3:
      targetScore = OUDLER_COUNT_POINTS.threeOudlers;
      break;
    default:
      throw new IllegalArgumentError(
        'incorrect oudler count, should be 0, 1, 2 or 3'
      );
  }

  return attackScore - targetScore;
};

export const attackWins = (attackScore, attackOudlerCount) => {
  switch (attackOudlerCount) {
    case 0:
      return attackScore >= OUDLER_COUNT_POINTS.zeroOudler;
    case 1:
      return attackScore >= OUDLER_COUNT_POINTS.oneOudler;
    case 2:
      return attackScore >= OUDLER_COUNT_POINTS.twoOudlers;
    case 3:
      return attackScore >= OUDLER_COUNT_POINTS.threeOudlers;
    default:
      throw new IllegalArgumentError(
        'incorrect oudler count, should be 0, 1, 2 or 3'
      );
  }
};

export const individualGamePoints =
  (attackScore, attackOudlerCount, contract, contractPointValues) => {
  let contractPoints = 0;
  switch (contract) {
    case CONTRACTS.prise:
      contractPoints = contractPointValues.prise;
      break;
    case CONTRACTS.garde:
      contractPoints = contractPointValues.garde;
      break;
    case CONTRACTS.gardeSans:
      contractPoints = contractPointValues.gardeSans;
      break;
    case CONTRACTS.gardeContre:
      contractPoints = contractPointValues.gardeContre;
      break;
    default:
  }

  const individualPlayerPoints =
    contractPoints + computeAttackDeltaPoints(attackScore, attackOudlerCount);

  return individualPlayerPoints;
};
