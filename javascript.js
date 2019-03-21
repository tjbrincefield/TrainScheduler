
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
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    var trainTime = $("#start-input").val().trim();
    
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: trainTime,
        frequency: trainFreq
    };
    
    database.ref().push(newTrain);
    
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    
    alert("Swanky train added!");
    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());
    
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
    
    // console.log(trainName);
    // console.log(trainDest);
    // console.log(trainStart);
    // console.log(trainFreq);
    
    var timeArray = trainStart.split(":");
    var convTime = moment().hour(timeArray[0]).minute(timeArray[1]);
    var arrivalMins;
    var arrivalTime;

    var maxMoment = moment.max(convTime, moment());

    var timeDiff = convTime.diff(moment(), "minutes");

    console.log(timeDiff);

    if(maxMoment === convTime){
      arrivalTime = convTime.format("hh:mm a");
      arrivalMins = timeDiff;
    }
    else {
      trainFreq = arrivalTime
    }
    
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(trainStart),
      $("<td>").text(timeDiff),
    );
  
    $("#train-table > tbody").append(newRow);
  });
  
