+++
title = 'There Is No Advanced TDD'
date = '2023-07-28'
tags = [
    "TDD",
]
+++

*This article was previously published on [LinkedIn](https://www.linkedin.com/pulse/advanced-tdd-matteo-vaccari/ "There is no advanced TDD")*

![A screenshot of a FizzBuzz kata executed in JavaScript, very early stage](https://media.licdn.com/dms/image/D4D12AQFAVlkI-KVeIA/article-cover_image-shrink_720_1280/0/1690530970273?e=1715212800&v=beta&t=eMBDJeS83E-WrnRxPJRRH6VjaOhgLV7R70xBkq7OCzI)


> There's not really such as thing as "advanced TDD", other than  [practising TDD more diligently](https://blog.thecodewhisperer.com/permalink/the-myth-of-advanced-tdd),  [writes Esko Luontola](https://tdd.mooc.fi/5-advanced).

I experienced this directly when working on  [my hobby project](https://github.com/xpmatteo/auto-cca)  this month. I'm trying to code the rules to  [a boardgame](https://www.commandsandcolors.net/ancients/)  that is regarded as pretty simple by the boardgaming community (it has a  [complexity score of 2.69 over 5 on Boardgamegeek](https://boardgamegeek.com/boardgame/14105/commands-colors-ancients)). It is however orders of magnitude more complicated to code than, say, Force 4 or Chess.

One rule of this game that it took me a long time to get right is the one around retreats. It goes like this: when one of my units attacks another unit, I roll a number of  [special dice](https://www.gmtgames.com/p-1047-commands-colors-napoleonics-custom-dice.aspx), whose sides depict various symbols. Some symbols, when they turn face up, inflict damage on the opponent's unit. The "flag" symbol is special: it means that the unit is expected to retreat some hexes (1, 2, 3 or 4 hexes, depending on the defending unit's speed). There are a number of complications:

-   If more than one flag is rolled, the number of hexes that the unit must retreat is multiplied by the number of flags
-   If the defending unit's retreat path is blocked, it receives one point of damage for every retret hex not taken
-   If the defending unit has "support", meaning it is adjacent to at least two friendly units, the defending player may decide to ignore one flag result
-   If ignoring one flag would result in the defending unit taking damage, then it is not allowed to ignore the flag; that is, the defending player must always play so to minimize damage to the defending unit.

The above rules apply in the middle of the  close combat  procedure, which in turn has other complications, such as that if the defending unit does not die and does not retreat, it is entitled to  battle back, and other things.

My first idea was to single out the retreat logic in a pure function; pure in the sense that this function should not move units around on the board, take decisions, or apply damage. I wanted to focus on inputs (the dice results, the situation on the board) and the outputs: how much damage the defending unit should take, and what are the move options that the defending player must choose from. Instead of coding a function that acted on the model, I wanted a function that returned  a data structure that represents the actions to be taken. I think I learned this trick from a blog by  [Jessica Kerr](https://www.linkedin.com/in/jessicakerr/)  that I now am no longer able to find, where she called it the "super simple approach", or something like this.

I then proceeded to implement this, writing tests first. It did not go well! This is my git log:

<figure>
  <img src="https://media.licdn.com/dms/image/D4D12AQFcmF8BITHBNg/article-inline_image-shrink_1500_2232/0/1690529888292?e=1715212800&v=beta&t=kh0x3BmQST1tEhhjdQm_3-9fQKLYhNQ9YxMdxxGQ2yo" alt='The git log shows a lot of "WIP" commits and false starts'>

  <figcaption>The git log at the time when I realized I was not going to make it</figcaption>
</figure>

The code I had at `9a0ec89` looked like this: horribly complicated, and not working correctly. There are also signs of debugging via console logs, another indication that my effort was failing.

![Screenshot of my hopelessly complicated early code](https://media.licdn.com/dms/image/D4D12AQH3l_yT7mzseQ/article-inline_image-shrink_1000_1488/0/1690530024949?e=1715212800&v=beta&t=EcQ5U9XVJsOHcNIig4k1Ob6qCDr1xVRikiikw1C_2k8)

What went wrong? I took large steps. I tried to guess the correct algorithm too early. I forced myself to continue even though I was tired. Then I did the right thing: throw away the code and start from scratch!

This time I decided to try and follow TDD more carefully. Small steps and  [fake&nbsp;it](https://wiki.c2.com/?FakeIt). "Fake&nbsp;it" means that when I write a new failing test, I make it pass by returning the exact value that the test expects. It may look like cheating and wasting time; in fact, when we teach TDD we often hear complaints from learners about  [fake&nbsp;it](https://wiki.c2.com/?FakeIt). They tell us "this is silly; surely we don't do this in real work". Sometimes I hear this so much that I start to believe it; yet this programming episode reminded me that it's when the going gets tough that you really need to  [shift to a low gear](https://www.tddbuddy.com/references/tdd-gears.html), go slowly, apply the TDD process as well as you can, and  [take really small steps](https://www.geepawhill.org/2021/09/29/many-more-much-smaller-steps-first-sketch/). My git log after this has a different tone:

<figure>
  <img src="https://media.licdn.com/dms/image/D4D12AQFXbHjETuAAgw/article-inline_image-shrink_1500_2232/0/1690530196250?e=1715212800&v=beta&t=JcA2kgoUUiQQsynAHVTlNnTGHZ7jogtLJQlKX5nLXR8"
  alt="Screenshot of better looking commit messages">
  <figcaption>You can guess from the tone of the messages that the author is on a good path</figcaption>
</figure>

and the code today looks quite different:

![Screenshot of much improved JavaScript code](https://media.licdn.com/dms/image/D4D12AQHxtgh7So7l0g/article-inline_image-shrink_1000_1488/0/1690530303626?e=1715212800&v=beta&t=sWusV4HyoEHrDL6JB3-hPLEqj7Q5rQkE5y5_xim3_pA)

Thanks to  [👨💻 Esko Luontola](https://www.linkedin.com/in/eskoluontola/),  [J. B. Rainsberger](https://www.linkedin.com/in/jbrains/),  [GeePaw Hill](https://www.linkedin.com/in/geepawhill/),  [Jessica Kerr](https://www.linkedin.com/in/jessicakerr/)  for learnings and inspiration. And of course  [Kent Beck](https://www.linkedin.com/in/kentbeck/)!