class FormattedDate {
    toDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }
    toDateTime(dateString) {
        const date = new Date(dateString)
        if (date.toString() !== "Invalid Date") {
            return date.toISOString().slice(0, 16)
        }
        return dateString
    }
    toDateTimeSeconds(dateString) {
        const date = new Date(dateString);
        if (date.toString() !== "Invalid Date") {
          return date.toISOString().replace("T", ' ')
        }
        return dateString;
      }
}

module.exports = new FormattedDate();