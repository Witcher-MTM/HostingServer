const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
class Logger {
    writeLog(msg, type) {
        switch (type) {
            case 'info': {
                return logger.info(msg)
            }
            case 'error': {

            }
        }
    }
    regexSymbol(symbol, count) {
       return symbol.repeat(count)
      }
      
}
module.exports = new Logger();