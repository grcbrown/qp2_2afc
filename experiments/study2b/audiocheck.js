// Reset variables for second round
let audio_check_reset = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: " ",
  trial_duration: 10,
  on_finish: function () {
    wrong_phase = 0;
    correct_quiet = 0;
  }
};

// Evaluate results (first pass)
let audio_check_evaluate = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: " ",
  trial_duration: 10,
  on_finish: function () {
    if (wrong_phase <= 1 && correct_quiet >= 3) {
      pass = true;
    } else {
      audio_check_failures++;
    }
    wrong_phase = 0;
    correct_quiet = 0;
  }
};

// Evaluate results (second pass)
let audio_check_second_evaluate = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: " ",
  trial_duration: 10,
  on_finish: function () {
    if (!pass) {
      if (wrong_phase <= 1 && correct_quiet >= 3) {
        pass = true;
      } else {
      audio_check_failures++;
      }
    }
    wrong_phase = 0;
    correct_quiet = 0;
  }
};

// --------------------------------------------------
// Between-round instructions (only if failed first)
let audio_check_between = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="gen_ins">
      <p>
        The results of the audio check suggest you may not be wearing headphones,
        as is required for participation in this experiment.
        <br><br>
        If you'd like put on headphones and continue, or believe you're getting
        this message in error, please try the audio check again.
        Otherwise, please return to Prolific.
        <br><br>
        When you're ready, press the space bar to restart the audio check.
      </p>
    </div>
  `,
  choices: [' '],
  trial_duration: function () {
    return (!pass && audio_check_failures < 3) ? 1000000000 : 0;
  }
};

// -------------------------------------
// Failure message (stuck if failed twice)
// -------------------------------------
let audio_check_after_bad = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="gen_ins">
      <p>
        The results of the audio check suggest that you're not wearing headphones,
        as is required for participation in this experiment.
        <br><br>
        Please close this window and return to Prolific.
      </p>
    </div>
  `,
  choices: [],
  trial_duration: function () {
    return (!pass && audio_check_failures >= 3) ? 1000000000 : 0;
  }
};

// -------------------------------
// Success message
// -------------------------------
let audio_check_after_good = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="gen_ins">
      <p>
        Thank you for completing the audio check.
        Please press the space bar to continue to the experiment.
      </p>
    </div>
  `,
  choices: [' ']
};

// -------------------------------
// Shared HTML content
// -------------------------------
let html_content = `
  <div class="quietest-container">
    <div>
      <p class="quietest">Which sound was the quietest?</p>
    </div>
    <div class="yes-no">
      <div class="quietest_option">
        <p>FIRST</p><p>Press 1</p>
      </div>
      <div class="quietest_option">
        <p>SECOND</p><p>Press 2</p>
      </div>
      <div class="quietest_option">
        <p>NONE</p><p>Press 0</p>
      </div>
    </div>
  </div>
`;

// Audio + response trials
let io_audio = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: () => pass ? 'audio/silence.wav' : 'audio/IO.wav',
  prompt: () => pass ? " " : html_content,
  trial_ends_after_audio: true,
  response_allowed_while_playing: false
};

let io_response = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => pass ? " " : html_content,
  choices: ['1', '2', '0'],
  trial_duration: () => pass ? 0 : 5000,
  post_trial_gap: () => pass ? 0 : 1000,
  on_finish: function (data) {
    if (data.response === '2') {
      wrong_phase++;
    }
    console.log('wrong_phase:', wrong_phase);
  }
};

let oi_audio = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: () => pass ? 'audio/silence.wav' : 'audio/OI.wav',
  prompt: () => pass ? " " : html_content,
  trial_ends_after_audio: true,
  response_allowed_while_playing: false
};

let oi_response = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => pass ? " " : html_content,
  choices: ['1', '2', '0'],
  trial_duration: () => pass ? 0 : 5000,
  post_trial_gap: () => pass ? 0 : 1000,
  on_finish: function (data) {
    if (data.response === '1') {
      wrong_phase++;
    }
    console.log('wrong_phase:', wrong_phase);
  }
};

let iq_audio = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: () => pass ? 'audio/silence.wav' : 'audio/IQ.wav',
  prompt: () => pass ? " " : html_content,
  trial_ends_after_audio: true,
  response_allowed_while_playing: false
};

let iq_response = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => pass ? " " : html_content,
  choices: ['1', '2', '0'],
  trial_duration: () => pass ? 0 : 5000,
  post_trial_gap: () => pass ? 0 : 1000,
  on_finish: function (data) {
    if (data.response === '2') {
      correct_quiet++;
    }
    console.log('correct_quiet:', correct_quiet);
  }
};

let qi_audio = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: () => pass ? 'audio/silence.wav' : 'audio/QI.wav',
  prompt: () => pass ? " " : html_content,
  trial_ends_after_audio: true,
  response_allowed_while_playing: false
};

let qi_response = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => pass ? " " : html_content,
  choices: ['1', '2', '0'],
  trial_duration: () => pass ? 0 : 5000,
  post_trial_gap: () => pass ? 0 : 1000,
  on_finish: function (data) {
    if (data.response === '1') {
      correct_quiet++;
    }
    console.log('correct_quiet:', correct_quiet);
  }
};

// -------------------------------
// Trial grouping & shuffling
// -------------------------------
let audiocheck_polarity = [
  [io_audio, io_response],
  [io_audio, io_response],
  [io_audio, io_response],
  [io_audio, io_response],
  [oi_audio, oi_response],
  [oi_audio, oi_response],
  [oi_audio, oi_response],
  [oi_audio, oi_response]
];

let audiocheck_volume = [
  [iq_audio, iq_response],
  [iq_audio, iq_response],
  [iq_audio, iq_response],
  [iq_audio, iq_response],
  [qi_audio, qi_response],
  [qi_audio, qi_response],
  [qi_audio, qi_response],
  [qi_audio, qi_response]
];

// Build trial sets
audiocheck_polarity = shuffle(audiocheck_polarity);
audiocheck_volume = shuffle(audiocheck_volume);

let audiocheck_trials_first = [];
let audiocheck_trials_second = [];

for (let i = 0; i < 4; i++) {
  audiocheck_trials_first.push(audiocheck_polarity[i]);
  audiocheck_trials_first.push(audiocheck_volume[i]);
  audiocheck_trials_second.push(audiocheck_polarity[i + 4]);
  audiocheck_trials_second.push(audiocheck_volume[i + 4]);
}

audiocheck_trials_first = shuffle(audiocheck_trials_first);
audiocheck_trials_second = shuffle(audiocheck_trials_second);
