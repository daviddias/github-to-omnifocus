/* global Application */
const osa2 = require('osa2')

// osa2 Wraps function to be run inside Apple's JavaScript for Automation environment.
const tasks = osa2(() => Application('OmniFocus').getDocument().flattenedTasks())

try {
  console.log(tasks)
  tasks()
} catch (err) {
  console.log(err)
}

/*
function d (val) {
  return val !== undefined
}

exports.addTask = function (task, cb) {
  // Example transport text
  // Do something! @home ::misc #5pm #tomrrow //This is a note

  if (typeof task === 'object') {
    var parts = []

    if (d(task.defer) && !d(task.due)) { throw (new Error('Cannot have a defer date but no due date!')) }

    if (d(task.name)) parts.push(task.name)
    if (task.flagged) parts.push('!')
    if (d(task.context)) parts.push('@' + task.context)
    if (d(task.project)) parts.push('::' + task.project)
    if (d(task.defer)) parts.push('#' + task.defer)
    if (d(task.due)) parts.push('#' + task.due)
    if (d(task.note)) parts.push('//' + task.note)

    task = parts.join(' ')
  }

  /*
  return osa(function (task) {
    var OmniFocus = Application('OmniFocus')
    var doc = OmniFocus.documents[0]
    OmniFocus.parseTasksInto(doc, { withTransportText: task, asSingleTask: true })
  }, task, cb)
  */
/*
}

exports.getTasks = () => {
  /*
  return osa(function () {
    const OmniFocus = Application('OmniFocus')
    const $tasks = OmniFocus.documents[0].flattenedTasks
    const tasks = []

    for (var i = 0; i < $tasks.length; i++) {
      tasks[i] = {
        name: $tasks[i].name(),
        uid: $tasks[i].id(),
        note: $tasks[i].note(),
        flagged: $tasks[i].flagged(),
        blocked: $tasks[i].blocked(),
        completed: $tasks[i].completed(),
        project: $tasks[i].containingProject() != null
          ? $tasks[i].containingProject.name() : null,
        context: $tasks[i].context() != null
          ? $tasks[i].context.name() : null,
        due: $tasks[i].dueDate(),
        defer: $tasks[i].deferDate(),
        time: $tasks[i].estimatedMinutes()
      }
    }

    return tasks
  }, cb)
  */
/*
}

runAS.sync(`
  tell front document of application "OmniFocus"
    make new task with properties {name: "nuTASK"}
  end tell
`)
*/
