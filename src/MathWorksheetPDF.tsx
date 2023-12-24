import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

type MathProblem = {
  question: string;
  answer: number;
};

interface MathWorksheetPDFProps {
  worksheet: MathProblem[][];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 30,
    alignItems: 'flex-start',
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
});

const MathWorksheetPDF: React.FC<MathWorksheetPDFProps> = ({ worksheet }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
