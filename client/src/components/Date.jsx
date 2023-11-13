const Date = ({ dateStr }) => {
    var dateString = dateStr.split("T")[0];
    var date = dateString.split("-");
    var firstDate = new window.Date(
        parseInt(date[0], 10),
        parseInt(date[1], 10) - 1,
        parseInt(date[2], 10)
    );
    var secondDate = new window.Date();
    var diffDate = secondDate.getTime() - firstDate.getTime();
    var converted = diffDate / 1000 / 60 / 60 / 24;
    var uploaded;
    if (diffDate / 1000 / 60 / 60 < 60) uploaded = "few minutes ago";

    if (converted < 1 && diffDate / 1000 / 60 / 60 > 60) {
        uploaded = "few hours ago";
    } else if (converted > 1 && converted < 2) {
        uploaded = "1 day ago";
    } else if (converted > 2) {
        var daysAgo = Math.floor(converted);
        if (daysAgo > 7) {
            var weeks = Math.floor(daysAgo / 7);
            if (weeks === 1) uploaded = weeks + " week ago";
            else uploaded = weeks + " weeks ago";
        } else {
            uploaded = daysAgo + " days ago";
        }
    }

    return <div style={{ justifySelf: "start" }}>{uploaded}</div>;
};

export default Date;
