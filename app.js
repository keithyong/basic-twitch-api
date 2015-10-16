var irc = require('twitch-irc');
var express = require('express');
var app = express();

var argv_channel = process.argv[2];

var identity = {
    // Insert identity here
    username: '',
    password: ''
}

var messages = [];
function listen_twitch(identity, channel) {
    var client = new irc.client({
        options: {
            debug: true
        },
        identity: identity,
        channels: [channel]
    });

    client.connect();

    client.addListener('chat', function (channel, user, message) {
        var msg = {
            username: user.username,
            message: message
        }
        messages.push(msg);
    });
}

app.get('', function (req, res, next) {
    res.send(messages);
});

listen_twitch(identity, argv_channel);
app.listen(42069);
