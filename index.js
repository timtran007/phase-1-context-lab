const createEmployeeRecord = function(line){
    return {
        firstName: line[0],
        familyName: line[1],
        title: line[2],
        payPerHour: line[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = function(records){
    return records.map(function(row){
        return createEmployeeRecord(row)
    })
}
// let twoRows = [
//     ["bart", "simpson", "skateboarder", 7],
//     ["homer", "simpson", "powerplant supervisor", 30]
// ]

// let bart = createEmployeeRecord(twoRows[0])
// let homer = createEmployeeRecord(twoRows[1])

// let employeeRecords = createEmployeeRecord(twoRows)

const createTimeInEvent = function(dateAndTime){
    let [date, timeIn] = dateAndTime.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeIn, 10),
        date: date,
    })
    return this
}

const createTimeOutEvent = function(dateAndTime){
    let [date, timeOut] = dateAndTime.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeOut, 10),
        date: date,
    })
    return this
}

const hoursWorkedOnDate = function(dateWorked){
    let clockIn = (this.timeInEvents.find(row => row.date === dateWorked))
    let clockOut = (this.timeOutEvents.find(row => row.date === dateWorked))
    return (clockOut.hour - clockIn.hour)/100
}

const wagesEarnedOnDate = function(dateWorked){
    return hoursWorkedOnDate.call(this, dateWorked) * this.payPerHour
}

const allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map((row) => row.date)
    let totalPay = eligibleDates.reduce(function (accumulatedPay, date){
        return accumulatedPay + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0)
    return totalPay
}

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(records){
        return records.firstName === firstName
    })
}

const calculatePayroll = function(employeeRecords){
    return employeeRecords.reduce(function(accumulatedPay, allEmployees){
        return accumulatedPay + allWagesFor.call(allEmployees)
    }, 0)
}
