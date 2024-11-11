export var UnitType;
(function (UnitType) {
    UnitType["Infantry"] = "Infantry";
    UnitType["Armor"] = "Armor";
    UnitType["Artillery"] = "Artillery";
})(UnitType || (UnitType = {}));
export var DiceValue;
(function (DiceValue) {
    DiceValue["Grenade"] = "Grenade";
    DiceValue["Star"] = "Star";
    DiceValue["Flag"] = "Flag";
    DiceValue["IgnoredFlag"] = "IgnoredFlag";
    DiceValue["Infantry"] = "Infantry";
    DiceValue["Armor"] = "Armor";
})(DiceValue || (DiceValue = {}));
function hits(diceValue, oddsRequest) {
    return diceValue.toString() == oddsRequest.target.toString()
        || diceValue == DiceValue.Grenade
        || diceValue == DiceValue.Flag && oddsRequest.flagsMeanHit
        || diceValue == DiceValue.Star && oddsRequest.starsMeanHit;
}
function numHits(diceRoll, oddsRequest) {
    let result = 0;
    for (let i = 0; i < diceRoll.length; i++) {
        if (hits(diceRoll[i], oddsRequest) && result < oddsRequest.numFigures) {
            result++;
        }
    }
    return result;
}
function classifyRolls(rolls, request) {
    let classifyRolls = Array(request.numFigures + 1).fill(0);
    rolls.forEach(function (roll) {
        let nh = numHits(roll, request);
        classifyRolls[nh]++;
    });
    return classifyRolls;
}
// Morph some Flags into IgnoredFlags
// Changes the array in-place for speed and preserving memory on small devices
export function ignoreFlags(rolls, flagsThatCanBeIgnored) {
    if (flagsThatCanBeIgnored === 0) {
        return;
    }
    rolls.forEach((roll) => {
        let toBeIgnored = flagsThatCanBeIgnored;
        for (let i = 0; i < roll.length; i++) {
            if (roll[i] === DiceValue.Flag && toBeIgnored > 0) {
                roll[i] = DiceValue.IgnoredFlag;
                toBeIgnored--;
            }
        }
    });
    return;
}
export function evaluateOddsRequest(request) {
    let diceFaces = [DiceValue.Grenade, DiceValue.Star, DiceValue.Armor, DiceValue.Infantry, DiceValue.Infantry, DiceValue.Flag];
    let rolls = enumerateRolls(request.numDice, diceFaces);
    ignoreFlags(rolls, request.flagsThatCanBeIgnored);
    let rollsCountByHits = classifyRolls(rolls, request);
    let result = [];
    for (let i = 0; i < rollsCountByHits.length; i++) {
        result.push({
            numHits: i,
            rolls: rollsCountByHits[i],
            totalRolls: rolls.length,
            probability: rollsCountByHits[i] / rolls.length,
        });
    }
    return result;
}
export function enumerateRolls(numDice, diceFaces) {
    if (numDice === 0) {
        return [];
    }
    let result = [];
    if (numDice === 1) {
        diceFaces.forEach(function (face) {
            result.push([face]);
        });
        return result;
    }
    let recResult = enumerateRolls(numDice - 1, diceFaces);
    recResult.forEach(function (rec) {
        diceFaces.forEach(function (face) {
            result.push(rec.concat([face]));
        });
    });
    return result;
}
