namespace Relati {
    var ticStart: number = new Date().getTime();
    export var tic = () => ticStart = new Date().getTime();
    export var tac = () => console.log(new Date().getTime() - ticStart);
}