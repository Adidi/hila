
var AdminPage = {
    init: function(){
        var inputUserName = document.id('username');
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
                var docId = target.getNext().get('value');
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
                //rearrange all rows numbers
                this.tblList.getElements('.mt-index').each(function(el, i){
                    el.set('text', i + 1);
                });
            }
        }.bind(this));
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    if(document.id('hid-admin')) {
        AdminPage.init();
    }
});