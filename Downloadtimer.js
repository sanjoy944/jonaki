function generate(){var e,n=document.getElementById("sk22"),t=document.getElementById("btnx"),l=10,d=document.createElement("span");n.parentNode.replaceChild(d,n),e=setInterval(function(){--l<0?(d.parentNode.replaceChild(n,d),clearInterval(e),n.style.display="inline"):(d.innerHTML="<i class='fa fa-cog fa-spin' style='font-size:24px'  aria-hidden='true'></i> Getting Link " +l.toString()+" Please Wait...",t.style.display="none")},1e3)}//]]>