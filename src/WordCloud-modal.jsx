import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import "./WordCloud.css";
import Modal from "./Modal";

const WordCloud = () => {
  const svgRef = useRef();
  const [wordCounts, setWordCounts] = useState([]);
  const [numWords, setNumWords] = useState(50); // Initial number of words
  const sliderRef = useRef(null);
  const outputRef = useRef(null);
  const [modalWord, setModalWord] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch("/data.json") //this version is the array from original
      .then((response) => response.json())
      .then((data) => {
        const processedData = Object.entries(data[0]).map(([word, count]) => ({
          text: word,
          value: count,
        }));
        setWordCounts(processedData);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  useEffect(() => {
    if (wordCounts.length === 0) return;

    // Sort words by value and take the top `numWords`
    const displayedWords = wordCounts
      .sort((a, b) => b.value - a.value)
      .slice(0, numWords);

    const layout = cloud()
      .size([900, 500])
      .words(displayedWords)
      .padding(1) // Add padding to loosen word spacing
      .rotate(() => (Math.random() > 0.9 ? 90 : 0)) // Rotate words by 0 or 90 degrees
      .font("Quicksand")
      .fontSize((d) => d.value * 5) // Adjust font size scaling as needed
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous words

      const g = svg
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
        );

      g.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-family", "Quicksand")
        .attr("text-anchor", "middle")
        .attr("class", (d, i) => `word${i % 5}`) // Assign classes for color
        .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text)
        .on("click", (event, d) => {
          // Handle the click event
          setModalWord(d.text);
          setIsModalVisible(true);
        });
    }
  }, [wordCounts, numWords]); // Re-render when numWords changes

  useEffect(() => {
    const slider = sliderRef.current;
    const output = outputRef.current;

    output.innerHTML = slider.value; // Initialize with current slider value

    const handleSliderInput = () => {
      output.innerHTML = slider.value;
    };

    slider.addEventListener("input", handleSliderInput);

    return () => {
      slider.removeEventListener("input", handleSliderInput);
    };
  }, []);

  return (
    <div className="wordcloud-container">
      <div className="slider-container">
        <label htmlFor="num-words-slider">Frequent Words and Entities:</label>
        <span id="demo" ref={outputRef}>
          {numWords}
        </span>
        <br />
        <input
          id="num-words-slider"
          type="range"
          min="25"
          max="100"
          value={numWords}
          ref={sliderRef}
          step="25"
          onChange={(e) => setNumWords(parseInt(e.target.value))}
        />
      </div>

      <svg ref={svgRef}></svg>

      <Modal
        show={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        word={modalWord}
      />
    </div>
  );
};

export default WordCloud;
