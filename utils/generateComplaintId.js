let counter = 1000;

function generateComplaintId() {
    counter++;
    return "C" + counter;
}

module.exports = generateComplaintId;