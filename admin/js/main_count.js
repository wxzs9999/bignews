$(function(){
//获取统计数量：
$.ajax({
  type:'get',
  url:BigNew.getData,
  success:function(res){
    $('.scolor00 em').text(res.totalArticle);
    $('.scolor01 em').text(res.dayArticle);
    $('.scolor02 em').text(res.totalComment);
    $('.scolor03 em').text(res.dayComment);
  }
})

//折线图 日新增文章数：----------------------------------------
$.ajax({
  type:'get',
  url:BigNew.dayNumber,
  success:function(res){
   if(res.code==200){
    loadEchars(res);
   }
  }
})
function loadEchars(obj) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('curve_show'));
    var data = [];
    var date = [];
    for (var i = 0; i < obj.date.length; i++) {
        data.push(obj.date[i].count);
        date.push(obj.date[i].date);
    }
    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '月新增文章数',
        },

        xAxis: {
            name: '日',
            type: 'category',
            boundaryGap: false,
            data: date
        },
        legend: {
            data: ['新增文章'],
            top: '40'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            },
            right: 50
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        series: [
            {
                name: '新增文章',
                type: 'line',
                smooth: true,
                // symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#f80'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,136,0,0.39)'
                    }, {
                        offset: .34,
                        color: 'rgba(255,180,0,0.25)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(255,222,0,0.00)'
                    }])
                },
                data: data
            }
        ],
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//环形图 分类文章数量比----------------------------------------
$.ajax({
  type:'get',
  url:BigNew.articleNumber,
  success:function(res){
      console.log(res);
      loadEchars2(res) 
  }
})
function loadEchars2(obj){
//1.基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('pie_show'));
//准备数据：
var date1=[];
var date2=[];
for(var i=0;i<obj.date.length;i++){
    date1.push(obj.date[i].name);
    date2.push({value:obj.date[i].articles,name:obj.date[i].name});
}
console.log(date1);
console.log(date2);

option1 = {
    title: {
        left: 'center',
        text: '分类文章数量比',
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        data:date1,
        top: 30
    },
    color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19'],
    series: [
        {
            name: '分类名称',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            data: date2,
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);

}





})