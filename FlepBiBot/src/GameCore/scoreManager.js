export class ScoreManager
{
    static score = 0;

    

    static addScore()
    {
        ScoreManager.score +=1;
        console.log(ScoreManager.score);
    }

    static resetScore()
    {
        ScoreManager.score = 0;
        
    }

}