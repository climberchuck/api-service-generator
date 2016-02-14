var _ = require('lodash');

var apiData = require('./../input/api.json');
var fs = require('fs');
console.log("I'm running.");

var fileName = 'output/service.js';

var wstream = fs.createWriteStream(fileName);
wstream.on('finish', () => {
    console.log(`Finished creating {fileName}`)
})

_.forEach(apiData, (api) => {
    var result = api['response-body'];
    var methodName = api['method-name'];
    var httpMethod = api['method'];
    var urlTemplate = api['url-template'];
    var parameters = parseUrlParameters(urlTemplate);

    wstream.write(`function ` + methodName + ` (`);
    console.log(methodName);
    console.log(parameters);
    _.forEach(parameters, (p, index) => {
        wstream.write(p)
        if (index != (parameters.length - 1)) {
            wstream.write(`, `);
        }
    });
    if (httpMethod === 'POST' || httpMethod === 'PUT') {
        if (parameters.length == 0) {
            wstream.write(`data`);
        }
        else {
            wstream.write(`, data`);
        }
    }
    wstream.write(`) {`);
    wstream.write(`\n`);
    wstream.write('return ');
    wstream.write(JSON.stringify(result));
    wstream.write(';\n');
    wstream.write('}\n');
});

wstream.end();

function parseUrlParameters(urlTemplate) {
    var results = [], re = /{([^}]+)}/g, text;

    while (text = re.exec(urlTemplate)) {
        results.push(text[1]);
    }
    return results;
}

