'use strict'
const Ajv = require('ajv');
const addFormats = require("ajv-formats")

const ajv = new Ajv();
addFormats(ajv);

const schema = {
    "title": "Animal Shelter JSON",
    "description": "Animal in an animal shelter",
    "type": "object",
    "properties": {
        "petID": {
            "description": "The unique identifier for the pet",
            "type": "integer"
        },
        "petName": {
            "description": "Name of pet",
            "type": "string"
        },
        "species": {
            "description": "Species of animal",
            "type": "string",
            "enum": ["Feline", "Canine"]
        },
        "breed": {
            "description": "Breed(s) of pet",
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        },
        "markings": {
            "description": "Coloration and markings of pet",
            "type": "array",
            "items": {
                "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
        },
        "intakeDate": {
            "description": "Date pet was taken into shelter",
            "type": "string",
            "format": "date"
        },
        "numIntakes": {
            "description": "Number of times animal has been in shelter, including current intake",
            "type": "integer",
            "minimum": 1
        }
    },
    "required": ["petID", "petName", "species", "breed", "markings", "intakeDate", "numIntakes"]
};

const goodData = {
    "petID": 1,
    "petName": "Emma",
    "species": "Canine",
    "breed": ["bulldog"],
    "markings": ["black", "white chest patch"],
    "intakeDate": "2011-10-25",
    "numIntakes": 1
};

const badData = {
    "petID": 1,
    "species": "Canine",
    "breed": ["bulldog"],
    "markings": ["black", "white chest patch"],
    "intakeDate": "2011-10-25",
    "numIntakes": 1
};

const validate = ajv.compile(schema);

function isValid(data) {
    const valid = validate(data);
    if (!valid) return false;
    return true;
}

console.log(isValid(goodData));
console.log(isValid(badData));