
// Saves options to chrome.storage.sync.
function save_options() {
  var starting = document.getElementById('starttime').value;
  var ending = document.getElementById('endtime').value;

  chrome.storage.sync.set({
    start: starting,
    end: ending
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved. Start set to ' + starting + ' and end set to ' + ending + '.';
    console.log ( 'Options saved by user.' );
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {


  // Use default value color = 'red' and likesColor = true
  chrome.storage.sync.get({
    start: null,
    end: null
  }, function(items) {
    document.getElementById('starttime').value = items.start;
    document.getElementById('endtime').checked = items.end;
  });
}

function hide_timer () {
  document.getElementById('time-div').style.display = 'none';
}

function show_timer () {
  document.getElementById('time-div').style.display = 'inline';
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

document.getElementById('show-time').addEventListener('click',
    show_timer);

document.getElementById('hide-time').addEventListener('click',
    hide_timer);



