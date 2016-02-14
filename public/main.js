var _ = require('lodash');

var apiData = require('./../input/api.json');
var fs = require('fs');
console.log("I'm running.");




var isMock = false;
var services = _.groupBy(apiData, "serviceName");
var svcNames = Object.getOwnPropertyNames(services);
_.forEach(Object.getOwnPropertyNames(services), (serviceName) => {
    var fileName = 'output/' + serviceName + '.service.js';
    var wstream = fs.createWriteStream(fileName);
    writeToStream(services[serviceName], wstream);

    wstream.on('finish', () => {
        console.log('Finished creating ' + fileName + '');
    })
});
function writeToStream(apiData, wstream) {
    _.forEach(apiData, (api) => {
        var result = api['response-body'];
        var methodName = api['method-name'];
        var httpMethod = api['method'];
        var urlTemplate = api['url-template'];
        var parameters = parseUrlParameters(urlTemplate);

        wstream.write(`export function ` + methodName + ` (`);
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
        if (isMock) {
            wstream.write('return ');
            wstream.write(JSON.stringify(result));
            wstream.write(';\n');
        }
        else {
            var hasBodyData = (httpMethod === 'POST' || httpMethod === 'PUT');
            var rs = '';
            rs += 'return $http["';
            rs += httpMethod;
            rs += '"]("';

            var url = urlTemplate;
            _.forEach(parameters, (p, index) => {
                var replacementText = '"+ ' + p;
                if (index != (parameters.length - 1)) {
                    replacementText += ' +"';
                }
                url = url.replace('{' + p + '}', replacementText);
            });
            rs += url;
            if (parameters.length == 0) { rs += '"'; }
            if (hasBodyData) {
                rs += ', data';
            }
            rs += ');\n';
            wstream.write(rs);
        }
        wstream.write('}\n');
    });

    wstream.end();
}

function parseUrlParameters(urlTemplate) {
    var results = [], re = /{([^}]+)}/g, text;

    while (text = re.exec(urlTemplate)) {
        results.push(text[1]);
    }
    return results;
}

