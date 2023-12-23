import jsPDF from 'jspdf';

// Type definition for a multiplication problem
export type MultiplicationProblem = {
  num1: number;
  num2: number;
};

// Function to generate an array of multiplication problems
export const generateProblems = (numProblems: number): MultiplicationProblem[] => {
  const problems: MultiplicationProblem[] = [];
  for (let i = 0; i < numProblems; i++) {
    const num1 = Math.floor(Math.random() * 90 + 10); // Generates a number between 10 and 99
    const num2 = Math.floor(Math.random() * 90 + 10); // Generates a number between 10 and 99
    problems.push({ num1, num2 });
  }
  return problems;
};

// Function to load an image from a URL
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
};

// Function to create a PDF from an array of problems with a background image
export const createPDF = async (problems: MultiplicationProblem[], imageUrl: string): Promise<Blob> => {
  const pdf = new jsPDF();
  const image = await loadImage(imageUrl);
  const problemsPerRow = 5; // Adjust as needed
  const margin = 10;
  const spacing = 10;
  const problemWidth = (pdf.internal.pageSize.width - 2 * margin) / problemsPerRow - spacing;
  const lineHeight = 20; // Adjust for line height

  // Add the background image to each page
  pdf.addImage(image, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);

  // Add problems to the PDF
  problems.forEach((problem, index) => {
    const x = margin + (index % problemsPerRow) * (problemWidth + spacing);
    const y = margin + Math.floor(index / problemsPerRow) * lineHeight;
    pdf.text(`${problem.num1} x ${problem.num2} = `, x, y);
  });


  return pdf.output('blob');
};
