import React, { useState } from 'react';

function Enter() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  function flamesGame(name1, name2) {
    // Normalize names: convert to lowercase and remove spaces
    name1 = name1.toLowerCase().replace(/\s/g, '');
    name2 = name2.toLowerCase().replace(/\s/g, '');

    // Remove common characters and count remaining
    let sb1 = [...name1];
    let sb2 = [...name2];

    sb1.forEach((ch, index) => {
      const matchIndex = sb2.indexOf(ch);
      if (matchIndex !== -1) {
        sb1[index] = null; // Remove common character from name1
        sb2[matchIndex] = null; // Remove common character from name2
      }
    });

    const remainingCount =
      sb1.filter((ch) => ch !== null).length +
      sb2.filter((ch) => ch !== null).length;

    // Determine the FLAMES result
    let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let idx = 0;

    while (flames.length > 1) {
      idx = (idx + remainingCount - 1) % flames.length; // Find the position to remove
      flames.splice(idx, 1); // Remove the character
    }

    // Map the final character to the relationship meaning
    const resultMap = {
      F: 'Friends',
      L: 'Love',
      A: 'Affection',
      M: 'Marriage',
      E: 'Enemies',
      S: 'Siblings',
    };

    return resultMap[flames[0]];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name1 && name2) {
      const relationship = flamesGame(name1, name2);
      setResult(relationship);
    } else {
      setResult('Please enter both names.');
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="header">
          <h1>FLAMES Calculator</h1>
          <p>Find your relationship status!</p>
        </div>
        <div className="content">
          {/* Input Section */}
          <div className="input-section">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name 1"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Name 2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
              <button type="submit">Check</button>
            </form>
          </div>

          {/* Result Section */}
          <div className="result-section">
            <h2>Result</h2>
            <div className="result-box">{result}</div>
          </div>
        </div>
      </div>
      <p
          className="footer-text"
          style={{
            fontSize: '17px',
            color: 'white',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: '20px',
            padding: '10px',
            animation: 'fadeIn 2s ease-out',
          }}
        >
          Created by{' '}
          <span
            style={{
              fontSize: '14px',
              verticalAlign: 'sub',
              color: 'purple',
              fontWeight: 'bold',
            }}
          >
            _ Sanjith Meenakshi Sundaram
          </span>
        </p>
    </>
  );
}

export default Enter;
