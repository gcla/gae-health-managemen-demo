/*!
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
// Sample desktop configuration
MyDesktop = new Ext.app.App({
	init :function(){
		Ext.QuickTips.init();
	},

	getModules : function(){
		return [
			new MyDesktop.GridWindowBP(),
			new MyDesktop.GridWindowPF(),
			new MyDesktop.GridWindowFO(),
			new MyDesktop.GridWindowBS(),
			new MyDesktop.GridWindowBK(),
			new MyDesktop.GridWindowRU(),
			new MyDesktop.YoutubeWindow(),
			new MyDesktop.VideoWindow()
		];
	},

    // config for the start menu
    getStartConfig : function(){
        return {
            title: 'Demo',
            iconCls: 'user',
            toolItems: [{
                text:'Settings',
                iconCls:'settings',
                scope:this
            },'-',{
                text:'Logoutd',
                iconCls:'logout',
                scope:this
            }]
        };
    }
});

/*
 *  bp
 */
MyDesktop.GridWindowBP = Ext.extend(Ext.app.Module, {
    id:'bp-win',
    init : function(){
        this.launcher = {
            text: 'Blood Pressure',
            iconCls: 'icon-bp',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bp-win');

		//jsonReader
		var JsonReader = new Ext.data.JsonReader(
			{root : "data"},
			[{ name: 'bp_sys', type: 'int'},
			 { name: 'bp_dia', type: 'int'},
			 { name: 'bp_pul', type: 'int'},
			 { name: 'created', type: 'date'}]
		);

		var Httpproxy = new Ext.data.HttpProxy({
            url : '../json/db/bp/30'
        });// HttpProxy

		var ds = new Ext.data.Store({
            proxy : Httpproxy,
            reader : JsonReader
        });
		ds.load();

		var dsChart = new Ext.data.JsonStore({
			url : '../json/db/bp/30',
			root : "data",
			fields:[{name:'created', type: 'date'},
					{name: 'bp_sys', type: 'int'},
					{name: 'bp_sysT', type: 'int'},
					{name: 'bp_sysB', type: 'int'},
					{name: 'bp_dia', type: 'int'},
					{name: 'bp_diaT', type: 'int'},
					{name: 'bp_diaB', type: 'int'},
					{name: 'bp_pul', type: 'int'},
					{name: 'bp_pulT', type: 'int'},
					{name: 'bp_pulB', type: 'int'}]
		});
		dsChart.setDefaultSort("created",　"ASC");
		dsChart.load();
		
		var colModel = new Ext.grid.ColumnModel([	
			new Ext.grid.RowNumberer(),		
			{header : "sis",width : 50,sortable : true,dataIndex : 'bp_sys'}, 
			{header : "dia",width : 50,sortable : true,dataIndex : 'bp_dia'}, 
			{header : "pul",width : 50,sortable : true,dataIndex : 'bp_pul'},
			{header : "created time",width : 100,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),sortable : true,dataIndex : 'created'}
		]);
		
		var record = new Ext.grid.GridPanel({
			title: "Blood Pressure Record",
            width: 350,
            height:468,
			rowspan: 3,
            ds: ds,
            cm: colModel,
            viewConfig: {
                forceFit:true
            }
        });
		
		//SYS
		var chartSys = new Ext.chart.LineChart({
			id: 'chartSys',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('c')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bp_sys',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bp_sys') {
					return 'SYS ' + Ext.util.Format.number(record.data.bp_sys, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} if (series.yField == 'bp_sysT') {
					return 'SYS ' + Ext.util.Format.number(record.data.bp_sysT, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} else {
					return 'SYS ' + Ext.util.Format.number(record.data.bp_sysB, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Lowest standards',
				yField: 'bp_sysB',
				style: {
					size:5,
					borderColor: 0xBCBCBC,
					color: 0xBCBCBC,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Highest standards',
				yField: 'bp_sysT',
				style: {
					size:5,
					borderColor: 0x8F8F8F,
					color: 0x8F8F8F,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'SYS',
				yField: 'bp_sys',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//dia
		var chartDia = new Ext.chart.LineChart({
			id: 'chartDia',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bp_dia',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bp_dia') {
					return 'Dia ' + Ext.util.Format.number(record.data.bp_dia, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} if (series.yField == 'bp_diaT') {
					return 'Dia ' + Ext.util.Format.number(record.data.bp_diaT, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} else {
					return 'Dia ' + Ext.util.Format.number(record.data.bp_diaB, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Lowest standards',
				yField: 'bp_diaB',
				style: {
					size:5,
					borderColor: 0xBCBCBC,
					color: 0xBCBCBC,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Highest standards',
				yField: 'bp_diaT',
				style: {
					size:5,
					borderColor: 0x8F8F8F,
					color: 0x8F8F8F,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'DIA',
				yField: 'bp_dia',
				style: {
					size:7,
					borderColor: 0x00CC00,
					color: 0x00CC00,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//pul
		var chartPul = new Ext.chart.LineChart({
			id: 'chartPul',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bp_pul',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bp_pul') {
					return 'Pulse ' + Ext.util.Format.number(record.data.bp_pul, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} if (series.yField == 'bp_pulT') {
					return 'Pulse ' + Ext.util.Format.number(record.data.bp_pulT, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} else {
					return 'Pulse ' + Ext.util.Format.number(record.data.bp_pulB, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Lowest standards',
				yField: 'bp_pulB',
				style: {
					size:5,
					borderColor: 0xBCBCBC,
					color: 0xBCBCBC,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Highest standards',
				yField: 'bp_pulT',
				style: {
					size:5,
					borderColor: 0x8F8F8F,
					color: 0x8F8F8F,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Pul',
				yField: 'bp_pul',
				style: {
					size:7,
					borderColor: 0x0000CC,
					color: 0x0000CC,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
        if(!win){
            win = desktop.createWindow({
                id: 'bp-win',
                title:'Blood Pressure',
                width:800,
                height:500,
                iconCls: 'icon-bp',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'table',
                layoutConfig: {columns:2},
                items:[record,chartSys,chartDia,chartPul]
            });
        }
        win.show();
    }
});

/*
 *  pf
 */
MyDesktop.GridWindowPF = Ext.extend(Ext.app.Module, {
    id:'pf-win',
    init : function(){
        this.launcher = {
            text: 'Asthma',
			iconCls: 'icon-pf',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('pf-win');
		
		//jsonReader
		var JsonReader = new Ext.data.JsonReader(
			{root : "data"},
			[{ name: 'pf_pef', type: 'int'},
			 { name: 'pf_fevl', type: 'float'},
			 { name: 'created', type: 'date'}
			]
		);// 

		var Httpproxy = new Ext.data.HttpProxy(
		{
            url : '../json/db/pf/30'
        });// HttpProxy

		var ds = new Ext.data.Store(
		{
            proxy : Httpproxy,
            reader : JsonReader
        });
		ds.load();

		var dsChart = new Ext.data.JsonStore({
			url : '../json/db/pf/30',
			root : "data",
			fields:[{name:'created', type: 'date'},
					{ name: 'pf_pef', type: 'int'},
					{ name: 'pf_fevl', type: 'float'}]
		});
		dsChart.setDefaultSort("created",　"ASC");
		dsChart.load();
		
		var colModel = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),		
			{header : "pef",width : 80,sortable : true,dataIndex : 'pf_pef'}, 
			{header : "fevl",width : 80,sortable : true,dataIndex : 'pf_fevl'},
			{header : "created time",width : 90,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),sortable : true,dataIndex : 'created'}
		]);
		
		var record = new Ext.grid.GridPanel({
			title: "Asthma Record",
            width: 350,
            height:468,
			rowspan: 2,
            ds: ds,
            cm: colModel,
            viewConfig: {
                forceFit:true
            }
        });
		
		//Pef
		var chartPef = new Ext.chart.LineChart({
			id: 'chartPef',
            width: 436,
            height:234,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'pf_pef',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'pf_pef') {
					return 'Pef ' + Ext.util.Format.number(record.data.pf_pef, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'PEF',
				yField: 'pf_pef',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//Fevl
		var chartFevl = new Ext.chart.LineChart({
			id: 'chartFevl',
            width: 436,
            height:234,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'pf_fevl',
				labelRenderer: Ext.util.Format.numberRenderer('0,0.00')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'pf_fevl') {
					return 'Fevl ' + Ext.util.Format.number(record.data.pf_fevl, '0,0.00') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Fevl',
				yField: 'pf_fevl',
				style: {
					size:7,
					borderColor: 0x00CC00,
					color: 0x00CC00,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		if(!win){
            win = desktop.createWindow({
                id: 'pf-win',
                title:'Asthma',
                width:800,
                height:500,
                iconCls: 'icon-pf',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'table',
                layoutConfig: {columns:2},
                items:[record,chartPef,chartFevl]
            });
        }
        win.show();
    }
});

/*
 *  fo
 */
MyDesktop.GridWindowFO = Ext.extend(Ext.app.Module, {
    id:'fo-win',
    init : function(){
        this.launcher = {
            text: 'Fora meter',
            iconCls: 'icon-fo',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('fo-win');
		//jsonReader
		var JsonReader = new Ext.data.JsonReader(
			{root : "data"},
			[{ name: 'fo_meter', type: 'float'},
			 { name: 'created', type: 'date'}
			]);

    
		var Httpproxy = new Ext.data.HttpProxy({
            url : '../json/db/fo/30'
        });// HttpProxy

		var ds = new Ext.data.Store({
			proxy : Httpproxy,
            reader : JsonReader
        });
		ds.load();
		
		var dsChart = new Ext.data.JsonStore({
			url : '../json/db/fo/30',
			root : "data",
			fields:[{name:'created', type: 'date'},
					{ name: 'fo_meter', type: 'float'},
					{ name: 'fo_meterT', type: 'float'},
					{ name: 'fo_meterB', type: 'float'}]
		});
		dsChart.setDefaultSort("created",　"ASC");
		dsChart.load();
	
		var colModel = new Ext.grid.ColumnModel([
		    new Ext.grid.RowNumberer(),		
			{header : "meter title",width : 80,sortable : true,dataIndex : 'fo_meter'}, 
			{header : "created title",width : 90,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),sortable : true,dataIndex : 'created'}
		]);

		var record = new Ext.grid.GridPanel({
			title: "FORA meter Record",
            width: 350,
            height:468,
            ds: ds,
            cm: colModel,
            viewConfig: {
                forceFit:true
            }
        });
		
		//meter
		var chartMeter = new Ext.chart.LineChart({
			id: 'chartMeter',
            width: 436,
            height:468,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'fo_meter',
				labelRenderer: Ext.util.Format.numberRenderer('0,0.0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'fo_meter') {
					return Ext.util.Format.number(record.data.fo_meter, '0,0.0') + ' ℃ in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} if (series.yField == 'fo_meterT') {
					return Ext.util.Format.number(record.data.fo_meterT, '0,0.0') + ' ℃ in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} else {
					return Ext.util.Format.number(record.data.fo_meterB, '0,0.0') + ' ℃ in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Lowest standards',
				yField: 'fo_meterB',
				style: {
					size:5,
					borderColor: 0xBCBCBC,
					color: 0xBCBCBC,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Highest standards',
				yField: 'fo_meterT',
				style: {
					size:5,
					borderColor: 0x8F8F8F,
					color: 0x8F8F8F,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Meter',
				yField: 'fo_meter',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
				
		if(!win){
            win = desktop.createWindow({
                id: 'fo-win',
                title:'FORA meter',
                width:800,
                height:500,
                iconCls: 'icon-fo',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'table',
                layoutConfig: {columns:2},
                items:[record,chartMeter]
            });
        }
        win.show();
    }
});

/*
 *  bs
 */
MyDesktop.GridWindowBS = Ext.extend(Ext.app.Module, {
    id:'bs-win',
    init : function(){
        this.launcher = {
            text: 'Blood Suger',
            iconCls:'icon-bloods',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('bs-win');

		//jsonReader
		var JsonReader = new Ext.data.JsonReader(
			{root : "data"},
			[{ name: 'bs_mgdl', type: 'int'},
			 { name: 'created', type: 'date'}]
		);

		var Httpproxy = new Ext.data.HttpProxy(
		{
            url : '../json/db/bs/30'
        });// HttpProxy

		var ds = new Ext.data.Store(
		{
            proxy : Httpproxy,
            reader : JsonReader
        });
		ds.load();
		
		var dsChart = new Ext.data.JsonStore({
			url : '../json/db/bs/30',
			root : "data",
			fields:[{name:'created', type: 'date'},
					{ name: 'bs_mgdl', type: 'int'},
					{ name: 'bs_mgdlT', type: 'int'},
					{ name: 'bs_mgdlB', type: 'int'}]
		});
		dsChart.setDefaultSort("created",　"ASC");
		dsChart.load();

		var colModel = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),		
			{header : "Blood Suger",width : 80,sortable : true,dataIndex : 'bs_mgdl'}, 
			{header : "created time",width : 90,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),sortable : true,dataIndex : 'created'}
		]);
		
		var record = new Ext.grid.GridPanel({
			title: "Blood Suger Record",
            width: 350,
            height:468,
            ds: ds,
            cm: colModel,
            viewConfig: {
                forceFit:true
            }
        });
		
		//Mgdl
		var chartMgdl = new Ext.chart.LineChart({
			id: 'chartMgdl',
            width: 436,
            height:468,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bs_mgdl',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bs_mgdl') {
					return Ext.util.Format.number(record.data.bs_mgdl, '0,0') + ' mgdl in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} if (series.yField == 'bs_mgdlT') {
					return Ext.util.Format.number(record.data.bs_mgdlT, '0,0') + ' mgdl in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				} else {
					return Ext.util.Format.number(record.data.bs_mgdlB, '0,0') + ' mgdl in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Lowest standards',
				yField: 'bs_mgdlB',
				style: {
					size:5,
					borderColor: 0xBCBCBC,
					color: 0xBCBCBC,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Highest standards',
				yField: 'bs_mgdlT',
				style: {
					size:5,
					borderColor: 0x8F8F8F,
					color: 0x8F8F8F,
					fillColor: 0xffffff
				}
			}, {
				type: 'line',
				displayName: 'Mgdl',
				yField: 'bs_mgdl',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		if(!win){
            win = desktop.createWindow({
                id: 'bs-win',
                title:'Blood Suger',
                width:800,
                height:500,
                iconCls:'icon-bloods',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'table',
                layoutConfig: {columns:2},
                items:[record,chartMgdl]
            });
        }
        win.show();
    }
});

/*
 *  bk
 */
MyDesktop.GridWindowBK = Ext.extend(Ext.app.Module, {
    id:'bk-win',
    init : function(){
        this.launcher = {
            text: 'Bike Information',
            iconCls: 'icon-bk',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bk-win');

		//jsonReader
		var JsonReader = new Ext.data.JsonReader(
			{root : "data"},
			[{ name: 'bike_calories', type: 'int'},
			 { name: 'bike_distance', type: 'float'},
			 { name: 'bike_heartbeat', type: 'int'},
			 { name: 'bike_totaltime', type: 'float'},
			 { name: 'created', type: 'date'}]
		);

		var Httpproxy = new Ext.data.HttpProxy({
            url : '../json/db/bk/30'
        });// HttpProxy

		var ds = new Ext.data.Store({
            proxy : Httpproxy,
            reader : JsonReader
        });
		ds.load();

		var dsChart = new Ext.data.JsonStore({
			url : '../json/db/bk/10',
			root : "data",
			fields:[{name:'created', type: 'date'},
					{name: 'bike_calories', type: 'int'},
					{name: 'bike_distance', type: 'float'},
					{name: 'bike_heartbeat', type: 'int'},
					{name: 'bike_totaltime', type: 'float'}]
		});
		dsChart.setDefaultSort("created",　"ASC");
		dsChart.load();
		
		var colModel = new Ext.grid.ColumnModel([	
			new Ext.grid.RowNumberer(),		
			{header : "calories",width : 50,sortable : true,dataIndex : 'bike_calories'}, 
			{header : "distance",width : 50,sortable : true,dataIndex : 'bike_distance'}, 
			{header : "heartbeat",width : 50,sortable : true,dataIndex : 'bike_heartbeat'},
			{header : "totaltime",width : 50,sortable : true,dataIndex : 'bike_totaltime'},
			{header : "created time",width : 100,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),sortable : true,dataIndex : 'created'}
		]);
		
		var record = new Ext.grid.GridPanel({
			title: "Bike Record",
            width: 350,
            height:312,
			rowspan: 2,
            ds: ds,
            cm: colModel,
            viewConfig: {
                forceFit:true
            }
        });
		
		//distance
		var chartBKDistance = new Ext.chart.LineChart({
			id: 'chartBKDistance',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('c')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bike_distance',
				labelRenderer: Ext.util.Format.numberRenderer('0,0.0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bike_distance') {
					return Ext.util.Format.number(record.data.bike_distance, '0,0.0') + ' Km in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Distance',
				yField: 'bike_distance',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//totaltime
		var chartBKTotaltime = new Ext.chart.LineChart({
			id: 'chartBKTotaltime',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bike_totaltime',
				labelRenderer: Ext.util.Format.numberRenderer('0,0.0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bike_totaltime') {
					return Ext.util.Format.number(record.data.bike_totaltime, '0,0.0') + ' minute in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Totaltime',
				yField: 'bike_totaltime',
				style: {
					size:7,
					borderColor: 0x00CC00,
					color: 0x00CC00,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//heartbeat
		var chartBKHeartbeat = new Ext.chart.LineChart({
			id: 'chartBKHeartbeat',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('c')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bike_heartbeat',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bike_heartbeat') {
					return 'Heartbeat ' + Ext.util.Format.number(record.data.bike_distance, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Heartbeat',
				yField: 'bike_heartbeat',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//calories
		var chartBKCalories = new Ext.chart.LineChart({
			id: 'chartBKCalories',
            width: 350,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'bike_calories',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'bike_calories') {
					return Ext.util.Format.number(record.data.bike_calories, '0,0') + ' Calories in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Calories',
				yField: 'bike_calories',
				style: {
					size:7,
					borderColor: 0x00CC00,
					color: 0x00CC00,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
        if(!win){
            win = desktop.createWindow({
                id: 'bk-win',
                title:'Bike Information',
                width:800,
                height:500,
                iconCls: 'icon-bk',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'table',
                layoutConfig: {columns:2},
                items:[record,chartBKDistance,chartBKTotaltime,chartBKCalories,chartBKHeartbeat]
            });
        }
        win.show();
    }
});

/*
 *  RU
 */
MyDesktop.GridWindowRU = Ext.extend(Ext.app.Module, {
    id:'ru-win',
    init : function(){
        this.launcher = {
            text: 'Run Information',
            iconCls: 'icon-ru',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('ru-win');

		//jsonReader
		var JsonReader = new Ext.data.JsonReader(
			{root : "data"},
			[{ name: 'run_calories', type: 'int'},
			 { name: 'run_avg_step', type: 'float'},
			 { name: 'run_heartbeat', type: 'int'},
			 { name: 'run_totaltime', type: 'float'},
			 { name: 'created', type: 'date'}]
		);

		var Httpproxy = new Ext.data.HttpProxy({
            url : '../json/db/ru/30'
        });// HttpProxy

		var ds = new Ext.data.Store({
            proxy : Httpproxy,
            reader : JsonReader
        });
		ds.load();

		var dsChart = new Ext.data.JsonStore({
			url : '../json/db/ru/10',
			root : "data",
			fields:[{name:'created', type: 'date'},
					{name: 'run_calories', type: 'int'},
					{name: 'run_avg_step', type: 'float'},
					{name: 'run_heartbeat', type: 'int'},
					{name: 'run_totaltime', type: 'float'}]
		});
		dsChart.setDefaultSort("created",　"ASC");
		dsChart.load();
		
		var colModel = new Ext.grid.ColumnModel([	
			new Ext.grid.RowNumberer(),		
			{header : "calories",width : 50,sortable : true,dataIndex : 'run_calories'}, 
			{header : "Average Step",width : 50,sortable : true,dataIndex : 'run_avg_step'}, 
			{header : "heartbeat",width : 50,sortable : true,dataIndex : 'run_heartbeat'},
			{header : "totaltime",width : 50,sortable : true,dataIndex : 'run_totaltime'},
			{header : "created time",width : 100,renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),sortable : true,dataIndex : 'created'}
		]);
		
		var record = new Ext.grid.GridPanel({
			title: "Run Record",
            width: 350,
            height:312,
			rowspan: 2,
            ds: ds,
            cm: colModel,
            viewConfig: {
                forceFit:true
            }
        });
		
		//Average Step
		var chartRUAvgStep = new Ext.chart.LineChart({
			id: 'chartRUAvgStep',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('c')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'run_avg_step',
				labelRenderer: Ext.util.Format.numberRenderer('0,0.0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'run_avg_step') {
					return Ext.util.Format.number(record.data.run_avg_step, '0,0.0') + ' Km in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Average Step',
				yField: 'run_avg_step',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//totaltime
		var chartRUTotaltime = new Ext.chart.LineChart({
			id: 'chartRUTotaltime',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'run_totaltime',
				labelRenderer: Ext.util.Format.numberRenderer('0,0.0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'run_totaltime') {
					return Ext.util.Format.number(record.data.run_totaltime, '0,0.0') + ' minute in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Totaltime',
				yField: 'run_totaltime',
				style: {
					size:7,
					borderColor: 0x00CC00,
					color: 0x00CC00,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//heartbeat
		var chartRUHeartbeat = new Ext.chart.LineChart({
			id: 'chartRUHeartbeat',
            width: 436,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('c')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'run_heartbeat',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'run_heartbeat') {
					return 'Heartbeat ' + Ext.util.Format.number(record.data.run_distance, '0,0') + ' in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Heartbeat',
				yField: 'run_heartbeat',
				style: {
					size:7,
					borderColor: 0xCC0000,
					color: 0xCC0000,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
		//calories
		var chartRUCalories = new Ext.chart.LineChart({
			id: 'chartRUCalories',
            width: 350,
            height:156,
			store: dsChart,
			xField: 'created',
			/*xAxis: new Ext.chart.TimeAxis({
				labelRenderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
			}),*/
			yAxis: new Ext.chart.NumericAxis({
				displayName: 'run_calories',
				labelRenderer: Ext.util.Format.numberRenderer('0,0')
			}),
			tipRenderer: function(chart, record, index, series) {
				if (series.yField == 'run_calories') {
					return Ext.util.Format.number(record.data.run_calories, '0,0') + ' Calories in ' + Ext.util.Format.date(record.data.created,'Y-m-d H:i');
				}
			},
			extraStyle: {
				padding: 10,
				animationEnabled: true,
				font: {
					name: 'Tahoma',
					color: 0x444444,
					size: 11
				},
				legend: {
					display: 'bottom'
				},
				dataTip: {
					padding: 5,
					border: {
						color: 0x99bbe8,
						size: 1
					},
					background: {
						color: 0xDAE7F6,
						alpha: .9
					},
					font: {
						name: 'Tahoma',
						color: 0x15428B,
						size: 10,
						bold: true
					}
				},
				xAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xeeeeee }
				},
				yAxis: {
					color: 0x69aBc8,
					majorTicks: { color: 0x69aBc8, length: 4 },
					minorTicks: { color: 0x69aBc8, length: 2 },
					majorGridLines: { size: 1, color: 0xdfe8f6 }
				}
			},
			series: [{
				type: 'line',
				displayName: 'Calories',
				yField: 'run_calories',
				style: {
					size:7,
					borderColor: 0x00CC00,
					color: 0x00CC00,
					fillColor: 0xffffff,
					mode: 'stretch'
				}
			}]

		});
		
        if(!win){
            win = desktop.createWindow({
                id: 'ru-win',
                title:'Run Information',
                width:800,
                height:500,
                iconCls: 'icon-ru',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                layout: 'table',
                layoutConfig: {columns:2},
                items:[record,chartRUAvgStep,chartRUTotaltime,chartRUCalories,chartRUHeartbeat]
            });
        }
        win.show();
    }
});

Ext.ns( 'Ext.ux' );

/* -NOTICE-
 * For HTML5 video to work, your server must
 * send the right content type, for more info see:
 * https://developer.mozilla.org/En/HTML/Element/Video
 */
Ext.ux.HTML5VideoPanel = Ext.extend( Ext.Panel, {

    constructor: function( config ) {
        Ext.ux.HTML5VideoPanel.superclass.constructor.call( this, Ext.applyIf( config, {
            width: '100%',
            height: '100%',
            autoplay: false,
            controls: true,
            bodyStyle: 'background-color:#000;color:#fff',
            html: '',
            suggestChromeFrame: false
        } ) );
        this.on( 'render', this._render, this );
        this.on( 'beforedestroy', function() { this.video = null; }, this );
        this.on( 'bodyresize', function( panel, width, height ) {
            if ( this.video )
                this.video.setSize( width, height );
        }, this );
    },

    _render: function() {
        var fallback = '';
        if ( this.fallbackHTML ) {
            fallback = this.fallbackHTML;
        } else {
            fallback = "Your browser doesn't support html5 video. ";
            if ( Ext.isIE && this.suggestChromeFrame ) {
                /* chromeframe requires that your site have a special tag in the header
                 * see http://code.google.com/chrome/chromeframe/ for details
                 */
                fallback += '<a href="http://www.google.com/chromeframe"'
                     + '>Get Google Chrome Frame for IE</a>';
            } else if ( Ext.isChrome ) {
                fallback += '<a href="http://www.google.com/chrome"'
                     + '>Upgrade Chrome</a>';
            } else if ( Ext.isGecko ) {
                fallback += '<a href="http://www.mozilla.com/en-US/firefox/upgrade.html"'
                     + '>Upgrade to Firefox 3.5</a>';
            } else {
                fallback += '<a href="http://www.mozilla.com/en-US/firefox/upgrade.html"'
                     + '>Get Firefox 3.5</a>';
            }
        }

        /* match the video size to the panel dimensions */
        var size = this.getSize();

        var cfg = Ext.copyTo( {
            tag: 'video',
            width: size.width,
            height: size.height
        }, this, 'poster,start,loopstart,loopend,playcount,autobuffer,loop' );

        /* just having the params exist enables them */
        if ( this.autoplay )
            cfg.autoplay = 1;
        if ( this.controls )
            cfg.controls = 1;

        /* handle multiple sources */
        if ( Ext.isArray( this.src ) ) {
            cfg.children = [];
            for ( var i = 0, len = this.src.length; i < len; i++ ) {
                if ( !Ext.isObject( this.src[ i ] ) )
                    throw "source list passed to html5video panel must be an array of objects";
                cfg.children.push( Ext.applyIf( { tag: 'source' }, this.src[ i ] ) );
            }
            cfg.children.push( { html: fallback } );
        } else {
            cfg.src = this.src;
            cfg.html = fallback;
        }

        this.video = this.body.createChild( cfg );
    }

} );

Ext.reg( 'html5video', Ext.ux.HTML5VideoPanel );

MyDesktop.VideoWindow = Ext.extend( Ext.app.Module, {

    id: 'video-win',
    init: function(){
        this.launcher = {
            text: 'Video Window',
            iconCls: 'icon-grid',
            handler: this.createWindow,
            scope: this
        };
    },

    createWindow: function() {
        var win, tipWidth = 160, tipHeight = 96;

        /* createWindow uses renderTo, so it is immediately rendered */
        win = this.app.getDesktop().createWindow({
            title: 'Video Window',
            width: 740,
            height: 480,
            iconCls: 'icon-grid',
            shim: false,
            animCollapse: false,
            border: false,
            constrainHeader: true,
            layout: 'fit',
            items: [{
                xtype: 'html5video',
                src: [
                    // firefox
                    { src: 'http://xant.us/files/google_main.ogv', type: 'video/ogg' },
                    // chrome and webkit-nightly
                    { src: 'http://xant.us/files/google_main.mgv', type: 'video/mp4' }
					
                ],
                autobuffer: true,
                autoplay: true,
                controls: true, /* default */
                listeners: {
                    afterrender: function() {
                        var win = this.ownerCt;
                        win.videoEl = this.video.dom;

                        win.tip = new Ext.ToolTip({
                            anchor: 'bottom',
                            autoHide: true,
                            hideDelay: 300,
                            height: tipHeight,
                            width: tipWidth,
                            bodyCfg: {
                                tag: 'canvas',
                                width: tipWidth,
                                height: tipHeight
                            },
                            listeners: {
                                afterrender: function() {
                                    /* get the canvas 2d context */
                                    win.ctx = this.body.dom.getContext( '2d' );
                                }
                            }
                        });
                    }
                }
            }],
            listeners: {
                beforedestroy: function() {
                    win.tip = win.ctx = win.videoEl = null;
                }
            }
        });

        win.show();

        win.tip.initTarget( win.taskButton.el );
        win.tip.on( 'show', this.renderPreview.createDelegate( this, [ win ] ) );
    },

    renderPreview: function( win ) {
        if ( ( win.tip && !win.tip.isVisible() ) || !win.videoEl )
            return;

        if ( win.ctx )
            win.ctx.drawImage( win.videoEl, 0, 0, win.tip.width, win.tip.height );

        /* 20ms to keep the tooltip video smooth */
        this.renderPreview.defer( 20, this, [ win ] );
    }

});

var DEVELOPER_KEY = 'AI39si6Wdgo0IIMzvKzOhGlFz97x0SjBZqNuiXvhJxXNd4KXrkcQCXsOnJtP4FlBhZbiA7uE3wGkLzH5dIF06TvAzs5IFBrgJg';

MyDesktop.YoutubeWindow = Ext.extend(Ext.app.Module, {
    id:'ytt-win',
    init : function(){
        this.launcher = {
            text: 'Consultation',
            iconCls:'icon-Consultation',
            handler : this.createWindow,
            scope: this
        }
    },
	
    createWindow : function(){
        
		var playerPanel = new Ext.ux.YoutubePlayer({
			developerKey : DEVELOPER_KEY,	
			playerId	 : 'myplayer',
			border		 : false,
			ratioMode    : 'strict',
			hideMode     : 'visibility',
			bgColor 	 : "#000000",
			bodyStyle 	 : 'background-color:#000000;'
		});
        
		var desktop = this.app.getDesktop();
        
		var win = desktop.getWindow('ytt-win');
		if(!win){
            win = desktop.createWindow({
                id: 'ytt-win',
                title:'Consultation',
                width:400,
                height:340,
				iconCls:'icon-Consultation',
                shim:false,
                animCollapse:false,
                border:false,
                constrainHeader:true,
				minimizable: true,
                layout: 'fit',
                items: [playerPanel],
                bbar	 : new Ext.ux.YoutubePlayer.Control({
					player   : playerPanel,
					border	 : false,
					id 		 : 'control', 
					style	 : 'border:none;'
                }),
                listeners   : {
					'resize': function(){this.bottomToolbar.fireEvent('resize')}
    	        }
            });
        }
		//EVoDGmZiI3w lTLaGTanR10 I66YV-ohtUc
		
		playerPanel.on('ready', function(panel, player) {
				panel.cueVideoById('lTLaGTanR10', 0);
			}, 
			playerPanel
		);
		
        win.show();
    }
});
