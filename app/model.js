const lines = require('./read.js')

class Station {
    constructor (name, line) {
        this.name = name
        this.connection = []
        Station.list[name] = this
    }

    connect (station) {
        this.connection.push(station)
    }
}

Station.list = {}

let i = 0, e = lines.length

while (i < e) {
    let line = lines[i].stations,
        n = null, p = null
    for (let s of line) {
        if (s in Station.list) {
            n = Station.list[s]
        } else {
            n = new Station(s)
        }
        if (p !== null) {
            n.connect(p)
            p.connect(n)
        }
        p = n
    }
    i++
}

function BFS(start, end) {
    const WHITE = 0
    const GREY = 1
    let stations = Station.list
    if (!(start in stations) || !(end in stations))
        throw new Error('not exist station')
    for (let s in stations) {
        stations[s].color = WHITE
    }

    stations[start].color = GREY
    stations[start].d = 0
    stations[start].p = null
    let stack = []
    stack.push(stations[start])

    function route (s) {
        let r = []
        while (s.p !== null) {
            r.unshift(s.name)
            s = s.p
        }
        r.unshift(start)
        clean()
        return r
    }

    function clean () {
        for (let s in stations) {
            delete stations[s].color
            delete stations[s].d
            delete stations[s].p
        }
    }

    while (stack.length != 0) {
        s = stack.shift()
        for (let i of s.connection) {
            if (i.color == WHITE) {
                stack.push(i)
                i.color = GREY
                i.d = s.d + 1
                i.p = s
                if (i.name == end)
                    return route(i)               
            }
        }
    }
    clean()
    return []
}

let all = []
for (let i in Station.list)
    all.push(i)

module.exports = {stations: all, BFS}