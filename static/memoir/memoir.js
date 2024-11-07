"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCombinations = exports.evaluateDiceRequest = exports.DiceValue = exports.UnitType = void 0;
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
function kills(diceValue, diceRequest) {
    return diceValue.toString() == diceRequest.target.toString()
        || diceValue == DiceValue.Grenade
        || diceValue == DiceValue.Flag && diceRequest.flagsMeanHit
        || diceValue == DiceValue.Star && diceRequest.starsMeanHit;
}
function numKills(combination, diceRequest) {
    let result = 0;
    for (let i = 0; i < combination.length; i++) {
        if (kills(combination[i], diceRequest) && result < diceRequest.numFigures) {
            result++;
        }
    }
    return result;
}
function evaluateDiceRequest(request) {
    let diceFaces = [DiceValue.Grenade, DiceValue.Star, DiceValue.Armor, DiceValue.Infantry, DiceValue.Infantry, DiceValue.Flag];
    let combinations = generateCombinations(request.numDice, diceFaces);
    let classifyCombinations = Array(request.numFigures + 1).fill(0);
    combinations.forEach(function (combination) {
        let nk = numKills(combination, request);
        classifyCombinations[nk]++;
    });
    let result = [];
    for (let i = 0; i < classifyCombinations.length; i++) {
        result.push({ numKills: i, probability: classifyCombinations[i] / combinations.length });
    }
    return result;
}
exports.evaluateDiceRequest = evaluateDiceRequest;
function generateCombinations(numDice, diceFaces) {
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
    let recResult = generateCombinations(numDice - 1, diceFaces);
    for (let r = 0; r < recResult.length; r++) {
        let rec = recResult[r];
        for (let i = 0; i < diceFaces.length; i++) {
            result.push(rec.concat([diceFaces[i]]));
        }
    }
    return result;
}
exports.generateCombinations = generateCombinations;
