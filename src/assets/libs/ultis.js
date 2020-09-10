import xlsx from 'xlsx'

//二进制读取文件
export function readFile(file) {
    return new Promise((resolve,reject) => {
        let reader = new FileReader;
        reader.readAsBinaryString(file);
        reader.onload = (ev) => {
            resolve(ev.target.result)
        };
    });
}

//处理excel字段
export let charActer = {
    name : {
        text:'姓名',
        type:'string'
    },
    birthtime : {
        text:'出生日期',
        type:'string'
    },
    birthplace : {
        text:'出生地',
        type:'string'
    },
    career : {
        text:'职业',
        type:'string'
    },
    phone : {
        text:'手机号码',
        type:'string'
    },
    gender: {
        text:'性别',
        type:'string'
    }
}

//处理excel日期类型
export function excelDate(numb, format) {
    const time = new Date((numb - 1) * 24 * 3600000 + 1);
    time.setYear(time.getFullYear() - 70);
    const year = time.getFullYear() + '';
    const month = time.getMonth() + 1 + '';
    const date = time.getDate() - 1 + '';
    if (format && format.length === 1) {
        return year + format + month + format + date
    };
    return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date);
};

//生成随机区间数
export function random(min,max) {
    return Math.random()*(max - min) + min;
};

//绘制星雨　
export function metetor (w,h,canContent) {
    function Meteor() {};
    Meteor.prototype = {
        init: function() {
            this.x = random(0,w);
            this.y = random(0,h/2);
            this.vx = 1.8;
            this.vy = 1.5;
            this.h = random(0.3*h, h); 
            this.w = random(0,w);
            
            this.mx = random(1,2);
            this.my = random(1,2);
        },
        draw: function() {
            canContent.fillStyle = '#fff';
            canContent.fillRect(this.x,this.y,this.mx,this.my);
        },
        move: function() {
            if(this.y < this.h && this.x > this.w) {
                this.y += this.vy;
                this.x -= this.vx;
            } else {
                this.init();
            }
            this.draw();
        }
    };

    function Star() {}
    Star.prototype = {
        init: function() {
            this.x = random(0,w);
            this.y = random(0,h);
            this.a = 1;
            this.va = 0.9;
        },
        draw: function() {
            canContent.fillStyle="rgba(255,255,255"+this.a+")";
            canContent.fillRect(this.x, this.y, 1,1);
        }
    }
    let starList = [];
    function createStar() {
        let star = new Star;
        star.init();
        star.draw();
        starList.push(star);
    }
    for(let i=0;i<100;i++) {
        setTimeout(createStar,200*i);
    }
    let meteorsArr = [];
    function createMeteor () {
        let meteor = new Meteor;
        meteor.init();
        meteor.draw();
        meteorsArr.push(meteor);
    }
    for(let i=0;i<10;i++) {
         setTimeout(createMeteor,2000*i);
    }
    
    function moveMeteor () {
        var grd=canContent.createLinearGradient(0,0,w,h);
        grd.addColorStop(0,'rgba(10, 10, 123, 0.2)');
        grd.addColorStop(1,"rgba(10,30,83,0.2)");
        canContent.fillStyle=grd;
        canContent.fillRect(0,0,w,h);
        for(let i=0;i<meteorsArr.length; i++) {
            meteorsArr[i].move();
        }   
    }
    function timeOut(func,time) {
        func&&func();
        setTimeout(function () {
            timeOut.call(this,func,time);
        }.bind(this),time);
    }
    timeOut(moveMeteor, 20);
}

