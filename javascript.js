
  var config = {
    apiKey: "AIzaSyD67tMLldvTHo0QNkemvU8B14o8NKMZ6D8",
    authDomain: "trainscheduler-fde84.firebaseapp.com",
    databaseURL: "https://trainscheduler-fde84.firebaseio.com",
    projectId: "trainscheduler-fde84",
    storageBucket: "trainscheduler-fde84.appspot.com",
    messagingSenderId: "596121451436"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq
    };
  
    database.ref().push(newEmp);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    alert("Employee successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);
  
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    var trainMinutes = moment().diff(moment(trainStart, "X"), "minutes");
    console.log(trainMinutes);
  
    var trainFrequency = trainMinutes * trainFreq;
    console.log(trainFrequency);
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainMinutes),
      $("<td>").text(trainStart),
      $("<td>").text(trainFrequency)
    );
  
    $("#train-table > tbody").append(newRow);
  });
  
// Train info will not show up on the screen when i enter anything in?
// how to get it to append once it finally shows up?
// how to use momentJS?