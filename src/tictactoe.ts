export const Results = {
    XWinner : "X-winner",
    OWinner : "O-winner",
    Error : "Error",
    Tie: "Tie",
    Incomplete: "Incomplete"
}

const ConfigsToCheck = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

export const checkBoard = (state:string): string => {
    const board = state.toLowerCase().split(",");

    if (board.length > 9) 
        return Results.Error;
  
    // Invalid Characters
    let containsInvalidChars = false;
    board.forEach( c => {
        if(c !== "x" && c !== "o" && c !== ""){
            containsInvalidChars = true;
        }
    });
    if(containsInvalidChars) 
        return Results.Error;

    // Calculate number of turns
    let xCount = 0;
    let oCount = 0;
    board.forEach(c => {
        if(c === "x"){
            xCount++;
        }
        if(c === "o"){
            oCount++;
        }
    });

    // Invalid number of turns
    if (Math.abs(xCount - oCount) > 1) 
        return Results.Error;

    // Calculate number of winning rows
    let {xWinCount, oWinCount} = {xWinCount:0, oWinCount:0};
    ConfigsToCheck.forEach( config => {
        if(config.every(i => board[i] === "x"))
            xWinCount++;
        if(config.every(i => board[i] === "o"))
            oWinCount++;
    });

    // More than one winner
    if((xWinCount > 0 && oWinCount > 0))
        return Results.Error;
    
    if (xWinCount === 0 && oWinCount ===0 && (xCount + oCount < 9))
        return Results.Incomplete;
    
    if (xWinCount ===0 && oWinCount ===0 && (xCount + oCount) === 9)
        return Results.Tie;

    // All invalid states covered (i hope), return winner
    return xWinCount > 0 ? Results.XWinner : Results.OWinner;
}