class MyDate extends Date{
  constructor(){
    super();
    this.months= [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "July","Aug", "Sep","Oct", "Nov","Dec"
    ];
    this.days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];
  }
  
  get month(){
    return this.months[this.getMonth()];
  }
  
  get day(){
    return this.days[this.getDay()];
  }  
}

class Clock{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.radius = this.canvas.width / 2;
    this.ctx.translate(125,125);
    this.ctx.rotate(-Math.PI/2);
    this.ctx.scale(0.9, 0.9);
    setInterval(this.render.bind(this), 40);
  }
  
  setTime(date){
    this.hours = date.getHours() % 12;
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.miliseconds = date.getMilliseconds()
  }
  
  render(){
    this.setTime(new MyDate());
    this.ctx.save();
    this.renderCircle();
    this.renderMarks();
    this.renderHands();
    this.ctx.restore();

  }
  
  renderMarks(){
    this.ctx.strokeStyle = 'rgb(255, 255, 255)'
    this.ctx.lineWidth = 3
    
    for (let i = 1; i< 13; i++){
      this.ctx.beginPath()
      
      this.ctx.rotate(Math.PI / 6);
      this.ctx.moveTo(115, 0);
      this.ctx.lineTo(125, 0)
      this.ctx.stroke();
    }
   
    this.ctx.lineWidth = 1
    for (let i = 0; i < 60; i++){
      if(i % 5 !=0){
        this.ctx.beginPath();
        this.ctx.moveTo(120, 0);
        this.ctx.lineTo(125, 0)
        this.ctx.stroke();
      }
      this.ctx.rotate(Math.PI/30);
    }
  }
  
  renderHands(){
    this.ctx.strokeStyle = 'rgba(255,255,255)';
    this.ctx.lineWidth = 8;
    
    var arc = this.hours * Math.PI / 6 + this.minutes * Math.PI / 360 + this.seconds * Math.PI / 21600;
    this.ctx.save()
    this.ctx.rotate(arc)
    this.ctx.beginPath()
    this.ctx.moveTo(12.5,0);
    this.ctx.lineTo(60, 0);
    this.ctx.stroke();
    this.ctx.restore();
    
    this.ctx.lineWidth = 5;
    
    arc = this.minutes * Math.PI / 30 + this.seconds * Math.PI / (30 * 60) + this.miliseconds * Math.PI / (30 * 60 * 1000);
    this.ctx.save()
    this.ctx.rotate(arc)
    this.ctx.beginPath()
    this.ctx.moveTo(12.5,0);
    this.ctx.lineTo(80, 0);
    this.ctx.stroke();
    this.ctx.restore()
    
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'rgb(255, 75, 54)';
    arc = this.seconds * Math.PI / 30 + this.miliseconds * Math.PI / (30000) ;
    this.ctx.save()
    this.ctx.rotate(arc)
    this.ctx.beginPath()
    this.ctx.moveTo(-20,0);
    this.ctx.lineTo(100, 0);
    this.ctx.stroke();
    this.ctx.restore();
  }
  
  renderCircle(){
    this.ctx.beginPath();
    this.ctx.arc(0,0,this.radius, 0,Math.PI *2);
    
    this.ctx.fillStyle = 'rgb(38, 44, 51)'
    let grad = this.ctx.createRadialGradient(
      0,0, this.radius ,
      0,0,this.radius * 1.05
    );
    grad.addColorStop(0,'rgb(54, 62, 73)');
    grad.addColorStop(1, 'rgb(210, 216, 223)');
    this.ctx.strokeStyle = grad;
    this.ctx.lineWidth = this.radius * 0.15
    this.ctx.stroke()
    this.ctx.fill();
    
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius*0.1,0, Math.PI*2)
    this.ctx.fillStyle = 'rgb(255, 75, 54)';
    this.ctx.fill()
  }
}
class App{
  constructor(){
    this.d = new MyDate();
    this.render()
    this.canvas = document.getElementById("clock")
    this.clock = new Clock(this.canvas);
  }
  
  render(){
    document.getElementById("date").append(
      this.d.month + " " + this.d.getDate()
    )
    document.getElementById("day").append(
      this.d.day
    )
  }
}

new App()
