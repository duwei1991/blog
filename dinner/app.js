Ext.application({
    name: 'Sencha',

    launch: function() {
		initMainView();
    }
});

function initTablePanel(){
	
	var touchTeam = Ext.create('Ext.Panel', {		
		 layout: 'vbox',
		items: [
			{
				xtype: 'panel',height:200,
				width:200,style:'background-color:red;margin:20px;',
				html: 'message list',
				flex: 1
			},
			{
				xtype: 'panel',height:200,
				width:200,
				style:'background-color:yellow;margin:20px;',
				html: 'message preview',
				flex: 2
			},
			{
				xtype: 'panel',height:200,
				width:200,
				style:'background-color:red;margin:20px;',
				html: 'message preview',
				flex: 2
			}
		]
		
	});
	
	var tableList = Ext.create('Ext.List',{
		height: 1000,
		store: {
			fields: ['id','name'],
			data: [
				{id:1,name: '一楼'},
				{id:2,name: '二楼'},
				{id:3,name: '三楼'}
			]
		},
		itemTpl: '{name} ' ,		
		listeners: {
			select: function(view, record) {
				//Ext.Msg.alert('Selected!', 'You selected ' + record.get('name'));
			}
		}
	});
	tableList.select(0);
	var allTablePanel = Ext.create('Ext.Panel',{
		layout:'hbox',
		items:[{xtype:'panel',flex:1,items:[tableList]},{xtype:'panel',flex:7,html:'test'}]
	});
	
	return allTablePanel;
}

function initMainView(){
	
	var orderList = Ext.create('Ext.List', {
		height: 1000,
		store: {
			fields: ['name','mobile','tableno','comments'],
			data: [
				{name: '张三',mobile:'13752990111',tableno:'2',comments:'无'},
				{name: '李四',mobile:'13752990121',tableno:'1',comments:'无'},
				{name: '王五',mobile:'13752990311',tableno:'3',comments:'无'},
				{name: '疙瘩',mobile:'13752994111',tableno:'5',comments:'无'}
			]
		},
		ui:'round',
		itemTpl: '{name} 预定 {tableno} 号餐桌，联系电话：{mobile} ，(备注{comments}) ' ,
		onItemDisclosure:function(record,btn,index){
			Ext.Msg.confirm('预约完成','确定客户'+record.get("name")+'已经到达，移出该预约？',
				function(btn){
					if(btn=="yes"){
					orderList.removeAt(0);
					}
				}				
			,this);
		},
		listeners: {
			select: function(view, record) {
				//Ext.Msg.alert('Selected!', 'You selected ' + record.get('name'));
			}
		}
	});
	

	var mainPanel = Ext.create('Ext.TabPanel', {
		activeItem:1,
		fullscreen: true,
		tabBarPosition: 'bottom',
		defaults: {
			styleHtmlContent: true,
			padding:0
		},

		items: [
			{
				id:'badge0',title: '预约',badgeText:3,	
				iconCls: 'user',
				items:[orderList,{docked: 'top', xtype: 'titlebar',title:'预约列表'}]
			},
			{
				id:'badge1',title: '大厅',
				iconCls: 'home',
				items:[initTablePanel(),{docked: 'top', xtype: 'titlebar',title:'餐桌列表'}]
			},
			{
				id:'badge2',title: '点餐',
				iconCls: 'compose',
				items:[{docked: 'top', xtype: 'titlebar',title:'点餐列表'}]
			},
			{
				id:'badge3',title: '结账',
				iconCls: 'action',
				items:[{docked: 'top', xtype: 'titlebar',title:'结账列表'}]
			},
			{	
				id:'badge4',title: '优惠',badgeText:2,				
				iconCls: 'add',
				items:[{docked: 'top', xtype: 'titlebar',title:'优惠列表'}]
			},
			{
				id:'badge5',title: '划菜',
				iconCls: 'arrow_down',badgeText:8,	
				items:[{docked: 'top', xtype: 'titlebar',title:'划菜列表'}]
			}
		]
	});
	Ext.onReady(function(){
		function loop(){
			var a = Math.ceil(Math.random()*100);
			Ext.getCmp('badge0').tab.setBadgeText(a);
		}
		var loopTime=2000;
		window.setInterval(loop,loopTime);
		
		
	});
	
}