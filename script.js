function radians(degrees) {
  return degrees * Math.PI / 180;
};

function sqrt(n){
  return Math.sqrt(n)
}

function numbers (start, end, n){
  var arr = [];
  for(i = start; i < end; i++){
    arr.push(i*n)
  } return arr
}

function fancyNumbers (arr,f){
  var box = [];
  for(i = 0; i < arr.length; i++){
    box.push( 1-Math.pow(cos(arr[i]),f) )
  } return box
}

function fancyww1 (arr,f,n){
  var box = [];
  for(i = 0; i < arr.length; i++){
    box.push( n*(Math.pow(sin(arr[i]),f)) )
  } return box
}

function fancyww2 (arr){
  var box = [];
  for(i = 0; i < arr.length; i++){
    if(radians(1/arr[i]) != Infinity){
    box.push( radians(1/arr[i]) )
    }else{
      box.push( 0 )
    }
  } return box
}

function wrapRad(arr){
  var box1 = [];
  for(i = 0; i < arr.length; i++){
    if(i == 0){
      box1.push(0)
    }else if(i == 1){
      box1.push(arr[i])
    }else{
      box1.push(arr[i]+box1[i-1])
    }
  } return box1
}

function arrMultiply(arr,n){
  var box = [];
  for(i = 0; i < arr.length; i++){
    box.push( arr[i]*n )
  } return box
}

function arrSin(arr){
  var box = [];
  for(i = 0; i < arr.length; i++){
    box.push(sin(arr[i]))
  } return box
}

function arrCos(arr,n){
  var box = [];
  for(i = 0; i < arr.length; i++){
    box.push(cos(arr[i])*n)
  } return box
}

function wrapXFun(arr,add,multiply,size){
  var box = [];
  for(i = 0; i < arr.length; i++){
    box.push(sin(arr[i]+add)*multiply[i]*size)
  } return box
}

function wrapYFun(pathx,e,wrapRad,radStart,pathy,size){
  var box = [];
  for(i = 0; i < pathx.length; i++){
    box.push(pathx[i]*e*size*cos(wrapRad[i]+radStart)+pathy[i])
  } return box
}
function sin (x) {
  return Math.sin(x)
}

function cos (x) {
  return Math.cos(x)
}

function tan (x) {
  return Math.tan(x)
}

function asin (x) {
  return Math.asin(x)
}

function acos (x) {
  return Math.cos(x)
}

function atan (x) {
  return Math.atan(x)
}

function getFront (x,y,s){
  var obj = {
    frontCount: 0,
    backCount: 0
  }
  for (i=0;i<x.length;i++){
    if(i+2){
      var hyp1 = Math.hypot(x[i], y[i]);
      var hyp2 = Math.hypot(x[i+1], y[i+1]);
      var hyp3 = Math.hypot(x[i+2], y[i+2]);
      if(hyp1 < hyp2 && hyp2 > hyp3 && hyp2 > s){
        obj.frontCount = i+1;
        obj.backCount = x.length - obj.frontCount;
      }
    }
  }
  return (obj)
}

function separate(xArr,yArr,frontCount,backcount,bAndDSize){
  var obj = {
    xFront: [],
    yFront: [],
    xBack: [],
    yBack: [],
  }
  for(i=0;i<xArr.length;i++){
    if(i<frontCount){
      obj.xFront.push(xArr[i]);
      obj.yFront.push(yArr[i]);
    }else{
      obj.xBack.push(xArr[i]);
      obj.yBack.push(yArr[i]);
    }
  }
  return obj
}

function equalOut(arr1,arr2){

  var obj = {
    arr1: arr1.map(a => a),
    arr2: arr2.map(a => a)
  }

   var obj = {
    arr1: arr1.map(function(item, i) {
      return item
    }),
    arr2: arr2.map(function(item, i) {
      return item
    })
  }

  if(obj.arr1.length > obj.arr2.length){
    var length = obj.arr1.length;
    var toCopy = obj.arr2[obj.arr2.length-1];
    for(i=0;i<length;i++){
      if(obj.arr2[i] == undefined){
        obj.arr2.push(toCopy);
      }
    }
  } else{
    var length = obj.arr2.length;
    var toCopy = obj.arr1[obj.arr1.length-1];
    for(i=0;i<length;i++){
      if(obj.arr1[i] == undefined){
        obj.arr1.push(toCopy);
      }
    }
  }
  return obj
}
//**********************END FUNCTIONS*********************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//******************************************************************************************************************
//*************GLOBAL VARS******************************************************************************************
var finalCount = 0;
var extra = 'blinewidth 1 all' + '\n' + 'drawframe no' + '\n' + 'asetticks x no' + '\n' + 'asetticks y no' + '\n' + 'asetminticks x no' + '\n' + 'asetminticks y no' + '\n' +'framewidth 0' + '\n' + 'bstyle yes no no no no no no yes no no 0' + '\n' + 'margins 0 0 0 0' + '\n' + 'range x -1.2 1.2' + '\n' + 'range y -1.2 1.2';

//*************************************BEGIN MAIN BIG FUNCTION**************************************************
function makeShape(frontOrBack,d,n,a,f1,f2,bAndDSize,baseRingStart,ringStart,aToCAdd){
  var text = '';
  var buffer = '';
  var obj = {
    a: {
      x: [],
      y: [],
      frontCount: 0,
      backCount: 0,
      xBack: [],
      yBack: []
    },
    b: {
      x: [],
      y: [],
      frontCount: 0,
      backCount: 0,
      xBack: [],
      yBack: [],
    },
    c: {
      x: [],
      y: [],
      frontCount: 0,
      backCount: 0,
      xBack: [],
      yBack: [],
    },
    d: {
      x: [],
      y: [],
      frontCount: 0,
      backCount: 0,
      xBack: [],
      yBack: [],
    }
  }
  //console.log(obj);

  //***************************VARIABLES**********************************
  // var d = 1000;
  // var n = 15;
  // var a = sqrt(2);
  // var f1 = 1;
  // var f2 = 1;
  // var bAndDSize = .9;
  // var baseRingStart = radians(0);
  // var ringStart = radians(360);
  // var aToCAdd = radians(20);




  //*********************DERIVED*********************
  var e = 1/a;
  var aAndBStart = baseRingStart + ringStart;
  var cAndDStart = aAndBStart + aToCAdd;
  var conicE = sqrt((a*a)-1)/a;
  var radUse = radians(180)/d;
  var numbersArr = numbers(0,d,1);
  var radUseArr = numbers(0,d,radUse);
  var oneMinusCos = fancyNumbers(radUseArr,f1);
  var pathNum = arrMultiply(oneMinusCos,d/2);
  var pathRad = arrMultiply(pathNum,radUse);
  var pathx = arrSin(pathRad);
  var pathy = arrCos(pathRad,conicE);
  var ww1 = fancyww1(radUseArr,f2,n);
  var ww2 = fancyww2(ww1);
  var wrapRadArr = wrapRad(ww2);

  //MAKING WRAPS
  var wrapAx = wrapXFun(wrapRadArr,aAndBStart,pathx,1);
  var wrapAy = wrapYFun(pathx,e,wrapRadArr,aAndBStart,pathy,1);
  var wrapBx = wrapXFun(wrapRadArr,ringStart,pathx,bAndDSize);
  var wrapBy = wrapYFun(pathx,e,wrapRadArr,ringStart,pathy,bAndDSize);
  var wrapCx = wrapXFun(wrapRadArr,cAndDStart,pathx,1);
  var wrapCy = wrapYFun(pathx,e,wrapRadArr,cAndDStart,pathy,1);
  var wrapDx = wrapXFun(wrapRadArr,cAndDStart,pathx,bAndDSize);
  var wrapDy = wrapYFun(pathx,e,wrapRadArr,cAndDStart,pathy,bAndDSize);

  //PUTING WRAPS IN OBJ
  obj.a.x = wrapAx;
  obj.b.x = wrapBx;
  obj.c.x = wrapCx;
  obj.d.x = wrapDx;
  obj.a.y = wrapAy;
  obj.b.y = wrapBy;
  obj.c.y = wrapCy;
  obj.d.y = wrapDy;

  //PUTTING FRONT AND BACK COUNTS IN OBJ
  obj.a.frontCount = getFront(obj.a.x,obj.a.y,.99).frontCount;
  obj.a.backCount = getFront(obj.a.x,obj.a.y,.99).backCount;
  obj.b.frontCount = getFront(obj.b.x,obj.b.y,.9*bAndDSize).frontCount;
  obj.b.backCount = getFront(obj.b.x,obj.b.y,.9*bAndDSize).backCount;
  obj.c.frontCount = getFront(obj.c.x,obj.c.y,.99).frontCount;
  obj.c.backCount = getFront(obj.c.x,obj.c.y,.99).backCount;
  obj.d.frontCount = getFront(obj.d.x,obj.d.y,.9*bAndDSize).frontCount;
  obj.d.backCount = getFront(obj.d.x,obj.d.y,.9*bAndDSize).backCount;

  //SEPARATING FRONT AND BACK IN OBJ
  var separateA = separate(obj.a.x,obj.a.y,obj.a.frontCount,obj.a.backCount);
  var separateB = separate(obj.b.x,obj.b.y,obj.b.frontCount,obj.b.backCount);
  var separateC = separate(obj.c.x,obj.c.y,obj.c.frontCount,obj.b.backCount);
  var separateD = separate(obj.d.x,obj.d.y,obj.c.frontCount,obj.b.backCount);
  obj.a.xFront = separateA.xFront;
  obj.a.xBack = separateA.xBack;
  obj.b.xFront = separateB.xFront;
  obj.b.xBack = separateB.xBack;
  obj.c.xFront = separateC.xFront;
  obj.c.xBack = separateC.xBack;
  obj.d.xFront = separateD.xFront;
  obj.d.xBack = separateD.xBack;

  obj.a.yFront = separateA.yFront;
  obj.a.yBack = separateA.yBack;
  obj.b.yFront = separateB.yFront;
  obj.b.yBack = separateB.yBack;
  obj.c.yFront = separateC.yFront;
  obj.c.yBack = separateC.yBack;
  obj.d.yFront = separateD.yFront;
  obj.d.yBack = separateD.yBack;

  //console.log(obj);

  var plotObj = {
    ab: {
      front: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      },
      back: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      }
    },
    ac: {
      front: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      },
      back: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      }
    },
    cd: {
      front: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      },
      back: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      }
    },
    bd: {
      front: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      },
      back: {
        x1: [],
        y1: [],
        x2: [],
        y2: []
      }
    }
  }

  //******************EQUALING OUT ARRS*********************************
  //AB BACK
  var abBackArr = [];
  var axBack = obj.a.xBack;
  //console.log(axBack)
  abBackArr.push(equalOut(obj.a.xBack,obj.b.xBack).arr1);
  abBackArr.push(equalOut(obj.a.xBack,obj.b.xBack).arr2);
  abBackArr.push(equalOut(obj.a.yBack,obj.b.yBack).arr1);
  abBackArr.push(equalOut(obj.a.yBack,obj.b.yBack).arr2);
  //console.log(abBackArr);
  //AB FRONT
  var abFrontArr = [];
  abFrontArr.push(equalOut(obj.a.xFront,obj.b.xFront).arr1);
  abFrontArr.push(equalOut(obj.a.xFront,obj.b.xFront).arr2);
  abFrontArr.push(equalOut(obj.a.yFront,obj.b.yFront).arr1);
  abFrontArr.push(equalOut(obj.a.yFront,obj.b.yFront).arr2);
  //console.log(abFrontArr);

  //AC BACK
  var acBackArr = [];
  acBackArr.push(equalOut(obj.a.xBack,obj.c.xBack).arr1);
  acBackArr.push(equalOut(obj.a.xBack,obj.c.xBack).arr2);
  acBackArr.push(equalOut(obj.a.yBack,obj.c.yBack).arr1);
  acBackArr.push(equalOut(obj.a.yBack,obj.c.yBack).arr2);
  //console.log(acBackArr);
  //AC FRONT
  var acFrontArr = [];
  acFrontArr.push(equalOut(obj.a.xFront,obj.c.xFront).arr1);
  acFrontArr.push(equalOut(obj.a.xFront,obj.c.xFront).arr2);
  acFrontArr.push(equalOut(obj.a.yFront,obj.c.yFront).arr1);
  acFrontArr.push(equalOut(obj.a.yFront,obj.c.yFront).arr2);
  //console.log(acFrontArr);

  //CD BACK
  var cdBackArr = [];
  cdBackArr.push(equalOut(obj.c.xBack,obj.d.xBack).arr1);
  cdBackArr.push(equalOut(obj.c.xBack,obj.d.xBack).arr2);
  cdBackArr.push(equalOut(obj.c.yBack,obj.d.yBack).arr1);
  cdBackArr.push(equalOut(obj.c.yBack,obj.d.yBack).arr2);
  //console.log(cdBackArr);
  //CD FRONT
  var cdFrontArr = [];
  cdFrontArr.push(equalOut(obj.c.xFront,obj.d.xFront).arr1);
  cdFrontArr.push(equalOut(obj.c.xFront,obj.d.xFront).arr2);
  cdFrontArr.push(equalOut(obj.c.yFront,obj.d.yFront).arr1);
  cdFrontArr.push(equalOut(obj.c.yFront,obj.d.yFront).arr2);
  //console.log(cdFrontArr);

  //BD BACK
  var bdBackArr = [];
  bdBackArr.push(equalOut(obj.b.xBack,obj.d.xBack).arr1);
  bdBackArr.push(equalOut(obj.b.xBack,obj.d.xBack).arr2);
  bdBackArr.push(equalOut(obj.b.yBack,obj.d.yBack).arr1);
  bdBackArr.push(equalOut(obj.b.yBack,obj.d.yBack).arr2);
  //console.log(bdBackArr);
  //BD FRONT
  var bdFrontArr = [];
  bdFrontArr.push(equalOut(obj.b.xFront,obj.d.xFront).arr1);
  bdFrontArr.push(equalOut(obj.b.xFront,obj.d.xFront).arr2);
  bdFrontArr.push(equalOut(obj.b.yFront,obj.d.yFront).arr1);
  bdFrontArr.push(equalOut(obj.b.yFront,obj.d.yFront).arr2);
  //console.log(bdFrontArr);

  //************PUTTING EQUALED OUT ARRS INTO PLOT OBJ**********************
  //AB BACK
  plotObj.ab.back.x1 = abBackArr[0];
  plotObj.ab.back.x2 = abBackArr[1];
  plotObj.ab.back.y1 = abBackArr[2];
  plotObj.ab.back.y2 = abBackArr[3];
  //AB FRONT
  plotObj.ab.front.x1 = abFrontArr[0];
  plotObj.ab.front.x2 = abFrontArr[1];
  plotObj.ab.front.y1 = abFrontArr[2];
  plotObj.ab.front.y2 = abFrontArr[3];

  //ac BACK
  plotObj.ac.back.x1 = acBackArr[0];
  plotObj.ac.back.x2 = acBackArr[1];
  plotObj.ac.back.y1 = acBackArr[2];
  plotObj.ac.back.y2 = acBackArr[3];
  //ac FRONT
  plotObj.ac.front.x1 = acFrontArr[0];
  plotObj.ac.front.x2 = acFrontArr[1];
  plotObj.ac.front.y1 = acFrontArr[2];
  plotObj.ac.front.y2 = acFrontArr[3];

  //cd BacK
  plotObj.cd.back.x1 = cdBackArr[0];
  plotObj.cd.back.x2 = cdBackArr[1];
  plotObj.cd.back.y1 = cdBackArr[2];
  plotObj.cd.back.y2 = cdBackArr[3];
  //cd FRONT
  plotObj.cd.front.x1 = cdFrontArr[0];
  plotObj.cd.front.x2 = cdFrontArr[1];
  plotObj.cd.front.y1 = cdFrontArr[2];
  plotObj.cd.front.y2 = cdFrontArr[3];

  //bd BbdK
  plotObj.bd.back.x1 = bdBackArr[0];
  plotObj.bd.back.x2 = bdBackArr[1];
  plotObj.bd.back.y1 = bdBackArr[2];
  plotObj.bd.back.y2 = bdBackArr[3];
  //bd FRONT
  plotObj.bd.front.x1 = bdFrontArr[0];
  plotObj.bd.front.x2 = bdFrontArr[1];
  plotObj.bd.front.y1 = bdFrontArr[2];
  plotObj.bd.front.y2 = bdFrontArr[3];

  //console.log(plotObj);

  //*************PLOT STUFF************************************
  // var text = '';
  // var buffer = '';
  // var finalCount = 0;

  function plot(x1,y1,x2,y2,s){
     //1 = white
     //0 = black
    var scale = 1;
    var use = 1/(x1.length/2);
    var k = 0;
    var m = 0;

     for(i=0;i<x1.length;i++){
        if(k<x1.length/2){
          var put = use * m;
          m++
          //end should be 1
        }
        if(k>=x1.length/2){
          var put = use * m;
          m--
          //end should be 0
        }
        buffer += 'newbuffer' + '\n';
        text += 'addvalue ' + finalCount + ' ' + x1[i] + ' ' + y1[i] + '\n';
        text += 'addvalue ' + finalCount + ' ' + x2[i] + ' ' + y2[i] + '\n';

        if(s == 's'){
          text += 'bcolor ' + .9 + ' ' + put + ' ' + put + ' ' + finalCount + '\n'
        } else{
          text += 'bcolor ' + put + ' ' + put + ' ' + put + ' ' + finalCount + '\n'
        }
        k++
        finalCount++
     }
  }

  //AB BACK
  var abBackX1 = plotObj.ab.back.x1;
  var abBackX2 = plotObj.ab.back.x2;
  var abBackY1 = plotObj.ab.back.y1;
  var abBackY2 = plotObj.ab.back.y2;
  var abBackS = 's';
  //AB FRONT
  var abFrontX1 = plotObj.ab.front.x1;
  var abFrontX2 = plotObj.ab.front.x2;
  var abFrontY1 = plotObj.ab.front.y1;
  var abFrontY2 = plotObj.ab.front.y2;
  var abFrontS = 's';
  //ac BACK
  var acBackX1 = plotObj.ac.back.x1;
  var acBackX2 = plotObj.ac.back.x2;
  var acBackY1 = plotObj.ac.back.y1;
  var acBackY2 = plotObj.ac.back.y2;
  var acBackS = 'b';
  //ac FRONT
  var acFrontX1 = plotObj.ac.front.x1;
  var acFrontX2 = plotObj.ac.front.x2;
  var acFrontY1 = plotObj.ac.front.y1;
  var acFrontY2 = plotObj.ac.front.y2;
  var acFrontS = 'b';
  //cd BACK
  var cdBackX1 = plotObj.cd.back.x1;
  var cdBackX2 = plotObj.cd.back.x2;
  var cdBackY1 = plotObj.cd.back.y1;
  var cdBackY2 = plotObj.cd.back.y2;
  var cdBackS = 's';
  //cd FRONT
  var cdFrontX1 = plotObj.cd.front.x1;
  var cdFrontX2 = plotObj.cd.front.x2;
  var cdFrontY1 = plotObj.cd.front.y1;
  var cdFrontY2 = plotObj.cd.front.y2;
  var cdFrontS = 's';
  //bd BbdK
  var bdBackX1 = plotObj.bd.back.x1;
  var bdBackX2 = plotObj.bd.back.x2;
  var bdBackY1 = plotObj.bd.back.y1;
  var bdBackY2 = plotObj.bd.back.y2;
  var bdBackS = 'b';
  //bd FRONT
  var bdFrontX1 = plotObj.bd.front.x1;
  var bdFrontX2 = plotObj.bd.front.x2;
  var bdFrontY1 = plotObj.bd.front.y1;
  var bdFrontY2 = plotObj.bd.front.y2;
  var bdFrontS = 'b';

if(frontOrBack == 'b'){
  plot(abBackX1,abBackY1,abBackX2,abBackY2,abBackS);
  plot(cdBackX1,cdBackY1,cdBackX2,cdBackY2,cdBackS);
  plot(bdBackX1,bdBackY1,bdBackX2,bdBackY2,bdBackS);
  //plot(abFrontX1,abFrontY1,abFrontX2,abFrontY2,abFrontS);
  //plot(cdFrontX1,cdFrontY1,cdFrontX2,cdFrontY2,cdFrontS);
  //plot(acFrontX1,acFrontY1,acFrontX2,acFrontY2,acFrontS);
}
if(frontOrBack == 'f'){
  // plot(abBackX1,abBackY1,abBackX2,abBackY2,abBackS);
  // plot(cdBackX1,cdBackY1,cdBackX2,cdBackY2,cdBackS);
  // plot(bdBackX1,bdBackY1,bdBackX2,bdBackY2,bdBackS);
  plot(abFrontX1,abFrontY1,abFrontX2,abFrontY2,abFrontS);
  plot(cdFrontX1,cdFrontY1,cdFrontX2,cdFrontY2,cdFrontS);
  plot(acFrontX1,acFrontY1,acFrontX2,acFrontY2,acFrontS);
}

var end = buffer + text;
//console.log(end);
return end
}


//END WORK
var addToStart = 0;
var addToCandD = 20;
var d = 300;
var n = 10;
var a = sqrt(2);
var f1 = 1;
var f2 = 1;
var bAndDSize = .9;




var back1 =  makeShape('b',d,n,a,f1,f2,bAndDSize,radians(addToStart),radians(120),radians(addToCandD));
var back2 =  makeShape('b',d,n,a,f1,f2,bAndDSize,radians(addToStart),radians(240),radians(addToCandD));
var back3 =  makeShape('b',d,n,a,f1,f2,bAndDSize,radians(addToStart),radians(360),radians(addToCandD));
var front1 = makeShape('f',d,n,a,f1,f2,bAndDSize,radians(addToStart),radians(120),radians(addToCandD));
var front2 = makeShape('f',d,n,a,f1,f2,bAndDSize,radians(addToStart),radians(240),radians(addToCandD));
var front3 = makeShape('f',d,n,a,f1,f2,bAndDSize,radians(addToStart),radians(360),radians(addToCandD));

//var finish = back1 + '\n' + back2 + '\n' + back3 + '\n' + front1 + '\n' + front2 + '\n' + front3 + '\n'+ extra;
var back = back1 + '\n' + back2 + '\n' + back3 + '\n';
var front = front1 + '\n' + front2 + '\n' + front3 + '\n'+ extra;
var finish = back + front;
console.log(finish);
//console.log(back3);


//makeShape(frontOrBack,d,n,a,f1,f2,bAndDSize,baseRingStart,ringStart,aToCAdd)



