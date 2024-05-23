$(document).ready(() => {

    let ca = "";
    let url = "https://client-api-2-74b1891ee9f9.herokuapp.com/coins/" + ca;

    // read timestamp
    function read_timestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // updates the token stats / info div
    let update_info = json => {
        sol = json.market_cap;
        usd = json.usd_market_cap;
        // tokens = Math.floor(json.virtual_token_reserves / 1e6) + 'm';
        replies = json.reply_count;
        koth = json.king_of_the_hill_timestamp ? read_timestamp(json.king_of_the_hill_timestamp) : 'no koth yet';
        // raydium_pool = json.raydium_pool ? json.raydium_pool : 'no pool yet';

        $("#info").empty();
        $("#info").append(
            "<p class='ca'>mkc sol: " + sol + "</p>" +
            "<p class='ca'>mkc usd: " + usd + "</p>" +
            "<p class='ca'>koth: " + koth + "</p>" + 
            "<p class='ca'>replies: " + replies + "</p>"
            // "<p class='ca'>raydium: " + raydium_pool + "</p>"
        );

    };

    let fetch_info = url => {
        $.ajax({
            url: url,
            async: true,
            dataType: 'json',
            success: json => {
                update_info(json);
            }
        });
    }

    let refresh = 7000;
    fetch_info(url)
    setInterval(() => {fetch_info(url);}, refresh);
});