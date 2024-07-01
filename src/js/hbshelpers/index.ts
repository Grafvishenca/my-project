import Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('not_null', (value: any, options: any) => {
    if (value !== null && value !== undefined) {
        return options.fn(value);
    } else {
        return options.inverse(value);
    }
});

module.exports = Handlebars;