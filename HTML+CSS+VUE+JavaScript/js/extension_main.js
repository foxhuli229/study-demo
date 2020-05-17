var sortfild="";
var sortway="";
/*通用下拉菜单*/
$(document).ready(function() {
	$(document).on('click', '.titlist_wrap_tit', function() {
		if($(this).siblings("ul").is(":hidden")) {
			$(".curse_list_ul").hide();
			$(".titlist_wrap_tit").removeClass("addtitlistborder");
			$(".titlist_wrap_tit").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
			$(this).addClass("addtitlistborder");
			$(this).siblings("ul").slideDown(100);
			$(this).find("i").removeClass("fa-angle-down");
			$(this).find("i").addClass("fa-angle-up");
		} else {
			$(this).siblings("ul").slideUp(100);
			$(this).removeClass("addtitlistborder");
			$(this).find("i").removeClass("fa-angle-up");
			$(this).find("i").addClass("fa-angle-down");
		}
	})
	$(document).on('click', '.curse_list_ul li a', function() {
		$(this).parent("li").siblings("li").children("a").removeClass("add_aaction")
		$(this).addClass("add_aaction");
		$(".curse_list_ul").hide();
		$(".titlist_wrap_tit").removeClass("addtitlistborder");
		$(".titlisticon").removeClass("fa-angle-up");
		$(".titlisticon").addClass("fa-angle-down");
	})


	$(function() {
		$(document).bind("click", function(e) {
			if($(e.target).closest(".curse_list_ul").length == 0 && $(e.target).closest(".titlist_wrap_tit").length == 0) {
				$(".curse_list_ul").hide();
				$(".titlist_wrap_tit").removeClass("addtitlistborder");
				$(".titlist_wrap_tit").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
			}
		})
		$(document).bind("click", function(e) {
			if($(e.target).closest(".alert_tdlist").length == 0) {
				$(".alert_ullist").hide();
			}
		})
	})
})

$(function() {
	/*时间块切换*/
	$(".day_change a").click(function() {
		$(this).siblings("a").removeClass("day_change_action");
		$(this).addClass("day_change_action")
	})
	/*类型tab切换*/
	$(document).on("click", ".extension_tab li a", function() {
		$(this).parent().siblings("li").children("a").removeClass("extension_tab_action");
		$(this).addClass("extension_tab_action");
	})
	/*单项选择切换*/
	$(document).on('click', '.checkbox_one li label', function(event) {
		event.stopPropagation();
		var radioBox = $(this).children("input")
		if(radioBox.is(":checked")) {
			return false
		} else {
			radioBox.siblings("i").addClass("fa-dot-circle-o action_extension").removeClass("fa-circle-o");
			radioBox.parents("li").siblings("li").find("i").removeClass("fa-dot-circle-o action_extension").addClass("fa-circle-o");
			$(this).children("input").prop("checked", true);
			alert($(this).children("input").val())
		}
	})
	/*多项选择切换*/
	$(document).on('click', '.checkbox_more li label', function(event) {
		var radioBox = $(this).siblings("input");
		event.stopPropagation();
		if(radioBox.is(":checked")) {
			radioBox.prop("checked", false);
			radioBox.siblings("label").children("i").removeClass("fa-dot-circle-o action_extension").addClass("fa-circle-o");
		} else {
			radioBox.prop("checked", true);
			var checkboxnum = $(this).parents(".checkbox_more").find(".action_extension").length //选中了的个数
			if(checkboxnum >= 7) {
				radioBox.prop("checked", false);
				alert("最多只能选7个")
				return false;
			}
			radioBox.siblings("label").children("i").addClass("fa-dot-circle-o action_extension").removeClass("fa-circle-o");
		}
	})
	/*点击显示图表类型*/
	$(document).on('click', '.checkbox_list', function(event) {
		event.stopPropagation();
	})
	/*点击显示图表类型*/
	$(document).on('click', '.zuce_echarts', function() {
		var checkboxList = $(this).children(".checkbox_list");
		if(checkboxList.is(":hidden")) {
			checkboxList.slideDown(200);
			$(this).children(".zuce_echarts_arrow").addClass("zuce_echarts_iaction")
		} else {
			checkboxList.slideUp(200);
			$(this).children(".zuce_echarts_arrow").removeClass("zuce_echarts_iaction")
		}
	})
	/*对比选择对勾*/
	$(document).on('click', '.contrast_time', function() {
		var html = ""
		if($(this).hasClass("contrast_time_action")) {
			$(this).removeClass("contrast_time_action");
		} else {
			$(this).addClass("contrast_time_action");
		}
	})
	/*筛选图标*/
	$(document).on('click', '.sort_type', function() {
		if($(this).hasClass("sort_down")){
			$(this).removeClass("sort_down").addClass("sort_up");
            sortway="asc";
		}else{
			$(this).removeClass("sort_up").addClass("sort_down")
            sortfild=$(this).parent().attr("value");
            sortway="desc";
		}
		$(this).parent().siblings("li").find(".sort_type").removeClass("sort_down sort_up");

        if($(this).parent().attr("data"))
            sortfild=$(this).parent().attr("data");
        else
            sortfild=$(this).parent().attr("value");

		if(page && page.changepage){ page.changepage(1); }
	})
	/*点击显示图表类型(多选)*/
	$(document).on('click', '.zhibiao_btn', function() {
		var checkboxList = $(this).siblings(".checkbox_list");
		if(checkboxList.is(":hidden")) {
			checkboxList.slideDown(200);
			$(this).addClass("zhibiao_btn_action")
		} else {
			checkboxList.slideUp(200);
			$(this).removeClass("zhibiao_btn_action")
		}
	})




	/*弹框点击选择*/
	$(document).on('click', '.change_exam_list li', function() {
		$(this).siblings("li").removeClass("change_exam_btn_action");
		$(this).addClass("change_exam_btn_action");
	})
	/*点击打开渠道类别下拉*/
	$(document).on('click', '.arow_down_open', function() {
		var listdown = $(this).siblings(".realtime_titlist_bottom");
		if (listdown.is(":hidden")) {
			listdown.slideDown(200);
			$(this).addClass("arow_down_close");
		} else{
			listdown.slideUp(200)
			$(this).removeClass("arow_down_close");
		}
	})
	/*问号提示tips*/
    $(document).on("mouseover",".title_hints",function(){
        if($(this).attr("words")=="")return ;
        layer.tips($(this).attr("words"), $(this), {
            tips: [1, '#48a5ff'],
            time: 0
        })
    }).on("mouseleave",".title_hints",function(){
        layer.closeAll("tips");
    })

	/*三级表格tips*/
    $(document).on("mouseover",".three_treelist_titwrap,.three_treelist li,.three_treelist_main li",function(){
    	if($(this)[0].scrollWidth>$(this)[0].offsetWidth){
            layer.tips($(this).text(), $(this), {
                tips: [2, '#48a5ff'],
                time: 0
            })
		}

    }).on("mouseleave",".three_treelist_titwrap,.three_treelist li,.three_treelist_main li",function(){
        layer.closeAll("tips");
    })

    //考试弹窗tips
    $("#exam_select_ul_win,.my_select_ul").on("mouseenter", "a", function () {
        if ($(this).width() < this.scrollWidth) {
            layer.tips($(this).html(), $(this), {
                tips: [2, '#48a5ff'],
                time: 0
            })
        }
    }).on("mouseout", "a", function () {
        layer.closeAll('tips');
    });
    //其他 tips
    $(document).on("mouseenter", ".select_show_tips", function () {
        if ($(this).width() > $(this).parent().width()) {
            layer.tips($(this).html(), $(this), {
                tips: [1, '#48a5ff'],
                time: 0
            })
        }
    }).on("mouseleave", ".select_show_tips", function () {
        layer.closeAll('tips');
    });


    //下拉
    $(".my_select_ul").on("click", "li", function () {
        var key_span =  $(this).parent().siblings("div").find("span");
        key_span.attr("value", $(this).attr("value")).text($(this).text());

        if(key_span.attr("id")=="category_select_name_1"){
            page.changepage(1);
        } else if (key_span.attr("id") == "category_select_name") {
            //顶部选择渠道大类 同时控制表格下拉
            $(".category_select ").attr("value", $(this).attr("value")).text($(this).text());
            //顺便加载类别下的各个渠道(外部js已完成)
            getData();
        } else {
            getData();
        }
    });


    /*日期插件点选样式取消*/
    $(document).on("click","div[id^=layui-laydate]",function(e){
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	});
    $(document).on("click",function(e){
    	if ($(e.target).hasClass("kicon_up"))
    		return ;
		if($(".time_choice").hasClass("kicon_up"))
			$(".kicon_up").removeClass("kicon_up").css("border","1px solid #D9D9D9");
    });
    tipsMany();

});

/*切换考试弹框*/
function changeExam() {
    layer.open({
        title:false,
        btn: false,
        area: ['840px', 'auto'],
        skin: 'bkw_alert',
        shade: [0.5, '#000'],
        scrollbar: false,
        shadeClose:true,
        closeBtn: 0,
        type: 1,
        content: $("#change_exam")
    });
}

// 自定义弹框 layer 无title
function ComOpenWinTuiguang(type,tit, wid, hei, url, btn) {
    layer.closeAll();
    layer.open({
        type: type,
        title: false,
        skin: "bkw_alert",
        shade: [0.5, '#000'],//背景颜色
        closeBtn: btn, //不设置关闭按钮
        shadeClose: true,//点击屏幕关闭弹框
        fix: false,    //是否固定定位
        scrollbar: false, //是否允许屏幕滚动
        move: '.layui-layer-title', //拖拽选择
        moveType: 1,  //拖拽模式 0 1
        area: [wid, hei],
        content: url // 这里content是一个普通的String（普通你妹，这是弹框内容）
        , end: function (index) {
        	$(url).hide();
        }
    });
}

//获取请求参数
function getParam() {

    var o = new Object();
    o.source = $("#category_select_name").attr("value");
    o.extensionsource = $("#channel_select_name").attr("value");
    o.manager = $("#manageTearm_select_name").attr("value");
    o.clienttype = $("#clienttype_select_name").attr("value");
    o.masterid = $("#titlename_id").attr("value");

    //开始结束时间
    o.starttime = ($("#time1").text().split("-")[0]).trim().replace(/\//g, "-");
    o.endtime = ( $("#time1").text().split("-")[1]).trim().replace(/\//g, "-");
    //比对时间
    if ($(".i-compare>i").hasClass("fa-check-square")) {
        o.contrast_startime = ($("#time2").text().split("-")[0]).trim().replace(/\//g, "-");
        o.contrast_endtime = ($("#time2").text().split("-")[1]).trim().replace(/\//g, "-");
    }
    return o;

}

//获取请求参数(不带时间)
function getParamNtime() {

    var o = new Object();
    o.source = $("#category_select_name").attr("value");
    o.extensionsource = $("#channel_select_name").attr("value");
    o.manager = $("#manageTearm_select_name").attr("value");
    o.clienttype = $("#clienttype_select_name").attr("value");
    o.masterid = $("#titlename_id").attr("value");
    return o;

}

/**
 * 新推广页面 , 大部分的layer.tips
 */
function tipsMany(){

	var selector ="section .order_tit .order_tit_list>p:not(first-of-type),.table_onefour ul li";
	$(document).on("mouseenter",selector,function(){
        if ($(this).width() < this.scrollWidth) {
            layer.tips($(this).html(), $(this), {
                tips: [1, '#48a5ff'],
                time: 0
            });
        }
	}).on("mouseleave",selector,function(){
		layer.closeAll("tips");

	})

}

// table_level 新多级表格样式(周推广分析/年推广分析)
$(function (){

    var pdv = document.querySelector(".table_level")    //总表元素
	if(pdv != null)
		pdv.onscroll=function(){
			var heads = document.querySelector(".table_level>.thead")   //表头
			var tbody = pdv.querySelector(".tbody") //表身
			var lis = document.querySelectorAll(".table_level div>li:first-of-type")    //首列元素(含表头)
			var second_lis = document.querySelectorAll(".table_level div>li:nth-of-type(2)") //第二列列元素(含表头)

			$(lis).css("position","absolute" )
			heads.style.position = "absolute"
			tbody.style.marginTop = heads.offsetHeight+"px"

			//3. 第二列元素设置x轴偏移量
			$(second_lis).css("marginLeft", $(lis).eq(0).width()+"px")

			//1. 表头浮动
			heads.style.top=$(pdv).scrollTop()+"px"

			//2. 第一列元素固定定位(含表头)
			var shacss = $(pdv).scrollLeft() == 0 ?"0 0 0 0" : "2px 1px 3px 0px #ccc"

			$(lis).css({"boxShadow": shacss,"left":$(pdv).scrollLeft()+"px"})
		}
})

