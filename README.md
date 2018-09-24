[![npm](https://img.shields.io/npm/v/quantor.svg)](http://npm.im/quantor)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/rametta/quantor/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# 💃 Quantor

Blazing fast Server Side Rendered API Docs engine. [Demo](https://quantor.surge.sh/)

## Install

`yarn add quantor`

## Usage

```js
import quantor from 'quantor'

const json = {...JSON API Docs}
quantor(json)(html => /* do something with html */)

// Express or GCF example
quantor(json)(html => res.set('Content-Type', 'text/html').send(new Buffer(html)))
```

## JSON Structure

Quantor generates the docs based on the JSON provided. The JSON must follow the Quantor JSON Spec. See this [example file](/sample.json) for the structure expected or see below.

Basic structure:
```json
{
  "title": "String",
  "description": "String",
  "base": "String",
  "endpoints": [
    {
      "name": "String",
      "display": "String",
      "description": "String",
      "handlers": {
        "GET": {
          "requiredQueryParams": [
            {
              "name": "String",
              "description": "String",
              "type": "String"
            }
          ]
        }
      }
    }
  ]
}
```

Facts:
- Endpoints expects an array of endpoint objects
- Each endpoint object should have a handlers property
- The handlers property is a map of http methods like:
  + GET
  + POST
  + PUT
  + DELETE
  + PATCH
  + OPTIONS
  + HEAD
- Each http method should be an object with optional properties of
  + requiredQueryParams
  + optionalQueryParams
  + requiredBodyParams
  + optionalBodyParams
  + requiredHeaders
  + optionalHeaders
- Each of those properties should be an array of objects with a name, description & type.

![quantor screenshot](/assets/screenshot.png 'Quantor Screenshot')
