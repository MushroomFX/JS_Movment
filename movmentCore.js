var MFX = {
    config: {
      speed: {
        max: 250, //max speed (obviuos i guess)
        acc: 10, //acceleration
        dec: 5, //deceleration
        smoothing: 100, //divides the end pos useing this
        boost:10, //boost from normal speed in percent
        sneak:10, //percent of normal speed
      },
      inputs: ["KeyW", "KeyD", "KeyS", "KeyA"],
      mod_keys: [""]
    },
  
    player: {
      set: function (input) {
        input.classList.add("mfx_player");
      },
      remove: function (input) {
        input.classList.remove("mfx_player");
      }
    },
  
    init: function () {
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
      var timeout = setTimeout(function () {
        for (i = 0;i < document.getElementsByClassName("mfx_player").length;i++) {
            var elem = document.getElementsByClassName("mfx_player")[i]
                elem.value = [
                    { x: 100, y: 100 },
                    { x: 0, y: 0 }
                ]
        }
        const inputs = MFX.config.inputs;
        for (i = 0; i < inputs.length; i++) {
          var temp = `Move${inputs[i]}`;
          localStorage.setItem(temp, 10);
        }
      }, 100);
      document.body.innerHTML += `
      <style>
        .test{
            position: absolute;
            background:blue;
            color:transparent;
            width:1em;
            height:1em;
            /*
            -webkit-transition: all 0.125s 0s cubic-bezier(0,.2,0,1);
            -moz-transition: all 0.125s 0s cubic-bezier(0,.2,0,1);
            -o-transition: all 0.125s 0s cubic-bezier(0,.2,0,1);
            transition: all 0.125s 0s cubic-bezier(0,.2,0,1);
            */
        }
      </style>
      `
    },
    updates: {
    updatePos:  function(){
        for (i = 0;i < document.getElementsByClassName("mfx_player").length;i++) {
            var elem = document.getElementsByClassName("mfx_player")[i]
            elem.style.bottom = elem.value[0].x +"px"
            elem.style.left = elem.value[0].y +"px"
          }
    },
      updateLoop: setInterval(function () {
        function ls(storage) {
          return localStorage.getItem(storage);
        }
        const inputs = MFX.config.inputs;
  
        for (i = 0; i < inputs.length; i++) {
          var temp = `Move${inputs[i]}`;
          var tempVal = ls(temp) * 1;
          if (ls(inputs[i]) == "true") {
            if (tempVal < MFX.config.speed.max) {
              localStorage.setItem(temp, tempVal + MFX.config.speed.acc);
            }
          } else if (ls(temp) > 0) {
            localStorage.setItem(temp, tempVal - MFX.config.speed.dec);
          }
  
          if (ls(temp) > MFX.config.speed.max) {
            localStorage.setItem(temp, MFX.config.speed.max);
          }
          if (ls(temp) < 0) {
            localStorage.setItem(temp, 0);
          }
        }
        var vel_x = ls("MoveKeyW") - ls("MoveKeyS");
        var vel_y = ls("MoveKeyD") - ls("MoveKeyA");
        for (i = 0;i < document.getElementsByClassName("mfx_player").length;i++) {
            var elem = document.getElementsByClassName("mfx_player")[i]
            pos_x = elem.value[0].x + (vel_x / MFX.config.speed.smoothing)
            pos_y = elem.value[0].y + (vel_y / MFX.config.speed.smoothing)
          elem.value = [
            { x: pos_x, y: pos_y },
            { x: vel_x, y: vel_y }
          ];
        }
        MFX.updates.updatePos()
    
      }, 10)
    }
  };
  MFX.init();
  