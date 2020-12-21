export const generateId = () => {
  const alp = Array.from({ length: 52 }, (_, k) =>
    k >= 26 ? String.fromCharCode(65 + k - 26) : String.fromCharCode(97 + k)
  );

  const characters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ...alp];

  return Array.from(
    { length: 10 },
    v => characters[Math.floor(Math.random() * 63)]
  ).join('');
};
