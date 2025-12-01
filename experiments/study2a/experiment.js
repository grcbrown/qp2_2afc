const jsPsych = initJsPsych({
    show_progress_bar: true,
    override_safe_mode: true, // for local testing only
    max_load_time: 120000, //120 seconds
    on_finish: function() {
        jsPsych.data.displayData('csv');
  }
});

let timeline = []; //Empty timeline

//PRELOAD AUDIO//
var preload_trial = {
    type: jsPsychPreload,
    audio: [
    'audio/330_705_B4.wav',
    'audio/493_705_B4.wav',
    'audio/516_705_B4.wav', 
    'audio/573_705_B4.wav', 
    'audio/672_705_B4.wav', 
    'audio/752_705_B4.wav',
    'audio/799_705_B4.wav', 
    'audio/955_705_B4.wav',
    'audio/gift.wav'
    ],
    auto_preload: true
};

//IRB 
const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
            <img src="./image/SUSig_2color_Stree_Left.png" alt="Stanford Logo" style="max-width: 500px; margin-bottom: 20px;">
            <h3>DESCRIPTION</h3>
            <p>You are invited to participate in a research study. Its general purpose is to understand how people perceive spoken language. We are interested in how people make use of varying properties of language to infer social information about a speaker. In this study, you will hear spoken sentences, and you will be asked to make simple decisions about the speaker of each sentence. Following this, you will be asked to complete an optional demographic survey. Participation in this research is voluntary, and you are free to withdraw your consent at any time.</p>
            <h3>TIME INVOLVEMENT</h3> 
            <p>Your participation will take approximately 15 to 20 minutes.</p>
            <h3>PAYMENT</h3> 
            <p>You will be paid at the posted rate.</p>
            <h3>PRIVACY AND CONFIDENTIALITY</h3> 
            <p>The risks associated with this study are minimal. This judgment is based on a large body of experience with the same or similar procedures with people of similar ages, sex, origins, etc. Study data will be stored securely, in compliance with Stanford University standards, minimizing the risk of confidentiality breach. Your individual privacy will be maintained during the research and in all published and written data resulting from the study.</p>
            <h3>CONTACT INFORMATION</h3>
            <p>If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director, Grace Brown, at (616) 498-8188. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650) 723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306 USA.</p> 
            <br><br>
            <p>Please save or print a copy of this page for your records</p>
            <br><br>
            <p>If you agree to participate in this research, please click the 'Continue' button.</p>
        </div>
    `,
    choices: ['Continue'],
    response_ends_trial: true,
    margin_vertical: '10px'
};

//timeline.push(irb); //skip for pilot and testing

//INITIAL AUDIO CHECK
//audio warning
const audio_warn = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Start'],
    stimulus: `
    <div style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
        <p>This study requires you to listen to audio clips. To ensure you can adequately hear the audio presented in this study, the next page will have an audio attention check. Please wear headphones, and be prepared to adjust the volume on your device if necessary.<br><br>When you are ready to begin the audio attention check, click 'Start'.</p>
    </div>
    `,
    response_ends_trial: true
};
    
//audio check
const audio_check = {
    type: jsPsychAudioButtonResponse,
    stimulus: 'audio/gift.wav',
    choices: ['dog', 'friend', 'gift', 'smile', 'blue'],
    prompt: '<p><br>This is an attention check. <br><br> Click on the word that is being repeated by the speaker.</p>',
    response_ends_trial: true,
    trial_duration: 20000,
    on_finish: function(data) {
        data.correct = (data.response == 2); // mark correct or incorrect
    }    
};

// feedback trial
const feedback = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
    if (last_trial_correct) {
      return "<p>Correct! You are ready to begin the study.</p>";
    } else {
      return "<p>Incorrect. Please make sure your audio is working and try again.</p>";
    }
  },
  choices: function() {
    const last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
    if (last_trial_correct) {
      return ['Begin Study'];
    } else {
      return ['Try Again'];
    }
  }
};

// loop node: repeats until participant passes
const audio_check_loop = {
  timeline: [audio_check, feedback],
  loop_function: function() {
    const last_trial_correct = jsPsych.data.get().last(2).values()[0].correct;
    if (last_trial_correct) {
      return false; // stop looping when correct
    } else {
      return true; // repeat until correct
    }
  }
};

//timeline.push(audio_warn, audio_check_loop); //cut for testing

//INSTRUCTIONS
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
        <p>NOTE: THIS IS A SAMPLE STUDY WITH A REDUCED NUMBER OF TRIALS</p>
        <br><br>
        <p>In this study, you will listen to a series of different sentences produced by a variety of different speakers. In a given trial, you will hear an audio clip of a speaker producing a sentence. While this audio clip is playing, you will be prompted to select one of two labels that best describes the speaker. To select a response, you will press either the ‘D’ or ‘K’ key on your keyboard. There will be a reminder of what keys to press in each trial. Please try to respond as quickly as possible. If you do not respond within 10 seconds after the audio clip has played, the experiment will advance automatically.</p>
        <br><br>
        <p>If you understand the instructions and are ready to begin the practice trials, click ‘Continue’.</p>
    </div>
    `,
    choices: ['Continue'],
    response_ends_trial: true
};

timeline.push(instructions);

stim_list = sampleBalancedBlocks(trial_objects, 8, 2);

//LISTENING TRIALS
//BLOCK 1
let tv_array_1 = create_tv_array(stim_list[0]);
const block_1 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">MASCULINE<br><br><b>D</b></div><div class=\"option\">FEMININE<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_1,
    randomize_order: true
};

//BLOCK 2
let tv_array_2 = create_tv_array(stim_list[1]);
const block_2 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">INTELLIGENT<br><br><b>D</b></div><div class=\"option\">UNINTELLIGENT<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_2,
    randomize_order: true
};

//BLOCK 3
let tv_array_3 = create_tv_array(stim_list[2]);
const block_3 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">NERVOUS<br><br><b>D</b></div><div class=\"option\">CALM<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_3,
    randomize_order: true
};

//BLOCK 4
let tv_array_4 = create_tv_array(stim_list[3]);
const block_4 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">SOCIALLY GRACEFUL<br><br><b>D</b></div><div class=\"option\">SOCIALLY AWKWARD<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_4,
    randomize_order: true
};

//BLOCK 5
let tv_array_5 = create_tv_array(stim_list[4]);
const block_5 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">FEMININE<br><br><b>D</b></div><div class=\"option\">MASCULINE<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_5,
    randomize_order: true
};

//BLOCK 6
let tv_array_6 = create_tv_array(stim_list[5]);
const block_6 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">UNINTELLIGENT<br><br><b>D</b></div><div class=\"option\">INTELLIGENT<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_6,
    randomize_order: true
};

//BLOCK 7
let tv_array_7 = create_tv_array(stim_list[6]);
const block_7 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">CALM<br><br><b>D</b></div><div class=\"option\">NERVOUS<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_7,
    randomize_order: true
};

//BLOCK 8
let tv_array_8 = create_tv_array(stim_list[7]);
const block_8 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">SOCIALLY AWKWARD<br><br><b>D</b></div><div class=\"option\">SOCIALLY GRACEFUL<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: tv_array_8,
    randomize_order: true
};

timeline.push(block_1, block_2, block_3, block_4, block_5, block_6, block_7, block_8);

//SURVEY INSTRUCTIONS
const transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>You have completed the listening trials. You will now be directed to an optional demographic survey. Please answer the survey questions if you feel comfortable doing so. After seeing the survey, you will be able to end the study.</p>",
    choices: ['Continue']
};

timeline.push(transition);

//SURVEY
const questionnaire = {
  type: jsPsychSurvey,
  theme: "modern",
  survey_json: {
    showQuestionNumbers: "off",
    widthMode: "responsive",
    completeText: "Finish",
    elements: [
      {
        type: "html",
        html: "<p>Please respond to the following questions if you are comfortable doing so. If you'd like to skip to the end of the experiment, click 'Finish' at the bottom of the page.</p>"
      },
      {
        type: "boolean",
        name: "understood",
        title: "Did you read and understand the instructions?",
        labelTrue: "Yes",
        labelFalse: "No",
        renderAs: "radio"
      },
      {
        type: "text",
        name: "age",
        title: "Age:",
        inputType: "number"
      },
      {
        type: "comment",
        name: "gender",
        title: "What is your gender identity?"
      },
      {
        type: "comment",
        name: "race",
        title: "What is your racial identity?"
      },
      {
        type: "comment",
        name: "ethnicity",
        title: "What is your ethnicity?"
      },
      {
        type: "comment",
        name: "language",
        title: "What language(s) did you speak at home when you were growing up?"
      },
      {
        type: "radiogroup",
        name: "education",
        title: 'Highest level of education obtained:',
        choices: [
          "Some high school",
          "Graduated high school",
          "Some college",
          "Graduated college",
          "Hold a higher degree"
        ],
        showOtherItem: true,
        otherText: "Other (describe)"
      },
      {
        type: "radiogroup",
        name: "enjoy",
        title: 'Did you enjoy this study?',
        choices: [
          "Worse than average study",
          "Average study",
          "Better than average study"
        ]
      },
      {
        type: "radiogroup",
        name: "payment",
        title: "Do you think the payment was fair?",
        choices: [
          "The payment was fair",
          "The payment was too low"
        ]
      },
      {
        type: "comment",
        name: "comments",
        title: "Do you have any additional comments about this study?"
      }
    ]
  }
};

timeline.push(questionnaire);

//DATA COLLECTION
// capture info from Prolific
var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
  subject_id: subject_id,
  study_id: study_id,
  session_id: session_id
});

const p_id = jsPsych.randomization.randomID(10);
const filename = `${p_id}.csv`;

const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "dQGC7jeRc33t", //UPDATE WITH NEW DATAPIPE STUFF
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
};

timeline.push(save_data);

//FOR PILOTING - END DEMO
var end_demo = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>You've finished the demo! You can close the tab to end the experiment or refresh to run it again.</p>`,
  choices: "NO_KEYS"
}

//THANKS// - CHANGE LINK
var thanks = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>You've finished the study. Thank you for your time!</p>
    <p><a href="https://app.prolific.com/submissions/complete?cc=C1BQGMWP">Click here to return to Prolific and complete the study</a>.</p>`,
  choices: "NO_KEYS"
};

//timeline.push(thanks);

//RUN//
jsPsych.run([preload_trial, timeline]);
