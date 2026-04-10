var DEFAULT_ADJ={brightness:100,contrast:100,saturate:100,hueRotate:0,blur:0,grayscale:0,sepia:0,invert:0,vignette:0};
var DEFAULT_PIXEL_ADJ={temperature:0,tint:0,exposure:0,highlights:0,shadows:0,sharpen:0,grain:0,fade:0,vibrance:0,clarity:0};
var ADJ_CONFIG=[
{key:'brightness',label:'Brightness',min:0,max:200,def:100,unit:'%'},
{key:'contrast',label:'Contrast',min:0,max:200,def:100,unit:'%'},
{key:'saturate',label:'Saturation',min:0,max:200,def:100,unit:'%'},
{key:'hueRotate',label:'Hue Rotate',min:0,max:360,def:0,unit:'deg'},
{key:'blur',label:'Blur',min:0,max:20,def:0,unit:'px',step:.5},
{key:'grayscale',label:'Grayscale',min:0,max:100,def:0,unit:'%'},
{key:'sepia',label:'Sepia',min:0,max:100,def:0,unit:'%'},
{key:'invert',label:'Invert',min:0,max:100,def:0,unit:'%'},
{key:'vignette',label:'Vignette',min:0,max:100,def:0,unit:'%'}
];
var PIXEL_ADJ_CONFIG=[
{key:'temperature',label:'Temperature',min:-100,max:100,def:0,unit:''},
{key:'tint',label:'Tint',min:-100,max:100,def:0,unit:''},
{key:'exposure',label:'Exposure',min:-100,max:100,def:0,unit:''},
{key:'highlights',label:'Highlights',min:-100,max:100,def:0,unit:''},
{key:'shadows',label:'Shadows',min:-100,max:100,def:0,unit:''},
{key:'sharpen',label:'Sharpen',min:0,max:100,def:0,unit:''},
{key:'grain',label:'Grain',min:0,max:100,def:0,unit:''},
{key:'fade',label:'Fade',min:0,max:100,def:0,unit:''},
{key:'vibrance',label:'Vibrance',min:-100,max:100,def:0,unit:''},
{key:'clarity',label:'Clarity',min:-100,max:100,def:0,unit:''}
];
var FILTERS=[
{name:'Original',v:{brightness:100,contrast:100,saturate:100,hueRotate:0,blur:0,grayscale:0,sepia:0,invert:0,vignette:0}},
{name:'B&W',v:{brightness:100,contrast:100,saturate:0,hueRotate:0,blur:0,grayscale:100,sepia:0,invert:0,vignette:0}},
{name:'Vintage',v:{brightness:110,contrast:90,saturate:80,hueRotate:0,blur:0,grayscale:0,sepia:60,invert:0,vignette:0}},
{name:'Warm',v:{brightness:105,contrast:105,saturate:120,hueRotate:0,blur:0,grayscale:0,sepia:30,invert:0,vignette:0}},
{name:'Cool',v:{brightness:105,contrast:105,saturate:80,hueRotate:180,blur:0,grayscale:0,sepia:0,invert:0,vignette:0}},
{name:'Dramatic',v:{brightness:90,contrast:150,saturate:130,hueRotate:0,blur:0,grayscale:0,sepia:0,invert:0,vignette:0}},
{name:'Fade',v:{brightness:115,contrast:80,saturate:70,hueRotate:0,blur:1,grayscale:0,sepia:10,invert:0,vignette:0}},
{name:'Hi-Con',v:{brightness:95,contrast:170,saturate:110,hueRotate:0,blur:0,grayscale:0,sepia:0,invert:0,vignette:0}},
{name:'Soft',v:{brightness:110,contrast:90,saturate:90,hueRotate:0,blur:1,grayscale:0,sepia:0,invert:0,vignette:0}},
{name:'Noir',v:{brightness:90,contrast:160,saturate:0,hueRotate:0,blur:0,grayscale:100,sepia:0,invert:0,vignette:0}},
{name:'Summer',v:{brightness:108,contrast:110,saturate:140,hueRotate:350,blur:0,grayscale:0,sepia:15,invert:0,vignette:0}},
{name:'Neon',v:{brightness:105,contrast:120,saturate:160,hueRotate:260,blur:0,grayscale:0,sepia:0,invert:0,vignette:0}},
{name:'Cinematic',v:{brightness:95,contrast:130,saturate:85,hueRotate:5,blur:0,grayscale:0,sepia:15,invert:0,vignette:20}},
{name:'Amber',v:{brightness:105,contrast:110,saturate:110,hueRotate:15,blur:0,grayscale:0,sepia:45,invert:0,vignette:10}},
{name:'Teal',v:{brightness:100,contrast:115,saturate:90,hueRotate:160,blur:0,grayscale:0,sepia:10,invert:0,vignette:0}},
{name:'Sunset',v:{brightness:108,contrast:105,saturate:135,hueRotate:340,blur:0,grayscale:0,sepia:25,invert:0,vignette:15}},
{name:'Frost',v:{brightness:112,contrast:95,saturate:70,hueRotate:190,blur:.5,grayscale:10,sepia:5,invert:0,vignette:0}},
{name:'Rose',v:{brightness:110,contrast:100,saturate:100,hueRotate:320,blur:0,grayscale:0,sepia:20,invert:0,vignette:5}},
{name:'Emerald',v:{brightness:100,contrast:110,saturate:110,hueRotate:120,blur:0,grayscale:0,sepia:5,invert:0,vignette:0}},
{name:'Indigo',v:{brightness:95,contrast:125,saturate:95,hueRotate:240,blur:0,grayscale:0,sepia:15,invert:0,vignette:10}},
{name:'Copper',v:{brightness:105,contrast:108,saturate:105,hueRotate:25,blur:0,grayscale:0,sepia:35,invert:0,vignette:8}},
{name:'Slate',v:{brightness:105,contrast:90,saturate:40,hueRotate:200,blur:0,grayscale:20,sepia:5,invert:0,vignette:0}}
];
var FRAME_TYPES=[
{key:'none',name:'None'},{key:'border',name:'Border'},{key:'polaroid',name:'Polaroid'},{key:'rounded',name:'Rounded'},
{key:'shadow',name:'Shadow'},{key:'vintage',name:'Vintage'},{key:'film',name:'Film Strip'},
{key:'double',name:'Double'},{key:'gold',name:'Gold'},{key:'ornate',name:'Ornate'},
{key:'mat',name:'Mat'},{key:'torn',name:'Torn Edge'},{key:'dotted',name:'Dotted'},
{key:'dashed',name:'Dashed'},{key:'gradient',name:'Gradient'},{key:'neon',name:'Neon'},
{key:'wood',name:'Wood'}
];
var COLOR_PALETTE=['#000000','#ffffff','#888888','#444444','#ff3b3b','#ff8c3b','#ffd93b','#7dff3b','#3bff8c','#3bffdd','#3b8cff','#8c3bff','#ff3bd9','#ff3b8c','#8b4513','#d2691e','#f4a460','#2f4f4f','#1a1a1a','#c0c0c0'];
var MARKER_COLORS=['#FFEB3B','#4CAF50','#F44336','#2196F3','#E91E63','#FF9800','#00BCD4','#9C27B0'];
var SYSTEM_FONTS=['Arial','Helvetica Neue','Times New Roman','Georgia','Verdana','Courier New','Impact','Trebuchet MS','Palatino Linotype','Lucida Console','Tahoma','Garamond','Century Gothic','Book Antiqua','Franklin Gothic Medium','Comic Sans MS'];
var MAX_HISTORY=25,STICKER_SIZE=120;

function starPath(c,cx,cy,or,ir,n){c.beginPath();for(var i=0;i<n*2;i++){var r=i%2?ir:or,a=i*Math.PI/n-Math.PI/2;var x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath()}
function heartPath(c,cx,cy,sz){c.beginPath();c.moveTo(cx,cy+sz*.75);c.bezierCurveTo(cx-sz*1.3,cy,cx-sz*.7,cy-sz*1.1,cx,cy-sz*.4);c.bezierCurveTo(cx+sz*.7,cy-sz*1.1,cx+sz*1.3,cy,cx,cy+sz*.75);c.closePath()}
function rrect(c,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function tornOff(t,seed){return Math.sin(t*13.7+seed)*4+Math.sin(t*7.3+seed*2.1)*3+Math.sin(t*23.1+seed*.7)*2}

var STICKER_DEFS=[
{name:'Star',draw:function(c,s){c.fillStyle='#FFD700';c.strokeStyle='#B8860B';c.lineWidth=2;starPath(c,s/2,s/2,s*.42,s*.18,5);c.fill();c.stroke()}},
{name:'Heart',draw:function(c,s){c.fillStyle='#FF4444';heartPath(c,s/2,s*.48,s*.42);c.fill();c.strokeStyle='#CC0000';c.lineWidth=1.5;c.stroke()}},
{name:'Arrow',draw:function(c,s){c.fillStyle='#2196F3';c.beginPath();c.moveTo(s*.15,s*.35);c.lineTo(s*.75,s*.35);c.lineTo(s*.75,s*.2);c.lineTo(s*.9,s*.5);c.lineTo(s*.75,s*.8);c.lineTo(s*.75,s*.65);c.lineTo(s*.15,s*.65);c.closePath();c.fill();c.strokeStyle='#1565C0';c.lineWidth=1.5;c.stroke()}},
{name:'Check',draw:function(c,s){c.fillStyle='#4CAF50';c.beginPath();c.arc(s/2,s/2,s*.4,0,Math.PI*2);c.fill();c.strokeStyle='#2E7D32';c.lineWidth=2;c.stroke();c.strokeStyle='#fff';c.lineWidth=4;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(s*.32,s*.5);c.lineTo(s*.46,s*.64);c.lineTo(s*.68,s*.36);c.stroke()}},
{name:'X Mark',draw:function(c,s){c.fillStyle='#F44336';c.beginPath();c.arc(s/2,s/2,s*.4,0,Math.PI*2);c.fill();c.strokeStyle='#fff';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(s*.35,s*.35);c.lineTo(s*.65,s*.65);c.moveTo(s*.65,s*.35);c.lineTo(s*.35,s*.65);c.stroke()}},
{name:'Bolt',draw:function(c,s){c.fillStyle='#FFC107';c.beginPath();c.moveTo(s*.55,s*.08);c.lineTo(s*.28,s*.5);c.lineTo(s*.48,s*.5);c.lineTo(s*.45,s*.92);c.lineTo(s*.72,s*.46);c.lineTo(s*.52,s*.46);c.closePath();c.fill();c.strokeStyle='#FF8F00';c.lineWidth=1.5;c.stroke()}},
{name:'Bubble',draw:function(c,s){c.fillStyle='#E91E63';rrect(c,s*.1,s*.1,s*.8,s*.55,s*.12);c.fill();c.beginPath();c.moveTo(s*.28,s*.65);c.lineTo(s*.18,s*.85);c.lineTo(s*.42,s*.65);c.closePath();c.fill();c.strokeStyle='#AD1457';c.lineWidth=1.5;rrect(c,s*.1,s*.1,s*.8,s*.55,s*.12);c.stroke()}},
{name:'Diamond',draw:function(c,s){c.fillStyle='#9C27B0';c.beginPath();c.moveTo(s/2,s*.08);c.lineTo(s*.88,s/2);c.lineTo(s/2,s*.92);c.lineTo(s*.12,s/2);c.closePath();c.fill();c.strokeStyle='#6A1B9A';c.lineWidth=2;c.stroke()}},
{name:'Fire',draw:function(c,s){var g=c.createLinearGradient(s/2,s*.1,s/2,s*.9);g.addColorStop(0,'#FFEB3B');g.addColorStop(.4,'#FF9800');g.addColorStop(1,'#F44336');c.fillStyle=g;c.beginPath();c.moveTo(s/2,s*.05);c.bezierCurveTo(s*.7,s*.25,s*.8,s*.45,s*.65,s*.6);c.bezierCurveTo(s*.85,s*.55,s*.75,s*.85,s*.55,s*.95);c.lineTo(s*.45,s*.95);c.bezierCurveTo(s*.25,s*.85,s*.15,s*.55,s*.35,s*.6);c.bezierCurveTo(s*.2,s*.45,s*.3,s*.25,s/2,s*.05);c.closePath();c.fill()}},
{name:'Crown',draw:function(c,s){c.fillStyle='#FFD700';c.beginPath();c.moveTo(s*.12,s*.7);c.lineTo(s*.12,s*.35);c.lineTo(s*.3,s*.5);c.lineTo(s*.5,s*.15);c.lineTo(s*.7,s*.5);c.lineTo(s*.88,s*.35);c.lineTo(s*.88,s*.7);c.closePath();c.fill();c.strokeStyle='#B8860B';c.lineWidth=2;c.stroke();c.fillStyle='#F44336';c.beginPath();c.arc(s*.5,s*.15,s*.04,0,Math.PI*2);c.fill()}},
{name:'Warning',draw:function(c,s){c.fillStyle='#FFC107';c.beginPath();c.moveTo(s/2,s*.1);c.lineTo(s*.9,s*.85);c.lineTo(s*.1,s*.85);c.closePath();c.fill();c.strokeStyle='#FF8F00';c.lineWidth=2;c.stroke();c.strokeStyle='#333';c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(s/2,s*.35);c.lineTo(s/2,s*.6);c.stroke();c.fillStyle='#333';c.beginPath();c.arc(s/2,s*.72,s*.03,0,Math.PI*2);c.fill()}},
{name:'Sparkle',draw:function(c,s){c.fillStyle='#00E5FF';for(var i=0;i<4;i++){c.save();c.translate(s/2,s/2);c.rotate(i*Math.PI/4);c.beginPath();c.moveTo(0,-s*.42);c.lineTo(s*.05,-s*.05);c.lineTo(s*.42,0);c.lineTo(s*.05,s*.05);c.lineTo(0,s*.42);c.lineTo(-s*.05,s*.05);c.lineTo(-s*.42,0);c.lineTo(-s*.05,-s*.05);c.closePath();c.fill();c.restore()}c.fillStyle='#fff';c.beginPath();c.arc(s/2,s/2,s*.06,0,Math.PI*2);c.fill()}},
{name:'Badge',draw:function(c,s){c.fillStyle='#1565C0';c.beginPath();c.arc(s/2,s*.42,s*.32,0,Math.PI*2);c.fill();c.strokeStyle='#0D47A1';c.lineWidth=2;c.stroke();c.fillStyle='#FFD700';c.font='bold '+Math.round(s*.22)+'px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('1',s/2,s*.44);c.fillStyle='#1976D2';c.beginPath();c.moveTo(s*.25,s*.68);c.lineTo(s*.15,s*.92);c.lineTo(s*.3,s*.78);c.closePath();c.fill();c.beginPath();c.moveTo(s*.75,s*.68);c.lineTo(s*.85,s*.92);c.lineTo(s*.7,s*.78);c.closePath();c.fill()}},
{name:'Cloud',draw:function(c,s){c.fillStyle='#E3F2FD';c.strokeStyle='#90CAF9';c.lineWidth=2;c.beginPath();c.arc(s*.35,s*.55,s*.22,0,Math.PI*2);c.arc(s*.55,s*.45,s*.28,0,Math.PI*2);c.arc(s*.75,s*.55,s*.2,0,Math.PI*2);c.fill();c.stroke()}},
{name:'Moon',draw:function(c,s){c.fillStyle='#FFC107';c.beginPath();c.arc(s/2,s/2,s*.38,0,Math.PI*2);c.fill();c.save();c.globalCompositeOperation='destination-out';c.beginPath();c.arc(s*.62,s*.42,s*.32,0,Math.PI*2);c.fill();c.restore()}},
{name:'Pin',draw:function(c,s){c.fillStyle='#F44336';c.beginPath();c.arc(s/2,s*.38,s*.25,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(s/2,s*.63);c.lineTo(s/2,s*.88);c.lineTo(s*.38,s*.78);c.closePath();c.fill();c.fillStyle='#fff';c.beginPath();c.arc(s/2,s*.38,s*.1,0,Math.PI*2);c.fill()}},
{name:'Music',draw:function(c,s){c.fillStyle='#9C27B0';c.strokeStyle='#6A1B9A';c.lineWidth=2;c.beginPath();c.ellipse(s*.3,s*.78,s*.1,s*.08,-.3,0,Math.PI*2);c.fill();c.stroke();c.beginPath();c.ellipse(s*.72,s*.7,s*.1,s*.08,-.3,0,Math.PI*2);c.fill();c.stroke();c.fillRect(s*.38,s*.2,s*.04,s*.58);c.fillRect(s*.8,s*.12,s*.04,s*.58);c.beginPath();c.moveTo(s*.42,s*.2);c.lineTo(s*.84,s*.12);c.lineTo(s*.84,s*.22);c.lineTo(s*.42,s*.3);c.closePath();c.fill();c.strokeStyle='#6A1B9A';c.stroke()}},
{name:'Circle',draw:function(c,s){c.fillStyle='#2196F3';c.strokeStyle='#1565C0';c.lineWidth=2;c.beginPath();c.arc(s/2,s/2,s*.38,0,Math.PI*2);c.fill();c.stroke()}},
{name:'Triangle',draw:function(c,s){c.fillStyle='#FF9800';c.strokeStyle='#E65100';c.lineWidth=2;c.beginPath();c.moveTo(s/2,s*.12);c.lineTo(s*.88,s*.85);c.lineTo(s*.12,s*.85);c.closePath();c.fill();c.stroke()}},
{name:'Cross',draw:function(c,s){c.fillStyle='#F44336';c.strokeStyle='#B71C1C';c.lineWidth=1.5;rrect(c,s*.35,s*.1,s*.3,s*.8,s*.06);c.fill();c.stroke();rrect(c,s*.1,s*.35,s*.8,s*.3,s*.06);c.fill();c.stroke()}},
{name:'Ribbon',draw:function(c,s){c.fillStyle='#E91E63';c.beginPath();c.moveTo(s*.1,s*.3);c.lineTo(s*.9,s*.3);c.lineTo(s*.85,s*.5);c.lineTo(s*.5,s*.42);c.lineTo(s*.15,s*.5);c.closePath();c.fill();c.beginPath();c.moveTo(s*.15,s*.5);c.lineTo(s*.5,s*.42);c.lineTo(s*.85,s*.5);c.lineTo(s*.8,s*.7);c.lineTo(s*.5,s*.6);c.lineTo(s*.2,s*.7);c.closePath();c.fillStyle='#AD1457';c.fill();c.strokeStyle='#880E4F';c.lineWidth=1;c.beginPath();c.moveTo(s*.1,s*.3);c.lineTo(s*.9,s*.3);c.lineTo(s*.85,s*.5);c.lineTo(s*.15,s*.5);c.closePath();c.stroke()}},
{name:'Shield',draw:function(c,s){c.fillStyle='#3F51B5';c.beginPath();c.moveTo(s/2,s*.08);c.lineTo(s*.85,s*.2);c.lineTo(s*.85,s*.5);c.quadraticCurveTo(s*.85,s*.85,s/2,s*.95);c.quadraticCurveTo(s*.15,s*.85,s*.15,s*.5);c.lineTo(s*.15,s*.2);c.closePath();c.fill();c.strokeStyle='#283593';c.lineWidth=2;c.stroke();c.fillStyle='#FFC107';c.beginPath();c.moveTo(s/2,s*.3);c.lineTo(s*.62,s*.45);c.lineTo(s/2,s*.65);c.lineTo(s*.38,s*.45);c.closePath();c.fill()}},
{name:'Flag',draw:function(c,s){c.strokeStyle='#795548';c.lineWidth=3;c.beginPath();c.moveTo(s*.25,s*.08);c.lineTo(s*.25,s*.92);c.stroke();c.fillStyle='#4CAF50';c.beginPath();c.moveTo(s*.25,s*.08);c.lineTo(s*.85,s*.2);c.lineTo(s*.8,s*.4);c.lineTo(s*.25,s*.35);c.closePath();c.fill();c.strokeStyle='#2E7D32';c.lineWidth=1.5;c.stroke()}},
{name:'Leaf',draw:function(c,s){c.fillStyle='#4CAF50';c.beginPath();c.moveTo(s*.5,s*.08);c.bezierCurveTo(s*.85,s*.2,s*.9,s*.6,s*.5,s*.92);c.bezierCurveTo(s*.1,s*.6,s*.15,s*.2,s*.5,s*.08);c.fill();c.strokeStyle='#2E7D32';c.lineWidth=1.5;c.stroke();c.strokeStyle='#1B5E20';c.lineWidth=1.5;c.beginPath();c.moveTo(s*.5,s*.15);c.quadraticCurveTo(s*.45,s*.5,s*.5,s*.85);c.stroke();c.beginPath();c.moveTo(s*.5,s*.35);c.lineTo(s*.35,s*.28);c.moveTo(s*.5,s*.5);c.lineTo(s*.65,s*.42);c.moveTo(s*.5,s*.65);c.lineTo(s*.38,s*.58);c.stroke()}},
{name:'Flower',draw:function(c,s){var cols=['#E91E63','#FF5722','#FF9800','#FFEB3B','#9C27B0','#2196F3'];for(var i=0;i<6;i++){c.save();c.translate(s/2,s/2);c.rotate(i*Math.PI/3);c.fillStyle=cols[i];c.beginPath();c.ellipse(0,-s*.25,s*.12,s*.25,0,0,Math.PI*2);c.fill();c.restore()}c.fillStyle='#FFC107';c.beginPath();c.arc(s/2,s/2,s*.12,0,Math.PI*2);c.fill();c.strokeStyle='#FF8F00';c.lineWidth=1;c.stroke()}},
{name:'Sun',draw:function(c,s){c.fillStyle='#FFC107';c.beginPath();c.arc(s/2,s/2,s*.22,0,Math.PI*2);c.fill();c.strokeStyle='#FF8F00';c.lineWidth=3;c.lineCap='round';for(var i=0;i<12;i++){var a=i*Math.PI/6;var r1=s*.3,r2=s*.44;c.beginPath();c.moveTo(s/2+r1*Math.cos(a),s/2+r1*Math.sin(a));c.lineTo(s/2+r2*Math.cos(a),s/2+r2*Math.sin(a));c.stroke()}}},
{name:'Raindrop',draw:function(c,s){c.fillStyle='#2196F3';c.beginPath();c.moveTo(s/2,s*.08);c.bezierCurveTo(s*.82,s*.35,s*.82,s*.75,s/2,s*.88);c.bezierCurveTo(s*.18,s*.75,s*.18,s*.35,s/2,s*.08);c.fill();c.strokeStyle='#1565C0';c.lineWidth=1.5;c.stroke();c.fillStyle='rgba(255,255,255,0.4)';c.beginPath();c.ellipse(s*.4,s*.5,s*.06,s*.12,-.3,0,Math.PI*2);c.fill()}},
{name:'Snowflake',draw:function(c,s){c.strokeStyle='#81D4FA';c.lineWidth=2;c.lineCap='round';for(var i=0;i<6;i++){c.save();c.translate(s/2,s/2);c.rotate(i*Math.PI/3);c.beginPath();c.moveTo(0,-s*.08);c.lineTo(0,-s*.42);c.stroke();c.beginPath();c.moveTo(0,-s*.22);c.lineTo(s*.06,-s*.3);c.moveTo(0,-s*.22);c.lineTo(-s*.06,-s*.3);c.moveTo(0,-s*.34);c.lineTo(s*.05,-s*.4);c.moveTo(0,-s*.34);c.lineTo(-s*.05,-s*.4);c.stroke();c.restore()}c.fillStyle='#E1F5FE';c.beginPath();c.arc(s/2,s/2,s*.05,0,Math.PI*2);c.fill()}},
{name:'ThumbUp',draw:function(c,s){c.fillStyle='#4CAF50';c.beginPath();c.roundRect(s*.15,s*.42,s*.2,s*.48,4);c.fill();c.beginPath();c.moveTo(s*.35,s*.82);c.lineTo(s*.35,s*.25);c.bezierCurveTo(s*.35,s*.12,s*.48,s*.08,s*.52,s*.2);c.lineTo(s*.52,s*.3);c.lineTo(s*.65,s*.3);c.bezierCurveTo(s*.72,s*.3,s*.75,s*.35,s*.72,s*.42);c.lineTo(s*.7,s*.48);c.lineTo(s*.8,s*.48);c.bezierCurveTo(s*.87,s*.48,s*.88,s*.55,s*.82,s*.6);c.lineTo(s*.78,s*.65);c.lineTo(s*.78,s*.82);c.closePath();c.fill();c.strokeStyle='#2E7D32';c.lineWidth=1.5;c.stroke()}},
{name:'ThumbDn',draw:function(c,s){c.fillStyle='#F44336';c.beginPath();c.roundRect(s*.15,s*.1,s*.2,s*.48,4);c.fill();c.beginPath();c.moveTo(s*.35,s*.18);c.lineTo(s*.35,s*.75);c.bezierCurveTo(s*.35,s*.88,s*.48,s*.92,s*.52,s*.8);c.lineTo(s*.52,s*.7);c.lineTo(s*.65,s*.7);c.bezierCurveTo(s*.72,s*.7,s*.75,s*.65,s*.72,s*.58);c.lineTo(s*.7,s*.52);c.lineTo(s*.8,s*.52);c.bezierCurveTo(s*.87,s*.52,s*.88,s*.45,s*.82,s*.4);c.lineTo(s*.78,s*.35);c.lineTo(s*.78,s*.18);c.closePath();c.fill();c.strokeStyle='#B71C1C';c.lineWidth=1.5;c.stroke()}},
{name:'Eye',draw:function(c,s){c.fillStyle='#9C27B0';c.beginPath();c.moveTo(s*.08,s/2);c.bezierCurveTo(s*.25,s*.2,s*.75,s*.2,s*.92,s/2);c.bezierCurveTo(s*.75,s*.8,s*.25,s*.8,s*.08,s/2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(s/2,s/2,s*.2,0,Math.PI*2);c.fill();c.fillStyle='#311B92';c.beginPath();c.arc(s/2,s/2,s*.1,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(s*.46,s*.46,s*.04,0,Math.PI*2);c.fill()}},
{name:'Smile',draw:function(c,s){c.fillStyle='#FFC107';c.beginPath();c.arc(s/2,s/2,s*.4,0,Math.PI*2);c.fill();c.strokeStyle='#F57F17';c.lineWidth=2;c.stroke();c.fillStyle='#333';c.beginPath();c.arc(s*.38,s*.42,s*.045,0,Math.PI*2);c.fill();c.beginPath();c.arc(s*.62,s*.42,s*.045,0,Math.PI*2);c.fill();c.strokeStyle='#333';c.lineWidth=2.5;c.lineCap='round';c.beginPath();c.arc(s/2,s*.48,s*.2,.15*Math.PI,.85*Math.PI);c.stroke()}},
{name:'Camera',draw:function(c,s){c.fillStyle='#607D8B';rrect(c,s*.1,s*.25,s*.8,s*.6,s*.1);c.fill();c.strokeStyle='#455A64';c.lineWidth=2;c.stroke();c.fillStyle='#455A64';rrect(c,s*.35,s*.15,s*.3,s*.15,s*.05);c.fill();c.fillStyle='#263238';c.beginPath();c.arc(s/2,s*.52,s*.2,0,Math.PI*2);c.fill();c.strokeStyle='#90A4AE';c.lineWidth=2;c.stroke();c.fillStyle='#B0BEC5';c.beginPath();c.arc(s*.45,s*.48,s*.05,0,Math.PI*2);c.fill()}},
{name:'Book',draw:function(c,s){c.fillStyle='#795548';c.beginPath();c.moveTo(s/2,s*.12);c.lineTo(s*.88,s*.2);c.lineTo(s*.88,s*.82);c.lineTo(s/2,s*.9);c.lineTo(s*.12,s*.82);c.lineTo(s*.12,s*.2);c.closePath();c.fill();c.strokeStyle='#4E342E';c.lineWidth=1.5;c.stroke();c.strokeStyle='#4E342E';c.lineWidth=2;c.beginPath();c.moveTo(s/2,s*.12);c.lineTo(s/2,s*.9);c.stroke();c.strokeStyle='#8D6E63';c.lineWidth=1;c.beginPath();for(var i=0;i<4;i++){var y=s*.3+i*s*.12;c.moveTo(s*.18,y);c.lineTo(s*.46,y);c.moveTo(s*.54,y);c.lineTo(s*.82,y)}c.stroke()}},
{name:'Lock',draw:function(c,s){c.fillStyle='#78909C';rrect(c,s*.2,s*.38,s*.6,s*.5,s*.08);c.fill();c.strokeStyle='#455A64';c.lineWidth=2;c.stroke();c.strokeStyle='#546E7A';c.lineWidth=5;c.lineCap='round';c.beginPath();c.arc(s/2,s*.38,s*.15,Math.PI,0);c.stroke();c.fillStyle='#455A64';c.beginPath();c.arc(s/2,s*.6,s*.06,0,Math.PI*2);c.fill()}},
{name:'Key',draw:function(c,s){c.fillStyle='#FFC107';c.strokeStyle='#FF8F00';c.lineWidth=2;c.beginPath();c.arc(s*.32,s*.35,s*.18,0,Math.PI*2);c.fill();c.stroke();c.save();c.globalCompositeOperation='destination-out';c.beginPath();c.arc(s*.32,s*.35,s*.08,0,Math.PI*2);c.fill();c.restore();c.strokeStyle='#FF8F00';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(s*.48,s*.4);c.lineTo(s*.85,s*.55);c.stroke();c.lineWidth=4;c.beginPath();c.moveTo(s*.72,s*.5);c.lineTo(s*.72,s*.65);c.moveTo(s*.82,s*.54);c.lineTo(s*.82,s*.69);c.stroke()}},
{name:'Gift',draw:function(c,s){c.fillStyle='#F44336';c.fillRect(s*.12,s*.4,s*.76,s*.45);c.strokeStyle='#B71C1C';c.lineWidth=1.5;c.strokeRect(s*.12,s*.4,s*.76,s*.45);c.fillStyle='#FFEB3B';c.fillRect(s*.44,s*.4,s*.12,s*.45);c.fillRect(s*.12,s*.35,s*.76,s*.12);c.strokeStyle='#F9A825';c.lineWidth=1;c.strokeRect(s*.44,s*.4,s*.12,s*.45);c.strokeRect(s*.12,s*.35,s*.76,s*.12);c.fillStyle='#FF9800';c.beginPath();c.ellipse(s*.38,s*.35,s*.12,s*.08,-.3,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(s*.62,s*.35,s*.12,s*.08,.3,0,Math.PI*2);c.fill()}}
];

var state={image:null,adjustments:{brightness:100,contrast:100,saturate:100,hueRotate:0,blur:0,grayscale:0,sepia:0,invert:0,vignette:0},
pixelAdjustments:{temperature:0,tint:0,exposure:0,highlights:0,shadows:0,sharpen:0,grain:0,fade:0,vibrance:0,clarity:0},
tool:'select',brushSize:8,brushColor:'#000000',brushOpacity:1,markerSize:40,markerColor:'#FFEB3B',markerOpacity:.35,
fontSize:48,fontFamily:'Arial',textColor:'#000000',textBgColor:'',textBold:false,textItalic:false,textContent:'Text',
shapeColor:'#9e6038',shapeFill:false,shapeSize:3,bgTolerance:32,cloneSize:20,cloneSource:{x:0,y:0},cloneReady:false,cloneOffset:{x:0,y:0},
zoom:1,panX:0,panY:0,cropRect:null,drawLayer:null,
history:[],historyIdx:-1,isDrawing:false,isPanning:false,isCropping:false,isShaping:false,isMovingOverlay:false,isResizingOverlay:false,isWmRemoving:false,
lastX:0,lastY:0,panStartX:0,panStartY:0,panStartPanX:0,panStartPanY:0,
shapeStart:null,shapeEnd:null,overlayDragOff:{x:0,y:0},overlayResizeHandle:-1,resizeStartOv:null,resizeStartPt:null,
resizeLock:true,resizeAspect:1,activeFilter:0,
frame:{type:'none',color:'#ffffff',width:30,innerColor:'#9e6038'},
bgTransparent:true,bgColor:'#ffffff',bgImage:null,bgImageSrc:'',
uploadedImages:[],overlays:[],selectedOverlay:-1,
watermark:{enabled:false,type:'text',text:'WATERMARK',font:'Arial',size:48,color:'#000000',opacity:.25,rotation:-30,tiled:true,image:null,imageSrc:''},
wmRemoveRect:null,wmRemoveFeather:5,wmRemovePasses:8,
theme:'light'};
var cachedFiltered=null,cachedFilterStr='',cachedPixelStr='',cachedPixelAdjusted=null,spaceHeld=false,stickerImages=[],activeTextEdit=null,dragOvIdx=-1;

var workspace=document.getElementById('workspace'),displayCanvas=document.getElementById('display-canvas'),ctx=displayCanvas.getContext('2d'),
welcomeEl=document.getElementById('welcome'),dropZone=document.getElementById('drop-zone'),
fileInput=document.getElementById('file-input'),multiFileInput=document.getElementById('multi-file-input'),wmFileInput=document.getElementById('wm-file-input'),
zoomDisp=document.getElementById('zoom-display'),imgInfo=document.getElementById('image-info'),btnUndo=document.getElementById('btn-undo'),btnRedo=document.getElementById('btn-redo');
function el(id){return document.getElementById(id)}
function setTxt(id,v){var e=el(id);if(e)e.textContent=v}
function updateRangeFill(s){var mn=parseFloat(s.min),mx=parseFloat(s.max),v=parseFloat(s.value);s.style.background='linear-gradient(to right,var(--c-accent) '+((v-mn)/(mx-mn))*100+'%,var(--c-slider-tk) '+((v-mn)/(mx-mn))*100+'%)'}

function init(){
  buildSliders();buildPixelSliders();buildFilters();buildFrameGrid();buildFrameSettings();buildToolSettings();generateStickers();
  bindPanelTabs();bindToolButtons();bindCanvasEvents();bindDragDrop();bindKeyboard();bindModalEvents();
  resizeCanvas();
  window.addEventListener('resize',function(){resizeCanvas();render()});

  dropZone.addEventListener('click',function(e){
    e.preventDefault();e.stopPropagation();
    fileInput.click();
  });

  fileInput.addEventListener('change',function(e){
    if(e.target.files&&e.target.files[0]){loadImageFile(e.target.files[0]);}
    e.target.value='';
  });

  multiFileInput.addEventListener('change',function(e){
    if(e.target.files){
      Array.from(e.target.files).forEach(function(f){if(f.type&&f.type.startsWith('image/'))addUploadedFile(f)});
    }
    e.target.value='';
  });

  wmFileInput.addEventListener('change',function(e){
    if(e.target.files&&e.target.files[0]){loadWmImage(e.target.files[0]);}
    e.target.value='';
  });

  el('export-format').addEventListener('change',function(){
    el('export-quality-row').style.display=this.value==='png'?'none':'block';
  });
  el('export-quality').addEventListener('input',function(){
    setTxt('export-quality-val',this.value);updateRangeFill(this);
  });
  document.querySelectorAll('.modal-overlay').forEach(function(m){
    m.addEventListener('click',function(e){if(e.target===m)m.classList.remove('show')});
  });
}

function resizeCanvas(){displayCanvas.width=workspace.clientWidth;displayCanvas.height=workspace.clientHeight}

function generateStickers(){
  stickerImages=[];
  var grid=el('stickers-grid');grid.innerHTML='';
  STICKER_DEFS.forEach(function(def,i){
    var cv=document.createElement('canvas');cv.width=STICKER_SIZE;cv.height=STICKER_SIZE;
    var c=cv.getContext('2d');def.draw(c,STICKER_SIZE);
    var img=new Image();
    img.onload=(function(idx){return function(){stickerImages[idx]=img}})(i);
    img.src=cv.toDataURL();
    var card=document.createElement('div');card.className='sticker-card';
    var thumb=document.createElement('canvas');thumb.width=52;thumb.height=52;
    thumb.getContext('2d').drawImage(cv,0,0,52,52);
    var label=document.createElement('span');label.textContent=def.name;
    card.appendChild(thumb);card.appendChild(label);
    card.addEventListener('click',function(){addSticker(i)});
    grid.appendChild(card);
  });
}

function addSticker(idx){
  if(!state.image||!stickerImages[idx])return;
  var img=stickerImages[idx],iw=state.image.naturalWidth,ih=state.image.naturalHeight;
  var targetSize=Math.min(iw,ih)*.18,scale=targetSize/STICKER_SIZE;
  state.overlays.push({type:'image',img:img,src:img.src,name:STICKER_DEFS[idx].name,
    x:(iw-STICKER_SIZE*scale)/2,y:(ih-STICKER_SIZE*scale)/2,w:STICKER_SIZE*scale,h:STICKER_SIZE*scale,
    opacity:1,scale:scale,origW:STICKER_SIZE,origH:STICKER_SIZE});
  state.selectedOverlay=state.overlays.length-1;
  updateOverlaysList();render();showToast('Sticker: '+STICKER_DEFS[idx].name,'success');
}

function toggleTheme(){
  state.theme=state.theme==='dark'?'light':'dark';
  document.body.classList.toggle('theme-dark',state.theme==='dark');
  el('theme-toggle').innerHTML=state.theme==='dark'?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
  render();
}

function openFile(){fileInput.click()}
function openMultiFile(){multiFileInput.click()}
function openWmImage(){wmFileInput.click()}

function loadImageFile(file){
  var r=new FileReader();
  r.onload=function(ev){
    var img=new Image();
    img.onload=function(){
      state.image=img;
      state.adjustments=JSON.parse(JSON.stringify(DEFAULT_ADJ));
      state.pixelAdjustments=JSON.parse(JSON.stringify(DEFAULT_PIXEL_ADJ));
      state.cropRect=null;state.history=[];state.historyIdx=-1;state.activeFilter=0;
      state.selectedOverlay=-1;state.wmRemoveRect=null;
      state.frame={type:'none',color:'#ffffff',width:30,innerColor:'#9e6038'};
      state.bgTransparent=true;state.bgImage=null;state.bgImageSrc='';
      state.overlays=[];state.watermark.enabled=false;
      el('wm-enabled').checked=false;el('wm-body').classList.add('hidden');
      invalidateCache();initDrawLayer();fitToScreen();showEditor();pushHistory();
      updateSliders();updatePixelSliders();updateFilterUI();updateFrameUI();
      generateFilterThumbs();updateOverlaysList();
      imgInfo.textContent=img.naturalWidth+' \u00d7 '+img.naturalHeight;
      showToast('Image loaded','success');
    };
    img.onerror=function(){showToast('Failed to load image','error')};
    img.src=ev.target.result;
  };
  r.onerror=function(){showToast('Failed to read file','error')};
  r.readAsDataURL(file);
}

function addUploadedFile(file){
  var r=new FileReader();
  r.onload=function(ev){
    var img=new Image();
    img.onload=function(){
      state.uploadedImages.push({src:ev.target.result,img:img,name:file.name});
      updateUploadedGrid();setTxt('img-count',state.uploadedImages.length);
      el('no-images').style.display='none';el('clear-all-btn').style.display='inline';
      showToast('Added: '+file.name,'info');
    };
    img.onerror=function(){showToast('Failed to load: '+file.name,'error')};
    img.src=ev.target.result;
  };
  r.readAsDataURL(file);
}

function showEditor(){welcomeEl.classList.add('hidden');displayCanvas.classList.remove('hidden');render()}

function initDrawLayer(){
  var c=document.createElement('canvas');
  c.width=state.image.naturalWidth;c.height=state.image.naturalHeight;
  state.drawLayer=c;
}

function loadWmImage(file){
  var r=new FileReader();
  r.onload=function(ev){
    var img=new Image();
    img.onload=function(){
      state.watermark.image=img;state.watermark.imageSrc=ev.target.result;
      state.watermark.type='image';setWmType('image');
      el('wm-image-preview').classList.remove('hidden');
      var cv=el('wm-img-canvas'),cx=cv.getContext('2d');cx.clearRect(0,0,200,80);
      var sc=Math.min(190/img.naturalWidth,70/img.naturalHeight);
      cx.drawImage(img,(200-img.naturalWidth*sc)/2,(80-img.naturalHeight*sc)/2,img.naturalWidth*sc,img.naturalHeight*sc);
      render();showToast('Watermark image set','success');
    };
    img.src=ev.target.result;
  };
  r.readAsDataURL(file);
}

function updateUploadedGrid(){
  var g=el('uploaded-grid');g.innerHTML='';
  state.uploadedImages.forEach(function(item,i){
    var d=document.createElement('div');d.className='img-thumb';
    var cv=document.createElement('canvas');cv.width=60;cv.height=60;
    cv.getContext('2d').drawImage(item.img,0,0,60,60);
    var acts=document.createElement('div');acts.className='img-thumb-actions';
    acts.innerHTML='<button title="Set Main" data-action="main" data-idx="'+i+'"><i class="fa-solid fa-image"></i></button>'
      +'<button title="Set BG" data-action="bg" data-idx="'+i+'"><i class="fa-solid fa-clone"></i></button>'
      +'<button title="Add Overlay" data-action="overlay" data-idx="'+i+'"><i class="fa-solid fa-layer-group"></i></button>'
      +'<button title="Watermark" data-action="wm" data-idx="'+i+'"><i class="fa-solid fa-copyright"></i></button>'
      +'<button title="Delete" data-action="del" data-idx="'+i+'"><i class="fa-solid fa-trash"></i></button>';
    acts.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      var btn=e.target.closest('button');if(!btn)return;
      var idx=parseInt(btn.dataset.idx),action=btn.dataset.action;
      if(action==='main')setAsMain(idx);
      else if(action==='bg')setAsBg(idx);
      else if(action==='overlay')addOverlay(idx);
      else if(action==='wm')setAsWmImg(idx);
      else if(action==='del')removeUploaded(idx);
    });
    d.appendChild(cv);d.appendChild(acts);g.appendChild(d);
  });
}

function clearAllUploaded(){
  state.uploadedImages=[];updateUploadedGrid();setTxt('img-count','0');
  el('no-images').style.display='block';el('clear-all-btn').style.display='none';showToast('Library cleared');
}

function setAsMain(i){
  var item=state.uploadedImages[i];if(!item)return;
  state.image=item.img;
  state.adjustments=JSON.parse(JSON.stringify(DEFAULT_ADJ));
  state.pixelAdjustments=JSON.parse(JSON.stringify(DEFAULT_PIXEL_ADJ));
  state.activeFilter=0;state.cropRect=null;state.wmRemoveRect=null;
  invalidateCache();initDrawLayer();fitToScreen();pushHistory();
  updateSliders();updatePixelSliders();updateFilterUI();generateFilterThumbs();
  imgInfo.textContent=item.img.naturalWidth+' \u00d7 '+item.img.naturalHeight;
  showToast('Set as main','success');render();
}

function setAsBg(i){
  var item=state.uploadedImages[i];if(!item)return;
  state.bgImage=item.img;state.bgImageSrc=item.src;
  state.bgTransparent=false;el('bg-transparent').checked=false;
  el('bg-color-row').classList.remove('hidden');el('bg-image-info').classList.remove('hidden');
  render();showToast('Background set','success');
}

function removeBgImage(){state.bgImage=null;state.bgImageSrc='';el('bg-image-info').classList.add('hidden');render()}

function setAsWmImg(i){
  var item=state.uploadedImages[i];if(!item)return;
  state.watermark.image=item.img;state.watermark.imageSrc=item.src;
  state.watermark.type='image';setWmType('image');
  el('wm-image-preview').classList.remove('hidden');
  var cv=el('wm-img-canvas'),cx=cv.getContext('2d');cx.clearRect(0,0,200,80);
  var sc=Math.min(190/item.img.naturalWidth,70/item.img.naturalHeight);
  cx.drawImage(item.img,(200-item.img.naturalWidth*sc)/2,(70-item.img.naturalHeight*sc)/2,item.img.naturalWidth*sc,item.img.naturalHeight*sc);
  render();showToast('Watermark image set','success');
}

function removeUploaded(i){
  state.uploadedImages.splice(i,1);updateUploadedGrid();
  setTxt('img-count',state.uploadedImages.length);
  if(!state.uploadedImages.length){el('no-images').style.display='block';el('clear-all-btn').style.display='none'}
}

function addOverlay(i){
  var item=state.uploadedImages[i];if(!item||!state.image)return;
  var iw=state.image.naturalWidth,ih=state.image.naturalHeight,ow=item.img.naturalWidth,oh=item.img.naturalHeight;
  var scale=Math.min(iw*.75/ow,ih*.75/oh),w=ow*scale,h=oh*scale;
  state.overlays.push({type:'image',img:item.img,src:item.src,name:item.name,
    x:(iw-w)/2,y:(ih-h)/2,w:w,h:h,opacity:1,scale:scale,origW:ow,origH:oh});
  state.selectedOverlay=state.overlays.length-1;updateOverlaysList();render();showToast('Overlay added','success');
}

function measureTextOv(ov){
  var c=document.createElement('canvas').getContext('2d');
  c.font=(ov.bold?'bold ':'')+(ov.italic?'italic ':'')+ov.fontSize+'px "'+ov.fontFamily+'"';
  var lines=ov.text.split('\n'),maxW=0;
  lines.forEach(function(l){maxW=Math.max(maxW,c.measureText(l).width)});
  var pad=6;return{w:maxW+pad*2,h:lines.length*ov.fontSize*1.35+pad*2};
}

function createTextOverlay(x,y){
  var ov={type:'text',text:state.textContent||'Text',x:x,y:y,fontSize:state.fontSize,
    fontFamily:state.fontFamily,color:state.textColor,bgColor:state.textBgColor,
    bold:state.textBold,italic:state.textItalic,opacity:1,w:0,h:0};
  var sz=measureTextOv(ov);ov.w=sz.w;ov.h=sz.h;
  state.overlays.push(ov);state.selectedOverlay=state.overlays.length-1;
  updateOverlaysList();render();pushHistory();showToast('Text placed \u2014 use Move (V) to drag','info');
}

function startInlineTextEdit(idx){
  if(activeTextEdit)return;
  var ov=state.overlays[idx];if(!ov||ov.type!=='text')return;
  var rect=displayCanvas.getBoundingClientRect();
  var sx=rect.left+state.panX+ov.x*state.zoom,sy=rect.top+state.panY+ov.y*state.zoom;
  var ta=document.createElement('textarea');ta.className='text-edit-overlay';ta.value=ov.text;
  ta.style.left=sx+'px';ta.style.top=sy+'px';
  ta.style.fontSize=(ov.fontSize*state.zoom)+'px';ta.style.fontFamily=ov.fontFamily;
  ta.style.fontWeight=ov.bold?'bold':'normal';ta.style.fontStyle=ov.italic?'italic':'normal';
  ta.style.color=ov.color;ta.style.backgroundColor=ov.bgColor||'transparent';
  ta.style.width=Math.max(60,ov.w*state.zoom)+'px';ta.style.height=Math.max(30,ov.h*state.zoom)+'px';
  document.body.appendChild(ta);ta.focus();ta.select();activeTextEdit=ta;
  function finish(){
    if(!activeTextEdit)return;
    ov.text=ta.value||'Text';var sz=measureTextOv(ov);ov.w=sz.w;ov.h=sz.h;
    ta.remove();activeTextEdit=null;updateOverlaysList();pushHistory();render();
  }
  ta.addEventListener('blur',finish);
  ta.addEventListener('keydown',function(e){
    if(e.key==='Escape')ta.blur();
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ta.blur()}
  });
}

function updateOverlaysList(){
  var list=el('overlays-list');list.innerHTML='';
  setTxt('ov-count',state.overlays.length);
  el('no-overlays').style.display=state.overlays.length?'none':'block';
  el('ov-hint').classList.toggle('hidden',!state.overlays.length);
  state.overlays.forEach(function(ov,i){
    var d=document.createElement('div');d.className='ov-item'+(i===state.selectedOverlay?' selected':'');
    d.draggable=true;
    d.addEventListener('dragstart',function(e){dragOvIdx=i;e.dataTransfer.effectAllowed='move';d.style.opacity='.4'});
    d.addEventListener('dragend',function(){d.style.opacity='1';dragOvIdx=-1;
      document.querySelectorAll('.ov-item').forEach(function(it){it.classList.remove('drag-over')})});
    d.addEventListener('dragover',function(e){e.preventDefault();if(dragOvIdx!==i)d.classList.add('drag-over')});
    d.addEventListener('dragleave',function(){d.classList.remove('drag-over')});
    d.addEventListener('drop',function(e){
      e.preventDefault();d.classList.remove('drag-over');
      if(dragOvIdx===i||dragOvIdx<0)return;
      var item=state.overlays.splice(dragOvIdx,1)[0];state.overlays.splice(i,0,item);
      if(state.selectedOverlay===dragOvIdx)state.selectedOverlay=i;
      else if(state.selectedOverlay>dragOvIdx&&state.selectedOverlay<=i)state.selectedOverlay--;
      else if(state.selectedOverlay<dragOvIdx&&state.selectedOverlay>=i)state.selectedOverlay++;
      updateOverlaysList();render();pushHistory();
    });
    d.addEventListener('click',function(e){
      if(e.target.tagName==='INPUT'||e.target.tagName==='BUTTON'||e.target.tagName==='TEXTAREA')return;
      state.selectedOverlay=i;updateOverlaysList();render();
    });
    if(ov.type==='text'){
      var prev=document.createElement('div');
      prev.style.cssText='width:34px;height:34px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:7px;font-weight:'+(ov.bold?'bold':'normal')+';color:'+ov.color+';background:'+(ov.bgColor||'var(--c-card)')+';font-family:'+ov.fontFamily;
      prev.textContent=ov.text.substring(0,3);
      var info=document.createElement('div');info.className='flex-1 min-w-0';
      info.innerHTML='<div class="flex items-center gap-1 mb-1"><textarea rows="1" style="width:100%;background:var(--c-input);color:var(--c-fg);border:1px solid var(--c-border);border-radius:4px;padding:2px 4px;font-size:10px;font-family:inherit;outline:none;resize:none;line-height:1.3" data-ov-idx="'+i+'" data-field="text">'+ov.text.replace(/</g,'&lt;')+'</textarea></div>'
        +'<div class="flex items-center gap-1"><span class="text-[9px] text-muted w-7">Size</span><input type="range" min="8" max="300" value="'+ov.fontSize+'" class="flex-1" style="height:3px" data-ov-idx="'+i+'" data-field="fontSize"></div>'
        +'<div class="flex items-center gap-1 mt-0.5"><span class="text-[9px] text-muted w-7">Op</span><input type="range" min="0" max="100" value="'+Math.round(ov.opacity*100)+'" class="flex-1" style="height:3px" data-ov-idx="'+i+'" data-field="opacity"></div>'
        +'<div class="flex items-center gap-1 mt-1 flex-wrap"><span class="text-[9px] text-muted">Clr</span><input type="color" value="'+ov.color+'" style="width:20px;height:16px" data-ov-idx="'+i+'" data-field="color"><span class="text-[9px] text-muted">BG</span><input type="color" value="'+(ov.bgColor||'#ffffff')+'" style="width:20px;height:16px" data-ov-idx="'+i+'" data-field="bgColor"><button class="sm-btn secondary" style="height:16px;font-size:7px;padding:0 3px" data-ov-idx="'+i+'" data-action="clearBg">X</button></div>'
        +'<div class="flex items-center gap-1 mt-1"><button class="sm-btn '+(ov.bold?'toggled':'secondary')+'" style="height:18px;font-size:9px;padding:0 5px;font-weight:bold" data-ov-idx="'+i+'" data-action="toggleBold">B</button><button class="sm-btn '+(ov.italic?'toggled':'secondary')+'" style="height:18px;font-size:9px;padding:0 5px;font-style:italic" data-ov-idx="'+i+'" data-action="toggleItalic">I</button><select class="flex-1" style="height:18px;font-size:8px;padding:0 2px" data-ov-idx="'+i+'" data-field="fontFamily">'+SYSTEM_FONTS.map(function(f){return'<option value="'+f+'"'+(f===ov.fontFamily?' selected':'')+'>'+f+'</option>'}).join('')+'</select></div>';
      var acts=document.createElement('div');acts.className='flex gap-0.5 flex-shrink-0';
      acts.innerHTML='<button class="toolbar-btn" style="width:18px;height:18px;font-size:8px" title="Dup" data-ov-idx="'+i+'" data-action="dup"><i class="fa-solid fa-copy"></i></button><button class="toolbar-btn" style="width:18px;height:18px;font-size:8px;color:var(--c-danger)" title="Del" data-ov-idx="'+i+'" data-action="del"><i class="fa-solid fa-xmark"></i></button>';
      d.appendChild(prev);d.appendChild(info);d.appendChild(acts);
    }else{
      var cv=document.createElement('canvas');cv.width=34;cv.height=34;
      cv.getContext('2d').drawImage(ov.img,0,0,34,34);
      var info=document.createElement('div');info.className='flex-1 min-w-0';
      info.innerHTML='<div class="text-[10px] text-fg truncate">'+(ov.name||'Overlay')+'</div>'
        +'<div class="flex items-center gap-1 mt-0.5"><span class="text-[9px] text-muted w-7">Op</span><input type="range" min="0" max="100" value="'+Math.round(ov.opacity*100)+'" class="flex-1" style="height:3px" data-ov-idx="'+i+'" data-field="imgOpacity"></div>'
        +'<div class="flex items-center gap-1 mt-0.5"><span class="text-[9px] text-muted w-7">Sz</span><input type="range" min="5" max="400" value="'+Math.round((ov.scale||1)*100)+'" class="flex-1" style="height:3px" data-ov-idx="'+i+'" data-field="imgScale"></div>';
      var acts=document.createElement('div');acts.className='flex gap-0.5 flex-shrink-0';
      acts.innerHTML='<button class="toolbar-btn" style="width:16px;height:16px;font-size:7px" title="Up" data-ov-idx="'+i+'" data-action="moveUp"><i class="fa-solid fa-chevron-up"></i></button><button class="toolbar-btn" style="width:16px;height:16px;font-size:7px" title="Down" data-ov-idx="'+i+'" data-action="moveDown"><i class="fa-solid fa-chevron-down"></i></button><button class="toolbar-btn" style="width:16px;height:16px;font-size:7px" title="Dup" data-ov-idx="'+i+'" data-action="dup"><i class="fa-solid fa-copy"></i></button><button class="toolbar-btn" style="width:16px;height:16px;font-size:7px;color:var(--c-danger)" title="Del" data-ov-idx="'+i+'" data-action="del"><i class="fa-solid fa-xmark"></i></button>';
      d.appendChild(cv);d.appendChild(info);d.appendChild(acts);
    }
    list.appendChild(d);
  });

  list.querySelectorAll('input[type="range"]').forEach(updateRangeFill);

  list.querySelectorAll('[data-field="text"]').forEach(function(ta){
    ta.addEventListener('input',function(){var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].text=this.value;var sz=measureTextOv(state.overlays[idx]);state.overlays[idx].w=sz.w;state.overlays[idx].h=sz.h;render()});
  });
  list.querySelectorAll('[data-field="fontSize"]').forEach(function(s){
    s.addEventListener('input',function(){var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].fontSize=+this.value;var sz=measureTextOv(state.overlays[idx]);state.overlays[idx].w=sz.w;state.overlays[idx].h=sz.h;updateRangeFill(this);render()});
  });
  list.querySelectorAll('[data-field="opacity"]').forEach(function(s){
    s.addEventListener('input',function(){var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].opacity=this.value/100;updateRangeFill(this);render()});
  });
  list.querySelectorAll('[data-field="color"]').forEach(function(inp){
    inp.addEventListener('input',function(){var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].color=this.value;render()});
  });
  list.querySelectorAll('[data-field="bgColor"]').forEach(function(inp){
    inp.addEventListener('input',function(){var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].bgColor=this.value;render()});
  });
  list.querySelectorAll('[data-field="fontFamily"]').forEach(function(sel){
    sel.addEventListener('change',function(){var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].fontFamily=this.value;var sz=measureTextOv(state.overlays[idx]);state.overlays[idx].w=sz.w;state.overlays[idx].h=sz.h;render()});
  });
  list.querySelectorAll('[data-field="imgOpacity"]').forEach(function(s){
    s.addEventListener('input',function(){var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].opacity=this.value/100;updateRangeFill(this);render()});
  });
  list.querySelectorAll('[data-field="imgScale"]').forEach(function(s){
    s.addEventListener('input',function(){var idx=parseInt(this.dataset.ovIdx);rescaleOverlay(idx,this.value/100);updateRangeFill(this)});
  });
  list.querySelectorAll('[data-action="clearBg"]').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].bgColor='';render()});
  });
  list.querySelectorAll('[data-action="toggleBold"]').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].bold=!state.overlays[idx].bold;updateOverlaysList();render()});
  });
  list.querySelectorAll('[data-action="toggleItalic"]').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();var idx=parseInt(this.dataset.ovIdx);state.overlays[idx].italic=!state.overlays[idx].italic;updateOverlaysList();render()});
  });
  list.querySelectorAll('[data-action="dup"]').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();dupOverlay(parseInt(this.dataset.ovIdx))});
  });
  list.querySelectorAll('[data-action="del"]').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();delOverlay(parseInt(this.dataset.ovIdx))});
  });
  list.querySelectorAll('[data-action="moveUp"]').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();moveOverlay(parseInt(this.dataset.ovIdx),-1)});
  });
  list.querySelectorAll('[data-action="moveDown"]').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();moveOverlay(parseInt(this.dataset.ovIdx),1)});
  });
}

function rescaleOverlay(i,ns){
  var ov=state.overlays[i];if(!ov||ov.type==='text')return;
  var cx=ov.x+ov.w/2,cy=ov.y+ov.h/2;ov.w=ov.origW*ns;ov.h=ov.origH*ns;
  ov.x=cx-ov.w/2;ov.y=cy-ov.h/2;ov.scale=ns;render();
}
function moveOverlay(i,dir){
  var ni=i+dir;if(ni<0||ni>=state.overlays.length)return;
  var t=state.overlays[i];state.overlays[i]=state.overlays[ni];state.overlays[ni]=t;
  if(state.selectedOverlay===i)state.selectedOverlay=ni;
  else if(state.selectedOverlay===ni)state.selectedOverlay=i;
  updateOverlaysList();render();
}
function dupOverlay(i){
  var ov=state.overlays[i];
  if(ov.type==='text'){state.overlays.splice(i+1,0,{type:'text',text:ov.text,x:ov.x+20,y:ov.y+20,fontSize:ov.fontSize,fontFamily:ov.fontFamily,color:ov.color,bgColor:ov.bgColor,bold:ov.bold,italic:ov.italic,opacity:ov.opacity,w:ov.w,h:ov.h})}
  else{state.overlays.splice(i+1,0,{type:'image',img:ov.img,src:ov.src,name:ov.name,x:ov.x+20,y:ov.y+20,w:ov.w,h:ov.h,opacity:ov.opacity,scale:ov.scale,origW:ov.origW,origH:ov.origH})}
  state.selectedOverlay=i+1;updateOverlaysList();render();showToast('Duplicated');
}
function delOverlay(i){state.overlays.splice(i,1);if(state.selectedOverlay>=state.overlays.length)state.selectedOverlay=-1;updateOverlaysList();pushHistory();render()}

function setWmType(t){
  state.watermark.type=t;
  el('wm-type-text').className='sm-btn '+(t==='text'?'primary':'secondary');
  el('wm-type-image').className='sm-btn '+(t==='image'?'primary':'secondary');
  el('wm-text-settings').classList.toggle('hidden',t!=='text');
  el('wm-image-settings').classList.toggle('hidden',t!=='image');
  render();
}

function buildFilterStr(a){var d=a||state.adjustments;return'brightness('+d.brightness+'%) contrast('+d.contrast+'%) saturate('+d.saturate+'%) hue-rotate('+d.hueRotate+'deg) blur('+d.blur+'px) grayscale('+d.grayscale+'%) sepia('+d.sepia+'%) invert('+d.invert+'%)'}
function invalidateCache(){cachedFiltered=null;cachedFilterStr='';cachedPixelAdjusted=null;cachedPixelStr=''}
function invalidatePixelCache(){cachedPixelAdjusted=null;cachedPixelStr=''}
function seededRandom(seed){var x=Math.sin(seed)*10000;return x-Math.floor(x)}

function applyPixelAdjustments(srcCanvas){
  var pa=state.pixelAdjustments;
  if(!Object.values(pa).some(function(v){return v!==0}))return srcCanvas;
  var ps=JSON.stringify(pa);
  if(ps===cachedPixelStr&&cachedPixelAdjusted)return cachedPixelAdjusted;
  var w=srcCanvas.width,h=srcCanvas.height;
  var c=document.createElement('canvas');c.width=w;c.height=h;
  var cx=c.getContext('2d');cx.drawImage(srcCanvas,0,0);
  var imgData=cx.getImageData(0,0,w,h),d=imgData.data;
  if(pa.temperature!==0){var t=pa.temperature*.6;for(var i=0;i<d.length;i+=4){d[i]=Math.min(255,Math.max(0,d[i]+t));d[i+2]=Math.min(255,Math.max(0,d[i+2]-t))}}
  if(pa.tint!==0){var t=pa.tint*.4;for(var i=0;i<d.length;i+=4){d[i+1]=Math.min(255,Math.max(0,d[i+1]+t));d[i]=Math.min(255,Math.max(0,d[i]-t*.3));d[i+2]=Math.min(255,Math.max(0,d[i+2]-t*.3))}}
  if(pa.exposure!==0){var f=Math.pow(2,pa.exposure/50);for(var i=0;i<d.length;i+=4){d[i]*=f;d[i+1]*=f;d[i+2]*=f}}
  if(pa.highlights!==0){var amt=pa.highlights*.012;for(var i=0;i<d.length;i+=4){var lum=(d[i]*.299+d[i+1]*.587+d[i+2]*.114)/255;if(lum>.5){var fac=1+amt*(lum-.5)*4;d[i]*=fac;d[i+1]*=fac;d[i+2]*=fac}}}
  if(pa.shadows!==0){var amt=pa.shadows*.012;for(var i=0;i<d.length;i+=4){var lum=(d[i]*.299+d[i+1]*.587+d[i+2]*.114)/255;if(lum<.5){var fac=1+amt*(.5-lum)*4;d[i]*=fac;d[i+1]*=fac;d[i+2]*=fac}}}
  if(pa.fade!==0){var lift=pa.fade*.5;for(var i=0;i<d.length;i+=4){d[i]=d[i]+(255-d[i])*(lift/255);d[i+1]=d[i+1]+(255-d[i+1])*(lift/255);d[i+2]=d[i+2]+(255-d[i+2])*(lift/255)}}
  if(pa.vibrance!==0){var amt=pa.vibrance*.025;for(var i=0;i<d.length;i+=4){var r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),sat=mx===0?0:(mx-mn)/mx,avg=(r+g+b)/3,fac=1+amt*(1-sat);d[i]=avg+(r-avg)*fac;d[i+1]=avg+(g-avg)*fac;d[i+2]=avg+(b-avg)*fac}}
  if(pa.clarity!==0){var amt=pa.clarity*.025;for(var i=0;i<d.length;i+=4){var lum=(d[i]*.299+d[i+1]*.587+d[i+2]*.114)/255;var mw=1-Math.abs(lum-.5)*2;mw*=mw;var fac=1+amt*mw;d[i]=128+(d[i]-128)*fac;d[i+1]=128+(d[i+1]-128)*fac;d[i+2]=128+(d[i+2]-128)*fac}}
  if(pa.sharpen>0){var orig=new Uint8ClampedArray(d);var amt=pa.sharpen/100;for(var y=1;y<h-1;y++){for(var x=1;x<w-1;x++){var idx=(y*w+x)*4;for(var ch=0;ch<3;ch++){var cen=orig[idx+ch];var kr=5*cen-orig[((y-1)*w+x)*4+ch]-orig[((y+1)*w+x)*4+ch]-orig[(y*w+x-1)*4+ch]-orig[(y*w+x+1)*4+ch];d[idx+ch]=Math.max(0,Math.min(255,cen+(kr-cen)*amt))}}}}
  if(pa.grain>0){var amt=pa.grain*1.2;for(var i=0;i<d.length;i+=4){var n=(seededRandom(i*.01+.5)-.5)*amt;d[i]+=n;d[i+1]+=n;d[i+2]+=n}}
  for(var i=0;i<d.length;i++){d[i]=Math.max(0,Math.min(255,Math.round(d[i])))}
  cx.putImageData(imgData,0,0);cachedPixelAdjusted=c;cachedPixelStr=ps;return c;
}

function getFilteredImage(){
  var fs=buildFilterStr();
  if(fs!==cachedFilterStr||!cachedFiltered){
    var c=document.createElement('canvas');c.width=state.image.naturalWidth;c.height=state.image.naturalHeight;
    var cx=c.getContext('2d');cx.filter=fs;cx.drawImage(state.image,0,0);
    cachedFiltered=c;cachedFilterStr=fs;
  }
  return applyPixelAdjustments(cachedFiltered);
}

function render(){
  if(!state.image)return;
  var w=displayCanvas.width,h=displayCanvas.height;ctx.clearRect(0,0,w,h);
  var iw=state.image.naturalWidth*state.zoom,ih=state.image.naturalHeight*state.zoom,ix=state.panX,iy=state.panY;
  if(!state.bgTransparent){var pad=getFramePad();ctx.fillStyle=state.bgColor;ctx.fillRect(ix-pad.l*state.zoom,iy-pad.t*state.zoom,iw+pad.l*state.zoom+pad.r*state.zoom,ih+pad.t*state.zoom+pad.b*state.zoom)}
  drawFrameBg(ix,iy,iw,ih);
  if(state.bgImage){ctx.save();ctx.translate(ix,iy);ctx.scale(state.zoom,state.zoom);var bg=state.bgImage,biw=state.image.naturalWidth,bih=state.image.naturalHeight;var sc=Math.max(biw/bg.naturalWidth,bih/bg.naturalHeight);var bw=bg.naturalWidth*sc,bh=bg.naturalHeight*sc;ctx.drawImage(bg,(biw-bw)/2,(bih-bh)/2,bw,bh);ctx.restore()}
  if(state.bgTransparent)drawCheckerboard(ix,iy,iw,ih);
  var needsClip=state.frame.type==='rounded'||state.frame.type==='torn';
  if(needsClip){ctx.save();if(state.frame.type==='rounded'){var rr=Math.min(state.frame.width*state.zoom,iw/2,ih/2);rrect(ctx,ix,iy,iw,ih,rr);ctx.clip()}else{clipTornPath(ctx,ix,iy,iw,ih,42,state.zoom)}}
  ctx.save();ctx.translate(ix,iy);ctx.scale(state.zoom,state.zoom);
  ctx.drawImage(getFilteredImage(),0,0);
  if(state.drawLayer)ctx.drawImage(state.drawLayer,0,0);
  ctx.restore();
  if(needsClip)ctx.restore();
  state.overlays.forEach(function(ov,idx){
    ctx.save();
    if(ov.type==='text'){ctx.globalAlpha=ov.opacity;renderTextOnCtx(ctx,ov,ix,iy,state.zoom);ctx.globalAlpha=1;if(idx===state.selectedOverlay)drawOvSelection(ix+ov.x*state.zoom,iy+ov.y*state.zoom,ov.w*state.zoom,ov.h*state.zoom)}
    else{ctx.globalAlpha=ov.opacity;ctx.drawImage(ov.img,ix+ov.x*state.zoom,iy+ov.y*state.zoom,ov.w*state.zoom,ov.h*state.zoom);ctx.globalAlpha=1;if(idx===state.selectedOverlay)drawOvSelection(ix+ov.x*state.zoom,iy+ov.y*state.zoom,ov.w*state.zoom,ov.h*state.zoom)}
    ctx.restore();
  });
  drawWatermark(ix,iy,iw,ih);
  if(state.adjustments.vignette>0)drawVignette(ix,iy,iw,ih);
  drawFrameFg(ix,iy,iw,ih);
  if(state.isShaping&&state.shapeStart&&state.shapeEnd)drawShapePreview();
  if(state.tool==='crop'&&state.cropRect)drawCropOverlay();
  if(state.tool==='removewm'&&state.wmRemoveRect)drawWmRemoveOverlay();
  if(state.tool==='clonestamp'&&state.cloneReady){
    var sx=state.cloneSource.x*state.zoom+ix,sy=state.cloneSource.y*state.zoom+iy;
    ctx.save();ctx.strokeStyle=state.theme==='dark'?'#fff':'#000';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);
    var cs=state.cloneSize*state.zoom;ctx.strokeRect(sx-cs/2,sy-cs/2,cs,cs);ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(sx-8,sy);ctx.lineTo(sx+8,sy);ctx.moveTo(sx,sy-8);ctx.lineTo(sx,sy+8);ctx.stroke();ctx.restore();
  }
}

function renderTextOnCtx(c,ov,ix,iy,zoom){
  var x=ix+ov.x*zoom,y=iy+ov.y*zoom,fs=ov.fontSize*zoom,pad=6*zoom;
  c.font=(ov.bold?'bold ':'')+(ov.italic?'italic ':'')+fs+'px "'+ov.fontFamily+'"';
  c.textBaseline='top';var lines=ov.text.split('\n'),lh=fs*1.35,maxW=0;
  lines.forEach(function(l){maxW=Math.max(maxW,c.measureText(l).width)});
  if(ov.bgColor){c.fillStyle=ov.bgColor;rrect(c,x-pad,y-pad,maxW+pad*2,lines.length*lh+pad*2,3*zoom);c.fill()}
  c.fillStyle=ov.color;lines.forEach(function(l,i){c.fillText(l,x,y+i*lh)});
}

function drawOvSelection(sx,sy,sw,sh){
  var hs=9;ctx.strokeStyle=accentCol();ctx.lineWidth=2;ctx.setLineDash([6,4]);ctx.strokeRect(sx,sy,sw,sh);ctx.setLineDash([]);
  ctx.fillStyle=accentCol();
  [[0,0],[1,0],[0,1],[1,1]].forEach(function(ab){
    var hx=sx+ab[0]*sw,hy=sy+ab[1]*sh;ctx.beginPath();ctx.arc(hx,hy,hs/2,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=state.theme==='light'?'#faf8f5':'#0f1218';ctx.lineWidth=2;ctx.stroke();
  });
}

function accentCol(){return state.theme==='light'?'#9e6038':'#c4815a'}

function drawCheckerboard(x,y,w,h){
  var sz=10;ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
  var sr=Math.ceil(h/sz),sc2=Math.ceil(w/sz);
  var c1=getComputedStyle(document.documentElement).getPropertyValue('--c-ck1').trim();
  var c2=getComputedStyle(document.documentElement).getPropertyValue('--c-ck2').trim();
  for(var r=0;r<sr;r++)for(var ci=0;ci<sc2;ci++){ctx.fillStyle=(r+ci)%2===0?c1:c2;ctx.fillRect(x+ci*sz,y+r*sz,sz,sz)}
  ctx.restore();
}

function drawVignette(x,y,w,h){
  var a=state.adjustments.vignette/100,cx2=x+w/2,cy2=y+h/2,mr=Math.max(w,h)*.75;
  var g=ctx.createRadialGradient(cx2,cy2,mr*.25,cx2,cy2,mr);
  g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(a*.85).toFixed(2)+')');
  ctx.fillStyle=g;ctx.fillRect(x,y,w,h);
}

function drawWatermark(ix,iy,iw,ih){
  var wm=state.watermark;if(!wm.enabled)return;
  ctx.save();ctx.translate(ix,iy);ctx.scale(state.zoom,state.zoom);ctx.globalAlpha=wm.opacity;
  var imgW=state.image.naturalWidth,imgH=state.image.naturalHeight;
  if(wm.type==='text'){
    ctx.font=wm.size+'px "'+wm.font+'"';ctx.fillStyle=wm.color;ctx.textAlign='center';ctx.textBaseline='middle';
    if(wm.tiled){ctx.rotate(wm.rotation*Math.PI/180);var diag=Math.hypot(imgW,imgH),sp=wm.size*5;for(var yy=-diag;yy<diag*2;yy+=sp)for(var xx=-diag;xx<diag*2;xx+=sp)ctx.fillText(wm.text,xx,yy)}
    else ctx.fillText(wm.text,imgW/2,imgH/2);
  }else if(wm.type==='image'&&wm.image){
    var img=wm.image;var sc=Math.min(imgW*.25/img.naturalWidth,imgH*.25/img.naturalHeight);
    var ww=img.naturalWidth*sc,hh=img.naturalHeight*sc;
    if(wm.tiled){ctx.rotate(wm.rotation*Math.PI/180);var sp2=Math.max(ww,hh)*2.2,diag2=Math.hypot(imgW,imgH);for(var yy2=-diag2;yy2<diag2*2;yy2+=sp2)for(var xx2=-diag2;xx2<diag2*2;xx2+=sp2)ctx.drawImage(img,xx2,yy2,ww,hh)}
    else ctx.drawImage(img,(imgW-ww)/2,(imgH-hh)/2,ww,hh);
  }
  ctx.restore();
}

function drawWmRemoveOverlay(){
  var cr=state.wmRemoveRect,sx=cr.x*state.zoom+state.panX,sy=cr.y*state.zoom+state.panY,sw=cr.w*state.zoom,sh=cr.h*state.zoom;
  ctx.save();ctx.fillStyle='rgba(158,96,56,0.1)';ctx.fillRect(sx,sy,sw,sh);
  ctx.strokeStyle='rgba(158,96,56,0.6)';ctx.lineWidth=2;ctx.setLineDash([8,4]);ctx.strokeRect(sx,sy,sw,sh);ctx.setLineDash([]);
  var hs=7;ctx.fillStyle='#9e6038';[[sx,sy],[sx+sw,sy],[sx,sy+sh],[sx+sw,sy+sh]].forEach(function(p){ctx.fillRect(p[0]-hs/2,p[1]-hs/2,hs,hs)});
  ctx.fillStyle=state.theme==='light'?'#fff':'rgba(15,18,24,.9)';ctx.fillRect(sx,sy-18,110,16);
  ctx.fillStyle='#9e6038';ctx.font='bold 10px Space Grotesk';ctx.textAlign='left';ctx.textBaseline='bottom';ctx.fillText('WM Remove Area',sx+4,sy-5);
  ctx.restore();
}

function clipTornPath(c,x,y,w,h,seed,scale){
  var steps=30;c.beginPath();c.moveTo(x+tornOff(0,seed)*scale,y+tornOff(0,seed+50)*scale);
  for(var i=1;i<=steps;i++){var t=i/steps;c.lineTo(x+t*w+tornOff(t*20,seed)*scale,y+tornOff(t*25,seed+50)*scale)}
  for(var i=1;i<=steps;i++){var t=i/steps;c.lineTo(x+w+tornOff(t*25,seed+100)*scale,y+t*h+tornOff(t*30,seed+150)*scale)}
  for(var i=1;i<=steps;i++){var t=i/steps;c.lineTo(x+(1-t)*w+tornOff(t*20,seed+200)*scale,y+h+tornOff(t*25,seed+250)*scale)}
  for(var i=1;i<=steps;i++){var t=i/steps;c.lineTo(x+tornOff(t*25,seed+300)*scale,y+(1-t)*h+tornOff(t*30,seed+350)*scale)}
  c.closePath();c.clip();
}

function getFramePad(){
  var f=state.frame,w=f.width;
  switch(f.type){
    case'border':return{l:w,r:w,t:w,b:w};case'polaroid':return{l:w,r:w,t:w,b:w*3.2};
    case'shadow':return{l:w*1.5,r:w*1.5,t:w*1.5,b:w*1.5};case'vintage':return{l:w+6,r:w+6,t:w+6,b:w+6};
    case'film':return{l:0,r:0,t:w*1.6,b:w*1.6};case'double':return{l:w+6,r:w+6,t:w+6,b:w+6};
    case'gold':return{l:w+4,r:w+4,t:w+4,b:w+4};case'ornate':return{l:w+10,r:w+10,t:w+10,b:w+10};
    case'mat':return{l:w*2.2,r:w*2.2,t:w*2.2,b:w*2.2};case'torn':return{l:20,r:20,t:20,b:20};
    case'dotted':case'dashed':case'gradient':return{l:w+6,r:w+6,t:w+6,b:w+6};
    case'neon':return{l:w+8,r:w+8,t:w+8,b:w+8};case'wood':return{l:w+5,r:w+5,t:w+5,b:w+5};
    default:return{l:0,r:0,t:0,b:0};
  }
}

function drawFrameBg(x,y,iw,ih){
  var f=state.frame,fw=f.width*state.zoom;
  switch(f.type){
    case'polaroid':ctx.fillStyle=f.color;ctx.fillRect(x-fw,y-fw,iw+fw*2,ih+fw*4.2);break;
    case'shadow':ctx.save();ctx.filter='blur('+Math.max(1,fw*.6)+'px)';ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(x+fw*.2,y+fw*.25,iw,ih);ctx.filter='none';ctx.restore();break;
    case'vintage':ctx.fillStyle=f.color;ctx.fillRect(x-fw-6,y-fw-6,iw+(fw+6)*2,ih+(fw+6)*2);break;
    case'double':case'gold':case'ornate':case'mat':case'dotted':case'dashed':case'gradient':case'neon':case'wood':
      ctx.fillStyle=f.color;ctx.fillRect(x-fw*1.5,y-fw*1.5,iw+fw*3,ih+fw*3);break;
    case'torn':ctx.fillStyle=f.color||'#e8e0d6';ctx.fillRect(x-20*state.zoom,y-20*state.zoom,iw+40*state.zoom,ih+40*state.zoom);break;
  }
}

function drawFrameFg(x,y,iw,ih){
  var f=state.frame,fw=f.width*state.zoom;
  switch(f.type){
    case'border':ctx.strokeStyle=f.color;ctx.lineWidth=fw;ctx.strokeRect(x-fw/2,y-fw/2,iw+fw,ih+fw);break;
    case'rounded':var rr=Math.min(fw,iw/2,ih/2);ctx.strokeStyle=f.color;ctx.lineWidth=Math.max(2,fw*.15);rrect(ctx,x,y,iw,ih,rr);ctx.stroke();break;
    case'vintage':ctx.strokeStyle=f.innerColor;ctx.lineWidth=Math.max(2,fw*.4);ctx.strokeRect(x-fw/2,y-fw/2,iw+fw,ih+fw);ctx.strokeStyle=f.color;ctx.lineWidth=Math.max(1,fw*.15);ctx.strokeRect(x-fw-3,y-fw-3,iw+(fw+3)*2,ih+(fw+3)*2);break;
    case'film':var barH=fw*1.6,holeW=fw*.6,holeH=fw*.8,holeGap=fw*1.4;ctx.fillStyle='#0a0a0a';ctx.fillRect(x-fw*.6,y-barH,iw+fw*1.2,barH);ctx.fillRect(x-fw*.6,y+ih,iw+fw*1.2,barH);ctx.fillStyle='#2a2a2a';for(var hx=x+holeGap;hx<x+iw-holeGap;hx+=holeGap){ctx.fillRect(hx,y-barH+barH/2-holeH/2,holeW,holeH);ctx.fillRect(hx,y+ih+barH/2-holeH/2,holeW,holeH)}ctx.fillStyle='#0a0a0a';ctx.fillRect(x-fw*.6,y-barH,fw*.6,ih+barH*2);ctx.fillRect(x+iw,y-barH,fw*.6,ih+barH*2);break;
    case'double':ctx.strokeStyle=f.innerColor||f.color;ctx.lineWidth=Math.max(2,fw*.3);ctx.strokeRect(x-fw*.8,y-fw*.8,iw+fw*1.6,ih+fw*1.6);ctx.strokeStyle=f.color;ctx.lineWidth=Math.max(2,fw*.2);ctx.strokeRect(x-fw*.2,y-fw*.2,iw+fw*.4,ih+fw*.4);break;
    case'gold':var g=ctx.createLinearGradient(x-fw,y-fw,x+iw+fw,y+ih+fw);g.addColorStop(0,'#FFD700');g.addColorStop(.3,'#FFA500');g.addColorStop(.5,'#FFD700');g.addColorStop(.7,'#DAA520');g.addColorStop(1,'#FFD700');ctx.strokeStyle=g;ctx.lineWidth=Math.max(3,fw*.6);ctx.strokeRect(x-fw/2,y-fw/2,iw+fw,ih+fw);ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=1;ctx.strokeRect(x-fw*.15,y-fw*.15,iw+fw*.3,ih+fw*.3);break;
    case'ornate':ctx.strokeStyle=f.color;ctx.lineWidth=Math.max(2,fw*.2);ctx.strokeRect(x-fw*.5,y-fw*.5,iw+fw,ih+fw);var cs=fw*1.2;ctx.strokeStyle=f.innerColor||f.color;ctx.lineWidth=Math.max(1,fw*.15);[[x-fw*.5,y-fw*.5,1,1],[x+iw+fw*.5,y-fw*.5,-1,1],[x-fw*.5,y+ih+fw*.5,1,-1],[x+iw+fw*.5,y+ih+fw*.5,-1,-1]].forEach(function(c2){ctx.beginPath();ctx.moveTo(c2[0],c2[1]+c2[3]*cs);ctx.lineTo(c2[0],c2[1]);ctx.lineTo(c2[0]+c2[2]*cs,c2[1]);ctx.stroke();ctx.beginPath();ctx.arc(c2[0]+c2[2]*cs*.3,c2[1]+c2[3]*cs*.3,cs*.15,0,Math.PI*2);ctx.stroke()});break;
    case'mat':ctx.fillStyle=f.color;ctx.fillRect(x-fw*2,y-fw*2,iw+fw*4,ih+fw*4);ctx.strokeStyle=f.innerColor||'#888';ctx.lineWidth=1.5;ctx.strokeRect(x-fw*.3,y-fw*.3,iw+fw*.6,ih+fw*.6);ctx.strokeStyle=f.color;ctx.lineWidth=1;ctx.strokeRect(x-fw*2,y-fw*2,iw+fw*4,ih+fw*4);break;
    case'dotted':ctx.fillStyle=f.color;ctx.setLineDash([2,fw*.3]);ctx.strokeStyle=f.innerColor||f.color;ctx.lineWidth=Math.max(3,fw*.2);ctx.strokeRect(x-fw/2,y-fw/2,iw+fw,ih+fw);ctx.setLineDash([]);break;
    case'dashed':ctx.strokeStyle=f.innerColor||f.color;ctx.lineWidth=Math.max(3,fw*.25);ctx.setLineDash([fw*.5,fw*.3]);ctx.strokeRect(x-fw/2,y-fw/2,iw+fw,ih+fw);ctx.setLineDash([]);break;
    case'gradient':var g2=ctx.createLinearGradient(x,y-fw,x,y+ih+fw);g2.addColorStop(0,f.innerColor||f.color);g2.addColorStop(.5,f.color);g2.addColorStop(1,f.innerColor||f.color);ctx.strokeStyle=g2;ctx.lineWidth=Math.max(3,fw*.5);ctx.strokeRect(x-fw/2,y-fw/2,iw+fw,ih+fw);break;
    case'neon':for(var n=3;n>=0;n--){ctx.strokeStyle=f.color;ctx.lineWidth=Math.max(2,fw*.15)+n*3;ctx.globalAlpha=.15+n*.05;rrect(ctx,x-n*2,y-n*2,iw+n*4,ih+n*4,8);ctx.stroke()}ctx.globalAlpha=1;ctx.strokeStyle='#fff';ctx.lineWidth=1.5;rrect(ctx,x,y,iw,ih,4);ctx.stroke();break;
    case'wood':ctx.fillStyle=f.color;for(var ly=y-fw*1.5;ly<y+ih+fw*1.5;ly+=3){ctx.fillRect(x-fw*1.5,ly,iw+fw*3,1.5);ctx.fillStyle=ly%6<3?f.color:f.innerColor||f.color}ctx.strokeStyle='rgba(0,0,0,0.2)';ctx.lineWidth=1;ctx.strokeRect(x-fw*1.5,y-fw*1.5,iw+fw*3,ih+fw*3);break;
  }
}

function drawShapePreview(){
  var s=state.shapeStart,e=state.shapeEnd;ctx.save();ctx.translate(state.panX,state.panY);ctx.scale(state.zoom,state.zoom);
  ctx.strokeStyle=state.shapeColor;ctx.lineWidth=state.shapeSize;ctx.lineCap='round';ctx.lineJoin='round';
  if(state.tool==='rect'){var rx=Math.min(s.x,e.x),ry=Math.min(s.y,e.y),rw=Math.abs(e.x-s.x),rh=Math.abs(e.y-s.y);if(state.shapeFill){ctx.fillStyle=state.shapeColor+'55';ctx.fillRect(rx,ry,rw,rh)}ctx.strokeRect(rx,ry,rw,rh)}
  else if(state.tool==='circle'){var cx2=(s.x+e.x)/2,cy2=(s.y+e.y)/2,rx2=Math.max(1,Math.abs(e.x-s.x)/2),ry2=Math.max(1,Math.abs(e.y-s.y)/2);ctx.beginPath();ctx.ellipse(cx2,cy2,rx2,ry2,0,0,Math.PI*2);if(state.shapeFill){ctx.fillStyle=state.shapeColor+'55';ctx.fill()}ctx.stroke()}
  else if(state.tool==='line'){ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(e.x,e.y);ctx.stroke()}
  ctx.restore();
}

function drawCropOverlay(){
  var cr=state.cropRect,sx=cr.x*state.zoom+state.panX,sy=cr.y*state.zoom+state.panY,sw=cr.w*state.zoom,sh=cr.h*state.zoom;
  ctx.save();ctx.fillStyle='rgba(0,0,0,0.45)';ctx.beginPath();ctx.rect(0,0,displayCanvas.width,displayCanvas.height);ctx.rect(sx+sw,sy,-sw,sh);ctx.fill('evenodd');
  ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=.5;for(var i=1;i<=2;i++){ctx.beginPath();ctx.moveTo(sx+sw*i/3,sy);ctx.lineTo(sx+sw*i/3,sy+sh);ctx.stroke();ctx.beginPath();ctx.moveTo(sx,sy+sh*i/3);ctx.lineTo(sx+sw,sy+sh*i/3);ctx.stroke()}
  ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.setLineDash([]);ctx.strokeRect(sx,sy,sw,sh);
  var hs=6;ctx.fillStyle='#fff';[[sx,sy],[sx+sw,sy],[sx,sy+sh],[sx+sw,sy+sh]].forEach(function(p){ctx.fillRect(p[0]-hs/2,p[1]-hs/2,hs,hs)});
  ctx.restore();
}

function screenToImage(ex,ey){var r=displayCanvas.getBoundingClientRect();return{x:(ex-r.left-state.panX)/state.zoom,y:(ey-r.top-state.panY)/state.zoom}}
function hitTestOverlay(ix,iy){for(var i=state.overlays.length-1;i>=0;i--){var ov=state.overlays[i];if(ix>=ov.x&&ix<=ov.x+ov.w&&iy>=ov.y&&iy<=ov.y+ov.h)return i}return-1}
function hitTestHandle(ix,iy,ov){var hs=12/state.zoom;var corners=[{x:ov.x,y:ov.y},{x:ov.x+ov.w,y:ov.y},{x:ov.x,y:ov.y+ov.h},{x:ov.x+ov.w,y:ov.y+ov.h}];for(var i=0;i<4;i++){if(Math.abs(ix-corners[i].x)<=hs&&Math.abs(iy-corners[i].y)<=hs)return i}return-1}

function switchToTab(tabName){
  document.querySelectorAll('.panel-tab').forEach(function(t){t.classList.toggle('active',t.dataset.tab===tabName)});
  document.querySelectorAll('.tab-content').forEach(function(x){x.classList.add('hidden')});
  var tab=el('tab-'+tabName);if(tab)tab.classList.remove('hidden');
}

function buildSliders(){
  var c=el('sliders-container');
  ADJ_CONFIG.forEach(function(cfg){
    var d=document.createElement('div');
    d.innerHTML='<div class="flex justify-between items-center mb-0.5"><label class="text-[10px] text-muted">'+cfg.label+'</label><span class="text-[10px] text-accent font-semibold w-9 text-right" id="val-'+cfg.key+'">'+cfg.def+cfg.unit+'</span></div><input type="range" min="'+cfg.min+'" max="'+cfg.max+'" value="'+cfg.def+'" step="'+(cfg.step||1)+'" id="slider-'+cfg.key+'">';
    c.appendChild(d);var s=d.querySelector('input');updateRangeFill(s);
    s.addEventListener('input',function(){var v=parseFloat(s.value);state.adjustments[cfg.key]=v;setTxt('val-'+cfg.key,v+cfg.unit);updateRangeFill(s);invalidateCache();state.activeFilter=-1;updateFilterUI();render()});
    s.addEventListener('change',function(){pushHistory()});
  });
}

function buildPixelSliders(){
  var c=el('pixel-sliders-container');
  PIXEL_ADJ_CONFIG.forEach(function(cfg){
    var d=document.createElement('div');
    d.innerHTML='<div class="flex justify-between items-center mb-0.5"><label class="text-[10px] text-muted">'+cfg.label+'</label><span class="text-[10px] text-accent font-semibold w-9 text-right" id="pval-'+cfg.key+'">'+cfg.def+cfg.unit+'</span></div><input type="range" min="'+cfg.min+'" max="'+cfg.max+'" value="'+cfg.def+'" step="1" id="pslider-'+cfg.key+'">';
    c.appendChild(d);var s=d.querySelector('input');updateRangeFill(s);
    s.addEventListener('input',function(){var v=parseFloat(s.value);state.pixelAdjustments[cfg.key]=v;setTxt('pval-'+cfg.key,v+cfg.unit);updateRangeFill(s);invalidatePixelCache();render()});
    s.addEventListener('change',function(){pushHistory()});
  });
}

function updateSliders(){ADJ_CONFIG.forEach(function(cfg){var s=el('slider-'+cfg.key);if(s){s.value=state.adjustments[cfg.key];setTxt('val-'+cfg.key,state.adjustments[cfg.key]+cfg.unit);updateRangeFill(s)}})}
function updatePixelSliders(){PIXEL_ADJ_CONFIG.forEach(function(cfg){var s=el('pslider-'+cfg.key);if(s){s.value=state.pixelAdjustments[cfg.key];setTxt('pval-'+cfg.key,state.pixelAdjustments[cfg.key]+cfg.unit);updateRangeFill(s)}})}

function resetAdjustments(){
  state.adjustments=JSON.parse(JSON.stringify(DEFAULT_ADJ));state.pixelAdjustments=JSON.parse(JSON.stringify(DEFAULT_PIXEL_ADJ));
  state.activeFilter=0;invalidateCache();updateSliders();updatePixelSliders();updateFilterUI();render();pushHistory();showToast('Reset all');
}

function buildFilters(){
  var g=el('filters-grid');
  FILTERS.forEach(function(f,i){
    var c=document.createElement('div');c.className='filter-card'+(i===0?' active':'');
    c.innerHTML='<canvas width="80" height="80" id="fthumb-'+i+'"></canvas><div class="text-[9px] text-muted text-center py-0.5 truncate font-medium">'+f.name+'</div>';
    c.addEventListener('click',function(){applyFilter(i)});g.appendChild(c);
  });
}

function generateFilterThumbs(){
  if(!state.image)return;
  FILTERS.forEach(function(f,i){var c=el('fthumb-'+i);if(!c)return;var cx=c.getContext('2d');cx.filter=buildFilterStr(f.v);cx.drawImage(state.image,0,0,80,80)});
}

function applyFilter(i){
  state.adjustments=JSON.parse(JSON.stringify(FILTERS[i].v));state.pixelAdjustments=JSON.parse(JSON.stringify(DEFAULT_PIXEL_ADJ));
  state.activeFilter=i;invalidateCache();updateSliders();updatePixelSliders();updateFilterUI();render();pushHistory();
}

function updateFilterUI(){document.querySelectorAll('.filter-card').forEach(function(c,i){c.classList.toggle('active',i===state.activeFilter)})}

function buildFrameGrid(){
  var g=el('frames-grid');
  FRAME_TYPES.forEach(function(ft,i){
    var c=document.createElement('div');c.className='frame-card'+(i===0?' active':'');
    c.innerHTML='<canvas width="80" height="80" id="fprev-'+i+'"></canvas><div class="text-[9px] text-muted text-center py-0.5 truncate font-medium">'+ft.name+'</div>';
    c.addEventListener('click',function(){selectFrame(i)});g.appendChild(c);
  });
  drawFramePreviews();
}

function drawFramePreviews(){
  FRAME_TYPES.forEach(function(ft,i){
    var cv=el('fprev-'+i);if(!cv)return;var cx=cv.getContext('2d'),w=80,h=80;cx.clearRect(0,0,w,h);
    var ix2=18,iy2=14,iw=w-36,ih=h-28;
    switch(ft.key){
      case'none':cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'border':cx.fillStyle='#9e6038';cx.fillRect(ix2-5,iy2-5,iw+10,ih+10);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'polaroid':cx.fillStyle='#f5f5f5';cx.fillRect(ix2-6,iy2-6,iw+12,ih+22);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'rounded':cx.fillStyle='#bbb';rrect(cx,ix2,iy2,iw,ih,10);cx.fill();cx.strokeStyle='#888';cx.lineWidth=2;rrect(cx,ix2,iy2,iw,ih,10);cx.stroke();break;
      case'shadow':cx.save();cx.filter='blur(4px)';cx.fillStyle='rgba(0,0,0,0.3)';cx.fillRect(ix2+3,iy2+4,iw,ih);cx.filter='none';cx.restore();cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'vintage':cx.fillStyle='#9e6038';cx.fillRect(ix2-8,iy2-8,iw+16,ih+16);cx.fillStyle='#bbb';cx.fillRect(ix2-2,iy2-2,iw+4,ih+4);cx.fillStyle='#999';cx.fillRect(ix2,iy2,iw,ih);break;
      case'film':cx.fillStyle='#0a0a0a';cx.fillRect(ix2-4,iy2-8,iw+8,ih+16);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);cx.fillStyle='#222';for(var hx=ix2+6;hx<ix2+iw-4;hx+=8){cx.fillRect(hx,iy2-6,3,5);cx.fillRect(hx,iy2+ih+1,3,5)}break;
      case'double':cx.fillStyle='#9e6038';cx.fillRect(ix2-8,iy2-8,iw+16,ih+16);cx.strokeStyle='#c4815a';cx.lineWidth=1;cx.strokeRect(ix2-3,iy2-3,iw+6,ih+6);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'gold':var g=cx.createLinearGradient(ix2-6,iy2-6,ix2+iw+6,iy2+ih+6);g.addColorStop(0,'#FFD700');g.addColorStop(.5,'#FFA500');g.addColorStop(1,'#FFD700');cx.fillStyle=g;cx.fillRect(ix2-6,iy2-6,iw+12,ih+12);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'ornate':cx.fillStyle='#9e6038';cx.fillRect(ix2-10,iy2-10,iw+20,ih+20);cx.strokeStyle='#c4815a';cx.lineWidth=1;cx.strokeRect(ix2-5,iy2-5,iw+10,ih+10);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'mat':cx.fillStyle='#eee';cx.fillRect(ix2-14,iy2-14,iw+28,ih+28);cx.strokeStyle='#aaa';cx.lineWidth=1;cx.strokeRect(ix2-3,iy2-3,iw+6,ih+6);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'torn':cx.fillStyle='#e8e0d6';cx.fillRect(ix2-12,iy2-12,iw+24,ih+24);cx.fillStyle='#bbb';cx.beginPath();cx.moveTo(ix2+2,iy2);for(var t=0;t<=1;t+=.05){cx.lineTo(ix2+t*iw+tornOff(t*20,42)*.5,iy2+tornOff(t*25,92)*.5)}for(var t=0;t<=1;t+=.05){cx.lineTo(ix2+iw+tornOff(t*25,142)*.5,iy2+t*ih+tornOff(t*30,192)*.5)}cx.lineTo(ix2+2,iy2+ih);cx.closePath();cx.fill();break;
      case'dotted':cx.fillStyle='#9e6038';cx.setLineDash([2,4]);cx.strokeStyle='#c4815a';cx.lineWidth=3;cx.strokeRect(ix2-6,iy2-6,iw+12,ih+12);cx.setLineDash([]);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'dashed':cx.strokeStyle='#9e6038';cx.lineWidth=3;cx.setLineDash([5,3]);cx.strokeRect(ix2-6,iy2-6,iw+12,ih+12);cx.setLineDash([]);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'gradient':var g2=cx.createLinearGradient(ix2,iy2-6,ix2,iy2+ih+6);g2.addColorStop(0,'#9e6038');g2.addColorStop(.5,'#c4815a');g2.addColorStop(1,'#9e6038');cx.strokeStyle=g2;cx.lineWidth=5;cx.strokeRect(ix2-5,iy2-5,iw+10,ih+10);cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'neon':cx.shadowColor='#c4815a';cx.shadowBlur=8;cx.strokeStyle='#c4815a';cx.lineWidth=3;rrect(cx,ix2-4,iy2-4,iw+8,ih+8,4);cx.stroke();cx.shadowBlur=0;cx.strokeStyle='#fff';cx.lineWidth=1;rrect(cx,ix2,iy2,iw,ih,2);cx.stroke();cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
      case'wood':cx.fillStyle='#8B4513';cx.fillRect(ix2-6,iy2-6,iw+12,ih+12);for(var ly=iy2-6;ly<iy2+ih+6;ly+=3){cx.fillStyle=ly%6<3?'#8B4513':'#A0522D';cx.fillRect(ix2-6,ly,iw+12,1.5)}cx.fillStyle='#bbb';cx.fillRect(ix2,iy2,iw,ih);break;
    }
  });
}

function selectFrame(i){state.frame.type=FRAME_TYPES[i].key;updateFrameUI();render()}
function updateFrameUI(){document.querySelectorAll('.frame-card').forEach(function(c,i){c.classList.toggle('active',FRAME_TYPES[i].key===state.frame.type)});buildFrameSettings()}

function buildFrameSettings(){
  var c=el('frame-settings');
  if(state.frame.type==='none'){c.innerHTML='';return}
  var h='<div class="space-y-2 border-t border-border pt-2"><span class="section-title">Frame Settings</span>';
  if(state.frame.type!=='film'&&state.frame.type!=='shadow'&&state.frame.type!=='torn')
    h+='<div class="flex items-center gap-2"><label class="text-[10px] text-muted">Color</label><input type="color" value="'+state.frame.color+'" oninput="state.frame.color=this.value;drawFramePreviews();render()"></div>';
  if(['double','ornate','mat','dotted','dashed','gradient','neon','wood'].indexOf(state.frame.type)>=0)
    h+='<div class="flex items-center gap-2"><label class="text-[10px] text-muted">Inner</label><input type="color" value="'+(state.frame.innerColor||'#c4815a')+'" oninput="state.frame.innerColor=this.value;drawFramePreviews();render()"></div>';
  h+='<div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Width</label><span class="text-[10px] text-accent" id="fs-width-val">'+state.frame.width+'</span></div><input type="range" min="5" max="80" value="'+state.frame.width+'" id="fs-width" oninput="state.frame.width=+this.value;setTxt(\'fs-width-val\',this.value);updateRangeFill(this);drawFramePreviews();render()"></div>';
  if(state.frame.type==='rounded')
    h+='<div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Radius</label><span class="text-[10px] text-accent" id="fs-rad-val">'+state.frame.width+'</span></div><input type="range" min="5" max="200" value="'+state.frame.width+'" id="fs-rad" oninput="state.frame.width=+this.value;setTxt(\'fs-rad-val\',this.value);updateRangeFill(this);render()"></div>';
  h+='<button class="sm-btn danger-sm w-full text-center mt-1" onclick="state.frame={type:\'none\',color:\'#ffffff\',width:30,innerColor:\'#9e6038\'};updateFrameUI();drawFramePreviews();render()">Remove Frame</button></div>';
  c.innerHTML=h;c.querySelectorAll('input[type="range"]').forEach(updateRangeFill);
}

function buildToolSettings(){
  var c=el('tool-settings');
  var pal='';COLOR_PALETTE.forEach(function(cl){pal+='<div class="color-swatch" style="background:'+cl+'" onclick="applyPaletteColor(\''+cl+'\')" title="'+cl+'"></div>'});
  var mPal='';MARKER_COLORS.forEach(function(cl,i){mPal+='<div class="marker-color-btn'+(i===0?' active':'')+'" style="background:'+cl+'" onclick="setMarkerColor(\''+cl+'\',this)" title="'+cl+'"></div>'});
  var fontOpts=SYSTEM_FONTS.map(function(f){return'<option value="'+f+'">'+f+'</option>'}).join('');
  c.innerHTML='<div id="ts-brush" class="hidden space-y-2"><span class="section-title">Brush</span><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Size</label><span class="text-[10px] text-accent" id="ts-bs-val">8</span></div><input type="range" min="1" max="100" value="8" id="ts-bs" oninput="state.brushSize=+this.value;setTxt(\'ts-bs-val\',this.value);updateRangeFill(this)"></div><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Opacity</label><span class="text-[10px] text-accent" id="ts-bo-val">100%</span></div><input type="range" min="1" max="100" value="100" id="ts-bo" oninput="state.brushOpacity=this.value/100;setTxt(\'ts-bo-val\',this.value+\'%\');updateRangeFill(this)"></div><div class="flex items-center gap-2"><label class="text-[10px] text-muted">Color</label><input type="color" value="#000000" id="ts-bc" oninput="state.brushColor=this.value"></div><div class="flex flex-wrap gap-1">'+pal+'</div></div>'
    +'<div id="ts-marker" class="hidden space-y-2"><span class="section-title"><i class="fa-solid fa-highlighter text-accent mr-1"></i>Marker</span><p class="text-[10px] text-muted"><i class="fa-solid fa-circle-info text-accent mr-1"></i>Semi-transparent highlight</p><div><label class="text-[10px] text-muted block mb-1">Color</label><div class="flex flex-wrap gap-1.5">'+mPal+'</div></div><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Size</label><span class="text-[10px] text-accent" id="ts-ms-val">40</span></div><input type="range" min="10" max="150" value="40" id="ts-ms" oninput="state.markerSize=+this.value;setTxt(\'ts-ms-val\',this.value);updateRangeFill(this)"></div><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Opacity</label><span class="text-[10px] text-accent" id="ts-mo-val">35%</span></div><input type="range" min="5" max="80" value="35" id="ts-mo" oninput="state.markerOpacity=this.value/100;setTxt(\'ts-mo-val\',this.value+\'%\');updateRangeFill(this)"></div></div>'
    +'<div id="ts-eraser" class="hidden space-y-2"><span class="section-title">Eraser</span><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Size</label><span class="text-[10px] text-accent" id="ts-es-val">16</span></div><input type="range" min="1" max="100" value="16" id="ts-es" oninput="state.brushSize=+this.value;setTxt(\'ts-es-val\',this.value);updateRangeFill(this)"></div></div>'
    +'<div id="ts-clonestamp" class="hidden space-y-2"><span class="section-title">Clone Stamp</span><p class="text-[10px] text-muted"><i class="fa-solid fa-circle-info text-accent mr-1"></i><b>Alt+Click</b> to set source, then paint.</p><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Size</label><span class="text-[10px] text-accent" id="ts-cs-val">20</span></div><input type="range" min="2" max="80" value="20" id="ts-cs" oninput="state.cloneSize=+this.value;setTxt(\'ts-cs-val\',this.value);updateRangeFill(this);render()"></div><div id="cs-status" class="text-[10px] text-muted text-center py-1">No source set</div></div>'
    +'<div id="ts-text" class="hidden space-y-2"><span class="section-title"><i class="fa-solid fa-font text-accent mr-1"></i>Text Tool</span><div><label class="text-[10px] text-muted block mb-0.5">Content</label><textarea id="ts-tc" rows="2" placeholder="Type your text..." oninput="state.textContent=this.value">'+state.textContent+'</textarea></div><div><label class="text-[10px] text-muted block mb-0.5">System Font</label><select class="w-full" id="ts-tfont" onchange="state.fontFamily=this.value">'+fontOpts+'</select></div><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Size</label><span class="text-[10px] text-accent" id="ts-tsz-val">'+state.fontSize+'</span></div><input type="range" min="8" max="300" value="'+state.fontSize+'" id="ts-tsz" oninput="state.fontSize=+this.value;setTxt(\'ts-tsz-val\',this.value);updateRangeFill(this)"></div><div class="flex gap-1.5"><button class="sm-btn '+(state.textBold?'toggled':'secondary')+' flex-1" id="ts-tbold" onclick="state.textBold=!state.textBold;this.className=\'sm-btn \'+(state.textBold?\'toggled\':\'secondary\')+\' flex-1\'"><b>B</b> Bold</button><button class="sm-btn '+(state.textItalic?'toggled':'secondary')+' flex-1" id="ts-titalic" onclick="state.textItalic=!state.textItalic;this.className=\'sm-btn \'+(state.textItalic?\'toggled\':\'secondary\')+\' flex-1\'"><i>I</i> Italic</button></div><div class="flex items-center gap-2 mt-1"><label class="text-[10px] text-muted">Text Color</label><input type="color" value="'+state.textColor+'" id="ts-tclr" oninput="state.textColor=this.value"></div><div class="flex items-center gap-2 mt-1"><label class="text-[10px] text-muted">BG Color</label><input type="color" value="'+(state.textBgColor||'#ffffff')+'" id="ts-tbg" oninput="state.textBgColor=this.value"><button class="sm-btn secondary" style="height:20px;font-size:8px;padding:0 6px" onclick="state.textBgColor=\'\';el(\'ts-tbg\').value=\'#ffffff\'">No BG</button></div><div class="flex flex-wrap gap-1 mt-1">'+pal+'</div><p class="text-[9px] text-muted/60 mt-1.5 p-1.5 rounded-md bg-surface/50 border border-border"><i class="fa-solid fa-lightbulb text-accent mr-1"></i>Click canvas to place. Use Move (V) to drag, corners to resize, double-click to edit.</p></div>'
    +'<div id="ts-shape" class="hidden space-y-2"><span class="section-title">Shape</span><div class="flex items-center gap-2"><label class="text-[10px] text-muted">Color</label><input type="color" value="#9e6038" id="ts-sc" oninput="state.shapeColor=this.value"></div><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Stroke</label><span class="text-[10px] text-accent" id="ts-ssw-val">3</span></div><input type="range" min="1" max="30" value="3" id="ts-ssw" oninput="state.shapeSize=+this.value;setTxt(\'ts-ssw-val\',this.value);updateRangeFill(this)"></div><label class="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" id="ts-sf" onchange="state.shapeFill=this.checked"><span class="text-[10px] text-muted">Fill</span></label><div class="flex flex-wrap gap-1">'+pal+'</div></div>'
    +'<div id="ts-crop" class="hidden space-y-2"><span class="section-title">Crop</span><p class="text-[10px] text-muted/50">Drag to select area.</p><div class="flex gap-1.5"><button class="sm-btn primary flex-1" onclick="applyCrop()" id="btn-crop-apply" disabled>Apply</button><button class="sm-btn secondary flex-1" onclick="cancelCrop()">Cancel</button></div></div>'
    +'<div id="ts-eyedropper" class="hidden space-y-2"><span class="section-title">Eyedropper</span><p class="text-[10px] text-muted/50">Click to pick color from canvas.</p><div class="flex items-center gap-2"><label class="text-[10px] text-muted">Picked:</label><div id="ed-swatch" class="w-7 h-7 rounded border border-border flex-shrink-0" style="background:#000"></div><span id="ed-hex" class="text-[10px] text-accent font-mono font-semibold flex-1">#000000</span><button class="copy-btn" id="ed-copy" onclick="copyColor()" title="Copy hex"><i class="fa-solid fa-copy"></i></button></div></div>'
    +'<div id="ts-removebg" class="hidden space-y-2"><span class="section-title">BG Removal</span><p class="text-[10px] text-muted/50">Click on background area to remove.</p><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Tolerance</label><span class="text-[10px] text-accent" id="ts-bgt-val">32</span></div><input type="range" min="1" max="128" value="32" id="ts-bgt" oninput="state.bgTolerance=+this.value;setTxt(\'ts-bgt-val\',this.value);updateRangeFill(this)"></div></div>'
    +'<div id="ts-removewm" class="hidden space-y-2"><span class="section-title"><i class="fa-solid fa-broom text-accent mr-1"></i>WM Remove</span><div class="p-2 rounded-lg bg-surface/50 border border-border space-y-1.5"><p class="text-[10px] text-fg font-medium">How to use:</p><ol class="text-[9px] text-muted space-y-0.5 list-decimal list-inside"><li>Drag rectangle over watermark</li><li>Adjust feather &amp; smoothness</li><li>Click <b>Remove</b></li></ol></div><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Feather</label><span class="text-[10px] text-accent" id="ts-wmrf-val">5</span></div><input type="range" min="0" max="30" value="5" id="ts-wmrf" oninput="state.wmRemoveFeather=+this.value;setTxt(\'ts-wmrf-val\',this.value);updateRangeFill(this)"></div><div><div class="flex justify-between mb-0.5"><label class="text-[10px] text-muted">Smoothness</label><span class="text-[10px] text-accent" id="ts-wmrp-val">8</span></div><input type="range" min="2" max="25" value="8" id="ts-wmrp" oninput="state.wmRemovePasses=+this.value;setTxt(\'ts-wmrp-val\',this.value);updateRangeFill(this)"></div><div class="flex gap-1.5"><button class="sm-btn primary flex-1" onclick="applyWatermarkRemoval()" id="btn-wmr-apply" disabled><i class="fa-solid fa-broom"></i> Remove</button><button class="sm-btn secondary flex-1" onclick="cancelWmRemove()">Cancel</button></div></div>';
  c.querySelectorAll('input[type="range"]').forEach(updateRangeFill);
}

function copyColor(){
  var hex=el('ed-hex').textContent;
  navigator.clipboard.writeText(hex).then(function(){
    var btn=el('ed-copy');btn.classList.add('copied');btn.innerHTML='<i class="fa-solid fa-check"></i>';
    showToast('Copied: '+hex,'success');
    setTimeout(function(){btn.classList.remove('copied');btn.innerHTML='<i class="fa-solid fa-copy"></i>'},1500);
  }).catch(function(){showToast('Copy failed','error')});
}

function setMarkerColor(cl,btn){state.markerColor=cl;document.querySelectorAll('.marker-color-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active')}

function applyPaletteColor(cl){
  if(state.tool==='brush'){state.brushColor=cl;var bc=el('ts-bc');if(bc)bc.value=cl}
  else if(state.tool==='text'){state.textColor=cl;var tc=el('ts-tclr');if(tc)tc.value=cl}
  else if(state.tool==='rect'||state.tool==='circle'||state.tool==='line'){state.shapeColor=cl;var sc=el('ts-sc');if(sc)sc.value=cl}
  else state.brushColor=cl;showToast(cl,'info');
}

function bindPanelTabs(){document.querySelectorAll('.panel-tab').forEach(function(t){t.addEventListener('click',function(){switchToTab(t.dataset.tab)})})}
function bindToolButtons(){document.querySelectorAll('.tool-btn').forEach(function(b){b.addEventListener('click',function(){if(!state.image)return;setTool(b.dataset.tool)})})}

function setTool(tool){
  state.tool=tool;if(tool!=='crop')state.cropRect=null;if(tool!=='removewm')state.wmRemoveRect=null;
  state.isDrawing=false;state.isPanning=false;state.isCropping=false;state.isShaping=false;
  state.isMovingOverlay=false;state.isResizingOverlay=false;state.isWmRemoving=false;
  document.querySelectorAll('.tool-btn').forEach(function(b){b.classList.toggle('active',b.dataset.tool===tool)});
  displayCanvas.style.cursor=getCursor(tool);showToolSettings(tool);switchToTab('tools');
  if(tool==='clonestamp'){var st=el('cs-status');if(st)st.textContent=state.cloneReady?'Source set \u2014 Alt+Click to change':'No source set \u2014 Alt+Click to set'}
  render();
}

function getCursor(t){var m={select:'grab',crop:'crosshair',brush:'crosshair',marker:'crosshair',eraser:'crosshair',clonestamp:'crosshair',text:'text',rect:'crosshair',circle:'crosshair',line:'crosshair',eyedropper:'crosshair',removebg:'crosshair',removewm:'crosshair'};return m[t]||'default'}

function showToolSettings(tool){
  var map={brush:'ts-brush',marker:'ts-marker',eraser:'ts-eraser',clonestamp:'ts-clonestamp',text:'ts-text',rect:'ts-shape',circle:'ts-shape',line:'ts-shape',crop:'ts-crop',eyedropper:'ts-eyedropper',removebg:'ts-removebg',removewm:'ts-removewm'};
  document.querySelectorAll('#tool-settings > div').forEach(function(d){d.classList.add('hidden')});
  var id=map[tool];if(id){var e=el(id);if(e)e.classList.remove('hidden')}
}

function bindCanvasEvents(){
  displayCanvas.addEventListener('mousedown',onDown);
  displayCanvas.addEventListener('mousemove',onMove);
  displayCanvas.addEventListener('mouseup',onUp);
  displayCanvas.addEventListener('mouseleave',onUp);
  displayCanvas.addEventListener('wheel',onWheel,{passive:false});
  displayCanvas.addEventListener('dblclick',onDblClick);
  displayCanvas.addEventListener('touchstart',function(e){e.preventDefault();onDown({clientX:e.touches[0].clientX,clientY:e.touches[0].clientY,button:0,altKey:false})},{passive:false});
  displayCanvas.addEventListener('touchmove',function(e){e.preventDefault();onMove({clientX:e.touches[0].clientX,clientY:e.touches[0].clientY})},{passive:false});
  displayCanvas.addEventListener('touchend',function(e){e.preventDefault();onUp({})},{passive:false});
}

function onDblClick(e){
  if(!state.image)return;var pt=screenToImage(e.clientX,e.clientY);
  if(state.selectedOverlay>=0){var ov=state.overlays[state.selectedOverlay];if(ov&&ov.type==='text'&&hitTestOverlay(pt.x,pt.y)===state.selectedOverlay){startInlineTextEdit(state.selectedOverlay);return}}
}

function onDown(e){
  if(!state.image)return;if(activeTextEdit)return;
  var pt=screenToImage(e.clientX,e.clientY);
  if(spaceHeld){startPan(e);return}
  if(state.tool==='select'){
    if(state.selectedOverlay>=0){var ov=state.overlays[state.selectedOverlay];var handle=hitTestHandle(pt.x,pt.y,ov);
      if(handle>=0){state.isResizingOverlay=true;state.overlayResizeHandle=handle;state.resizeStartOv={x:ov.x,y:ov.y,w:ov.w,h:ov.h};if(ov.type!=='text')state.resizeStartOv.origW=ov.origW,state.resizeStartOv.origH=ov.origH;state.resizeStartPt={x:pt.x,y:pt.y};displayCanvas.style.cursor=['nw-resize','ne-resize','sw-resize','se-resize'][handle];return}}
    var ovIdx=hitTestOverlay(pt.x,pt.y);
    if(ovIdx>=0){state.selectedOverlay=ovIdx;state.isMovingOverlay=true;state.overlayDragOff={x:pt.x-state.overlays[ovIdx].x,y:pt.y-state.overlays[ovIdx].y};updateOverlaysList();render();displayCanvas.style.cursor='move';return}
    state.selectedOverlay=-1;updateOverlaysList();startPan(e);return;
  }
  if(state.tool==='crop'){state.isCropping=true;state.cropRect={x:pt.x,y:pt.y,w:0,h:0};render();return}
  if(state.tool==='removewm'){state.isWmRemoving=true;state.wmRemoveRect={x:pt.x,y:pt.y,w:0,h:0};render();return}
  if(state.tool==='brush'||state.tool==='eraser'){
    state.isDrawing=true;var dl=state.drawLayer.getContext('2d');dl.lineCap='round';dl.lineJoin='round';dl.lineWidth=state.brushSize;
    if(state.tool==='eraser'){dl.globalCompositeOperation='destination-out';dl.strokeStyle='rgba(0,0,0,1)';dl.globalAlpha=1}
    else{dl.globalCompositeOperation='source-over';dl.strokeStyle=state.brushColor;dl.globalAlpha=state.brushOpacity}
    state.lastX=pt.x;state.lastY=pt.y;dl.beginPath();dl.moveTo(pt.x,pt.y);dl.lineTo(pt.x+.1,pt.y+.1);dl.stroke();render();return;
  }
  if(state.tool==='marker'){
    state.isDrawing=true;var dl2=state.drawLayer.getContext('2d');dl2.globalCompositeOperation='source-over';dl2.globalAlpha=state.markerOpacity;dl2.lineCap='square';dl2.lineJoin='miter';dl2.lineWidth=state.markerSize;dl2.strokeStyle=state.markerColor;
    state.lastX=pt.x;state.lastY=pt.y;dl2.beginPath();dl2.moveTo(pt.x,pt.y);dl2.lineTo(pt.x+.1,pt.y+.1);dl2.stroke();render();return;
  }
  if(state.tool==='clonestamp'){
    if(e.altKey){state.cloneSource={x:pt.x,y:pt.y};state.cloneReady=true;var st=el('cs-status');if(st)st.textContent='Source set \u2014 paint to clone';render();showToast('Clone source set','info');return}
    if(!state.cloneReady){showToast('Alt+Click to set source first','error');return}
    state.isDrawing=true;state.cloneOffset={x:pt.x-state.cloneSource.x,y:pt.y-state.cloneSource.y};state.lastX=pt.x;state.lastY=pt.y;cloneStampAt(pt.x,pt.y);render();return;
  }
  if(state.tool==='text'){if(!state.textContent.trim()){showToast('Enter text in Tools panel','error');return}createTextOverlay(pt.x,pt.y);return}
  if(state.tool==='rect'||state.tool==='circle'||state.tool==='line'){state.isShaping=true;state.shapeStart={x:pt.x,y:pt.y};state.shapeEnd={x:pt.x,y:pt.y};return}
  if(state.tool==='eyedropper'){pickColor(pt.x,pt.y);return}
  if(state.tool==='removebg'){removeBackground(pt.x,pt.y);return}
}

function startPan(e){state.isPanning=true;state.panStartX=e.clientX;state.panStartY=e.clientY;state.panStartPanX=state.panX;state.panStartPanY=state.panY;displayCanvas.style.cursor='grabbing'}

function onMove(e){
  if(!state.image)return;var pt=screenToImage(e.clientX,e.clientY);
  if(state.isResizingOverlay){
    var ov=state.overlays[state.selectedOverlay];if(!ov)return;
    var start=state.resizeStartOv,dx=pt.x-state.resizeStartPt.x,dy=pt.y-state.resizeStartPt.y,handle=state.overlayResizeHandle;
    if(ov.type==='text'){var aspect=start.w/Math.max(1,start.h);
      if(handle===3){var nw=Math.max(30,start.w+dx);ov.w=nw;ov.h=nw/aspect;ov.fontSize=ov.h/(1.35*ov.text.split('\n').length)}
      else if(handle===0){var nw=Math.max(30,start.w-dx);ov.w=nw;ov.h=nw/aspect;ov.fontSize=ov.h/(1.35*ov.text.split('\n').length);ov.x=start.x+start.w-nw;ov.y=start.y+start.h-ov.h}
      else if(handle===1){var nw=Math.max(30,start.w+dx);ov.w=nw;ov.h=nw/aspect;ov.fontSize=ov.h/(1.35*ov.text.split('\n').length)}
      else if(handle===2){var nw=Math.max(30,start.w-dx);ov.w=nw;ov.h=nw/aspect;ov.fontSize=ov.h/(1.35*ov.text.split('\n').length);ov.x=start.x+start.w-nw}
    }else{var aspect2=start.origW/start.origH;
      if(handle===3){var nw2=Math.max(10,start.w+dx);ov.w=nw2;ov.h=nw2/aspect2}
      else if(handle===0){var nw2=Math.max(10,start.w-dx);ov.h=nw2/aspect2;ov.x=start.x+start.w-nw2;ov.y=start.y+start.h-ov.h;ov.w=nw2}
      else if(handle===1){var nw2=Math.max(10,start.w+dx);ov.h=nw2/aspect2;ov.y=start.y+start.h-ov.h;ov.w=nw2}
      else if(handle===2){var nw2=Math.max(10,start.w-dx);ov.h=nw2/aspect2;ov.x=start.x+start.w-nw2;ov.w=nw2}
      ov.scale=ov.w/ov.origW;
    }
    render();updateOverlaysList();return;
  }
  if(state.isMovingOverlay){var ov=state.overlays[state.selectedOverlay];if(ov){ov.x=pt.x-state.overlayDragOff.x;ov.y=pt.y-state.overlayDragOff.y;render()}return}
  if(state.isPanning){state.panX=state.panStartPanX+(e.clientX-state.panStartX);state.panY=state.panStartPanY+(e.clientY-state.panStartY);render();return}
  if(state.isCropping){var cr=state.cropRect;cr.w=pt.x-cr.x;cr.h=pt.y-cr.y;render();var b=el('btn-crop-apply');if(b)b.disabled=Math.abs(cr.w)<5||Math.abs(cr.h)<5;return}
  if(state.isWmRemoving){var cr2=state.wmRemoveRect;cr2.w=pt.x-cr2.x;cr2.h=pt.y-cr2.y;render();var b2=el('btn-wmr-apply');if(b2)b2.disabled=Math.abs(cr2.w)<8||Math.abs(cr2.h)<8;return}
  if(state.isDrawing&&(state.tool==='brush'||state.tool==='eraser')){var dl=state.drawLayer.getContext('2d');dl.beginPath();dl.moveTo(state.lastX,state.lastY);dl.lineTo(pt.x,pt.y);dl.stroke();state.lastX=pt.x;state.lastY=pt.y;render();return}
  if(state.isDrawing&&state.tool==='marker'){var dl2=state.drawLayer.getContext('2d');dl2.beginPath();dl2.moveTo(state.lastX,state.lastY);dl2.lineTo(pt.x,pt.y);dl2.stroke();state.lastX=pt.x;state.lastY=pt.y;render();return}
  if(state.isDrawing&&state.tool==='clonestamp'){cloneStampLine(state.lastX,state.lastY,pt.x,pt.y);state.lastX=pt.x;state.lastY=pt.y;render();return}
  if(state.isShaping){state.shapeEnd={x:pt.x,y:pt.y};render();return}
  if(state.tool==='select'&&!state.isPanning&&!state.isMovingOverlay&&!state.isResizingOverlay){
    if(state.selectedOverlay>=0){var ov=state.overlays[state.selectedOverlay];var hdl=hitTestHandle(pt.x,pt.y,ov);if(hdl>=0){displayCanvas.style.cursor=['nw-resize','ne-resize','sw-resize','se-resize'][hdl];return}}
    var ovIdx=hitTestOverlay(pt.x,pt.y);displayCanvas.style.cursor=ovIdx>=0?'move':'grab';
  }
}

function onUp(){
  if(state.isResizingOverlay){state.isResizingOverlay=false;displayCanvas.style.cursor=spaceHeld?'grab':'grab';pushHistory();updateOverlaysList();return}
  if(state.isMovingOverlay){state.isMovingOverlay=false;displayCanvas.style.cursor=spaceHeld?'grab':'grab';pushHistory();return}
  if(state.isPanning){state.isPanning=false;displayCanvas.style.cursor=spaceHeld?'grab':getCursor(state.tool);return}
  if(state.isCropping){state.isCropping=false;if(state.cropRect){state.cropRect=normRect(state.cropRect.x,state.cropRect.y,state.cropRect.w,state.cropRect.h);render()}return}
  if(state.isWmRemoving){state.isWmRemoving=false;if(state.wmRemoveRect){state.wmRemoveRect=normRect(state.wmRemoveRect.x,state.wmRemoveRect.y,state.wmRemoveRect.w,state.wmRemoveRect.h);render()}return}
  if(state.isDrawing){state.isDrawing=false;var dl=state.drawLayer.getContext('2d');dl.globalCompositeOperation='source-over';dl.globalAlpha=1;dl.lineCap='round';pushHistory();return}
  if(state.isShaping){state.isShaping=false;if(state.shapeStart&&state.shapeEnd)commitShape();state.shapeStart=null;state.shapeEnd=null;render();return}
}

function onWheel(e){
  if(!state.image)return;e.preventDefault();
  var f=e.deltaY>0?.92:1.08;var r=displayCanvas.getBoundingClientRect();var mx=e.clientX-r.left,my=e.clientY-r.top;
  var nz=Math.max(.02,Math.min(30,state.zoom*f)),rat=nz/state.zoom;
  state.panX=mx-(mx-state.panX)*rat;state.panY=my-(my-state.panY)*rat;state.zoom=nz;updateZoomDisp();render();
}

function cloneStampAt(destX,destY){
  var srcX=destX-state.cloneOffset.x,srcY=destY-state.cloneOffset.y;
  var iw=state.image.naturalWidth,ih=state.image.naturalHeight,rad=Math.floor(state.cloneSize/2);
  var comp=document.createElement('canvas');comp.width=iw;comp.height=ih;var cctx=comp.getContext('2d');
  cctx.drawImage(getFilteredImage(),0,0);cctx.drawImage(state.drawLayer,0,0);
  var isx0=Math.round(srcX)-rad,isy0=Math.round(srcY)-rad;
  var sx=Math.max(0,isx0),sy=Math.max(0,isy0);
  var sw=Math.min(iw,isx0+state.cloneSize)-sx,sh=Math.min(ih,isy0+state.cloneSize)-sy;
  if(sw<=0||sh<=0)return;
  var srcData=cctx.getImageData(sx,sy,sw,sh);
  var tmp=document.createElement('canvas');tmp.width=sw;tmp.height=sh;tmp.getContext('2d').putImageData(srcData,0,0);
  var dl=state.drawLayer.getContext('2d');
  var dx=destX-rad+(sx-isx0),dy=destY-rad+(sy-isy0);
  dl.save();dl.beginPath();dl.arc(destX,destY,rad,0,Math.PI*2);dl.clip();dl.drawImage(tmp,dx,dy);dl.restore();
}

function cloneStampLine(x0,y0,x1,y1){var dist=Math.hypot(x1-x0,y1-y0);var steps=Math.max(1,Math.ceil(dist/(state.cloneSize*.25)));for(var i=0;i<=steps;i++){var t=i/steps;cloneStampAt(x0+(x1-x0)*t,y0+(y1-y0)*t)}}

function applyWatermarkRemoval(){
  var rect=state.wmRemoveRect;if(!rect||rect.w<8||rect.h<8){showToast('Select a larger area','error');return}
  var iw=state.image.naturalWidth,ih=state.image.naturalHeight;
  var x0=Math.max(0,Math.round(rect.x)),y0=Math.max(0,Math.round(rect.y));
  var rw=Math.min(Math.round(rect.w),iw-x0),rh=Math.min(Math.round(rect.h),ih-y0);
  if(rw<8||rh<8)return;
  var feather=state.wmRemoveFeather,passes=state.wmRemovePasses;
  var comp=document.createElement('canvas');comp.width=iw;comp.height=ih;var cctx=comp.getContext('2d');
  cctx.drawImage(getFilteredImage(),0,0);cctx.drawImage(state.drawLayer,0,0);
  var imgData=cctx.getImageData(x0,y0,rw,rh),d=imgData.data,orig=new Uint8ClampedArray(d);
  var border=Math.min(3,Math.floor(rw/4),Math.floor(rh/4));
  for(var y=border;y<rh-border;y++){
    for(var x=border;x<rw-border;x++){
      var i=(y*rw+x)*4,rr=0,gg=0,bb=0,tw=0;
      var ld=Math.max(1,x),li=(y*rw+0)*4,lw=1/(ld*ld);rr+=d[li]*lw;gg+=d[li+1]*lw;bb+=d[li+2]*lw;tw+=lw;
      var rd=Math.max(1,rw-1-x),ri=(y*rw+(rw-1))*4,rrw=1/(rd*rd);rr+=d[ri]*rrw;gg+=d[ri+1]*rrw;bb+=d[ri+2]*rrw;tw+=rrw;
      var td=Math.max(1,y),ti=(0*rw+x)*4,ttw=1/(td*td);rr+=d[ti]*ttw;gg+=d[ti+1]*ttw;bb+=d[ti+2]*ttw;tw+=ttw;
      var bd=Math.max(1,rh-1-y),bi=((rh-1)*rw+x)*4,bbw=1/(bd*bd);rr+=d[bi]*bbw;gg+=d[bi+1]*bbw;bb+=d[bi+2]*bbw;tw+=bbw;
      d[i]=rr/tw;d[i+1]=gg/tw;d[i+2]=bb/tw;
    }
  }
  for(var pass=0;pass<passes;pass++){
    var tmp=new Uint8ClampedArray(d);
    for(var y2=border;y2<rh-border;y2++){
      for(var x2=border;x2<rw-border;x2++){
        var i2=(y2*rw+x2)*4,rr2=0,gg2=0,bb2=0,cnt=0;
        for(var dy=-1;dy<=1;dy++){
          for(var dx=-1;dx<=1;dx++){
            var ni=((y2+dy)*rw+(x2+dx))*4;var ww=(dx===0&&dy===0)?4:1;
            rr2+=tmp[ni]*ww;gg2+=tmp[ni+1]*ww;bb2+=tmp[ni+2]*ww;cnt+=ww;
          }
        }
        d[i2]=rr2/cnt;d[i2+1]=gg2/cnt;d[i2+2]=bb2/cnt;
      }
    }
  }
  var maxF=Math.max(1,feather);
  for(var y3=0;y3<rh;y3++){
    for(var x3=0;x3<rw;x3++){
      var i3=(y3*rw+x3)*4;
      var edgeDist=Math.min(x3,y3,rw-1-x3,rh-1-y3);
      var alpha=Math.min(1,edgeDist/maxF);
      d[i3]=orig[i3]*(1-alpha)+d[i3]*alpha;
      d[i3+1]=orig[i3+1]*(1-alpha)+d[i3+1]*alpha;
      d[i3+2]=orig[i3+2]*(1-alpha)+d[i3+2]*alpha;
      d[i3+3]=255;
    }
  }
  cctx.putImageData(imgData,x0,y0);
  var modData=cctx.getImageData(x0,y0,rw,rh);
  state.drawLayer.getContext('2d').putImageData(modData,x0,y0);
  state.wmRemoveRect=null;pushHistory();render();showToast('Watermark area removed','success');
}

function cancelWmRemove(){state.wmRemoveRect=null;state.isWmRemoving=false;render()}

function commitShape(){
  var s=state.shapeStart,e=state.shapeEnd,dl=state.drawLayer.getContext('2d');
  dl.save();dl.strokeStyle=state.shapeColor;dl.lineWidth=state.shapeSize;dl.lineCap='round';dl.lineJoin='round';dl.globalAlpha=1;dl.globalCompositeOperation='source-over';
  if(state.tool==='rect'){var rx=Math.min(s.x,e.x),ry=Math.min(s.y,e.y),rw=Math.abs(e.x-s.x),rh=Math.abs(e.y-s.y);if(state.shapeFill){dl.fillStyle=state.shapeColor;dl.fillRect(rx,ry,rw,rh)}dl.strokeRect(rx,ry,rw,rh)}
  else if(state.tool==='circle'){var cx2=(s.x+e.x)/2,cy2=(s.y+e.y)/2,rx2=Math.max(1,Math.abs(e.x-s.x)/2),ry2=Math.max(1,Math.abs(e.y-s.y)/2);dl.beginPath();dl.ellipse(cx2,cy2,rx2,ry2,0,0,Math.PI*2);if(state.shapeFill){dl.fillStyle=state.shapeColor;dl.fill()}dl.stroke()}
  else if(state.tool==='line'){dl.beginPath();dl.moveTo(s.x,s.y);dl.lineTo(e.x,e.y);dl.stroke()}
  dl.restore();pushHistory();
}

function pickColor(ix,iy){
  var tc=document.createElement('canvas');tc.width=state.image.naturalWidth;tc.height=state.image.naturalHeight;
  var t=tc.getContext('2d');t.filter=buildFilterStr();t.drawImage(state.image,0,0);t.filter='none';t.drawImage(state.drawLayer,0,0);
  var px=Math.max(0,Math.min(Math.round(ix),tc.width-1)),py=Math.max(0,Math.min(Math.round(iy),tc.height-1));
  var d=t.getImageData(px,py,1,1).data;
  var hex='#'+[d[0],d[1],d[2]].map(function(v){return v.toString(16).padStart(2,'0')}).join('');
  el('ed-swatch').style.background=hex;setTxt('ed-hex',hex);state.brushColor=hex;
  var bc=el('ts-bc');if(bc)bc.value=hex;showToast(hex,'info');
}

function removeBackground(ix,iy){
  if(!state.image)return;
  var fc=getFilteredImage(),fctx=fc.getContext('2d');
  var imgData=fctx.getImageData(0,0,fc.width,fc.height),data=imgData.data;
  var w=fc.width,h=fc.height;
  var px=Math.max(0,Math.min(Math.round(ix),w-1)),py=Math.max(0,Math.min(Math.round(iy),h-1));
  var idx=(py*w+px)*4;var tr=data[idx],tg=data[idx+1],tb=data[idx+2],ta=data[idx+3];
  var tol=state.bgTolerance;
  var visited=new Uint8Array(w*h),toRemove=new Uint8Array(w*h);
  var queue=new Int32Array(w*h);var qH=0,qT=0;queue[qT++]=px+py*w;visited[px+py*w]=1;
  var MI=8000000,it=0;
  while(qH<qT&&it<MI){
    it++;var pos=queue[qH++];toRemove[pos]=1;
    var x=pos%w,y=(pos-x)/w;
    var nbs=[x>0?pos-1:-1,x<w-1?pos+1:-1,y>0?pos-w:-1,y<h-1?pos+w:-1];
    nbs.forEach(function(np){if(np<0||visited[np])return;visited[np]=1;
      var ni=np*4;if(Math.abs(data[ni]-tr)<=tol&&Math.abs(data[ni+1]-tg)<=tol&&Math.abs(data[ni+2]-tb)<=tol&&Math.abs(data[ni+3]-ta)<=tol)queue[qT++]=np});
  }
  var nc=document.createElement('canvas');nc.width=w;nc.height=h;var nctx=nc.getContext('2d');nctx.drawImage(state.image,0,0);
  var nd=nctx.getImageData(0,0,w,h),ndd=nd.data;var rm=0;
  for(var i=0;i<w*h;i++){if(toRemove[i]){ndd[i*4+3]=0;rm++}}
  nctx.putImageData(nd,0,0);
  var ni=new Image();ni.onload=function(){state.image=ni;invalidateCache();imgInfo.textContent=w+' \u00d7 '+h;pushHistory();render();showToast('Removed '+rm.toLocaleString()+' px','success')};
  ni.src=nc.toDataURL();
}

function normRect(x,y,w,h){return{x:w<0?x+w:x,y:h<0?y+h:y,w:Math.abs(w),h:Math.abs(h)}}

function applyCrop(){
  var cr=state.cropRect;if(!cr||cr.w<2||cr.h<2)return;
  var x=Math.max(0,Math.round(cr.x)),y=Math.max(0,Math.round(cr.y));
  var w=Math.min(Math.round(cr.w),state.image.naturalWidth-x),h=Math.min(Math.round(cr.h),state.image.naturalHeight-y);
  if(w<1||h<1)return;
  var tc=document.createElement('canvas');tc.width=w;tc.height=h;tc.getContext('2d').drawImage(state.image,x,y,w,h,0,0,w,h);
  var tdl=document.createElement('canvas');tdl.width=w;tdl.height=h;tdl.getContext('2d').drawImage(state.drawLayer,x,y,w,h,0,0,w,h);
  var newOvs=state.overlays.map(function(ov){
    var no={type:ov.type,name:ov.name||'',x:ov.x-x,y:ov.y-y,w:ov.w,h:ov.h,opacity:ov.opacity};
    if(ov.type==='text'){no.text=ov.text;no.fontSize=ov.fontSize;no.fontFamily=ov.fontFamily;no.color=ov.color;no.bgColor=ov.bgColor;no.bold=ov.bold;no.italic=ov.italic}
    else{no.img=ov.img;no.src=ov.src;no.scale=ov.scale;no.origW=ov.origW;no.origH=ov.origH}
    return no;
  }).filter(function(ov){return ov.x+ov.w>0&&ov.y+ov.h>0&&ov.x<w&&ov.y<h});
  var ni=new Image();ni.onload=function(){
    state.image=ni;state.drawLayer=tdl;state.overlays=newOvs;state.selectedOverlay=-1;state.cropRect=null;
    invalidateCache();fitToScreen();imgInfo.textContent=w+' \u00d7 '+h;pushHistory();updateOverlaysList();render();showToast('Cropped','success');
  };ni.src=tc.toDataURL();
}

function cancelCrop(){state.cropRect=null;render()}

function rotateImage(deg){
  if(!state.image)return;var img=state.image,sw=Math.abs(deg)===90,nw=sw?img.naturalHeight:img.naturalWidth,nh=sw?img.naturalWidth:img.naturalHeight;
  var tc=document.createElement('canvas');tc.width=nw;tc.height=nh;var t=tc.getContext('2d');t.translate(nw/2,nh/2);t.rotate(deg*Math.PI/180);t.drawImage(img,-img.naturalWidth/2,-img.naturalHeight/2);
  var tdl=document.createElement('canvas');tdl.width=nw;tdl.height=nh;var td=tdl.getContext('2d');td.translate(nw/2,nh/2);td.rotate(deg*Math.PI/180);td.drawImage(state.drawLayer,-img.naturalWidth/2,-img.naturalHeight/2);
  var ni=new Image();ni.onload=function(){state.image=ni;state.drawLayer=tdl;invalidateCache();fitToScreen();imgInfo.textContent=nw+' \u00d7 '+nh;pushHistory();render();showToast('Rotated '+(deg>0?'CW':'CCW'))};
  ni.src=tc.toDataURL();
}

function flipImage(dir){
  if(!state.image)return;var w=state.image.naturalWidth,h=state.image.naturalHeight;
  var tc=document.createElement('canvas');tc.width=w;tc.height=h;var t=tc.getContext('2d');
  if(dir==='h'){t.translate(w,0);t.scale(-1,1)}else{t.translate(0,h);t.scale(1,-1)}t.drawImage(state.image,0,0);
  var tdl=document.createElement('canvas');tdl.width=w;tdl.height=h;var td=tdl.getContext('2d');
  if(dir==='h'){td.translate(w,0);td.scale(-1,1)}else{td.translate(0,h);td.scale(1,-1)}td.drawImage(state.drawLayer,0,0);
  var ni=new Image();ni.onload=function(){state.image=ni;state.drawLayer=tdl;invalidateCache();pushHistory();render();showToast('Flipped '+(dir==='h'?'H':'V'))};
  ni.src=tc.toDataURL();
}

function showResizeModal(){
  if(!state.image){showToast('No image','error');return}
  state.resizeAspect=state.image.naturalWidth/state.image.naturalHeight;
  el('resize-w').value=state.image.naturalWidth;el('resize-h').value=state.image.naturalHeight;
  showModal('resize-modal');
}

function toggleResizeLock(){
  state.resizeLock=!state.resizeLock;
  el('resize-lock').innerHTML=state.resizeLock?'<i class="fa-solid fa-link"></i>':'<i class="fa-solid fa-link-slash"></i>';
  el('resize-lock').classList.toggle('text-accent',state.resizeLock);el('resize-lock').classList.toggle('text-muted',!state.resizeLock);
}

function doResize(){
  var nw=parseInt(el('resize-w').value),nh=parseInt(el('resize-h').value);
  if(!nw||!nh||nw<1||nh<1||nw>10000||nh>10000){showToast('Invalid','error');return}
  var tc=document.createElement('canvas');tc.width=nw;tc.height=nh;tc.getContext('2d').drawImage(state.image,0,0,nw,nh);
  var tdl=document.createElement('canvas');tdl.width=nw;tdl.height=nh;tdl.getContext('2d').drawImage(state.drawLayer,0,0,nw,nh);
  var sx=nw/state.image.naturalWidth,sy=nh/state.image.naturalHeight;
  var newOvs=state.overlays.map(function(ov){
    var no={type:ov.type,name:ov.name||'',x:ov.x*sx,y:ov.y*sy,w:ov.w*sx,h:ov.h*sy,opacity:ov.opacity};
    if(ov.type==='text'){no.text=ov.text;no.fontSize=ov.fontSize*(sx+sy)/2;no.fontFamily=ov.fontFamily;no.color=ov.color;no.bgColor=ov.bgColor;no.bold=ov.bold;no.italic=ov.italic}
    else{no.img=ov.img;no.src=ov.src;no.scale=ov.scale*(sx+sy)/2;no.origW=ov.origW;no.origH=ov.origH}
    return no;
  });
  var ni=new Image();ni.onload=function(){
    state.image=ni;state.drawLayer=tdl;state.overlays=newOvs;invalidateCache();fitToScreen();
    imgInfo.textContent=nw+' \u00d7 '+nh;pushHistory();updateOverlaysList();hideModal('resize-modal');render();showToast('Resized '+nw+'\u00d7'+nh,'success');
  };ni.src=tc.toDataURL();
}

function zoomIn(){
  if(!state.image)return;var cx=displayCanvas.width/2,cy=displayCanvas.height/2,nz=Math.min(30,state.zoom*1.25),r=nz/state.zoom;
  state.panX=cx-(cx-state.panX)*r;state.panY=cy-(cy-state.panY)*r;state.zoom=nz;updateZoomDisp();render();
}

function zoomOut(){
  if(!state.image)return;var cx=displayCanvas.width/2,cy=displayCanvas.height/2,nz=Math.max(.02,state.zoom*.8),r=nz/state.zoom;
  state.panX=cx-(cx-state.panX)*r;state.panY=cy-(cy-state.panY)*r;state.zoom=nz;updateZoomDisp();render();
}

function fitToScreen(){
  if(!state.image)return;var ww=workspace.clientWidth,wh=workspace.clientHeight;
  state.zoom=Math.min(ww/state.image.naturalWidth,wh/state.image.naturalHeight)*.9;
  state.panX=(ww-state.image.naturalWidth*state.zoom)/2;state.panY=(wh-state.image.naturalHeight*state.zoom)/2;
  updateZoomDisp();render();
}

function updateZoomDisp(){zoomDisp.textContent=Math.round(state.zoom*100)+'%'}

function pushHistory(){
  if(!state.image)return;
  var snap={
    imgSrc:state.image.src,drawSrc:state.drawLayer.toDataURL(),
    adj:JSON.parse(JSON.stringify(state.adjustments)),
    pixelAdj:JSON.parse(JSON.stringify(state.pixelAdjustments)),
    filterIdx:state.activeFilter,frame:JSON.parse(JSON.stringify(state.frame)),
    bgTransparent:state.bgTransparent,bgColor:state.bgColor,bgImageSrc:state.bgImageSrc,
    overlays:state.overlays.map(function(o){
      var no={type:o.type,name:o.name||'',x:o.x,y:o.y,w:o.w,h:o.h,opacity:o.opacity};
      if(o.type==='text'){no.text=o.text;no.fontSize=o.fontSize;no.fontFamily=o.fontFamily;no.color=o.color;no.bgColor=o.bgColor;no.bold=o.bold;no.italic=o.italic}
      else{no.src=o.src;no.scale=o.scale;no.origW=o.origW||o.w;no.origH=o.origH||o.h}
      return no;
    }),
    watermark:JSON.parse(JSON.stringify(state.watermark)),watermarkImageSrc:state.watermark.imageSrc
  };
  state.history=state.history.slice(0,state.historyIdx+1);state.history.push(snap);
  if(state.history.length>MAX_HISTORY)state.history.shift();
  state.historyIdx=state.history.length-1;updateHistoryBtns();
}

function restoreHistory(idx){
  var snap=state.history[idx];if(!snap)return;
  var img=new Image();
  img.onload=function(){
    state.image=img;
    state.adjustments=JSON.parse(JSON.stringify(snap.adj));
    state.pixelAdjustments=snap.pixelAdj?JSON.parse(JSON.stringify(snap.pixelAdj)):JSON.parse(JSON.stringify(DEFAULT_PIXEL_ADJ));
    state.activeFilter=snap.filterIdx;state.frame=JSON.parse(JSON.stringify(snap.frame));
    state.bgTransparent=snap.bgTransparent;state.bgColor=snap.bgColor;
    el('bg-transparent').checked=snap.bgTransparent;el('bg-color-row').classList.toggle('hidden',snap.bgTransparent);el('bg-color').value=snap.bgColor;
    if(snap.bgImageSrc){var bgi=new Image();bgi.onload=function(){state.bgImage=bgi;el('bg-image-info').classList.remove('hidden');render()};bgi.src=snap.bgImageSrc}
    else{state.bgImage=null;el('bg-image-info').classList.add('hidden')}
    if(snap.watermark){
      Object.assign(state.watermark,JSON.parse(JSON.stringify(snap.watermark)));state.watermark.image=null;
      el('wm-enabled').checked=snap.watermark.enabled;el('wm-body').classList.toggle('hidden',!snap.watermark.enabled);
      if(snap.watermarkImageSrc){var wmi=new Image();wmi.onload=function(){state.watermark.image=wmi;el('wm-image-preview').classList.remove('hidden');render()};wmi.src=snap.watermarkImageSrc}
      else{state.watermark.image=null;el('wm-image-preview').classList.add('hidden')}
      setWmType(snap.watermark.type);
    }
    var dlc=document.createElement('canvas');dlc.width=img.naturalWidth;dlc.height=img.naturalHeight;
    var dli=new Image();
    dli.onload=function(){
      dlc.getContext('2d').drawImage(dli,0,0);state.drawLayer=dlc;
      if(snap.overlays&&snap.overlays.length){
        var promises=snap.overlays.map(function(o){return new Promise(function(resolve){
          if(o.type==='text'){resolve({type:'text',text:o.text,x:o.x,y:o.y,fontSize:o.fontSize,fontFamily:o.fontFamily,color:o.color,bgColor:o.bgColor||'',bold:o.bold||false,italic:o.italic||false,opacity:o.opacity,w:o.w,h:o.h,name:o.name||''})}
          else{var oi=new Image();oi.onload=function(){resolve({type:'image',img:oi,src:o.src,name:o.name||'',x:o.x,y:o.y,w:o.w,h:o.h,opacity:o.opacity,scale:o.scale||1,origW:o.origW||o.w,origH:o.origH||o.h})};oi.src=o.src}
        })});
        Promise.all(promises).then(function(ovs){state.overlays=ovs;state.selectedOverlay=-1;finish()});
      }else{state.overlays=[];state.selectedOverlay=-1;finish()}
      function finish(){invalidateCache();updateSliders();updatePixelSliders();updateFilterUI();updateFrameUI();updateOverlaysList();imgInfo.textContent=img.naturalWidth+' \u00d7 '+img.naturalHeight;render()}
    };
    dli.src=snap.drawSrc;
  };
  img.src=snap.imgSrc;
}

function undo(){if(state.historyIdx<=0)return;state.historyIdx--;restoreHistory(state.historyIdx);updateHistoryBtns()}
function redo(){if(state.historyIdx>=state.history.length-1)return;state.historyIdx++;restoreHistory(state.historyIdx);updateHistoryBtns()}
function updateHistoryBtns(){btnUndo.classList.toggle('disabled',state.historyIdx<=0);btnRedo.classList.toggle('disabled',state.historyIdx>=state.history.length-1)}

function showModal(id){el(id).classList.add('show')}
function hideModal(id){el(id).classList.remove('show')}
function bindModalEvents(){}

function doExport(){
  if(!state.image)return;
  var fmt=el('export-format').value,q=parseInt(el('export-quality').value)/100;
  var includeFrame=el('export-include-frame').checked,includeWm=el('export-include-wm').checked;
  var f=state.frame,iw=state.image.naturalWidth,ih=state.image.naturalHeight;
  var pad={l:0,r:0,t:0,b:0};if(includeFrame&&f.type!=='none')pad=getFramePad();
  var tw=iw+pad.l+pad.r,th=ih+pad.t+pad.b;
  var tc=document.createElement('canvas');tc.width=tw;tc.height=th;var tctx=tc.getContext('2d');
  if(!state.bgTransparent){tctx.fillStyle=state.bgColor;tctx.fillRect(0,0,tw,th)}
  if(includeFrame&&f.type!=='none')drawFrameBgExport(tctx,pad,iw,ih);
  if(state.bgImage){var bg=state.bgImage;var sc=Math.max(iw/bg.naturalWidth,ih/bg.naturalHeight);var bw=bg.naturalWidth*sc,bh=bg.naturalHeight*sc;tctx.drawImage(bg,pad.l+(iw-bw)/2,pad.t+(ih-bh)/2,bw,bh)}
  if(includeFrame&&(f.type==='rounded'||f.type==='torn')){
    tctx.save();
    if(f.type==='rounded'){var rr=Math.min(f.width,iw/2,ih/2);rrect(tctx,pad.l,pad.t,iw,ih,rr);tctx.clip()}
    else{clipTornPath(tctx,pad.l,pad.t,iw,ih,42,1)}
  }
  tctx.drawImage(getFilteredImage(),pad.l,pad.t);tctx.drawImage(state.drawLayer,pad.l,pad.t);
  state.overlays.forEach(function(ov){tctx.save();tctx.globalAlpha=ov.opacity;if(ov.type==='text'){renderTextOnCtx(tctx,ov,pad.l,pad.t,1)}else{tctx.drawImage(ov.img,pad.l+ov.x,pad.t+ov.y,ov.w,ov.h)}tctx.restore()});
  if(includeWm)drawWatermarkExport(tctx,pad,iw,ih);
  if(includeFrame&&(f.type==='rounded'||f.type==='torn'))tctx.restore();
  if(state.adjustments.vignette>0){var a=state.adjustments.vignette/100;var g=tctx.createRadialGradient(pad.l+iw/2,pad.t+ih/2,Math.max(iw,ih)*.19,pad.l+iw/2,pad.t+ih/2,Math.max(iw,ih)*.56);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(a*.85).toFixed(2)+')');tctx.fillStyle=g;tctx.fillRect(pad.l,pad.t,iw,ih)}
  if(includeFrame&&f.type!=='none')drawFrameFgExport(tctx,pad,iw,ih);
  var mime=fmt==='png'?'image/png':fmt==='webp'?'image/webp':'image/jpeg';
  var url=tc.toDataURL(mime,q);var a2=document.createElement('a');a2.download='PhotoForge-export.'+fmt;a2.href=url;a2.click();
  hideModal('export-modal');showToast('Exported '+fmt.toUpperCase(),'success');
}

function drawFrameBgExport(c,pad,iw,ih){
  var f=state.frame,w=f.width;
  switch(f.type){
    case'polaroid':c.fillStyle=f.color;c.fillRect(0,0,iw+pad.l+pad.r,ih+pad.t+pad.b);break;
    case'shadow':c.save();c.filter='blur('+Math.max(1,w*.6)+'px)';c.fillStyle='rgba(0,0,0,0.25)';c.fillRect(pad.l+w*.2,pad.t+w*.25,iw,ih);c.filter='none';c.restore();break;
    case'vintage':case'double':case'gold':case'ornate':case'mat':case'dotted':case'dashed':case'gradient':case'neon':case'wood':c.fillStyle=f.color;c.fillRect(0,0,iw+pad.l+pad.r,ih+pad.t+pad.b);break;
    case'torn':c.fillStyle=f.color||'#e8e0d6';c.fillRect(0,0,iw+pad.l+pad.r,ih+pad.t+pad.b);break;
  }
}

function drawFrameFgExport(c,pad,iw,ih){
  var f=state.frame,w=f.width;
  switch(f.type){
    case'border':c.strokeStyle=f.color;c.lineWidth=w;c.strokeRect(pad.l-w/2,pad.t-w/2,iw+w,ih+w);break;
    case'rounded':var rr=Math.min(w,iw/2,ih/2);c.strokeStyle=f.color;c.lineWidth=Math.max(2,w*.15);rrect(c,pad.l,pad.t,iw,ih,rr);c.stroke();break;
    case'vintage':c.strokeStyle=f.innerColor;c.lineWidth=Math.max(2,w*.4);c.strokeRect(pad.l-w/2,pad.t-w/2,iw+w,ih+w);c.strokeStyle=f.color;c.lineWidth=Math.max(1,w*.15);c.strokeRect(-3,-3,iw+pad.l+pad.r+6,ih+pad.t+pad.b+6);break;
    case'film':var barH=w*1.6,holeW=w*.6,holeH=w*.8,holeGap=w*1.4;c.fillStyle='#0a0a0a';c.fillRect(0,0,iw+pad.l+pad.r,barH);c.fillRect(0,ih+pad.t,iw+pad.l+pad.r,barH);c.fillStyle='#2a2a2a';for(var hx=pad.l+holeGap;hx<pad.l+iw-holeGap;hx+=holeGap){c.fillRect(hx,barH/2-holeH/2,holeW,holeH);c.fillRect(hx,ih+pad.t+barH/2-holeH/2,holeW,holeH)}c.fillStyle='#0a0a0a';var sw2=Math.max(1,pad.l*.6);c.fillRect(0,0,sw2,ih+pad.t+pad.b);c.fillRect(iw+pad.l+pad.r-sw2,0,sw2,ih+pad.t+pad.b);break;
    case'double':c.strokeStyle=f.innerColor||f.color;c.lineWidth=Math.max(2,w*.3);c.strokeRect(pad.l-w*.8,pad.t-w*.8,iw+w*1.6,ih+w*1.6);c.strokeStyle=f.color;c.lineWidth=Math.max(2,w*.2);c.strokeRect(pad.l-w*.2,pad.t-w*.2,iw+w*.4,ih+w*.4);break;
    case'gold':var g=c.createLinearGradient(0,0,iw+pad.l+pad.r,ih+pad.t+pad.b);g.addColorStop(0,'#FFD700');g.addColorStop(.3,'#FFA500');g.addColorStop(.5,'#FFD700');g.addColorStop(.7,'#DAA520');g.addColorStop(1,'#FFD700');c.strokeStyle=g;c.lineWidth=Math.max(3,w*.6);c.strokeRect(pad.l-w/2,pad.t-w/2,iw+w,ih+w);break;
    case'ornate':c.strokeStyle=f.color;c.lineWidth=Math.max(2,w*.2);c.strokeRect(pad.l-w*.5,pad.t-w*.5,iw+w,ih+w);c.strokeStyle=f.innerColor||f.color;c.lineWidth=Math.max(1,w*.15);var cs=w*1.2;[[pad.l-w*.5,pad.t-w*.5,1,1],[pad.l+iw+w*.5,pad.t-w*.5,-1,1],[pad.l-w*.5,pad.t+ih+w*.5,1,-1],[pad.l+iw+w*.5,pad.t+ih+w*.5,-1,-1]].forEach(function(c2){c.beginPath();c.moveTo(c2[0],c2[1]+c2[3]*cs);c.lineTo(c2[0],c2[1]);c.lineTo(c2[0]+c2[2]*cs,c2[1]);c.stroke();c.beginPath();c.arc(c2[0]+c2[2]*cs*.3,c2[1]+c2[3]*cs*.3,cs*.15,0,Math.PI*2);c.stroke()});break;
    case'mat':c.strokeStyle=f.innerColor||'#888';c.lineWidth=1.5;c.strokeRect(pad.l-w*.3,pad.t-w*.3,iw+w*.6,ih+w*.6);c.strokeStyle=f.color;c.lineWidth=1;c.strokeRect(0,0,iw+pad.l+pad.r,ih+pad.t+pad.b);break;
    case'dotted':c.setLineDash([2,w*.3]);c.strokeStyle=f.innerColor||f.color;c.lineWidth=Math.max(3,w*.2);c.strokeRect(pad.l-w/2,pad.t-w/2,iw+w,ih+w);c.setLineDash([]);break;
    case'dashed':c.strokeStyle=f.innerColor||f.color;c.lineWidth=Math.max(3,w*.25);c.setLineDash([w*.5,w*.3]);c.strokeRect(pad.l-w/2,pad.t-w/2,iw+w,ih+w);c.setLineDash([]);break;
    case'gradient':var g2=c.createLinearGradient(0,pad.t,0,pad.t+ih);g2.addColorStop(0,f.innerColor||f.color);g2.addColorStop(.5,f.color);g2.addColorStop(1,f.innerColor||f.color);c.strokeStyle=g2;c.lineWidth=Math.max(3,w*.5);c.strokeRect(pad.l-w/2,pad.t-w/2,iw+w,ih+w);break;
    case'neon':for(var n=3;n>=0;n--){c.strokeStyle=f.color;c.lineWidth=Math.max(2,w*.15)+n*3;c.globalAlpha=.15+n*.05;rrect(c,pad.l-n*2,pad.t-n*2,iw+n*4,ih+n*4,8);c.stroke()}c.globalAlpha=1;c.strokeStyle='#fff';c.lineWidth=1.5;rrect(c,pad.l,pad.t,iw,ih,4);c.stroke();break;
    case'wood':for(var ly=0;ly<ih+pad.t+pad.b;ly+=3){c.fillStyle=ly%6<3?f.color:f.innerColor||f.color;c.fillRect(0,ly,iw+pad.l+pad.r,1.5)}c.strokeStyle='rgba(0,0,0,0.2)';c.lineWidth=1;c.strokeRect(0,0,iw+pad.l+pad.r,ih+pad.t+pad.b);break;
  }
}

function drawWatermarkExport(c,pad,iw,ih){
  var wm=state.watermark;if(!wm.enabled)return;c.save();c.translate(pad.l,pad.t);c.globalAlpha=wm.opacity;
  if(wm.type==='text'){c.font=wm.size+'px "'+wm.font+'"';c.fillStyle=wm.color;c.textAlign='center';c.textBaseline='middle';
    if(wm.tiled){c.rotate(wm.rotation*Math.PI/180);var diag=Math.hypot(iw,ih);var sp=wm.size*5;for(var yy=-diag;yy<diag*2;yy+=sp)for(var xx=-diag;xx<diag*2;xx+=sp)c.fillText(wm.text,xx,yy)}
    else c.fillText(wm.text,iw/2,ih/2);
  }else if(wm.type==='image'&&wm.image){var img=wm.image;var sc=Math.min(iw*.25/img.naturalWidth,ih*.25/img.naturalHeight);var ww=img.naturalWidth*sc,hh=img.naturalHeight*sc;
    if(wm.tiled){c.rotate(wm.rotation*Math.PI/180);var sp2=Math.max(ww,hh)*2.2;var diag2=Math.hypot(iw,ih);for(var yy2=-diag2;yy2<diag2*2;yy2+=sp2)for(var xx2=-diag2;xx2<diag2*2;xx2+=sp2)c.drawImage(img,xx2,yy2,ww,hh)}
    else c.drawImage(img,(iw-ww)/2,(ih-hh)/2,ww,hh);
  }
  c.restore();
}

function bindDragDrop(){
  var ws=workspace;
  ['dragenter','dragover'].forEach(function(ev){ws.addEventListener(ev,function(e){e.preventDefault();e.stopPropagation()})});
  ['dragleave','drop'].forEach(function(ev){ws.addEventListener(ev,function(e){e.preventDefault();e.stopPropagation()})});
  ws.addEventListener('drop',function(e){
    var files=Array.from(e.dataTransfer?e.dataTransfer.files:[]);
    var imgs=files.filter(function(f){return f.type&&f.type.startsWith('image/')});
    if(imgs.length===1)loadImageFile(imgs[0]);
    else if(imgs.length>1){imgs.forEach(function(f){addUploadedFile(f)});if(!state.image)loadImageFile(imgs[0])}
  });
}

function bindKeyboard(){
  document.addEventListener('keydown',function(e){
    if(activeTextEdit)return;
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
    if(e.code==='Space'&&!e.repeat){spaceHeld=true;if(state.image)displayCanvas.style.cursor='grab';e.preventDefault();return}
    if(e.ctrlKey||e.metaKey){
      if(e.key==='z'){e.preventDefault();undo();return}
      if(e.key==='y'){e.preventDefault();redo();return}
      if(e.key==='o'){e.preventDefault();openFile();return}
      if(e.key==='s'){e.preventDefault();showModal('export-modal');return}
      if(e.key==='0'){e.preventDefault();fitToScreen();return}
      if(e.key==='='){e.preventDefault();zoomIn();return}
      if(e.key==='-'){e.preventDefault();zoomOut();return}
    }
    var km={v:'select',c:'crop',b:'brush',m:'marker',e:'eraser',s:'clonestamp',t:'text',u:'rect',o:'circle',l:'line',i:'eyedropper',g:'removebg',w:'removewm'};
    if(km[e.key.toLowerCase()]&&state.image){setTool(km[e.key.toLowerCase()]);return}
    if(e.key==='Escape'){if(state.cropRect)cancelCrop();else if(state.wmRemoveRect)cancelWmRemove();else if(state.selectedOverlay>=0){state.selectedOverlay=-1;updateOverlaysList();render()}}
    if(e.key==='Enter'&&state.tool==='crop'&&state.cropRect)applyCrop();
    if(e.key==='Enter'&&state.tool==='removewm'&&state.wmRemoveRect)applyWatermarkRemoval();
    if(e.key==='Delete'&&state.selectedOverlay>=0){state.overlays.splice(state.selectedOverlay,1);state.selectedOverlay=-1;updateOverlaysList();pushHistory();render();showToast('Overlay removed')}
  });
  document.addEventListener('keyup',function(e){if(e.code==='Space'){spaceHeld=false;if(state.image)displayCanvas.style.cursor=getCursor(state.tool)}});
}

function showToast(msg,type){
  type=type||'info';var t=document.createElement('div');t.className='toast toast-'+type;t.textContent=msg;
  el('toast-container').appendChild(t);requestAnimationFrame(function(){t.classList.add('show')});
  setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},300)},2200);
}
init(); 