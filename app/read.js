const fs = require('fs')
const path = require('path')
const file = 'lines.data'

const data = fs.readFileSync(path.join(__dirname, file), {encoding: 'utf8'})

const tokens = data.split('\n')

let i = 0, e = tokens.length, line

class Line {
    constructor (name) {
        this.name = name
        this.stations = null
        Line.members.push(this)
    }
    set_stations (stations) {
        this.stations = stations
    }
}

Line.members = []

while (i < e) {
    if (tokens[i].length == 0) {
        i++
        continue
    }
    if (tokens[i][0] == '#') {
        line = new Line(tokens[i].slice(1).trim())
    } else {
        line.set_stations(tokens[i].split(' '))
    }
    i++
}

module.exports = Line.members