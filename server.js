// 1. express 라이브러리 import
// 2. mongoose 라이브러리 import
// 3. dotenv 설정

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { MONGO_USER, MONGO_PASS, PORT } = process.env;
const userRouter = require('./router/userRouter');
const User = require('./models/users');

// mongoDB 연결하기
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@yeeunlee.gslqngd.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
    .then(() => console.log('Connected to MongoDB Database'))
    .catch(err => console.log(err));

// app.user 세팅 -> body-parser ? express가 기본적으로 탑재
// 기본적으로 세팅해야 하는 것들
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Ejs 세팅 -> view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// router 세팅
app.use('/user', userRouter);

// server 실행
// / 최상단 경로로 들어왔을때 모든 유저를 조회해서 보내준다.
app.get('/', (req, res) => {
    User.find({})
        .exec()
        .then((user) => {
            res.render('index', { users: user });
        })
        .catch(err => res.sendStatas(500));
});

// 서버 실행 PORT 연결
app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})