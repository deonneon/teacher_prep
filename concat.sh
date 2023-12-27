#!/bin/bash

# Output file name
output_file="parse.txt"

# Explicit list of files to concatenate
declare -a files=(
    "src/App.css"
    "src/App.tsx"
    "src/Modal.tsx"
    "src/LandingPage.tsx"
    "src/index.css"
    "src/index.tsx"
    "src/WorksheetPDF.tsx"
    "server.js"
    # Add more files as needed
)

# Clear the output file if it already exists
> "$output_file"

echo -e "I am creating a React App for worksheet generation. The goal is to create a worksheet with practice problems for students to use. These are all the cripts for my React App.\n\n" > "$output_file"

# Loop through each file in the list
for file in "${files[@]}"
do
    # Check if the file exists
    if [ -f "$file" ]; then
        # Print the file name as the title, removing the path
        echo "=== $(basename "$file") ===" >> "$output_file"
        # Append the file content
        cat "$file" >> "$output_file"
        # Optionally, add a separator or newline
        echo -e "\n" >> "$output_file"
    else
        echo "File $file not found, skipping."
    fi
done
