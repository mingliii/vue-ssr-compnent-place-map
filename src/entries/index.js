const path = require('path');
const serverPath = path.resolve(process.cwd(), 'src', 'entries', 'server');
const clientPath = path.resolve(process.cwd(), 'src', 'entries', 'client');

exports.servers = {
  places: path.join(serverPath, 'places.js'),
  place: path.join(serverPath, 'place.js'),
}

exports.clients = {
  places: path.join(clientPath, 'places.js'),
  place: path.join(clientPath, 'place.js'),
}