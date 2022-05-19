var MFX = {
    setPlayer : function(input){},
    removePlayer : function(input){},
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
    }
}
MFX.init()
