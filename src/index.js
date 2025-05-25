const express = require('express');
const connect = require('./config/database');
const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');

app.listen(3000, async () => {
    console.log('Server Started');
    await connect();
    console.log('mongo db connected');
    // const tweet = await Tweet.create({
    //     content: 'Third tweet',
    // });
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getWithComments('6832acae70f3a67bbfc596b6')
    console.log(tweet);
});  