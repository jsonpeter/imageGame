/**
 * Created by jsonpeter on 2015/8/13.
 */
(function($g){
    //��Ϸ����
     setting={
         gameConfig:{
               url:"1.jpg",
                id:"gameDiv",
              //���ɹ���4 ��4
                size:"4*4",
                //ÿ��Ԫ�صļ��
                margin:1,
               //�϶�ʱ���͸����
               opacity:0.8
        },
         setElement:{
                type:"div",
                id: "",
                float: "",
                display: "",
                margin: "",
                background: "",
                width: "",
                height: "",
                left:"",
                top:"",
                position:"",//absolute
                opacity:0.4,
                animate:0.8
            }
    };
    //Ԫ�����ɲ���
    var _sg= setting.gameConfig;
    var _st= setting.setElement;
    var gameInfo=function(){};
    gameInfo.prototype= {
        init:function(){
            this.creatObj();
            this.eventHand();
        },
        sortObj:{
            rightlist:[], //��ȷ������
            romdlist:[]   //���Һ������
        },
        creatObj: function () {
            _sg.boxObj = document.getElementById(_sg.id)||"";
            //�ߴ��Զ���ȡ
            var _size =  _sg.size.split('*') || [0, 0];
            //���㵥��div�ĸ߿�
            var w = Math.floor(_sg.boxObj.offsetWidth / _size[0]);
            var h = Math.floor(_sg.boxObj.offsetHeight / _size[1]);
            //ͼƬ����div
            var _size = _sg.size.split('*') || [0, 0];
            var wt=_size[0],hg=_size[1];
            //����һ�����鲢�����ɢ
            var sortList=[];
            for(var a=0;a<wt*hg;a++){
                sortList.push(a);
            }
            sortList.sort(randomsort);
            this.sortObj.rightlist=sortList;
            //---------
            var _i = 0,sid=0;
            for (; _i < wt; _i++) {
                var _s = 0;
                for (; _s < hg; _s++)
                {
                    //��ֵ�����ɢ���id
                    _st.id =sortList[sid++];
                    _st.display = "block";
                    _st.float = "left";
                    //_st.top=w*_i+"px";
                    //_st.left=h*_s+"px";
                    _st.margin = _sg.margin + "px";
                    _st.background = "url('" + _sg.url + "') " + (-w * _s) + "px " + (-h * _i) + "px";
                    _st.width = w-_sg.margin*(wt/2) + "px";
                    _st.height = h-_sg.margin*(hg/2) + "px";
                    this.sortObj.romdlist.push(this.addElement());
                    // console.log( (_w*_i)+"px "+(_h*_s)+"px ");
                }
            }

            this.boxSort();
        },
        boxSort:function(){
           var _arrySort=this.sortObj.romdlist;
            var _tmp=[],_n= 0;
            eachBox(_arrySort,function(d){
                _tmp.push(parseInt(_arrySort[d].id));
            });
            //����������
            _tmp.sort(function(a,b){
                return a>b?1:-1;
            });
            //�����Ĵ�dom������
            for(;_n<_tmp.length;_n++){
                 var _s=0;
                for(;_s<_arrySort.length;_s++)
                {
                    if(_arrySort[_s].id==_tmp[_n]){
                        _sg.boxObj.appendChild(_arrySort[_s]);
                    }
                }
            }
           return _tmp;
        },
        //���Ԫ��
        addElement:function(){
            var _obj = document.createElement(_st.type);
            _obj.id =_st.id;
            _obj.style.display = _st.display;
            _obj.style.float = _st.float;
            _obj.style.margin = _st.margin;
            _obj.style.background =_st.background;
            _obj.style.width =_st.width;
            _obj.style.position=_st.position;
            _obj.style.top=_st.top;
            _obj.style.left=_st.left;
            _obj.style.height =_st.height;
            return _obj;
        },
        mouseEvent:{
            mousedown:function(ev) {
                ev = ev || ev.event;
                ev.preventDefault();
                //Ԫ������div
                _st.type="span";
                _st.id = "maskBox";
                _st.width = this.offsetWidth + "px";
                _st.height = this.offsetHeight + "px";
                _st.position = "absolute";
                _st.background = "";
                //_st.opacity=_sg.opacity;
                _st.left = this.offsetLeft + "px";
                _st.top = this.offsetTop + "px";
            },
            mouseup:function(ev){
                ev=ev|| ev.event;
                //var _e=t.setElement;
                ev.preventDefault();
               var obj=document.getElementById(this.id);
                if(obj){
                    _sg.boxObj.removeChild(obj);
                }
            },
            mousemove:function(ev){
                ev=ev|| ev.event;
                this.style.left=getX_Y.call(this,"x",ev)+"px";
                this.style.top=getX_Y.call(this,"y",ev)+"px";
            }

        },
        //��ȷ��� �Ա���������
        gameCheck:function(){
            var s= 0,bols=true;
            var _arry=this.sortObj.rightlist;
            var _arryRom=this.sortObj.romdlist;
            console.log(_arry);
            console.log(_arryRom);
            for(;s<_arry.length;s++){
               if(_arry[s]!=_arryRom[s].id){
                   bols=false;
                   break;
               }
            }
         return bols;
        },
        eventHand: function () {
         var _obj= _sg.boxObj.getElementsByTagName("div");
            var i= 0,olen=_obj.length;
            var that=this;
            var m=that.mouseEvent;
             var box_index=0;
            for(;i<olen;){
                    (function(n){
                        //�������
                        _obj[n].addEventListener("mousedown",function(e){
                            var _this=this;
                            m.mousedown.call(_this,e);
                            _st.background=_this.style.background;
                            _this.style.background="#FFF";
                            //���ɿ��ƶ���div
                            var _newObj=that.addElement();
                            _sg.boxObj.appendChild(_newObj);
                            _newObj.style.opacity=_sg.opacity;
                            //�ƶ�λ��
                            _newObj.onmousemove=function(e){
                                m.mousemove.call(_newObj,e);
                               // console.log("____"+this.offsetLeft);
                                var _i= 0;

                                for(;_i<olen;_i++){
                                    var _w=parseInt(_obj[_i].style.width)/1.5;
                                    var _h=parseInt(_obj[_i].style.height)/1.5;
                                    var _left=_obj[_i].offsetLeft;
                                    var _top=_obj[_i].offsetTop;
                                    var _boxX=parseInt(this.style.left);
                                    var _boxY=parseInt(this.style.top);
                                    //��ԭ��ʽ
                                    eachBox(_obj,function(d){
                                        _obj[d].style.opacity=1.0;
                                    });
                                    //�����϶�����λ��
                                    if(_left+_w>_boxX||_left>_boxX+_w)
                                    {
                                        if(_top+_h>_boxY||_top>_boxY+_h)
                                        {
                                            box_index=_i;
                                            _obj[_i].style.opacity=_st.opacity;
                                            break;
                                        }

                                    }
                                }
                            };
                            //����ɿ�
                            _newObj.addEventListener("mouseup",function(e){
                               //ɾ���ƶ��¼�
                                _newObj.onmousemove=function(e){};
                                //��ȡ��ǰͣ��Ԫ�ص�����
                                var tagObj={
                                    id1:_obj[box_index].id,
                                    id2: _this.id,
                                    bg1:_obj[box_index].style.background,
                                    bg2:this.style.background
                                };
                                //����λ��
                                _this.id=tagObj.id1;
                                _this.style.background=tagObj.bg1;
                                _obj[box_index].id=tagObj.id2;
                                _obj[box_index].style.background=tagObj.bg2;
                                //��ȡ�϶��������
                                 that.sortObj.romdlist=_obj;
                                //��ԭ��ʽ
                                eachBox(_obj,function(d){
                                    _obj[d].style.opacity=1.0;
                                });
                                //ɾ������div
                                m.mouseup.call(_newObj,e);
                                //�����Ƿ����ƴͼ
                                if(that.gameCheck()){
                                    alert("O(��_��)O����~");
                                }
                            },false);

                        },false);

                    })(i++);

            }

        }
    }
    //�����
    function randomsort(a, b) {
        return Math.random()>.5 ? -1 : 1;//��Math.random()��������0~1֮����������0.5�Ƚϣ�����-1��1
    }
    function eachBox(obj,fn){
        var _s=0;
        for(;_s<obj.length;_s++){
            fn(_s);
        }
    }
    function getX_Y(s,ev){
        var _b=(ev.clientX-this.parentNode.offsetLeft)-(this.offsetWidth/2);
        if(s==="y"){
            _b=(ev.clientY-this.parentNode.offsetTop)-(this.offsetHeight/2);
        }
        return _b;
    }
        $g.gameInfo =new gameInfo();
})(window)