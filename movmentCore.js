
var MFX = {
    config:{
        speed:{
            max:250, //max speed (obviuos i guess)
            acc:10, //acceleration
            dec:10, //percent of acc
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
        function ls(storage){
            return localStorage.getItem(storage)
        }
        const  inputs = ["KeyW","KeyD","KeyS","KeyA"]

        for(i=0;i<inputs.length;i++){
            var temp = `Move${inputs[i]}`
            var tempVal = ls(temp) * 1
            if(ls(inputs[i])=="true"){
                if(tempVal<MFX.config.max){
                    localStorage.setItem(temp,ls(temp)+MFX.config.acc)
                }
            } else if(ls(temp)>0){
                localStorage.setItem(temp,ls(temp)-MFX.config.acc)
            }

            if(ls(temp)>MFX.config.max){
                localStorage.setItem(temp,MFX.config.max)
            }
            if(ls(temp)<0){
                localStorage.setItem(temp,0)
            }
            console.log(tempVal,ls(temp))
        }

        if(ls("KeyW")=="true"){
            x += MFX.config.acc
        }

        for(i=0;i<document.getElementsByClassName('mfx_player').length;i++){

        }
    },1),
}
MFX.init()
