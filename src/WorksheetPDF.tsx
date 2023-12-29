import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

type Problem = {
  problem: string;
  answer: string;
};

interface WorksheetPDFProps {
  problems: Problem[];
  rows: number;
  columns: number;
  backgroundImage: string; 
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: '210mm',
    height: '297mm',
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  problem: {
    flexGrow: 1,
    flexBasis: '0%', // Adjust based on columns
    margin: 5,
    padding: 15,
  },
  backgroundImage: {
    position: 'absolute',
    width: '99.99%',
    height: '99.99%', 
    top: 0,
    left: 0,
    zIndex: -1,
  },
  problemText: {
    fontSize: 12,
    marginBottom: 5, // Space between problem and answer
  },
});

const WorksheetPDF: React.FC<WorksheetPDFProps> = ({ problems, rows, columns , backgroundImage }) => {
  const problemWidth = `${100 / columns}%`;

  const dynamicStyles = StyleSheet.create({
    problem: {
      flexGrow: 1,
      flexBasis: problemWidth,
      margin: 15,
      padding: 15,
      backgroundColor: '#FFFFFF', // White background
      borderRadius: 20, // Rounded corners for a cloud-like appearance
      borderWidth: 1,
      borderColor: '#DDDDDD', // Light border for definition
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Soft shadow for depth
    },
    // Additional dynamic styles if needed
  });

  // Create a grid of problems based on rows and columns
  const renderProblemsGrid = () => {
    let grid = [];
  
    for (let row = 0; row < rows; row++) {
      let rowProblems = problems.slice(row * columns, (row + 1) * columns);
      grid.push(
        <View key={row} style={styles.row}>
          {rowProblems.map((problem, col) => {
            const currentIndex = row * columns + col;
            return (
              <View key={currentIndex} style={dynamicStyles.problem}>
                <Text style={styles.problemText}>{currentIndex + 1}. {problem.problem}</Text>
                <Text style={styles.problemText}>Answer: {problem.answer}</Text>
              </View>
            );
          })}
        </View>
      );
    }
    return grid;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={backgroundImage} style={styles.backgroundImage} />
        {renderProblemsGrid()}
      </Page>
    </Document>
  );
};

export default WorksheetPDF;