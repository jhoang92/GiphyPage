var topics = [["Dogs"], ["Cats"], ["Rabbits"], ["Birds"], ["Snakes"]];
renderButtons();

// this will create our buttons from the array
function renderButtons() {
    // emptying our list of buttons
    $('#animalButtons').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>').addClass('animalList');
        button.attr('data-animal', topics[i]);
        button.text(topics[i]);
        $('#animalButtons').append(button);
    }

    //this is going to create a new button each time we enter an animal
    $('#addAnimal').on('click', function (event) {
        event.preventDefault();

        var newAnimal = $('#animal-input').val().trim();

        topics.push(newAnimal);

        renderButtons();
    })
};

//this will gran the animal button created above and give it a click response
$('.animalList').on('click', function () {

    var animal = $(this).attr('data-animal');

    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=Z4PoJ7702VhfPsQTH7YzzVIDWrNZsciw&limit=10' + 'rating=g' + 'rating=pg' + 'rating=pg-13' + 'rating=r' + 'rating=nc-17';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gif = $('<div class="col-md-4">');
            var rating = results[i].rating;

            var p = $('<p>').text('rating: ' + rating);

            var animalGif = $('<img>').addClass('gifTarget');
            animalGif.attr('src', results[i].images.fixed_height.url, results[i].images.fixed_width.url);


            gif.prepend(p);
            gif.prepend(animalGif);

            $('#animals').prepend(gif);
            console.log(rating);
        }
    })
});

$(document).on('click', '.gifTarget', function() {

    var state = $(this).attributes[2].nodeValue('still');

    if (state == 'animate') {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    } else {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    console.log(state);
});