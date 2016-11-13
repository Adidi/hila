
var MainPage = {
    init: function(){
        this.txtFullName = document.id('txtFullName');
        this.txtFavoriteSong = document.id('txtFavoriteSong');
        this.addBtn = document.id('addBtn');
        this.submit = document.id('submit');
        //set back diable false cause firefox save the states of components
        this.submit.set('disabled',false);
        this.error = document.id('error');
        this.list = document.id('list');
        this.container = document.id('container');
        this.collage = document.id('collage');
        this.collageLarge = document.id('collage-large');
        this.rsvp = document.id('rsvp');
        this.rsvpCont = document.id('rsvpCont');
        this.formaz = document.id('formaz');
        this.successMsg = document.id('successMsg');

        this.txtFullName.focus();
        this.addBtn.addEvent('click',this.addNewPerson.bind(this));
        this.submit.addEvent('click',this.clickSubmit.bind(this));
        this.rsvp.addEvent('click',this.showFormaz.bind(this));
    },

    showFormaz: function(){
        this.rsvpCont.addClass('hide');
        this.formaz.addClass('show');
    },

    addNewPerson: function(){
        this.setError(false);
        if(this.validate()){
            var fullName = this.txtFullName.value.trim(),
                song = this.txtFavoriteSong.value.trim(),
                num = this.list.getElements('li').length + 1,
                li = new Element('li',{styles:{display:'none'}}).set('html',num + '. <span class="full-name">' + fullName + '</span><br /><span class="song">' + song + '</span>');
            li.inject(this.list);
            li.reveal();
            this.txtFullName.value = this.txtFavoriteSong.value = '';
            this.txtFullName.focus();
        }
    },

    validate: function(){
        var fullName = this.txtFullName.value.trim();
        if(!fullName){
            this.setError(true);
            return false;
        }

        return true;
    },

    setError: function(err){
        if(err){
            this.error.addClass('show');
        }
        else{
            this.error.removeClass('show');
        }
    },

    getListItems: function(){
        var arr = [];
        this.list.getElements('li').each(function(li){
            arr.push({
                fullName: li.getElement('.full-name').get('text'),
                song: li.getElement('.song').get('text')
            });
        });

        return arr;
    },

    clickSubmit: function(){
        var fullName = this.txtFullName.value.trim(),
            song = this.txtFavoriteSong.value.trim(),
            list = this.getListItems();

        if(!list.length && !this.validate()){
            return;
        }
        if(fullName){
            list.push({fullName: fullName, song: song});
        }

        this.okSubmit(list);
    },

    okSubmit: function(list){
        this.submit.addClass('send');
        this.submit.set('disabled',true);
        this.container.set('tween',{
            duration: 500,
            onComplete: function(){
                this.successMsg.addClass('show');
                this.collage.addClass('show');
                this.collageLarge.addClass('show');
            }.bind(this)
        });

        this.container.fade('out');

        this.postData(list);
    },

    postData: function(list){
        new Request.JSON({
            url: '/postData',
            onSuccess: function(json){
                console.log(json);
            }
        }).post({data: JSON.encode(list)});
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    if(document.id('hid-main')){
        MainPage.init();
    }
});