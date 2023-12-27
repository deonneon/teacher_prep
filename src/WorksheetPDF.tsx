import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import backgroundImage from './background.png';

type Problem = {
  problem: string;
  answer: string;
};

interface WorksheetPDFProps {
  problems: Problem[];
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
  problemContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 20, // Rounded corners for a cloud-like appearance
    borderWidth: 1,
    borderColor: '#DDDDDD', // Light border for definition
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Soft shadow for depth
  },
  problemText: {
    fontSize: 12,
    marginBottom: 5, // Space between problem and answer
  },
});

const WorksheetPDF: React.FC<WorksheetPDFProps> = ({ problems }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={backgroundImage} style={styles.backgroundImage} />
        {problems.map((problem, index) => (
          <View key={index} style={styles.problemContainer}>
            <Text style={styles.problemText}>Problem: {problem.problem}</Text>
            <Text style={styles.problemText}>Answer: {problem.answer}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default WorksheetPDF;