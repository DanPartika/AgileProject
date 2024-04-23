import { readFile } from 'fs'

export async function getData(patient) {
    readFile(`./data/EEG_data/${patient}/data.json`, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        
        try {
            // Parse JSON data
            const jsonData = JSON.parse(data);
            
            // Now you can work with the jsonData object
            console.log(jsonData)
            return jsonData
            } catch (error) {
            console.error('Error parsing JSON data:', error);
            }
        });
}

export async function getStim(patient) {
    readFile(`./data/EEG_data/${patient}/stim.json`, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        
        try {
            // Parse JSON data
            const jsonData = JSON.parse(data);
            
            // Now you can work with the jsonData object
            return jsonData
            } catch (error) {
            console.error('Error parsing JSON data:', error);
            }
        });
}