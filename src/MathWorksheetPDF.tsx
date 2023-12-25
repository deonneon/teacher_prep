import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import backgroundImage from './background.png';

type MathProblem = {
  question: string;
  answer: number;
};

interface MathWorksheetPDFProps {
  worksheet: MathProblem[][];
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
});

const MathWorksheetPDF: React.FC<MathWorksheetPDFProps> = ({ worksheet }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={backgroundImage} style={styles.backgroundImage} />
        {worksheet.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((problem, problemIndex) => (
              <View key={problemIndex} style={styles.problem}>
                <Text>{problem.question}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default MathWorksheetPDF;
