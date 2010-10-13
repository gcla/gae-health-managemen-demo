/*!
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.chart.Chart.CHART_URL = '../resources/charts.swf';

Ext.onReady(function(){

    var ds = new Ext.data.JsonStore({
        url : '/json/db/bs',
		root : "data",
        fields:[{name:'created'}, {name:'bs_mgdl', type: 'int'}]
    });

    ds.load();
	
    // extra extra simple
    new Ext.Panel({
        title: '折線圖',
        renderTo: 'container',
        width:500,
        height:300,
        layout:'fit',
        items: {
            xtype: 'linechart',
            store: ds,
            xField: 'created',
            yField: 'bs_mgdl'
        }
    });

});
