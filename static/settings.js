// Settings


setSettings();

export function setSettings() {
    // Set Theme
    if (sessionStorage.getItem('theme') === 'light') {
        $('.navbar').removeClass('navbar-dark bg-dark').addClass('navbar-light').css("background-color", "#e3f2fd");
        $('body').css('background-color', 'white');
    } else if (sessionStorage.getItem('theme') === 'dark') {
        $('.navbar').removeClass('navbar-light').addClass('navbar-dark bg-dark').css("background-color", "");
        $('body').css('background-color', 'lightgray');
    };
}



// Select Theme
$('#light-mode').click(function(){
    sessionStorage.setItem('theme', 'light');
    setSettings();
})

$('#dark-mode').click(function(){
    sessionStorage.setItem('theme', 'dark');
    setSettings();
})


// Select Board Size
$('#small-board').click(function(){
    sessionStorage.setItem('board', '4');
})

$('#medium-board').click(function(){
    sessionStorage.setItem('board', '6');
})

$('#large-board').click(function(){
    sessionStorage.setItem('board', '8');
})

$('#xlarge-board').click(function(){
    sessionStorage.setItem('board', '12');
})