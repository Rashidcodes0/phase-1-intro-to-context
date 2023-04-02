// Your code here
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };

}

function createEmployeeRecords(employeesData) {
    return employeesData.map(function (employeeData) {
        return createEmployeeRecord(employeeData);
    });
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;


}

function hoursWorkedOnDate(employeeRecord, date) {

    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    // calculate the time difference between the two events
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked;


}

function wagesEarnedOnDate(employeeRecord, date) {

    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const wages = datesWorked.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return wages;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalWages, employeeRecord) => {
        return totalWages + allWagesFor(employeeRecord);
    }, 0);

}

// Export the functions
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
};
