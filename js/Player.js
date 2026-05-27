function GameObject(x,y,w,h,color,angle)
{

    this.pivotx = 0;

    this.angle = 0;

    this.vx = 0;
    this.vy = 0;
    
    //SET UP X
    if(x==undefined)
    {
        this.x = canvas.width / 2;
    }
    else
    {
        this.x = x;
    }

    //SET UP Y
    if(y==undefined)
    {
        this.y = canvas.height / 2
    }
    else
    {
        this.y = y;
    }
    
    //SET UP WIDTH
    if(w==undefined)
    {
        this.width = 100;
    }
    else
    {
        this.width = w;
    }

    //SET UP HEIGHT
    if(h==undefined)
    {
        this.height = 100;
    }
    else
    {
        this.height = h;
    }

    //SET UP COLOR
    if(color==undefined)
    {
        this.color = "#ff0000";
    }
    else
    {
        this.color = color
    }


    //SET UP BOUNDING BOX
    this.left = function()
    {
        return this.x - this.width/2
    }
    this.right = function()
    {
        return this.x + this.width/2
    }
    this.top = function()
    {
        return this.y - this.height/2
    }
    this.bottom = function()
    {
        return this.y + this.height/2
    }


    this.prevX = this.x;

     this.vx = 0;
     this.vy = 0;

         this.force = 1;
        this.ax = 1;  
        this.ay = 1; 
        
     this.drawCircle = function()
     {
        context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.translate(this.x, this.y)
            context.arc(0,0, this.width/2, 0, 360 * Math.PI / 180)
            context.closePath();
            context.fill();
        context.restore();
     }

     this.drawRect = function()
     {
context.save();
        context.fillStyle = this.color;
        context.translate(this.x, this.y);
        context.rotate(this.angle * Math.PI / 180);
        context.fillRect(this.pivotx, -this.height / 2, this.width, this.height);
    context.restore();

     }

     this.move = function()
     {
        this.x += this.vx;
        this.y += this.vy;
     }

     this.collisionCheck = function(obj)
     {
        if  (
            this.left() < obj.right() &&
            this.right() > obj.left() &&
            this.top() < obj.bottom() &&
            this.bottom() > obj.top() 
            )
            {
                return true;
            }
            return false;
     }

     	//Draws the collision points
	this.drawDebug = function()
	{
		var size = 19;
		context.save();
		context.fillStyle = "red";
		context.fillRect(this.left().x-size/2, this.left().y-size/2, size, size);
		context.fillRect(this.right().x-size/2, this.right().y-size/2, size, size);
		context.fillRect(this.top().x-size/2, this.top().y-size/2, size, size);
		context.fillRect(this.bottom().x-size/2, this.bottom().y-size/2, size, size);
		context.fillRect(this.x-size/2, this.y-size/2, size, size);
		context.restore();
	}
}