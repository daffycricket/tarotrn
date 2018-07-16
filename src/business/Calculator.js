
import { IllegalArgumentError } from './IllegalArgumentError';
import { OUDLER_COUNT_POINTS, CONTRACTS } from './constants';

export class Calculator {
  constructor(contractPointValues) {
    this.contractPointValues = contractPointValues;
  }

  computeAttackDeltaPoints = (attackScore, attackOudlerCount) => {
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

  attackWins = (attackScore, attackOudlerCount) => {
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

  computeIndividualGamePoints = (attackScore, attackOudlerCount, contract) => {
    let contractPoints = 0;
    switch (contract) {
      case CONTRACTS.prise:
        contractPoints = this.contractPointValues.prise;
        break;
      case CONTRACTS.garde:
        contractPoints = this.contractPointValues.garde;
        break;
      case CONTRACTS.gardeSans:
        contractPoints = this.contractPointValues.gardeSans;
        break;
      case CONTRACTS.gardeContre:
        contractPoints = this.contractPointValues.gardeContre;
        break;
      default:
      throw new IllegalArgumentError(
        'incorrect contract, should be prise, garde, gardeSans or gardeContre'
      );
    }

    const attackDeltaPoints = this.computeAttackDeltaPoints(attackScore, attackOudlerCount);
    const attackWins = this.attackWins(attackScore, attackOudlerCount);
    const absoluteIndividualPlayerPoints = contractPoints + Math.abs(attackDeltaPoints);
    const individualPlayerPoints = attackWins ? absoluteIndividualPlayerPoints : -1 * absoluteIndividualPlayerPoints;

    // console.log('attackDeltaPoints ' + attackDeltaPoints);
    // console.log('attackWins ' + attackWins);
    // console.log('absoluteIndividualPlayerPoints ' + absoluteIndividualPlayerPoints);
    // console.log('individualPlayerPoints ' + individualPlayerPoints);

    return individualPlayerPoints;
  };
}
