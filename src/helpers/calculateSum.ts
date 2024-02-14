export function calculateSum(hand: string[]) {
  const letterMap = new Map([
    ["T", 10],
    ["J", 10],
    ["Q", 10],
    ["K", 10],
    ["A", 11],
  ]);
  let sum: number = 0;
  let numberOfAces: number = 0;

  hand.forEach((card: string) => {
    const value = card.charAt(0);
    if (letterMap.has(value)) {
      sum += letterMap.get(value) as number;
      if (value === "A") {
        numberOfAces++;
      }
    } else {
      sum += parseInt(value);
    }
  });

  while (sum > 21 && numberOfAces > 0) {
    sum -= 10;
    numberOfAces--;
  }

  return sum;
}
