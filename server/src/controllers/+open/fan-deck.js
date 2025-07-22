const { writePsdBuffer } = require("ag-psd");
const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");
const { getPsdFilePath } = require("../../utils/psd-utils");

// const chunkArray = (arr, size) => {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// };

// const generateFanDecks = (req, res, next) => {
//   const colors = req.body.map((item) => {
//     return { name: item.entityCode, shadeHexCode: item.shadeHexCode };
//   });

//   if (!Array.isArray(colors) || colors.length < 6) {
//     return res
//       .status(400)
//       .send("Please provide an array of at least 6 color hex codes.");
//   }

//   const width = 200;
//   const height = 11000;
//   const deckSize = 6;

//   const colorChunks = chunkArray(colors, deckSize);
//   const psdPaths = [];

//   colorChunks.forEach((colorChunk, deckIndex) => {
//     const psd = {
//       width,
//       height,
//       children: [],
//     };

//     colorChunk.forEach((color, index) => {
//       const canvas = createCanvas(200, 130);
//       const ctx = canvas.getContext("2d");
//       ctx.fillStyle = color.shadeHexCode;
//       ctx.fillRect(0, 0, 200, 130);

//       const layer = {
//         name: color.name,
//         top: index * 1600,
//         left: 0,
//         canvas: canvas,
//       };

//       psd.children.push(layer);
//     });

//     const psdBuffer = writePsdBuffer(psd);
//     const psdFileName = `shade-card-${deckIndex + 1}.psd`;
//     const psdPath = getPsdFilePath(psdFileName);
//     fs.writeFileSync(psdPath, psdBuffer);

//     psdPaths.push(`http://localhost:8080/fan-decks/${psdFileName}`);
//   });

//   res.status(200).send({
//     status: true,
//     data: psdPaths,
//   });
// };

// const chunkArray = (arr, size) => {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// };

// const generateFanDecks = (req, res, next) => {
//   const colors = req.body.map((item) => {
//     return { name: item.entityCode, shadeHexCode: item.shadeHexCode };
//   });

//   if (!Array.isArray(colors) || colors.length < 6) {
//     return res
//       .status(400)
//       .send("Please provide an array of at least 6 color hex codes.");
//   }

//   const width = 200;
//   const blockHeight = 130;
//   const blockSpacing = 30; // Spacing between color blocks
//   const blockPerPage = 6;

//   // Calculate the height dynamically based on the number of colors
//   const totalPages = Math.ceil(colors.length / blockPerPage);
//   const height = totalPages * (blockHeight + blockSpacing) * blockPerPage;

//   const psd = {
//     width,
//     height,
//     children: [],
//   };

//   colors.forEach((color, index) => {
//     const canvas = createCanvas(200, blockHeight);
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = color.shadeHexCode;
//     ctx.fillRect(0, 0, 200, blockHeight);

//     const layer = {
//       name: color.name,
//       top: index * (blockHeight + blockSpacing),
//       left: 0,
//       canvas: canvas,
//     };

//     psd.children.push(layer);
//   });

//   // Save the PSD as a single file
//   const psdBuffer = writePsdBuffer(psd);
//   const psdFileName = `shade-card.psd`;
//   // const psdPath = path.join(__dirname, "fan-decks", psdFileName);

//   const psdPath = getPsdFilePath(psdFileName);
//   fs.writeFileSync(psdPath, psdBuffer);

//   res.status(200).send({
//     status: true,
//     data: `http://localhost:8080/fan-decks/shade-card.psd`,
//   });
// };

// Constants for the layout
const width = 2000;
const blockWidth = 1000; // Half of the width for 2 columns
const blockHeight = 1300;
const blockSpacing = 300; // Spacing between color blocks
const blockPerRow = 6; // 3 colors per column, total 6 colors per row (3 in each column)

// Helper function to chunk the colors array into groups of 6 (if needed for positioning logic)
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const generateFanDecks = (req, res, next) => {
  const colors = req.body.map((item) => {
    return { name: item.entityCode, shadeHexCode: item.shadeHexCode };
  });

  if (!Array.isArray(colors) || colors.length < 6) {
    return res
      .status(400)
      .send("Please provide an array of at least 6 color hex codes.");
  }

  // Calculate the height dynamically based on the number of colors
  const totalRows = Math.ceil(colors.length / blockPerRow); // Calculate the total number of rows needed
  const height = totalRows * (blockHeight + blockSpacing);

  const psd = {
    width,
    height,
    children: [],
  };

  colors.forEach((color, index) => {
    const rowIndex = Math.floor(index / blockPerRow); // Calculate the row
    const positionInRow = index % blockPerRow; // Position in the row (0-5)

    // Determine the column (left or right)
    const isLeftColumn = positionInRow < 3; // First 3 are in the left column
    const x = isLeftColumn ? 0 : blockWidth + blockSpacing;

    // Calculate the vertical position (within the row)
    const yOffset = (positionInRow % 3) * (blockHeight + blockSpacing);

    // Calculate the top position for the block based on the row
    const y = rowIndex * (blockHeight + blockSpacing) + yOffset;

    // Create the canvas for the color block
    const canvas = createCanvas(blockWidth, blockHeight);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color.shadeHexCode;
    ctx.fillRect(0, 0, blockWidth, blockHeight);

    // Add this block as a layer to the PSD
    const layer = {
      name: color.name,
      top: y,
      left: x,
      canvas: canvas,
    };

    psd.children.push(layer);
  });

  // Save the PSD as a single file
  const psdBuffer = writePsdBuffer(psd);
  const psdFileName = `shade-card.psd`;
  const psdPath = getPsdFilePath(psdFileName);
  fs.writeFileSync(psdPath, psdBuffer);

  // Return the URL to the client
  res.status(200).send({
    status: true,
    data: `http://localhost:8080/fan-decks/shade-card.psd`,
  });
};

module.exports = {
  generateFanDecks: generateFanDecks,
};
