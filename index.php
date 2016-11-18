<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>translator</title>
    <script src="https://code.jquery.com/jquery-3.1.0.js">
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="materialize/css/materialize.css" rel="stylesheet">
    <script src="materialize/css/materialize.js"></script>
    <script src="script/script.js"></script>
    <link href="images/logo.png" rel="icon">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<?php
session_start();
if(!isset($_SESSION['username'])){
header("Location: ../login.php");
}
?>

<ul class="tabs tabs-fixed-width tab-demo z-depth-1">
    <li  class="tab"><a href="/">TRANSLATE</a></li>
    <li class="tab"><a href="../calendar/index.php">CALENDAR</a></li>
    <li class="tab disabled"><a href="#test3">NOTE</a></li>
    <li class="tab"><a href="#test4">LOGIN</a></li>
    <li class="tab"><a href="#test0">LOGOUT</a></li>
    <div class="indicator" style="right: 657.156px; left: 202.844px;"></div></ul>
<div class="form">
    <i class="large material-print"></i>


    <div class="row">
        <div class="col s4 hide-on-small-only"></div>
        <div style="color: #26a69a" class="center-align col s12 m4"><h1>Glossary</h1></div>
        <div class="col s12 m4">
            <div style="width: 333px" class="center-align input-field">
                <i class="material-icons prefix">search</i>
                <input id="searchGlossary" type="text" class="validate">
                <label for="icon_prefix" class="left-align">Search for glossary</label>
            </div>
        </div>
    </div>






    <div class="container">
        <div class="row">
            <input class="autocomplete center offset-s1 col s3 autocomplete-input" id="category" name="category" placeholder="Make a category" type="text"><ul class="autocomplete-content dropdown-content"></ul><ul class="autocomplete-content dropdown-content"></ul>
            <button class="addbutton  offset-s1 col s3 large material-icons btn waves-effect waves-light bold center" id="addToNote" type="submit" onclick="Materialize.toast('Glossed', 1000);">save</button>
            <button class="savebutton offset-s1 col s3 large material-icons btn waves-effect waves-light bold center" id="btn" onclick="window.print();" value="Print">print</button>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div>
                <textarea class="materialize-textarea col s5 validate" id="input" placeholder="translate"></textarea></div>
                <div      class="center col s2 summa">=</div><div>
                <textarea class="materialize-textarea col s5 validate to" id="to"></textarea></div>
                <div      class="input-field col s5" id="asdfg"></div>
                <button   class="col s2 large material-icons btn waves-effect waves-light switch-button" id="swap-butt" style="font-size: 20px">swap_horiz</button>
                <div      class="input-field col s5" id="asdf"></div>
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div id="render"></div>
    </div>
</div>
</body>
</html>
