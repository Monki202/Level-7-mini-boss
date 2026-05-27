//controls

var a = false;
var d = false;


document.addEventListener("keydown", press)
document.addEventListener("keyup", release)


function press(e)
{

    if(e.keyCode == 65)
    {
        a = true;
    }
    if(e.keyCode == 68)
    {
        d = true;
    }
    if(e.keyCode == 87)
    {
        w = true;
    }

}

function release(e)
{
    if(e.keyCode == 65)
    {
        a = false;
    }
    if(e.keyCode == 68)
    {
        d = false;
    }
    if(e.keyCode == 87)
    {
        w = false;
    }
    
}

