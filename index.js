function decrChar(ch) {
    switch(ch) { 
        case 'A':
            return [true, '9'];
        case 'a':
            return [true, '9'];
        case '0':
            return [true, 'Z'];
        default:
            return [false, String.fromCharCode(ch.charCodeAt(0) - 1)];
    }
}
function predecessor(input) {
    let X = input.charAt(0);
    let Y = input.charAt(1);
    let Z = input.charAt(2);
    let flag = false;
    [flag, Z] = decrChar(Z);
    if (flag == false)
        return X + Y + Z;
    [flag, Y] = decrChar(Y);
    if (flag == false)
        return X + Y + Z;
    [flag, X] = decrChar(X);
    return X + Y + Z;
}
function id(idVal) {
    return document.getElementById(idVal);
}
let count = 0;
function section(btn, idVal) {
    btn.addEventListener('click', () => {
        curSection.style.display = 'none';
        curSection = idVal;
        curSection.style.display = 'block';
    });
}
const homeBtn = id('home-btn');
const eventsBtn = id('events-btn');
const membersBtn = id('members-btn');
const eventsList = id('events-list');
const homeSection = id('home-section');
let curSection = homeSection;
curSection.style.display = 'block';
const eventsSection = id('events-section');
const membersSection = id('members-section');

function node(name) {
    return document.createElement(name);
}
section(eventsBtn, eventsSection);
section(homeBtn, homeSection);
section(membersBtn, membersSection);

let eventId = 'AAB';
while (eventId != '999') {
    fetch('events/' + eventId + ".json")
        .then(response => response.json())
        .then(data => eventItem(data))
        .catch(error => console.log(error));
    eventId = predecessor(eventId);
}

function eventItem(data) {
    const item = node('div');
    const title = node('h4');
    title.innerHTML = data['title'];
    item.appendChild(title);
    item.append(data['description']); 
    eventsList.appendChild(item);
}

const membersGallary = id('members-gallary');

function memberItem(data) {
    const item = node('span');
    const title = node('h4');
    title.innerHTML = data['fname'];
    const image = node('img');
    image.setAttribute('src', data['image'] != null ?
        data['image'] :
        'avatar.png'
    );
    item.appendChild(image);
    item.appendChild(title);
    item.setAttribute('class', 'members-item');
    membersGallary.appendChild(item);
}

let memberId = 'AAG';
while (memberId != '999') {
    fetch('members/' + memberId + ".json")
        .then(response => response.json())
        .then(data => memberItem(data))
        .catch(error => console.log(error, 'HI'));
    memberId = predecessor(memberId);
}

const main = document.getElementById("content");
const fetchData = (names) => {
    let keep = 0;
    fetch("events/" + names + ".json")
        .then(response => {
            if (!response.ok) {
                throw new Error("There is an error here");
            }
            return response.text();
        })
        .then(textdata => {
            const open = document.createElement("div");
            main.appendChild(open);
            open.textContent = textdata;

            const contentButton = document.createElement("button");
            contentButton.textContent = "contents";

            contentButton.addEventListener("click", function () {
                let cname = 'AAA'; 
                fetch("content/" + cname + ".json")
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("There is an error here");
                        }
                        return response.text();
                    })
                    .then(textdata => {
                        const dis = document.createElement("div");
                        dis.textContent = textdata;
                        open.appendChild(dis);

                        const newb = document.getElementById("contentex");
                        newb.textContent = "click to close";
                        open.appendChild(newb);
                    })
                    .catch((error) => {
                        console.log("Error has been found:", error);
                    });
                cname = predecessor(cname);
            });

            main.appendChild(contentButton);
        })
        .catch((error) => {
            console.log("Error has been found:", error);
        });
};

let names = 'AAC';

const show = () => {
    while (names !== '999') {
        fetchData(names);
        names = predecessor(names);
    }
};
