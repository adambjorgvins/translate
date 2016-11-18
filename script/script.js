$(function(){


    var api_key = 'AIzaSyBr3-PXAxyE2qS33xaGW8FrpmscZFTBI4k';

    window.onload = function() {
        renderText();
    };

    $('#input').focus();

    function translate(text,from,to,callback){
        var txt = encodeURI(text);

        $.get('https://www.googleapis.com/language/translate/v2?key='+api_key+'&q='+txt+'&source='+from+'&target='+to,
            function (data){
                callback(data.data.translations[0].translatedText);
            });
    }

    // Valið er frá ensku á íslensku.. og notandinn getur breytt því
    var fromLang = 'en';
    var toLang = 'is';

    function render(){
        console.log('rendered')
        var from = $('#input').val();
        translate(from,fromLang,toLang,function(translated){
            $('.from').val(from);
            $('.to').val(translated);
        });
    }

    $('#input').on('keyup',function (e){
        render();
        if(e.keyCode==13){
            console.log('keyup')
            $('#addToNote').trigger('click');
            $('#input').focus();
            $('#input').select();
        }
    });

    $('#render').on('click','.del-butt',function(){
       console.log("DELETEED");
        console.log( this.id );
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
                //console.log("Event Add -- Date: " + start + " - " + end);
                renderText();
            }
        });
    });

    $('#swap-butt').on('click',function(e){
        e.preventDefault();
        $('#selectFrom').val(toLang);
        $('#selectTo').val(fromLang);
        var temp = toLang;
        toLang = fromLang;
        fromLang = temp;
        render();
    })

    function renderText() {
        $.ajax({
            url: 'php/renderNotes.php',
            type: 'GET',
            success: function (data) {
                console.log("Rendered!");
                $("#render").html(data);
            }
        })
    }

    $.ajax({
        url: 'php/autoComplete.php',
        type: "GET",
        success: function(data) {
            console.log(data)
            var autoCompleteData = {};
            var list = JSON.parse(data);
            list.forEach(function(item){
                console.log("["+item+"]");
                autoCompleteData[item]=null;
            });
            $('#category').autocomplete({
                data: autoCompleteData
            });
        }
    });
});