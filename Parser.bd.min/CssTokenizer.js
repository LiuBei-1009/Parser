"use strict";function CssTokenizer(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.res=JSON.parse(JSON.stringify(s)),this._state="SPACE",this._buffer=t,this._sectionStart=0,this._index=0,this._name="",this._content="",this._list=[],this._comma=!1}CssTokenizer.prototype.SPACE=function(t){/[a-zA-Z.#]/.test(t)?(this._sectionStart=this._index,this._state="InName"):"@"==t?this._state="Ignore1":"/"==t&&(this._state="BeforeComment")},CssTokenizer.prototype.BeforeComment=function(t){"*"==t?this._state="InComment":(this._index--,this._state="SPACE")},CssTokenizer.prototype.InComment=function(t){"*"==t&&(this._state="AfterComment")},CssTokenizer.prototype.AfterComment=function(t){"/"==t?this._state="SPACE":(this._index--,this._state="InComment")},CssTokenizer.prototype.InName=function(t){"{"==t?(this._list.push(this._buffer.substring(this._sectionStart,this._index)),this._sectionStart=this._index+1,this._state="InContent"):","==t?(this._list.push(this._buffer.substring(this._sectionStart,this._index)),this._sectionStart=this._index+1,this._comma=!0):"."!=t&&"#"!=t||this._comma?/\s/.test(t)?(this._name=this._buffer.substring(this._sectionStart,this._index),this._state="NameSpace"):/[>:\[]/.test(t)?this._list.length?this._state="IgnoreName":this._state="Ignore1":this._comma=!1:this._buffer=this._buffer.splice(this._index,1," ")},CssTokenizer.prototype.NameSpace=function(t){"{"==t?(this._list.push(this._name),this._sectionStart=this._index+1,this._state="InContent"):","==t?(this._comma=!0,this._list.push(this._name),this._sectionStart=this._index+1,this._state="InName"):/\S/.test(t)&&(this._comma?(this._sectionStart=this._index,this._index--,this._state="InName"):this._list.length?this._state="IgnoreName":this._state="Ignore1")},CssTokenizer.prototype.InContent=function(t){if("}"==t){this._content=this._buffer.substring(this._sectionStart,this._index);var s=!0,i=!1,e=void 0;try{for(var n,h=this._list[Symbol.iterator]();!(s=(n=h.next()).done);s=!0){var o=n.value;this.res[o]=(this.res[o]||"")+";"+this._content}}catch(t){i=!0,e=t}finally{try{!s&&h.return&&h.return()}finally{if(i)throw e}}this._list=[],this._comma=!1,this._state="SPACE"}},CssTokenizer.prototype.IgnoreName=function(t){","==t?(this._sectionStart=this._index+1,this._state="InName"):"{"==t&&(this._sectionStart=this._index+1,this._state="InContent")},CssTokenizer.prototype.Ignore1=function(t){";"==t?(this._state="SPACE",this._sectionStart=this._index+1):"{"==t&&(this._state="Ignore2")},CssTokenizer.prototype.Ignore2=function(t){"}"==t?(this._state="SPACE",this._sectionStart=this._index+1):"{"==t&&(this._state="Ignore3")},CssTokenizer.prototype.Ignore3=function(t){"}"==t&&(this._state="Ignore2")},CssTokenizer.prototype.parse=function(){for(;this._index<this._buffer.length;this._index++)this[this._state](this._buffer[this._index]);return this.res},module.exports=CssTokenizer;