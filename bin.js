#!/usr/bin/env node

const GitHub = require('github')
const fs = require('fs')
const osenv = require('osenv')
const yaml = require('js-yaml')
const waterfall = require('async/waterfall')
const each = require('async/each')

const omnifocus = require('osa-omnifocus')
const gh = new GitHub({ version: '3.0.0' })

const config = getConfig()
let counter = 0

waterfall([
  (cb) => {
    gh.authenticate({ type: 'oauth', token: config.token })
    gh.issues.getAll({ filter: 'assigned' }, cb)
  },
  (issues, cb) => omnifocus.getTasks((err, tasks) => cb(err, issues.data, tasks)),
  (issues, tasks, cb) => {
    const current = tasks.map((task) => task.name)

    each(issues, (issue, cb) => {
      const name = `${issue.title} - ${issue.repository.full_name}/issues/${issue.number}`

      if (current.indexOf(name) > -1) { return cb() }

      counter++

      omnifocus.addTask({
        name: name,
        note: issue.html_url,
        project: 'GitHub Inbox'
      }, cb)
    }, cb)
  }
], (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Success - added ${counter} new issues to Omnifocus`)
  }
})

function getConfig () {
  const path = osenv.home() + '/.github-to-omnifocus'

  try {
    return yaml.safeLoad(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    if (err.code === 'ENOENT' && err.path === path) {
      console.log('Sorry, you must create a ' + path + ' configuration file.')
    } else {
      throw err
    }
  }
}
