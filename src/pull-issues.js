const Octokit = require('@octokit/rest')
const fs = require('fs')
const osenv = require('osenv')
const yaml = require('js-yaml')
const pW = require('p-waterfall')

function readToken () {
  const path = osenv.home() + '/.github-to-omnifocus'

  try {
    return yaml.safeLoad(fs.readFileSync(path, 'utf8')).token
  } catch (err) {
    if (err.code === 'ENOENT' && err.path === path) {
      console.log('Sorry, you must create a ' + path + ' configuration file.')
    } else {
      throw err
    }
  }
}

async function pullFromGithub (token) {
  if (!token) { throw new Error('Missing Github Token') }

  const gh = new Octokit({ auth: token })

  const result = await gh.issues.list({ filter: 'assigned' })
  return result.data
}

function transform (issues) {
  return issues.map((issue) => {
    return {
      title: `${issue.title} - ${issue.repository.full_name}/issues/${issue.number}`,
      url: issue.html_url
      // content: issue
    }
  })
}

async function issues () {
  return pW([
    _ => readToken(),
    token => pullFromGithub(token),
    issues => transform(issues)
  ])
}

module.exports = issues

/*
(async () => {
  console.log(await issues())
})()
*/
