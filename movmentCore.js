
var MFX = {
    config:{
        speed:{
            max:250,
            acc:10,
        }
    },

    player:{
        set : function(input){
            input.classList.add("mfx_player")
        },
        remove : function(input){
            input.classList.remove("mfx_player")
        }
    },
        
    init: function(){
        document.addEventListener("keydown", KeyDown);
        document.addEventListener("keyup", KeyUp);

        function KeyDown(e) {
            localStorage.setItem(e.code, "true");
            localStorage.setItem("last", e.code);
        }
        function KeyUp(e) {
            localStorage.setItem(e.code, "false");
            localStorage.setItem("last", e.code);
            console.log(e.code)
        }
    },
    updateLoop: setInterval(function(){
        const  iputs = ["KeyW","KeyA","KeyS","KeyD"]
        var input_table = []


        for(i=0;i<inputs.length;i++){
            input_table.push(localStorage.getItem(inputs[i]))
        }
        
        for(i=0;i<document.getElementsByClassName('mfx_player').length;i++){
        }
    },1),
}
MFX.init()
