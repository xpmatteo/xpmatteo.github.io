import { evaluateOddsRequest, UnitType } from "./memoir.js";
// the odds of rolling at least a Grenade is the opposite of
// the probability that all dice return a non-grenade
function oddsOfAtLeast1Grenade(numDice) {
    return (Math.pow(6, numDice) - Math.pow(5, numDice)) / Math.pow(6, numDice);
}
export function evaluateTigerRequest(oddsRequest) {
    const totalCombinations = Math.pow(6, (2 * oddsRequest.numDice));
    oddsRequest.target = UnitType.Artillery;
    oddsRequest.numFigures = oddsRequest.numDice;
    let firstHitOdds = evaluateOddsRequest(oddsRequest).map((oddsResponse) => oddsResponse.rolls);
    let totalCases = Math.pow(6, oddsRequest.numDice);
    let totalSuccess = 0;
    for (let hits = oddsRequest.numDice; hits >= 1; hits--) {
        totalSuccess += (firstHitOdds[hits] * totalCases) * oddsOfAtLeast1Grenade(hits);
    }
    return {
        totalSuccess,
        totalCombinations,
    };
}
