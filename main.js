let nextPageToken;
let resultList = $('#result-list');
let query;
let loading = false;

$('input[type="submit"]').on('click', (event) => {
    event.preventDefault();
    resultList.empty();
    query = $('#keyword').val()
    // nextPageToken = await getNextPageToken(query);
    getNextPageToken(query);
})

$(document).scroll(function (event) {
    if ($(document).scrollTop() + $(window).height() == $(document).height()) {
        // console.log('Page is prepare to load more');
        if (!resultList.is(':empty')) {
            //do something
            console.log('Page is continue to load more');
            getNextPageToken(query, nextPageToken)
        }
    }
});

$('#keyword').on('input', function (event) {
    // setTimeout(function () {
    //     let current = query;
    //     console.log(current)
    //     resultList.empty();
    //     getNextPageToken()
    // }, 2000);
})

function getNextPageToken(query, token = null) {
    loading = true;
    $.ajax({
        url: token == null ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw` : `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${token}`,
        type: 'GET',
        success: function (data, status) {
            nextPageToken = data.nextPageToken;
            console.log(nextPageToken)
            appendResultList(resultList, data.items);
            loading = false;
        }
    })
}

function appendResultList(result, items) {
    for (let item of items) {
        let itemId = item.id.videoId;
        let itemTitle = item.snippet.title;
        let itemDescription = item.snippet.description;
        let thumbnailsUrl = item.snippet.thumbnails.default.url;
        let thumbnailsWidth = item.snippet.thumbnails.default.width;
        let thumbnailsHeight = item.snippet.thumbnails.default.height;
        result.append(
            `<a class="item" href="https://www.youtube.com/watch?v=${itemId}">
                <img src="${thumbnailsUrl}" alt="thumbnails"/>
                <h5>${itemTitle}</h5>
                <p><small>${itemDescription}</small></p>
            </a>`
        )
    }
}