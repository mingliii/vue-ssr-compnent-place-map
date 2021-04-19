const path = require('path');

const config = entryPath => {
  const entries = {}
  const components = require('fs').readdirSync(entryPath).filter(filename => /^[^.]+\.js$/.test(filename))
    .map(filename => filename.substr(0, filename.lastIndexOf('.')))
  components.reduce((_, cur) => {
    entries[cur] = path.join(entryPath, `${cur}.js`)
  }, entries)

  return entries;
}

exports.servers = config(path.resolve(process.cwd(), 'src', 'entries', 'server'))
exports.clients = config(path.resolve(process.cwd(), 'src', 'entries', 'client'))