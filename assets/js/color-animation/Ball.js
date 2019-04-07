/**
 * Ball class
 */

  /**
   * Constructor
   */
function Ball (radius, color, image, isHSLA, isShadow){
  
  this.x         = 0;
  this.y         = 0;
  this.vx        = 0;
  this.vy        = 0;
  this.color     = color || "#ff0000";
  this.radius    = radius || 40;
  this.rotation  = 0;
  this.scaleX    = 1;
  this.scaleY    = 1;
  this.lineWidth = 0;
  this.image     = image || null;
  this.opacity   = 1;
  this.isHSLA    = isHSLA || false;
  this.isShadow  = isShadow || false;
}

  
  /**
   * Draw
   * @param (2DContext) context - Canvas context
   */
  Ball.prototype.draw = function(context, utils){
    
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    
    // If image was passed in
    if (this.image) {
      var ballWidth = this.radius * 2;
      var imageHeight = ballWidth * (this.image.height / this.image.width);
      context.globalAlpha = this.opacity;
      context.drawImage(this.image, 0 - (this.radius), 0 - (imageHeight / 2), this.radius * 2, imageHeight);
      context.fillStyle = "rgba(255, 255, 255, 0)";
    } else {
      if (utils && !this.isHSLA){
        context.fillStyle = utils.colorToRGB(this.color, this.opacity);
      } else {
        context.fillStyle = this.color;
      }
    }
    
    if (this.isShadow) {	
      context.shadowColor = this.color;
      context.shadowBlur = this.isShadow;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    
    context.beginPath();
    // x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  
  }

  
  /**
   * getBounds
   */
  Ball.prototype.getBounds = function(){

    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  
  }