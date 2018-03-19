$(document).ready(function () {
    var animalArray = [["Dogs"], ["Cats"], ["Rabbits"], ["Birds"], ["Snakes"]];
    renderButtons();

    function renderButtons() {
        $("#animalButtons").empty();
        for (var i = 0; i < animalArray.length; i++) {
            var buttons = $("<button>").addClass("animalList");
            buttons.text(animalArray[i]);
            buttons.attr("data-animal", animalArray[i]);
            $("#animalButtons").append(buttons);
        }

        $("#addAnimal").on("click", function (event) {
            event.preventDefault();
            var newAnimal = $("#animal-input").val().trim();
            if (newAnimal === "") {
                return false;
            } else $("#animal-input").val("");
            renderButtons();
            return false;
        })

        $(document).on("click", ".animalList", function () {
        var search = $(this).data("animal");
        })
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "api_key=Z4PoJ7702VhfPsQTH7YzzVIDWrNZsciw";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            $("#animals").empty();

            for (var i = 0; i = animalArray.length; i++) {

                var animalDiv = $('<div>').addClass('col-md-4 gif-container');

                var p = $('<p>');
                var gifImage = $('<img>').addClass('gif');
                topicsImage.attr('src', results[i].images.fixed_height_still.url);
                topicsImage.attr('data-animate', results[i].images.fixed_height.url);
                topicsImage.attr('data-still', results[i].images.fixed_height_still.url);
                topicsImage.attr('data-state', 'still');

                var rating = results[i].rating;
                p = p.html("Rating: " + rating);
                topicsDiv.append(topicsImage);
                topicsDiv.append(p);
                $('#animals').append(animalsDiv);
            }
        });

        $(document).on('click', ".gif", function () {
            var state = $(this).attr('data-state');
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });
    };        
});
