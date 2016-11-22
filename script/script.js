$(function(){

//ég set ég api key sem api_key og set svo api_key í linkana
    var api_key = 'AIzaSyBr3-PXAxyE2qS33xaGW8FrpmscZFTBI4k';

//hérna renderar hann allar glósur þegar að ég kem inná síðuna
//og focusar hann á input þegar þú ferð á síðu
    $(document).ready(function(){
        $('#input').focus();
        renderText();
    });


//Þtta er construcor sem heitir translate
    function translate(text,from,to,callback){
        var txt = encodeURI(text);

        $.get('https://www.googleapis.com/language/translate/v2?key='+api_key+'&q='+txt+'&source='+from+'&target='+to,
            function (data){
                callback(data.data.translations[0].translatedText);
            });
    }

//Ég segji hér að fromLang sé enska og toLang sé íslenska - það er defult tungumál
    var fromLang = 'en';
    var toLang = 'is';

//hér renderar hann glossary
    function render(){
        var from = $('#input').val();
        //
        translate(from,fromLang,toLang,function(translated){
            $('.from').val(from);
            $('.to').val(translated);
        });
    }
//Þegar ýtt er á enter þá addar hann note og focusar textann og selectar hann allann
    $('#input').on('keyup',function (e){
        render();
        if(e.keyCode==13){
            console.log('keyup')
            $('#addToNote').trigger('click');
            $('#input').focus();
            $('#input').select();
        }
    });

//DELETE
    $('#render').on('click','.del-butt',function(){
        $.ajax({
            url: 'php/deleteGlossary.php',
            data: 'id=' + this.id,
            type: "POST",
            success: function(){
                renderText();
            }
        });
    });

    $(document).on('change','#selectFrom',function(e){
        var x = $('#selectFrom').val();
        fromLang = x;
        render();
    })

    $(document).on('change','#selectTo',function(e){
        var x = $('#selectTo').val();
        toLang = x;
        render();
    })

//SELECT TO
    $.ajax({
        url: 'https://www.googleapis.com/language/translate/v2/languages?key='+api_key+'&target=en',
        data: 'languages',
        type: 'GET',
        success: function(data){
            var render;

            render = "<select id='selectTo'>";
            render += "<option disabled selected>Icelandic</option>";
            for(var i=0;i<data.data.languages.length;i++){
                render += "<option value='"+ data.data.languages[i].language +"'>" + data.data.languages[i].name + "</option>";
            }
            render += "<label>Materialize Select</label></select>";

            $("#asdf").html(render);
        },
        error: function () {
            console.log('error');
        }
    });

//SELECT FROM
    $.ajax({
        url: 'https://www.googleapis.com/language/translate/v2/languages?key='+api_key+'&target=en',
        data: 'languages',
        type: 'GET',
        success: function(data){
            var render;

            render = "<select id='selectFrom'>";
            render += "<option disabled selected>English</option>";
            for(var i=0;i<data.data.languages.length;i++){
                render += "<option value='"+ data.data.languages[i].language +"'>" + data.data.languages[i].name + "</option>";
            }
            render += "<label>Materialize Select</label></select>";

            $("#asdfg").html(render);
        },
        error: function () {
            console.log('error');
        }
    });

//Hér bý ég til note
    $("#addToNote").on('click', function () {
        var from = $("#input").val();
        var to = $("#to").val();
        var category = $("#category").val();
        console.log(from + " - " + to);

        $.ajax({
            url: 'php/addToData.php',
            //data: 'title='+ title + '&start='+ start +'&end='+ end + '&color=' + color,
            data: 'from=' + from + '&to=' + to + '&category=' + category,
            type: "POST",
            success: function(json) {
                console.log(from);
                console.log(to);
                console.log("Cat: " + category);
                console.log(json);
                renderText();
            }
        });
    });

//SWAP BUTTON
    $('#swap-butt').on('click',function(e){
        e.preventDefault();
        $('#selectFrom').val(toLang);
        $('#selectTo').val(fromLang);
        var temp = toLang;
        toLang = fromLang;
        fromLang = temp;
        render();
    })

//RENDER TEXT !!
    function renderText() {
        $.ajax({
            url: 'php/renderNotes.php',
            type: 'GET',
            success: function (data) {
                $("#render").html(data);
            }
        })
    }

//AUTO COMPLETE!!
    $.ajax({
        url: 'php/autoComplete.php',
        type: "GET",
        success: function(data) {
            console.log(data)
            var autoCompleteData = {};
            var list = JSON.parse(data);
            list.forEach(function(item){
                autoCompleteData[item]=null;
            });
            $('#category').autocomplete({
                data: autoCompleteData
            });
        }
    });
});