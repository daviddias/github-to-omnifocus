#!/usr/bin/env node

// const omnifocus = require('./omnifocus-api.js')
const pullIssues = require('./pull-issues.js')
const pW = require('p-waterfall')
const pA = require('p-all')

// FIXME: dummy func until omnifocus is fixed
function getTasks () {
  return []
}

function filterNewTasks (issues, tasks) {
  /* TODO: filter out tasks that were already added in the past
  each(issues, (issue, cb) => {
    const name = `${issue.title} - ${issue.repository.full_name}/issues/${issue.number}`
    if (current.indexOf(name) > -1) { return cb() }
  })
  */

  console.log(`Success: ${issues.length} new tasks pulled`)
  // FIXME: currently, tasks comes empty
  return issues
}

function addToInbox (newTasks) {
  /*
  omnifocus.addTask({
    name: name,
    note: issue.html_url,
    project: 'GitHub Inbox'
  }, cb)
  */
}

(async () => {
  const [issues, tasks] = await pA([
    () => pullIssues(),
    () => getTasks()
  ], { concurrency: 2 })

  // console.log(issues)
  // console.log(tasks)

  pW([
    () => filterNewTasks(issues, tasks),
    newTasks => addToInbox(newTasks)
  ])
})()
