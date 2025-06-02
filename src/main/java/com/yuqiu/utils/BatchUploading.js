const API_BASE = "http://localhost:8080"; // 替换为你的API基础路径
const uploadCode = 'yuqiu'

const movieDataArray = [
    {
        title: "Inception",
        year: 2010,
        cover: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
        description: "A thief who enters the dreams of others must perform an impossible task to earn his redemption.",
        type: 1,
        genres: ["Action", "Sci-Fi", "Thriller"],
        uploadCode
    },
    {
        title: "Breaking Bad",
        year: 2008,
        cover: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        description: "A chemistry teacher turns to making meth after being diagnosed with cancer.",
        type: 2,
        genres: ["Crime", "Drama", "Thriller"],
        uploadCode
    },
    {
        title: "The Matrix",
        year: 1999,
        cover: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        description: "A hacker discovers the shocking truth about his reality and joins a rebellion against the machines.",
        type: 1,
        genres: ["Action", "Sci-Fi"],
        uploadCode
    },
    {
        title: "Stranger Things",
        year: 2016,
        cover: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        description: "A group of kids uncover a government experiment and a mysterious girl with powers.",
        type: 2,
        genres: ["Drama", "Fantasy", "Mystery"],
        uploadCode
    },
    {
        title: "Interstellar",
        year: 2014,
        cover: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "Earth's survival depends on a team venturing through a wormhole to find a new home.",
        type: 1,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        uploadCode
    },
    {
        title: "Game of Thrones",
        year: 2011,
        cover: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
        description: "Noble families battle for control of the Iron Throne in a land of betrayal and dragons.",
        type: 2,
        genres: ["Fantasy", "Drama", "Action"],
        uploadCode
    },
    {
        title: "Parasite",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        description: "A poor family's scheme to infiltrate a wealthy household spirals out of control.",
        type: 1,
        genres: ["Drama", "Thriller"],
        uploadCode
    },
    {
        title: "The Mandalorian",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        description: "A bounty hunter protects a mysterious child in the outer reaches of the galaxy.",
        type: 2,
        genres: ["Sci-Fi", "Action", "Adventure"],
        uploadCode
    },
    {
        title: "Joker",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        description: "A mentally troubled man turns into the infamous criminal mastermind, the Joker.",
        type: 1,
        genres: ["Drama", "Crime", "Thriller"],
        uploadCode
    },
    {
        title: "The Last of Us",
        year: 2023,
        cover: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
        description: "A smuggler and a teenage girl cross a post-apocalyptic America in search of hope.",
        type: 2,
        genres: ["Drama", "Horror", "Adventure"],
        uploadCode
    },
    {
        title: "Dune: Part Two",
        year: 2024,
        cover: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
        description: "Paul Atreides unites with the Fremen to avenge his family and prevent a terrible future only he can foresee.",
        type: 1,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        uploadCode
    },
    {
        title: "Peaky Blinders",
        year: 2013,
        cover: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
        description: "A gangster family epic set in 1900s England, centered on a gang boss rising in power.",
        type: 2,
        genres: ["Drama", "Crime", "History"],
        uploadCode
    },
    {
        title: "Everything Everywhere All at Once",
        year: 2022,
        cover: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
        description: "A woman swept up in an insane multiverse adventure must channel her new powers to save her family.",
        type: 1,
        genres: ["Adventure", "Comedy", "Sci-Fi"],
        uploadCode
    },
    {
        title: "The Boys",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg",
        description: "A group of vigilantes set out to take down corrupt superheroes who abuse their powers.",
        type: 2,
        genres: ["Action", "Comedy", "Crime"],
        uploadCode
    },
    {
        title: "1917",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
        description: "Two soldiers race against time to deliver a message that will stop a deadly attack during World War I.",
        type: 1,
        genres: ["War", "Drama", "Action"],
        uploadCode
    },
    {
        title: "Dark",
        year: 2017,
        cover: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
        description: "A German town's dark past is revealed when children start disappearing in a mysterious time loop.",
        type: 2,
        genres: ["Sci-Fi", "Mystery", "Thriller"],
        uploadCode
    },
    {
        title: "Top Gun: Maverick",
        year: 2022,
        cover: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        description: "After more than thirty years of service, Maverick is back to train a new generation of pilots.",
        type: 1,
        genres: ["Action", "Drama"],
        uploadCode
    },
    {
        title: "The Crown",
        year: 2016,
        cover: "https://image.tmdb.org/t/p/w500/el1JwkGgHkY4qWHt6aE2U4nG3jQ.jpg",
        description: "The political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the 20th century.",
        type: 2,
        genres: ["Drama", "History"],
        uploadCode
    },
    {
        title: "Ford v Ferrari",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg",
        description: "American car designer Carroll Shelby and driver Ken Miles challenge Ferrari at Le Mans in 1966.",
        type: 1,
        genres: ["Drama", "Action", "Biography"],
        uploadCode
    },
    {
        title: "Money Heist",
        year: 2017,
        cover: "https://image.tmdb.org/t/p/w500/mo0FP1GxOFZT4UDde7RFDz5APXF.jpg",
        description: "A criminal mastermind brings together eight thieves to pull off the biggest heist in recorded history.",
        type: 2,
        genres: ["Crime", "Drama", "Thriller"],
        uploadCode
    },
    {
        title: "Avatar: The Way of Water",
        year: 2022,
        cover: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        description: "Jake Sully and Ney'tiri must protect their family from a new threat on Pandora.",
        type: 1,
        genres: ["Action", "Adventure", "Sci-Fi"],
        uploadCode
    },
    {
        title: "The Witcher",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
        description: "A mutated monster hunter struggles to find his place in a world where people are often worse than beasts.",
        type: 2,
        genres: ["Fantasy", "Drama", "Action"],
        uploadCode
    },
    {
        title: "Oppenheimer",
        year: 2023,
        cover: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
        description: "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb.",
        type: 1,
        genres: ["Drama", "History", "Biography"],
        uploadCode
    },
    {
        title: "The Office",
        year: 2005,
        cover: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
        description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.",
        type: 2,
        genres: ["Comedy"],
        uploadCode
    },
    {
        title: "Spider-Man: No Way Home",
        year: 2021,
        cover: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        description: "Peter Parker seeks help from Doctor Strange when his identity is exposed to the world.",
        type: 1,
        genres: ["Action", "Adventure", "Fantasy"],
        uploadCode
    },
    {
        title: "The Queen's Gambit",
        year: 2020,
        cover: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
        description: "Orphaned chess prodigy Elizabeth Harmon struggles with addiction while rising to the top of the chess world.",
        type: 2,
        genres: ["Drama"],
        uploadCode
    },
    {
        title: "Tenet",
        year: 2020,
        cover: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
        description: "Armed with only one word—Tenet—and fighting for the survival of the world, a protagonist journeys through a twilight world of international espionage.",
        type: 1,
        genres: ["Action", "Sci-Fi", "Thriller"],
        uploadCode
    },
    {
        title: "Chernobyl",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
        description: "A dramatization of the true story of one of the worst man-made catastrophes in history: the nuclear accident at Chernobyl.",
        type: 2,
        genres: ["Drama", "History"],
        uploadCode
    },
    {
        title: "La La Land",
        year: 2016,
        cover: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        description: "A jazz musician and an aspiring actress fall in love but struggle to maintain their relationship as they pursue their dreams.",
        type: 1,
        genres: ["Drama", "Romance", "Music"],
        uploadCode
    },
    {
        title: "Better Call Saul",
        year: 2015,
        cover: "https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
        description: "The trials and tribulations of criminal lawyer Jimmy McGill before he became Saul Goodman.",
        type: 2,
        genres: ["Crime", "Drama"],
        uploadCode
    },
    {
        title: "The Matrix Resurrections",
        year: 2021,
        cover: "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
        description: "Neo lives a seemingly ordinary life until he’s forced to follow the white rabbit once again.",
        type: 1,
        genres: ["Action", "Sci-Fi"],
        uploadCode
    },
    {
        title: "Breaking Bad",
        year: 2008,
        cover: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        description: "A high school chemistry teacher turned methamphetamine producer navigates crime and morality.",
        type: 2,
        genres: ["Crime", "Drama", "Thriller"],
        uploadCode
    },
    {
        title: "John Wick: Chapter 4",
        year: 2023,
        cover: "https://image.tmdb.org/t/p/w500/gh2bmprLtUQ8oXCSluzfqaicyrm.jpg",
        description: "John Wick uncovers a path to defeating The High Table, but must face a new enemy with powerful alliances.",
        type: 1,
        genres: ["Action", "Thriller", "Crime"],
        uploadCode
    },
    {
        title: "Loki",
        year: 2021,
        cover: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg",
        description: "The God of Mischief steps out of his brother's shadow and finds himself on a journey across timelines.",
        type: 2,
        genres: ["Action", "Fantasy", "Sci-Fi"],
        uploadCode
    },
    {
        title: "The Batman",
        year: 2022,
        cover: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        description: "Batman ventures into Gotham City’s underworld when a sadistic killer leaves behind a trail of clues.",
        type: 1,
        genres: ["Action", "Crime", "Mystery"],
        uploadCode
    },
    {
        title: "Stranger Things",
        year: 2016,
        cover: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        description: "A group of young friends in a small town uncover supernatural forces and government secrets.",
        type: 2,
        genres: ["Drama", "Mystery", "Sci-Fi"],
        uploadCode
    },
    {
        title: "Inception",
        year: 2010,
        cover: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        description: "A thief who enters people's dreams is given a chance to erase his past by planting an idea in a target's mind.",
        type: 1,
        genres: ["Sci-Fi", "Action", "Thriller"],
        uploadCode
    },
    {
        title: "The Mandalorian",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        description: "A lone bounty hunter in the outer reaches of the galaxy protects a mysterious child with powerful abilities.",
        type: 2,
        genres: ["Action", "Adventure", "Sci-Fi"],
        uploadCode
    },
    {
        title: "Parasite",
        year: 2019,
        cover: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        description: "A poor family schemes to become employed by a wealthy family by infiltrating their household.",
        type: 1,
        genres: ["Drama", "Thriller"],
        uploadCode
    },
    {
        title: "House of the Dragon",
        year: 2022,
        cover: "https://image.tmdb.org/t/p/w500/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg",
        description: "The Targaryen dynasty’s story set 200 years before the events of Game of Thrones.",
        type: 2,
        genres: ["Drama", "Fantasy", "Action"],
        uploadCode
    }
];

async function sendPutRequest(data) {
    try {
        const response = await fetch(`${API_BASE}/movie`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function sendBatchRequests() {
    for (const data of movieDataArray) {
        await sendPutRequest(data);
    }
}

// 执行批量请求
sendBatchRequests();