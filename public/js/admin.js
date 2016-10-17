
var AdminPage = {
    init: function(){
        let inputUserName = document.id('username');
        if(inputUserName){
            inputUserName.focus();
        }
        else{
            this.initTable();
        }
    },

    initTable: function(){
        this.total = document.id('total');
        this.tblList = document.id('tblList');
        this.tblList.addEvent('click:relay(.mt-delete)', function(event,target){
            if(confirm('Delete Guest ?')){
                //inside input hidden next to the button
                let docId = target.getNext().get('value');
                new Request.JSON({
                    url: '/admin',
                    emulation: false, //set emulation false to allow http delete method!
                    onSuccess: function(json){

                    }
                }).delete({docid: docId});

                //remove all row from dom
                target.getParent('.mt-row').dispose();
                //update counter
                this.total.set('text',Number(this.total.get('text')) - 1);
            }
        }.bind(this));
    }
};

window.addEvent('domready',function(){
    AdminPage.init();
});