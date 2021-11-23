'use strict'
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020'); //Since I'm using the most current JSON draft, needed to import this Ajv class instead (https://ajv.js.org/json-schema.html#draft-2020-12)
//const Ajv = require('ajv');
const addFormats = require("ajv-formats")
const schema = require('../pet_schema.json'); //JSON schema being read from file
const input_data = process.argv[2]; //accept data file as an argument, could also 'require' the data as I'm doing with the schema

const ajv = new Ajv2020();
addFormats(ajv);

function getPath (input) {
    let reqPath = path.join(__dirname, '..', input);
    return reqPath;
}

const validate = ajv.compile(schema);

function isValid(data) {
    let numInvalid = 0;
    data.forEach(datum => {
        const valid = validate(datum);
        if(!valid)  {
            //Let user know which object is invalid
            console.log(`Item number: ${data.indexOf(datum) + 1} invalid`);
            numInvalid++;
        }
    })
    if (numInvalid > 0) return false;
    //Return true only if every object matches the schema
    return true;
}

function readContent () {
    fs.readFile(getPath(input_data), 'utf-8', (err, data) => {
        if(err) return console.error("Error!! ", err)
        let parsed_data = JSON.parse(data);
        console.log(isValid(parsed_data));
    })
}

readContent();