const gh = require('@octokit/rest')()
const fs = require('fs')
const osenv = require('osenv')
const yaml = require('js-yaml')

function token () {
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

async function issues () {
  gh.authenticate({ type: 'oauth', token: token() })
  const result = await gh.issues.list({ filter: 'assigned' })
  return result.data
}

/* test
(async () => {
  console.log(await issues())
})()
*/

module.exports = issues
