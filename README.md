# Word Cloud Visualization

This project is a React-based word cloud visualization using D3.js and the `d3-cloud` plugin. You can adjust the number of words displayed in the word cloud using a slider, and each word in the cloud is clickable.

## Features

- Fetches word data from a local JSON file.
- Displays a word cloud where words are sized according to their frequency.
- Allows the number of words displayed to be adjusted via a slider.
- Words in the cloud are clickable and trigger a custom event.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/word-cloud-visualization.git
   cd word-cloud-visualization
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Make sure you have a `data.json` file in the `public` directory. The JSON file should contain an array of objects with words and their frequencies. Example `data.json`:

   ```json
   [
     {
       "word1": 10,
       "word2": 20,
       "word3": 5,
       "word4": 15
     }
   ]
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the word cloud visualization.

## File Structure

```plaintext
word-cloud-visualization/
├── public/
│   ├── data.json
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── WordCloud.jsx
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   ├── WordCloud.css
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```
