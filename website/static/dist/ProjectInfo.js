const positiveVoteBtn = document.getElementById('positive-vote-btn');
const negativeVoteBtn = document.getElementById('negative-vote-btn');
const positiveVotesLabel = document.getElementById('positive-votes-label');
const negativeVotesLabel = document.getElementById('negative-votes-label');
let userVote = 0;
let uuid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
let positiveVotesCount = 0;
let negativeVotesCount = 0;
window.onload = () => {
    init();
};
function init() {
    fetch(`/api/projects/project?uuid=${uuid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
        userVote = data.user_vote;
        positiveVotesCount = data.positive_votes;
        negativeVotesCount = data.negative_votes;
        switch (userVote) {
            case 1:
                positiveVotesCount -= 1;
                resetHighlight();
                positiveHighlight();
                break;
            case -1:
                negativeVotesCount -= 1;
                resetHighlight();
                negativeHighlight();
                break;
        }
        showVotesCount();
    });
}
positiveVoteBtn.addEventListener('click', () => {
    switch (userVote) {
        case 1:
            userVote = 0;
            break;
        case 0:
        case -1:
            userVote = 1;
            break;
    }
    resetHighlight();
    if (userVote === 1)
        positiveHighlight();
    showVotesCount();
    sendVote();
});
negativeVoteBtn.addEventListener('click', () => {
    switch (userVote) {
        case -1:
            userVote = 0;
            break;
        case 0:
        case 1:
            userVote = -1;
            break;
    }
    resetHighlight();
    if (userVote === -1)
        negativeHighlight();
    showVotesCount();
    sendVote();
});
function showVotesCount() {
    positiveVotesLabel.innerText =
        userVote === 1
            ? (positiveVotesCount + 1).toString()
            : positiveVotesCount.toString();
    negativeVotesLabel.innerText =
        userVote === -1
            ? (negativeVotesCount + 1).toString()
            : negativeVotesCount.toString();
}
function negativeHighlight() {
    negativeVoteBtn.style.opacity = '1';
}
function positiveHighlight() {
    positiveVoteBtn.style.opacity = '1';
}
function resetHighlight() {
    positiveVoteBtn.style.opacity = '0.3';
    negativeVoteBtn.style.opacity = '0.3';
}
function sendVote() {
    fetch('/api/project/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uuid: uuid,
            vote_value: userVote,
        }),
    });
}
export {};
