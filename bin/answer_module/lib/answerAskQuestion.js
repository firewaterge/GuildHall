module.exports = answerAskQuestion;

const saferman = require('saferman');

function answerAskQuestion(answer,questionID,userID,callback){

    var sql = saferman.format('SELECT ID FROM AnswerTable WHERE questionID=? AND userID=?',
        [questionID,userID]);

    saferman.sql(sql,function(results){
        if(results.length != 0){
            var ID = results[0].ID;
            haveAnswered();
        }else{
            haveNotAnswered();
        }

        function haveNotAnswered(){
            var sqlString = saferman.format(
                'INSERT INTO AnswerTable (ID,questionID,userID,answer,score,state) VALUE (null,?,?,?,0,0)',
                [questionID,userID,answer]);
            saferman.sql(sqlString,executeCallback);
        }

        function haveAnswered(){
            var sqlString = saferman.format('UPDATE AnswerTable SET answer=?,score=0 WHERE ID=?',
                [answer,ID]);
            saferman.sql(sqlString,executeCallback);
        }
    })


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
