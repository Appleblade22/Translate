import React, { useState } from 'react';
import {Button} from 'antd';
import './style.css';
const Translate = () => {
    const [language, setLanguage] = useState('French');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');   
    const [loadings, setLoadings] = useState(false);
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        // console.log(input, language);
        setLoadings(true);
        const response = await fetch('https://dall-e-0eo7.onrender.com/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input, language }),
        });

        const data = await response.json();
        setOutput(data.choices[0].text);
        setLoadings(false);
    };


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                <h2>Selected language: {language}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button style={{ margin: '0 10px' }} value="French" onClick={handleLanguageChange}>
                        French
                    </button>
                        <button style={{ margin: '0 10px' }} value="German" onClick={handleLanguageChange}>
                        German
                    </button>
                        <button style={{ margin: '0 10px' }} value="Italian" onClick={handleLanguageChange}>
                        Italian
                    </button>
                        <button style={{ margin: '0 10px' }} value="Japanese" onClick={handleLanguageChange}>
                        Japanese
                    </button>
                </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                <h1>Enter text to translate</h1>
                    <div className='floating-label-textarea'>
                    <textarea
                        id="textarea"
                        value={input}
                        onChange={handleInputChange}
                        rows="10"
                        cols="50"
                        placeholder="Enter text to translate"
                    />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button type="primary"
                onClick={handleSubmit}
                loading={loadings}
                >Translate</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <div className='floating-label-textarea'>
                    <textarea
                        id="textarea"
                        value={output}
                        rows="10"
                        cols="50"
                        placeholder="Translated text will appear here"
                        readOnly
                    />
                </div>
            </div>

        </div>
    );
};

export default Translate;
