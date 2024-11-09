"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerateRolls = exports.evaluateOddsRequest = exports.DiceValue = exports.UnitType = void 0;
var UnitType;
(function (UnitType) {
    UnitType["Infantry"] = "Infantry";
    UnitType["Armor"] = "Armor";
    UnitType["Artillery"] = "Artillery";
})(UnitType || (exports.UnitType = UnitType = {}));
var DiceValue;
(function (DiceValue) {
    DiceValue["Infantry"] = "Infantry";
    DiceValue["Armor"] = "Armor";
    DiceValue["Star"] = "Star";
    DiceValue["Flag"] = "Flag";
    DiceValue["Grenade"] = "Grenade";
})(DiceValue || (exports.DiceValue = DiceValue = {}));
function hits(diceValue, oddsRequest) {
    return diceValue.toString() == oddsRequest.target.toString()
        || diceValue == DiceValue.Grenade
        || diceValue == DiceValue.Flag && oddsRequest.flagsMeanHit
        || diceValue == DiceValue.Star && oddsRequest.starsMeanHit;
}
function numHits(diceRoll, oddsRequest) {
    let result = 0;
    let flagsThatCanBeIgnored = oddsRequest.flagsThatCanBeIgnored;
    for (let i = 0; i < diceRoll.length; i++) {
        if (oddsRequest.flagsMeanHit && diceRoll[i] === DiceValue.Flag && flagsThatCanBeIgnored > 0) {
            flagsThatCanBeIgnored--;
            continue;
        }
        if (hits(diceRoll[i], oddsRequest) && result < oddsRequest.numFigures) {
            result++;
        }
    }
    return result;
}
function evaluateOddsRequest(request) {
    let diceFaces = [DiceValue.Grenade, DiceValue.Star, DiceValue.Armor, DiceValue.Infantry, DiceValue.Infantry, DiceValue.Flag];
    let combinations = enumerateRolls(request.numDice, diceFaces);
    let classifyCombinations = Array(request.numFigures + 1).fill(0);
    combinations.forEach(function (combination) {
        let nk = numHits(combination, request);
        classifyCombinations[nk]++;
    });
    let result = [];
    for (let i = 0; i < classifyCombinations.length; i++) {
        result.push({ numHits: i, probability: classifyCombinations[i] / combinations.length });
    }
    return result;
}
exports.evaluateOddsRequest = evaluateOddsRequest;
function enumerateRolls(numDice, diceFaces) {
    if (numDice === 0) {
        return [];
    }
    let result = [];
    if (numDice === 1) {
        for (let i = 0; i < diceFaces.length; i++) {
            result.push([diceFaces[i]]);
        }
        return result;
    }
    let recResult = enumerateRolls(numDice - 1, diceFaces);
    for (let r = 0; r < recResult.length; r++) {
        let rec = recResult[r];
        for (let i = 0; i < diceFaces.length; i++) {
            result.push(rec.concat([diceFaces[i]]));
        }
    }
    return result;
}
exports.enumerateRolls = enumerateRolls;
