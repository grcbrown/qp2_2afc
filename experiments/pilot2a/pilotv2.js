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
    "audio/493_501_B1.wav",
    "audio/672_501_B1.wav",
    "audio/493_502_B1.wav",
    "audio/672_502_B2.wav",
    "audio/493_503_B1.wav",
    "audio/672_503_B1.wav",
    "audio/493_505_B1.wav",
    "audio/672_505_B2.wav",
    "audio/493_506_B1.wav",
    "audio/672_506_B2.wav",
    "audio/493_507_B2.wav",
    "audio/672_507_B2.wav",
    "audio/493_508_B1.wav",
    "audio/672_508_B2.wav",
    "audio/493_509_redo2.wav",
    "audio/672_509_B2.wav",
    "audio/493_510_B1.wav",
    "audio/672_510_B1.wav",
    "audio/493_511_B1.wav",
    "audio/672_511_B1.wav",
    "audio/493_512_B1.wav",
    "audio/672_512_B1.wav",
    "audio/493_513_B1.wav",
    "audio/672_513_B2.wav",
    "audio/493_515_B2.wav",
    "audio/672_515_B2.wav",
    "audio/672_516_B2.wav",
    "audio/493_516_B1.wav",
    "audio/672_518_B2.wav",
    "audio/493_518_B1.wav",
    "audio/672_519_B2.wav",
    "audio/493_519_redo2.wav",
    "audio/672_520_B2.wav",
    "audio/493_520_B1.wav",
    "audio/672_521_B2.wav",
    "audio/493_521_B2.wav",
    "audio/672_522_B2.wav",
    "audio/493_522_B2.wav",
    "audio/672_523_B2.wav",
    "audio/493_523_B1.wav",
    "audio/672_524_B2.wav",
    "audio/493_524_B2.wav",
    "audio/672_526_B2.wav",
    "audio/493_526_B1.wav",
    "audio/672_527_B1.wav",
    "audio/493_527_redo2.wav",
    "audio/672_531_B1.wav",
    "audio/493_531_B1.wav",
    "audio/672_532_B2.wav",
    "audio/493_532_B1.wav",
    "audio/672_533_B2.wav",
    "audio/493_533_B2.wav",
    "audio/672_534_B2.wav",
    "audio/493_534_B1.wav",
    "audio/672_535_B1.wav",
    "audio/493_535_B2.wav",
    "audio/672_537_B1.wav",
    "audio/493_537_B1.wav",
    "audio/672_538_B2.wav",
    "audio/493_538_B1.wav",
    "audio/672_539_B2.wav",
    "audio/493_539_B2.wav",
    "audio/672_540_B2.wav",
    "audio/493_540_B2.wav",
    "audio/672_601_B2.wav",
    "audio/493_601_B1.wav",
    "audio/672_602_B4.wav",
    "audio/493_602_B3.wav",
    "audio/672_603_B4.wav",
    "audio/493_603_B3.wav",
    "audio/672_604_B4.wav",
    "audio/493_604_B3.wav",
    "audio/672_605_B4.wav",
    "audio/493_605_B3.wav",
    "audio/672_606_B4.wav",
    "audio/493_606_B3.wav",
    "audio/672_607_B4.wav",
    "audio/493_607_B3.wav",
    "audio/672_608_B4.wav",
    "audio/493_608_B3.wav",
    "audio/672_609_B4.wav",
    "audio/493_609_B4.wav",
    "audio/672_610_B3.wav",
    "audio/493_610_B3.wav",
    "audio/672_611_B4.wav",
    "audio/493_611_B3.wav",
    "audio/672_612_B3.wav",
    "audio/493_612_B3.wav",
    "audio/672_613_B4.wav",
    "audio/493_613_B4.wav",
    "audio/672_614_B4.wav",
    "audio/493_614_B3.wav",
    "audio/672_615_B4.wav",
    "audio/493_615_B3.wav",
    "audio/672_616_B3.wav",
    "audio/493_616_B3.wav",
    "audio/672_617_B4.wav",
    "audio/493_617_B3.wav",
    "audio/672_618_B3.wav",
    "audio/493_618_B3.wav",
    "audio/672_619_B4.wav",
    "audio/493_619_B3.wav",
    "audio/672_620_B3.wav",
    "audio/493_620_B3.wav",
    "audio/672_621_B3.wav",
    "audio/493_621_B4.wav",
    "audio/672_622_B3.wav",
    "audio/493_622_B3.wav",
    "audio/672_623_B3.wav",
    "audio/493_623_B3.wav",
    "audio/672_624_B3.wav",
    "audio/493_624_B4.wav",
    "audio/672_625_B3.wav",
    "audio/493_625_B4.wav",
    "audio/672_701_B2.wav",
    "audio/493_701_B2.wav",
    "audio/672_702_B2.wav",
    "audio/493_702_B1.wav",
    "audio/672_704_B4.wav",
    "audio/493_704_B4.wav",
    "audio/672_705_B3.wav",
    "audio/493_705_B4.wav",
    "audio/672_707_B4.wav",
    "audio/493_707_B3.wav",
    "audio/672_708_B4.wav",
    "audio/493_708_B3.wav",
    "audio/672_709_B4.wav",
    "audio/493_709_B3.wav",
    "audio/672_710_B3.wav",
    "audio/493_710_B3.wav",
    "audio/672_713_B3.wav",
    "audio/493_713_B3.wav",
    "audio/672_714_B3.wav",
    "audio/493_714_B3.wav",
    "audio/672_715_B4.wav",
    "audio/493_715_B3.wav",
    "audio/672_716_B3.wav",
    "audio/493_716_B4.wav",
    "audio/672_717_B4.wav",
    "audio/493_717_B3.wav",
    "audio/672_718_B4.wav",
    "audio/493_718_B3.wav",
    "audio/672_719_B4.wav",
    "audio/493_719_B4.wav",
    "audio/672_720_B3.wav",
    "audio/493_720_B3.wav",
    "audio/672_721_B3.wav",
    "audio/493_721_B3.wav",
    "audio/672_722_B3.wav",
    "audio/493_722_B3.wav",
    "audio/672_723_B3.wav",
    "audio/493_723_B3.wav",
    "audio/672_724_B4.wav",
    "audio/493_724_B3.wav",
    "audio/672_725_B4.wav",
    "audio/493_725_B3.wav",
    "audio/672_726_B4.wav",
    "audio/493_726_B3.wav",
    "audio/672_727_B3.wav",
    "audio/493_727_B3.wav",
    "audio/752_501_B2_2.wav",
    "audio/573_501_B2.wav",
    "audio/752_502_B1.wav",
    "audio/573_502_B1.wav",
    "audio/752_503_B2.wav",
    "audio/573_503_B1.wav",
    "audio/752_505_B2.wav",
    "audio/573_505_B1.wav",
    "audio/752_506_B2.wav",
    "audio/573_506_B1.wav",
    "audio/752_507_B2.wav",
    "audio/573_507_B1.wav",
    "audio/752_508_B2.wav",
    "audio/573_508_B1.wav",
    "audio/752_509_B2.wav",
    "audio/573_509_B1.wav",
    "audio/752_510_B2.wav",
    "audio/573_510_B1.wav",
    "audio/752_511_B2.wav",
    "audio/573_511_B1.wav",
    "audio/752_512_B2.wav",
    "audio/573_512_B1.wav",
    "audio/752_513_B2.wav",
    "audio/573_513_B1.wav",
    "audio/752_515_B2.wav",
    "audio/573_515_B1.wav",
    "audio/752_516_B1.wav",
    "audio/573_516_B1.wav",
    "audio/752_518_B2.wav",
    "audio/573_518_B1.wav",
    "audio/752_519_B2.wav",
    "audio/573_519_B1.wav",
    "audio/752_520_B1.wav",
    "audio/573_520_B2.wav",
    "audio/752_521_redo.wav",
    "audio/573_521_B2.wav",
    "audio/752_522_B2.wav",
    "audio/573_522_B1.wav",
    "audio/752_523_B2.wav",
    "audio/573_523_B1.wav",
    "audio/752_524_B2.wav",
    "audio/573_524_B1.wav",
    "audio/752_526_B2.wav",
    "audio/573_526_B2.wav",
    "audio/752_527_B2.wav",
    "audio/573_527_B2.wav",
    "audio/752_531_B1.wav",
    "audio/573_531_B2.wav",
    "audio/752_532_B2.wav",
    "audio/573_532_redo.wav",
    "audio/752_533_B2.wav",
    "audio/573_533_B2.wav",
    "audio/752_534_B2.wav",
    "audio/573_534_B1.wav",
    "audio/752_535_B2.wav",
    "audio/573_535_B1.wav",
    "audio/752_537_B2.wav",
    "audio/573_537_B1.wav",
    "audio/752_538_B1.wav",
    "audio/573_538_redo2.wav",
    "audio/752_539_B2.wav",
    "audio/573_539_B1.wav",
    "audio/752_540_B1.wav",
    "audio/573_540_B1.wav",
    "audio/752_601_B1.wav",
    "audio/573_601_B1.wav",
    "audio/752_602_B4.wav",
    "audio/573_602_B3.wav",
    "audio/752_603_B4.wav",
    "audio/573_603_B4.wav",
    "audio/752_604_B4.wav",
    "audio/573_604_B4.wav",
    "audio/752_605_B3.wav",
    "audio/573_605_B3.wav",
    "audio/752_606_B4.wav",
    "audio/573_606_B4.wav",
    "audio/752_607_B4.wav",
    "audio/573_607_B4.wav",
    "audio/752_608_B4.wav",
    "audio/573_608_B3.wav",
    "audio/752_609_B4.wav",
    "audio/573_609_B4.wav",
    "audio/752_610_B4.wav",
    "audio/752_611_B3.wav",
    "audio/573_610_B3.wav",
    "audio/752_612_B3.wav",
    "audio/573_611_B3.wav",
    "audio/752_613_B3.wav",
    "audio/573_612_B4.wav",
    "audio/752_614_B4.wav",
    "audio/573_613_B3.wav",
    "audio/752_615_B3.wav",
    "audio/573_614_B3.wav",
    "audio/752_616_B4.wav",
    "audio/573_615_B3.wav",
    "audio/752_617_B4.wav",
    "audio/573_616_B3.wav",
    "audio/752_618_B4.wav",
    "audio/573_617_B3.wav",
    "audio/752_619_B4.wav",
    "audio/573_618_B3.wav",
    "audio/752_620_B3.wav",
    "audio/573_619_B3.wav",
    "audio/752_621_B4.wav",
    "audio/573_620_B3.wav",
    "audio/752_622_B4.wav",
    "audio/573_621_B4.wav",
    "audio/752_623_B3.wav",
    "audio/573_622_B4.wav",
    "audio/752_624_B4.wav",
    "audio/573_623_B4.wav",
    "audio/752_625_B4.wav",
    "audio/573_624_redo2.wav",
    "audio/752_701_B2.wav",
    "audio/573_625_B3.wav",
    "audio/752_702_B1.wav",
    "audio/573_701_B2.wav",
    "audio/752_704_B3.wav",
    "audio/573_702_redo.wav",
    "audio/752_705_B4.wav",
    "audio/573_704_B3.wav",
    "audio/752_707_B3.wav",
    "audio/573_705_B3.wav",
    "audio/752_708_B4.wav",
    "audio/573_707_B3.wav",
    "audio/752_709_B4.wav",
    "audio/573_708_B3.wav",
    "audio/752_710_B4.wav",
    "audio/573_709_B4.wav",
    "audio/752_713_B4.wav",
    "audio/573_710_B4.wav",
    "audio/752_714_B4.wav",
    "audio/573_713_B3.wav",
    "audio/752_715_B3.wav",
    "audio/573_714_B3.wav",
    "audio/752_716_B4.wav",
    "audio/573_715_B3.wav",
    "audio/752_717_B3.wav",
    "audio/573_716_B3.wav",
    "audio/752_718_redo2.wav",
    "audio/573_717_B4.wav",
    "audio/752_719_B4.wav",
    "audio/573_718_B4.wav",
    "audio/752_720_B3.wav",
    "audio/573_719_B4.wav",
    "audio/752_721_B4.wav",
    "audio/573_720_B3.wav",
    "audio/752_722_B4.wav",
    "audio/573_721_B4.wav",
    "audio/752_723_B4.wav",
    "audio/573_722_B3.wav",
    "audio/752_724_B3.wav",
    "audio/573_723_B3.wav",
    "audio/752_725_B4.wav",
    "audio/573_724_B3.wav",
    "audio/752_726_B4.wav",
    "audio/573_725_B3.wav",
    "audio/752_727_B4.wav",
    "audio/573_726_B4.wav",
    "audio/gift.wav",
    "audio/573_727_B3.wav",
    "audio/IO.wav",
    "audio/IQ.wav",
    "audio/OI.wav",
    "audio/QI.wav",
    "audio/silence.wav"],
    auto_preload: true
};

//IRB 
const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
            <img src="./image/SUSig_2color_Stree_Left.png" alt="Stanford Logo" style="max-width: 500px; margin-bottom: 20px;">
            <h3>DESCRIPTION</h3>
            <p>You are invited to participate in a research study. Its general purpose is to understand how people perceive spoken language. We are interested in how people make use of varying properties of language to infer social information about a speaker. In this study, you will hear spoken sentences, and you will be asked to make simple decisions about the speaker of each sentence. Following this, you will be asked to complete a short demographic survey. Participation in this research is voluntary, and you are free to withdraw your consent at any time.</p>
            <h3>TIME INVOLVEMENT</h3> 
            <p>Your participation will take approximately 15 to 20 minutes.</p>
            <h3>PAYMENT</h3> 
            <p>You will be paid at the posted rate.</p>
            <h3>PRIVACY AND CONFIDENTIALITY</h3> 
            <p>The risks associated with this study are minimal. This judgment is based on a large body of experience with the same or similar procedures with people of similar ages, sex, origins, etc. Study data will be stored securely, in compliance with Stanford University standards, minimizing the risk of confidentiality breach. Your individual privacy will be maintained during the research and in all published and written data resulting from the study.</p>
            <h3>CONTACT INFORMATION</h3>
            <p>If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director, Grace Brown, at (616) 498-8188. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650) 723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306 USA.</p> 
            <p>Please save or print a copy of this page for your records</p>
            <p>If you agree to participate in this research, please click the 'Continue' button.</p>
        </div>
    `,
    choices: ['Continue'],
    response_ends_trial: true,
    margin_vertical: '10px'
};

timeline.push(irb); //skip for pilot and testing

//INITIAL AUDIO CHECK

let audio_check_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="gen_ins">
    <p>Before the experiment begins, we'd like to do a quick audio check. During the audio check, you'll hear two tones in a row, and then be asked to select which tone was quieter. Sometimes, the two tones will be the same.<br><br>If the first tone was quieter, press '1', and if the second tone was quieter, press '2'. If both tones seemed about the same, press '0'.<br><br>When you're ready, click 'Start Check' to begin the audio check.</p>
    </div>
    `,
    choices: ['Start Check']
}

timeline.push(audio_check_instructions, audio_check_reset);

for (let i = 0; i < audiocheck_trials_first.length; i++) {
    timeline.push(audiocheck_trials_first[i][0]);
    timeline.push(audiocheck_trials_first[i][1]);
}

timeline.push(audio_check_evaluate, audio_check_between);

for (let i = 0; i < audiocheck_trials_second.length; i++) {
    timeline.push(audiocheck_trials_second[i][0]);
    timeline.push(audiocheck_trials_second[i][1]);
}

timeline.push(audio_check_second_evaluate, audio_check_after_bad, audio_check_after_good);

//INSTRUCTIONS
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="gen_ins"; style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
        <p>In this study, you will listen to sentences produced by a variety of speakers. For each trial, you will hear one of these sentences. While the clip plays, you will be prompted to select one of two labels that best describes the speaker. To select a response, press either the ‘D’ or ‘K’ key on your keyboard. Please respond as quickly as possible. If you do not respond within 10 seconds, the experiment will advance automatically.</p>
        <p>This is a pilot. There may be bugs. </p>
        <p>If you understand the instructions and are ready to begin the practice trials, click ‘Continue’.</p>
    </div>
    `,
    choices: ['Continue'],
    response_ends_trial: true
};

timeline.push(instructions);

stim_list = sampleBalancedBlocks(trial_objects, 6, 12);

//LISTENING TRIALS
//BLOCK 1
const block_1_header = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [""],
  stimulus: `
  <div class=\"header_container\"><div class=\"header\">BLOCK 1</div></div>
  `,
  prompt: `<div class=\"option_container\"><div class=\"option\">EXPRESSIVE<br><br><b>D</b></div><div class=\"option\">UNEXPRESSIVE<br><br><b>K</b></div></div>`,
  response_ends_trial: false, 
  trial_duration: 3000
};

let tv_array_1 = create_tv_array(stim_list[0]);
const block_1 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">EXPRESSIVE<br><br><b>D</b></div><div class=\"option\">UNEXPRESSIVE<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            },
            on_finish: function(data) {
                // previous speaker
                const prev = jsPsych.data.get()
                    .filter({ trial_type: 'audio-keyboard-response' })
                    .last(2)
                    .values()[0];

                data.prev_spk = prev ? prev.spk : null;

                // response mappings
                const keymap = {
                    d: 'expressive',
                    k: 'unexpressive'
                };

                data.label = keymap[data.response] || null;
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
const block_2_header = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [""],
  stimulus: `
  <div class=\"header_container\"><div class=\"header\">BLOCK 2</div></div>
  `,
  prompt: `<div class=\"option_container\"><div class=\"option\">SMART<br><br><b>D</b></div><div class=\"option\">AVERAGE<br><br><b>K</b></div></div>`,
  response_ends_trial: false, 
  trial_duration: 3000
};

let tv_array_2 = create_tv_array(stim_list[1]);
const block_2 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">SMART<br><br><b>D</b></div><div class=\"option\">AVERAGE<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            },
            on_finish: function(data) {
                // previous speaker
                const prev = jsPsych.data.get()
                    .filter({ trial_type: 'audio-keyboard-response' })
                    .last(2)
                    .values()[0];

                data.prev_spk = prev ? prev.spk : null;

                // response mappings
                const keymap = {
                    d: 'smart',
                    k: 'average'
                };

                data.label = keymap[data.response] || null;
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

//BLOCK 2 ATTENTION CHECK 
const block_2_attention = {
  type: jsPsychHtmlButtonResponse,
  choices: ["tall and short", "expressive and unexpressive", "smart and average"],
  stimulus: "This is an attention check. Please select which labels you were using in the previous block.",
  response_ends_trial: true,
  trial_duration: 15000,
  on_finish: function(data) {
        data.correct = (data.response == 2); // mark correct or incorrect
    } 
};

//BLOCK 3
const block_3_header = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [""],
  stimulus: `
  <div class=\"header_container\"><div class=\"header\">BLOCK 3</div></div>
  `,
  prompt: `<div class=\"option_container\"><div class=\"option\">WARM<br><br><b>D</b></div><div class=\"option\">COLD<br><br><b>K</b></div></div>`,
  response_ends_trial: false, 
  trial_duration: 3000
};

let tv_array_3 = create_tv_array(stim_list[2]);
const block_3 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">WARM<br><br><b>D</b></div><div class=\"option\">COLD<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            },
            on_finish: function(data) {
                // previous speaker
                const prev = jsPsych.data.get()
                    .filter({ trial_type: 'audio-keyboard-response' })
                    .last(2)
                    .values()[0];

                data.prev_spk = prev ? prev.spk : null;

                // response mappings
                const keymap = {
                    d: 'warm',
                    k: 'cold'
                };

                data.label = keymap[data.response] || null;
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
const block_4_header = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [""],
  stimulus: `
  <div class=\"header_container\"><div class=\"header\">BLOCK 4</div></div>
  `,
  prompt: `<div class=\"option_container\"><div class=\"option\">ATYPICAL<br><br><b>D</b></div><div class=\"option\">TYPICAL<br><br><b>K</b></div></div>`,
  response_ends_trial: false, 
  trial_duration: 3000
};

let tv_array_4 = create_tv_array(stim_list[3]);
const block_4 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">ATYPICAL<br><br><b>D</b></div><div class=\"option\">TYPICAL<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            },
            on_finish: function(data) {
                // previous speaker
                const prev = jsPsych.data.get()
                    .filter({ trial_type: 'audio-keyboard-response' })
                    .last(2)
                    .values()[0];

                data.prev_spk = prev ? prev.spk : null;

                // response mappings
                const keymap = {
                    d: 'atypical',
                    k: 'typical'
                };

                data.label = keymap[data.response] || null;
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

const block_4_attention = {
  type: jsPsychHtmlButtonResponse,
  choices: ["confident and insecure", "typical and atypical", "smart and average"],
  stimulus: "This is an attention check. Please select which labels you were using in the previous block.",
  response_ends_trial: true,
  trial_duration: 15000,
  on_finish: function(data) {
        data.correct = (data.response == 1); // mark correct or incorrect
    } 
};

//BLOCK 5
const block_5_header = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [""],
  stimulus: `
  <div class=\"header_container\"><div class=\"header\">BLOCK 5</div></div>
  `,
  prompt: `<div class=\"option_container\"><div class=\"option\">CONFIDENT<br><br><b>D</b></div><div class=\"option\">INSECURE<br><br><b>K</b></div></div>`,
  response_ends_trial: false, 
  trial_duration: 3000
};

let tv_array_5 = create_tv_array(stim_list[4]);
const block_5 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['d', 'k'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 10000,
            prompt: `<div class=\"option_container\"><div class=\"option\">CONFIDENT<br><br><b>D</b></div><div class=\"option\">INSECURE<br><br><b>K</b></div></div>`,
            data: {
                spk: jsPsych.timelineVariable('speaker'),
                sentence_id: jsPsych.timelineVariable('id')
            },
            on_finish: function(data) {
                // previous speaker
                const prev = jsPsych.data.get()
                    .filter({ trial_type: 'audio-keyboard-response' })
                    .last(2)
                    .values()[0];

                data.prev_spk = prev ? prev.spk : null;

                // response mappings
                const keymap = {
                    d: 'confident',
                    k: 'insecure'
                };

                data.label = keymap[data.response] || null;
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
const block_6_header = {
  type: jsPsychHtmlKeyboardResponse,
  choices: [""],
  stimulus: `
  <div class=\"header_container\"><div class=\"header\">BLOCK 6</div></div>
  `,
  prompt: `<div class=\"option_container\"><div class=\"option\">FEMININE<br><br><b>D</b></div><div class=\"option\">MASCULINE<br><br><b>K</b></div></div>`,
  response_ends_trial: false, 
  trial_duration: 3000
}

let tv_array_6 = create_tv_array(stim_list[5]);
const block_6 = {
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
            },
            on_finish: function(data) {
                // previous speaker
                const prev = jsPsych.data.get()
                    .filter({ trial_type: 'audio-keyboard-response' })
                    .last(2)
                    .values()[0];

                data.prev_spk = prev ? prev.spk : null;

                // response mappings
                const keymap = {
                    d: 'feminine',
                    k: 'masculine'
                };

                data.label = keymap[data.response] || null;
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

timeline.push(
  block_1_header, block_1, 
  block_2_header, block_2, 
  block_2_attention,
  block_3_header, block_3, 
  block_4_header, block_4, 
  block_4_attention,
  block_5_header, block_5, 
  block_6_header, block_6
);

//SURVEY INSTRUCTIONS
const transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>You have completed the listening trials. You will now be directed to a short demographic survey. Please answer the survey questions if you feel comfortable doing so. After seeing the survey, you will be able to end the study.</p>",
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
        html: "<p>Please respond to the following questions. If there is a question you are not comfortable responding to, please enter 'NA' into the textbox or select 'Prefer not to answer'. When you have completed the survey, click 'Finish' at the bottom of the page to be directed to the end of the experiment.</p>"
      },
      {
        type: "boolean",
        name: "understood",
        title: "Did you read and understand the instructions?",
        labelTrue: "Yes",
        labelFalse: "No",
        renderAs: "radio",
        required: true
      },
      {
        type: "text",
        name: "age",
        title: "Age:",
        inputType: "number",
        required: true
      },
      {
        type: "comment",
        name: "gender",
        title: "What is your gender identity?",
        required: true
      },
      {
        type: "comment",
        name: "race",
        title: "What is your racial identity?",
        required: true
      },
      {
        type: "comment",
        name: "ethnicity",
        title: "What is your ethnicity?",
        required: true
      },
      {
        type: "comment",
        name: "language",
        title: "What language(s) did you speak at home when you were growing up?",
        required: true
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
          "Hold a higher degree",
          "Prefer not to answer"
        ],
        showOtherItem: true,
        otherText: "Other (describe)",
        required: true
      },
      {
        type: "radiogroup",
        name: "enjoy",
        title: 'Did you enjoy this study?',
        choices: [
          "Worse than average study",
          "Average study",
          "Better than average study",
          "Prefer not to answer"
        ],
        required: true
      },
      {
        type: "radiogroup",
        name: "payment",
        title: "Do you think the payment was fair?",
        choices: [
          "The payment was fair",
          "The payment was too low",
          "Prefer not to answer"
        ],
        required: true
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
};

//timeline.push(end_demo);

//THANKS// - CHANGE LINK
var thanks = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>You've finished the pilot study. Thank you for your time!</p>
    <br>
    <p><a href="https://app.prolific.com/submissions/complete?cc=C1ASD33E"> Click here to return to Prolific and complete the study</a>.</p>`,
  choices: "NO_KEYS"
};

timeline.push(thanks);

//RUN//
jsPsych.run([preload_trial, timeline]);
