var animalArray = [["Dogs"], ["Cats"], ["Rabbits"], ["Birds"], ["Snakes"]];
renderButtons();

// this will create our buttons from the array
function renderButtons() {
    // emptying our list of buttons
    $('#animalButtons').empty();

    for (var i = 0; i < animalArray.length; i++) {
        var button = $('<button>').addClass('animalList');
        button.attr('data-animal', animalArray[i]);
        button.text(animalArray[i]);
        $('#animalButtons').append(button);
    }

    //this is going to create a new button each time we enter an animal
    $('#addAnimal').on('click', function(event) {
        event.preventDefault();

        var newAnimal = $('#animal-input').val().trim();

        animalArray.push(newAnimal);

        renderButtons();
    })
};

//this will gran the animal button created above and give it a click response
$('.animalList').on('click', function() {
    
    var animal = $(this).attr('data-animal');
    
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=Z4PoJ7702VhfPsQTH7YzzVIDWrNZsciw&limit=10';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gif = $('<div class="gifs">');
                var rating = results[i].rating;

                var p = $('<p>').text('rating: ' + rating);

                var animalGif = $('<img>');
                animalGif.attr('src', results[i].images.fixed_height.url);

                gif.prepend(p);
                gif.prepend(animalGif);

                $('#animals').prepend(gif);
            }
        })
});

$(document).on('click', '.animalList', function() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
    console.log(state);
});