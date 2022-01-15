export const pixelsToDrawing = pixels => {
  const grid = [];
  const rows = pixels.length;
  const columns = pixels[0].length;
  const cellSize = 5;
  const paletteGridData = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const c = pixels[j][i];
      grid.push(`rgba(${c.join(',')})`);
    }
  }
  const frames = [{ grid }];

  return { frames, paletteGridData, cellSize, columns, rows };
};

export default pixelsToDrawing;
