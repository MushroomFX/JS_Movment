
var MFX = {
    config:{
        speed:{
            max:250, //max speed (obviuos i guess)
            acc:5, //acceleration
            dec:3, //deceleration
        },
        inputs:["KeyW","KeyD","KeyS","KeyA"]
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
        }
        var timeout = setTimeout(function(){
            const inputs = MFX.config.inputs
            for(i=0;i<inputs.length;i++){
                var temp = `Move${inputs[i]}`
                localStorage.setItem(temp,10)
            }
        },100)
    },
    updateLoop: setInterval(function(){
        function ls(storage){
            return localStorage.getItem(storage)
        }
        const inputs = MFX.config.inputs

        for(i=0;i<inputs.length;i++){
            var temp = `Move${inputs[i]}`
            var tempVal = ls(temp) * 1
            if(ls(inputs[i])=="true"){
                if(tempVal<MFX.config.speed.max){
                    localStorage.setItem(temp,tempVal+MFX.config.speed.acc)
                }
            } else if(ls(temp)>0){
                localStorage.setItem(temp,tempVal-MFX.config.speed.dec)
            }

            if(ls(temp)>MFX.config.speed.max){
                localStorage.setItem(temp,MFX.config.speed.acc)
            }
            if(ls(temp)<0){
                localStorage.setItem(temp,0)
            }
            // console.log(tempVal,temp)
        }
        var vel_x = ls("MoveKeyW") - ls("MoveKeyS")
        var vel_y = ls("MoveKeyD") - ls("MoveKeyA")
        for(i=0;i<document.getElementsByClassName('mfx_player').length;i++){
            document.getElementsByClassName('mfx_player')[i].value = ["x",{x:vel_x,y:vel_y}]
            console.log(document.getElementsByClassName('mfx_player')[i].value[1])
        }
    },10),
}
MFX.init()

